'use strict';

const fs = require('fs');
const createString = require('./thirdPartyHTMLrpt.js');
const consts = require('./constants.js');
const roundTo = require('round-to');

// new stuff
var map = new Map;
var thirdPInCC = 0;
var thirdPDomainName = '';
var thirdPartyCallsCount = 0;
var ctrThirdPartyC = 0;


function getCPDomains() {
  return thirdPDomainName;
}

/**
 * getThirdParty() deteremines if URI is a 3P call
 */

function getThirdParty(val) {
  let thirdPLine = '';
    const firstCut = val.indexOf('.');
    const secondCut = val.indexOf(consts.AMAZON_DOMAIN, firstCut);
    const secondCutA = val.indexOf(consts.AUDIBLE_CA, firstCut);
    const secondCutB = val.indexOf(consts.AUDIBLE_CO, firstCut);
    const secondCutC = val.indexOf(consts.AUDIBLE_JP, firstCut);
    const secondCutD = val.indexOf(consts.AUDIBLE_DE, firstCut);
    if ((secondCut < 0) && (secondCutA < 0) && (secondCutB < 0) && (secondCutC < 0) && (secondCutD < 0)) {
      const thirdCut = val.indexOf(consts.AUDIBLE_DOMAIN, firstCut);
      if (thirdCut < 0) {
        const fourthCut = val.indexOf(consts.DATA_URI, firstCut);
        if (fourthCut < 0) {
          const strippedUrl = stripEndOfUrl(val);
          thirdPLine += `${strippedUrl}`;
        }
      }
    }
    return thirdPLine;
  };

/**
 * getThirdPInCriticalPath() returns the num of 3P calls in CP
 */
function getThirdPInCriticalPath() {
  return thirdPInCC;
}

/**
 * getDomainName() returns the domain of URI
 */
function getDomainName(val) {
  const slashes = val.indexOf('://');
          let domainName = 'Unknown';
          if (slashes > -1) {
            const val1 = val.substring(slashes+3);
            const firstSlash = val1.indexOf('/', slashes);
            domainName = val1.substring(0, firstSlash);
            let period = domainName.lastIndexOf('.');
            let s1 = domainName.substring(0,period);
            let theIdx = s1.lastIndexOf('.');
            domainName = domainName.substring(theIdx+1);
          }
    return domainName; 
}

var callback = function (item, val) {
  if ((item=== 'url') && (getThirdParty(val) !== '')) {
    console.log('in callback ' +item + '==' + getDomainName(val));
    let idx = thirdPDomainName.indexOf(getDomainName(val));
    if (idx < 0)
       thirdPDomainName = thirdPDomainName + getDomainName(val) + ' ';
    thirdPInCC++;
  }
}

/**
 * find3PDomains() rips through all the calls and groups all 3P calls by domain name
 */
function find3PDomains(obj) {
  const items =  obj['network-requests'].details.items;
  for (var c in items) {
    let s2 = getDomainName(items[c].url);
    if (getThirdParty(items[c].url) !== '') ctrThirdPartyC++;
    console.log('in hereeee' + ctrThirdPartyC + ' url=' + items[c].url);
    if (map.get(s2) === undefined) {
        let arr1 = [];
        arr1.push(items[c]);
        map.set(s2, arr1);
    } else {
        let arr1 = map.get(s2);
        arr1.push(items[c]);
        map.set(s2, arr1);
    } 
  }
  let s1 = ''; 
  for (let [key, value] of map) {
      for (let x=0; x < value.length; x++) {
          let thirdParty = getThirdPartyCallsAB(value[x]);
          if (thirdParty != '') thirdPartyCallsCount++;
          s1 = s1 + thirdParty;
      }
  }
  return s1;
}

/**
 * find3PInCriticalRequestChain() finds a 3P URL in critical path
 */
function find3PInCriticalRequestChain(obj) {
    if (obj instanceof Array) {
        for (var i=0; i<obj.length; i++) {
            if (typeof obj[i] == "object" && obj[i]) {
                callback(i);
                find3PInCriticalRequestChain(obj[i]);
            } else {
                callback(i, obj[i])
            }
        }
    } else {
        for (var prop in obj) {
            if (typeof obj[prop] == "object" && obj[prop]) {
                callback(prop);
                find3PInCriticalRequestChain(obj[prop]);
            } else {
                callback(prop, obj[prop]);
            }
        }
    }
}


/**
 * stripEndOfUrl() rips out the query params
 * at the end of Url
 */
function stripEndOfUrl(val) {
  const firstCut = val.indexOf('.');
  let s1 = val;
  let secondCut = val.indexOf(';', firstCut);
  if (secondCut < 0) {
    secondCut = val.indexOf('?', firstCut);
  }
  if (secondCut < 0) {
    secondCut = val.indexOf('%', firstCut);
  }
  if (secondCut > 0) {
    s1 = val.substring(0, secondCut);
  }
  return s1;
}

/**
 * getContentfulPaintDistro() gets the Contentful Paint
 * distribution in an html string
 */
function getContentfulPaintDistro(obj) {
  const cpd = obj.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.distributions;
  let distroLine = '';
  let distro1 = '';
  let underASec = 0;
  cpd.forEach(function(value) {
    let distro = `More than ${value.min}ms`;
    if (value.max !== undefined) {
      distro = `${value.min}-${value.max}ms`;
    }
    let prop1 = value.proportion * 100;
    prop1 = roundTo(prop1, 2);
    if (value.min === 0) {
      underASec = prop1;
    }
    distro1 = `${distro}: ${prop1}% <br>`;
    distroLine += distro1;
  });
  distroLine = `<td>${distroLine}</td>`;
  const cpdOutput = {
    ctr: underASec,
    display: distroLine
  };
  return cpdOutput;
}

/**
 * getResourceType() maps the miemType of 3P call to humam friendly type
 * html string
 */
function getResourceType(val) {
  let res = val.resourceType;
  let x = val.mimeType;
  // if undefined check if mimeType is not null
  if (val.resourceType === undefined) {
     res = 'Other';
     if (val.mimeType != null) {
        if ((val.mimeType == 'image/gif') || (val.mimeType == 'text/plain'))  res = 'Image';
        if (val.mimeType == 'text/html') res = 'Document';
        if (x.indexOf('javascript') > -1) res = 'Script';    
        // console.log('the undefined' + val.mimeType);
     }
  } 
  return res;
}

/**
 * getThirdPartyCallsAB() determines teh latency and type of each 3P calls 
 * html string
 */
function getThirdPartyCallsAB(value) {
  let thirdPLine = '';

    const val = value.url;
    if (getThirdParty(val) !== '') {
          const latency = roundTo((value.endTime - value.startTime), 2);
          const strippedUrl = stripEndOfUrl(value.url);
          const resType = getResourceType(value);
          // ctrThirdParty++;
          thirdPLine += `${strippedUrl} took ${latency}ms and is of ${resType} type<br>`;
    }
    return thirdPLine;
  }

/**
 * getFileName() rips out asset name from URI
 */
function getFileName(str) {
  // strip out after domain name
  const n = str.lastIndexOf('/');
  const queryParamId = str.indexOf('?');
  let val = str;
  if (n > 0) {
    // if str only comprises query param and no asset name
    if ((n + 1) === queryParamId) {
      val = str.substring(0, n);
    } else {
      val = str.substring(n + 1);
    }
  }
  return val;
}

/**
 * getTarget() gets the list of large assets for page in an
 * html string
 */
function getTarget(obj) {
  let target = obj.loadingExperience.id;
  const cut = target.indexOf('?');
  if (cut > 0) {
    target = target.substring(0, cut - 1);
  }
  return target;
}

/**
 * getTotalPageSize() gets the size of the page
 */
function getTotalPageSize(obj) {
  const val = obj['total-byte-weight'].displayValue;
  return val;
}

/**
 * getJSParseTime() gets time to parse JS during page load
 */
function getJSParseTime(obj) {
  const val = obj['bootup-time'].displayValue;
  return val;
}

function getBlockingTime(obj) {
  const val = obj['third-party-summary'].displayValue;
  return val;
}
/**
 * convertToMB() get page size in MB
 */
function convertToMB(str) {
  let mbVal = -1;
  let str1 = 'None';
  if ((str !== null) || (str !== '')) {
    const cut = str.indexOf('Total Size was ');
    if (str.length > 3) {
      str1 = str.substring(cut + 16, str.length - 3);
      str1 = str1.replace(',', '');
      mbVal = roundTo(parseInt(str1, 10) / 1000, 2);
    }
  }
  if (mbVal === -1) {
    str1 = str;
  } else {
    str1 = mbVal + ' MB';
  }
  return str1;
}

/**
 * getFirstMeaningfulPaint() gets the First Meaningful Paint value
 */
function getFirstMeaningfulPaint(obj) {
  const val = obj['first-meaningful-paint'].displayValue;
  return val;
}

/**
 * getTimeToInteractive() gets the TTI value
 */
function getTimeToInteractive(obj) {
  const val = obj['interactive'].displayValue;
  return val;
}

/**
 * getCriticalRequestChains() gets the resources in the critical path
 */
function getCriticalRequestChains(obj) {
  const val = obj['critical-request-chains'].displayValue;
  return val;
}

module.exports = (obj) => {
  let html = '';
  const obj1 = obj.lighthouseResult.audits;
  const contentfulPaintDistro = getContentfulPaintDistro(obj);
  const totalSize = getTotalPageSize(obj1);
  const javaScriptParseTime = getJSParseTime(obj1);
  const totalPageMB = convertToMB(totalSize);
  const tTI = getTimeToInteractive(obj1);
  const fMPaint = getFirstMeaningfulPaint(obj1);
  const targetSiteName = getTarget(obj);
  const thirdPartyBlockingTime = getBlockingTime(obj1);
  // new stuff
  const obj2 = obj1['critical-request-chains'].details;
  let chains = obj2.chains;
  find3PInCriticalRequestChain(chains);

  const cpDomains = getCPDomains();
  const thirdPCallsinCP = getThirdPInCriticalPath();
  const str3 = find3PDomains(obj1);

  const core = {
    targetSite: targetSiteName,
    totPageMB: totalPageMB,
    cpdCtr: contentfulPaintDistro.ctr,
    contentfulPaintDistro: contentfulPaintDistro.display,
    firstMeaningfulPaint: fMPaint,
    jsParseTime: javaScriptParseTime,
    timeToInteractive: tTI,
    outsideCalls : ctrThirdPartyC,
    blockingTime: thirdPartyBlockingTime,
    totPageSize: totalSize,
    cpDoms: cpDomains, 
    thirdPCNCP: thirdPCallsinCP,
    badGuys : str3
  };
  // pass data to creaee HTML page
  html = createString(core);
  return html;
};
