
const consts = require('./constants.js');
var map = new Map;
var thirdPInCC = 0;
var thirdPDomainName = '';

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
        console.log('the undefined' + val.mimeType);
     }
  } 
  return res;
}

function getDomainName(val) {

  // const val = item.url;
  const slashes = val.indexOf('://');
          let domainName = 'Unknown';
          if (slashes > -1) {
            const val1 = val.substring(slashes+3);
            const firstSlash = val1.indexOf('/', slashes);
            domainName = val1.substring(0, firstSlash);
            // console.log('domainName=' + domainName); 
            // strip until you get (facenbook.net)
            let period = domainName.lastIndexOf('.');
            let s1 = domainName.substring(0,period);
            console.log('getting closer=' + s1);
            let theIdx = s1.lastIndexOf('.');
            domainName = domainName.substring(theIdx+1);
            console.log('is this it' + domainName);
      
           
          }
    return domainName; 
}

function getThirdParty(val) {
  let thirdPLine = '';
  let ctrThirdParty = 0;
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
          ctrThirdParty++;
          thirdPLine += `${strippedUrl}`;
          console.log(strippedUrl);
        }
      }
    }
    return thirdPLine;
  };


  var crc = {
    "id": "critical-request-chains",
        "title": "Avoid chaining critical requests",
        "description": "The Critical Request Chains below show you what resources are loaded with a high priority. Consider reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load. [Learn more](https://web.dev/critical-request-chains).",
        "score": null,
        "scoreDisplayMode": "informative",
        "displayValue": "12 chains found",
        "details": {
          "longestChain": {
            "transferSize": 1050,
            "duration": 871.997999958694,
            "length": 4
          },
          "type": "criticalrequestchain",
          "chains": {
            "7CC2496AAF351CCFE582626D703C8EAB": {
              "children": {
                "22.77": {
                  "request": {
                    "transferSize": 80640,
                    "url": "https://images-na.ssl-images-amazon.com/images/S/audible-seo-analytics/DTM/843e2f5b8ab495a5f828c0b9302ff13fbaff1d33/satelliteLib-ee5a1f44328252330249a0e25cbda71e7dfe44b4.js",
                    "responseReceivedTime": 1098121.341701,
                    "endTime": 1098121.341704,
                    "startTime": 1098121.308229
                  },
                  "children": {
                    "22.90": {
                      "request": {
                        "transferSize": 13269,
                        "url": "https://images-na.ssl-images-amazon.com/images/S/audible-seo-analytics-satellitescripts/2020-03-26-01/843e2f5b8ab495a5f828c0b9302ff13fbaff1d33/mbox-contents-b3b50eb5cb95a5af5be85a4c741a4cd7a6c1dc24.js",
                        "responseReceivedTime": 1098121.481938,
                        "endTime": 1098121.48194,
                        "startTime": 1098121.465447
                      },
                      "children": {
                        "22.95": {
                          "request": {
                            "transferSize": 14560,
                            "url": "https://cdn.tt.omtrdc.net/cdn/target.js",
                            "responseReceivedTime": 1098121.579004,
                            "endTime": 1098121.579008,
                            "startTime": 1098121.531041
                          }
                        },
                        "22.97": {
                          "request": {
                            "endTime": 1098121.620931,
                            "startTime": 1098121.537065,
                            "transferSize": 1050,
                            "url": "https://audible.tt.omtrdc.net/m2/audible/mbox/ajax?mboxHost=www.audible.com&mboxPage=b7fed14d4c414d4e8ccef99aaea09c9b&screenHeight=600&screenWidth=800&browserWidth=1350&browserHeight=940&browserTimeOffset=-420&colorDepth=24&mboxSession=b7fed14d4c414d4e8ccef99aaea09c9b&customerSegment=Anon&mboxCount=1&mboxTime=1585666414231&entity.categoryId=n%2Fa&profile.language=en_US&mboxMCGVID=65871535498348127790538762319148044893&vst.trk=audible.sc.omtrdc.net&mbox=target-global-mbox&mboxId=0&mboxMCSDID=0ACC5B525D6BFBCF-54747CB5D4FAEE78&mboxURL=https%3A%2F%2Fwww.audible.com%2F&mboxReferrer=&mboxVersion=63",
                            "responseReceivedTime": 1098121.620928
                          }
                        }
                      }
                    }
                  }
                },
                "22.3": {
                  "request": {
                    "transferSize": 1518,
                    "url": "https://images-na.ssl-images-amazon.com/images/I/11yHvoQ7oKL.css?AUIClients/AudibleWebNavigationAssets",
                    "responseReceivedTime": 1098121.10537,
                    "endTime": 1098121.105373,
                    "startTime": 1098121.088977
                  }
                },
                "22.36": {
                  "request": {
                    "transferSize": 19320,
                    "url": "https://m.media-amazon.com/images/G/01/audibleweb/fonts/audiblesans/audiblesans-sm._CB493226459_.woff2",
                    "responseReceivedTime": 1098121.234559,
                    "endTime": 1098121.234561,
                    "startTime": 1098121.211973
                  }
                },
                "22.75": {
                  "request": {
                    "url": "https://images-na.ssl-images-amazon.com/images/I/01PVbJfTmDL.css?AUIClients/AudibleWebNotificationAssets",
                    "responseReceivedTime": 1098121.321862,
                    "endTime": 1098121.321865,
                    "startTime": 1098121.305902,
                    "transferSize": 803
                  }
                },
                "22.10": {
                  "request": {
                    "endTime": 1098121.130438,
                    "startTime": 1098121.113305,
                    "transferSize": 2341,
                    "url": "https://images-na.ssl-images-amazon.com/images/I/31wPiddXo4L.css?AUIClients/AudibleWebCarouselAssets",
                    "responseReceivedTime": 1098121.130434
                  }
                },
                "22.44": {
                  "request": {
                    "responseReceivedTime": 1098121.174117,
                    "endTime": 1098121.174119,
                    "startTime": 1098121.157381,
                    "transferSize": 11691,
                    "url": "https://m.media-amazon.com/images/G/01/audibleweb/brickcity/1.0/fonts/icons/brickcity_icons_release_1-0.21._CB494056935_.woff"
                  }
                },
                "22.34": {
                  "request": {
                    "transferSize": 19687,
                    "url": "https://m.media-amazon.com/images/G/01/audibleweb/fonts/audiblesans/audiblesans-rg._CB493226456_.woff2",
                    "responseReceivedTime": 1098121.190087,
                    "endTime": 1098121.190089,
                    "startTime": 1098121.156698
                  }
                },
                "22.76": {
                  "request": {
                    "transferSize": 1488,
                    "url": "https://images-na.ssl-images-amazon.com/images/S/audible-seo-analytics/DTM/dtm_common.js",
                    "responseReceivedTime": 1098121.32314,
                    "endTime": 1098121.323142,
                    "startTime": 1098121.307866
                  }
                },
                "22.9": {
                  "request": {
                    "url": "https://images-na.ssl-images-amazon.com/images/I/01PIy4uOPtL.css?AUIClients/AudibleWebSearchAssets",
                    "responseReceivedTime": 1098121.1220830001,
                    "endTime": 1098121.122087,
                    "startTime": 1098121.106053,
                    "transferSize": 678
                  }
                },
                "22.11": {
                  "request": {
                    "endTime": 1098121.142194,
                    "startTime": 1098121.124421,
                    "transferSize": 595,
                    "url": "https://images-na.ssl-images-amazon.com/images/I/017c-E3u2tL.css?AUIClients/AudibleCloudPlayerLauncherAssets",
                    "responseReceivedTime": 1098121.14219
                  }
                },
                "22.2": {
                  "request": {
                    "endTime": 1098121.118968,
                    "startTime": 1098121.088406,
                    "transferSize": 27701,
                    "url": "https://images-na.ssl-images-amazon.com/images/I/71oLipQw7OL.css?AUIClients/AudibleBrickCitySkin",
                    "responseReceivedTime": 1098121.1189650001
                  }
                }
              },
              "request": {
                "url": "https://www.audible.com/",
                "responseReceivedTime": 1098121.073308,
                "endTime": 1098121.073317,
                "startTime": 1098120.748933,
                "transferSize": 86465
              }
            }
          }
        }
      };

        


  var items = [
  {
              "resourceSize": 0,
              "endTime": 820.69100002991036,
              "startTime": 732.27400000905618,
              "transferSize": 517,
              "url": "https://cm.everesttech.net/cm/dd?d_uuid=74850712452954392100492731160293637925",
              "statusCode": 302
            },
            {
              "resourceType": "Script",
              "mimeType": "text/javascript",
              "resourceSize": 43582,
              "endTime": 1062.7360000507906,
              "startTime": 780.03000002354383,
              "transferSize": 14560,
              "url": "https://cdn.tt.omtrdc.net/cdn/target.js",
              "statusCode": 200
            },
            {
              "resourceSize": 258,
              "endTime": 1155.0120000028983,
              "startTime": 786.81700001470745,
              "transferSize": 497,
              "url": "https://audible.tt.omtrdc.net/m2/audible/mbox/ajax?mboxHost=www.audible.com&mboxPage=5e00c89de158456cb0113c7c9206d857&screenHeight=600&screenWidth=800&browserWidth=1350&browserHeight=940&browserTimeOffset=-420&colorDepth=24&mboxSession=5e00c89de158456cb0113c7c9206d857&customerSegment=Anon&mboxCount=1&mboxTime=1585229693511&entity.categoryId=n%2Fa&profile.language=en_US&mboxMCGVID=74874591240700877630494855711536598556&vst.trk=audible.sc.omtrdc.net&mbox=target-global-mbox&mboxId=0&mboxMCSDID=7E2827A9C4DACEA3-57B2CCAB0E023F1A&mboxURL=https%3A%2F%2Fwww.audible.com%2F&mboxReferrer=&mboxVersion=63",
              "statusCode": 200,
              "resourceType": "Script",
              "mimeType": "text/javascript"
            },
            {
              "resourceType": "Image",
              "mimeType": "image/gif",
              "resourceSize": 42,
              "endTime": 921.36600002413616,
              "startTime": 820.98000001860783,
              "transferSize": 915,
              "statusCode": 200,
              "url": "https://dpm.demdex.net/ibs:dpid=411&dpuuid=Xn0R7QAAAFs_NxC4"
            },
            {
              "mimeType": "text/html",
              "resourceSize": 0,
              "endTime": 1108.0060000531375,
              "startTime": 1099.0830000373535,
              "transferSize": 1265,
              "statusCode": 302,
              "url": "https://cm.g.doubleclick.net/pixel?google_nid=adobe_dmp&google_cm&gdpr=0&gdpr_consent="
            },
            {
              "mimeType": "text/html",
              "endTime": 1117.0640000491403,
              "resourceSize": 0,
              "startTime": 1108.2230000174604,
              "transferSize": 1454,
              "statusCode": 302,
              "url": "https://cm.g.doubleclick.net/pixel?google_nid=adobe_dmp&google_cm=&gdpr=0&gdpr_consent=&google_tc="
            },
            {
              "mimeType": "image/gif",
              "resourceSize": 42,
              "endTime": 1205.85900003789,
              "startTime": 1117.2320000478067,
              "transferSize": 915,
              "url": "https://dpm.demdex.net/ibs:dpid=771&dpuuid=CAESEN7kRpLGmqSaEayJ9WRo74c&google_cver=1?gdpr=0&gdpr_consent=",
              "statusCode": 200,
              "resourceType": "Image"
            },
            {
              "resourceType": "Script",
              "mimeType": "application/javascript",
              "endTime": 1179.680000001099,
              "resourceSize": 76912,
              "startTime": 1162.6780000515282,
              "transferSize": 29404,
              "statusCode": 200,
              "url": "https://www.googletagmanager.com/gtag/js?id=DC-5164101"
            },
            {
              "resourceType": "Script",
              "mimeType": "text/javascript",
              "resourceSize": 1661,
              "endTime": 1644.5790000143461,
              "startTime": 1576.3780000270344,
              "transferSize": 2335,
              "statusCode": 200,
              "url": "https://googleads.g.doubleclick.net/pagead/viewthroughconversion/827055970/?random=1585254894303&cv=9&fst=1585254894303&num=1&bg=ffffff&guid=ON&resp=GooglemKTybQhCsO&u_h=600&u_w=800&u_ah=600&u_aw=800&u_cd=24&u_his=2&u_tz=-420&u_java=false&u_nplug=0&u_nmime=0&gtm=2oa3i0&sendb=1&ig=1&data=event%3Dgtag.config&frm=0&url=https%3A%2F%2Fwww.audible.com%2F&tiba=Audiobooks%20%26%20Original%20Audio%20Shows%20-%20Get%20More%20from%20Audible&hn=www.googleadservices.com&async=1&rfmt=3&fmt=4"
            },
            {
              "transferSize": 2383,
              "statusCode": 200,
              "url": "https://googleads.g.doubleclick.net/pagead/viewthroughconversion/973853048/?random=1585254894307&cv=9&fst=1585254894307&num=1&bg=ffffff&guid=ON&resp=GooglemKTybQhCsO&u_h=600&u_w=800&u_ah=600&u_aw=800&u_cd=24&u_his=2&u_tz=-420&u_java=false&u_nplug=0&u_nmime=0&gtm=2oa3i0&sendb=1&ig=1&data=event%3Dgtag.config&frm=0&url=https%3A%2F%2Fwww.audible.com%2F&tiba=Audiobooks%20%26%20Original%20Audio%20Shows%20-%20Get%20More%20from%20Audible&hn=www.googleadservices.com&async=1&rfmt=3&fmt=4",
              "resourceType": "Script",
              "mimeType": "text/javascript",
              "resourceSize": 1661,
              "endTime": 1603.9220000384375,
              "startTime": 1581.3040000502951
            },
            {
              "transferSize": 46695,
              "url": "https://s.pinimg.com/ct/lib/main.a37a8bbc.js",
              "statusCode": 200,
              "resourceType": "Script",
              "mimeType": "application/javascript",
              "endTime": 1652.1530000027269,
              "resourceSize": 46316,
              "startTime": 1605.3640000172891
            },
            {
              "resourceType": "XHR",
              "mimeType": "application/json",
              "endTime": 1669.292000005953,
              "resourceSize": 2,
              "startTime": 1610.1520000374876,
              "transferSize": 807,
              "url": "https://s.yimg.com/wi/config/10054837.json",
              "statusCode": 200
            },
            {
              "resourceType": "Script",
              "mimeType": "application/x-javascript",
              "resourceSize": 457509,
              "endTime": 1654.0090000489727,
              "startTime": 1625.1580000389367,
              "transferSize": 116022,
              "statusCode": 200,
              "url": "https://connect.facebook.net/signals/config/186889561908345?v=2.9.15&r=stable"
            }
]

function getCPDomains() {
  return thirdPDomainName;
}

function getThirdPartyJC(val) {
  let thirdPLine = '';
  let ctrThirdParty = 0;
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
          ctrThirdParty++;
          thirdPLine += `${strippedUrl}`;
          // console.log(strippedUrl);
        }
      }
    }
    return thirdPLine;
  };

var callback = function (item, val, s3) {
  if ((item=== 'url') && (getThirdParty(val) !== '')) {
    console.log('in callback ' +item + '=====' + getDomainName(val));
    thirdPDomainName = thirdPDomainName + getDomainName(val) + ' ';
    thirdPInCC++;
  }
}

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
 function findCPDomains(items) {
  for (var c in items) {
    let s2 = getDomainName(items[c].url);
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
          console.log('status code = ' + value[x].statusCode + 'resourceType=' + getResourceType(value[x]) + '</br>');
          s1 = s1 + getResourceType(value[x]) + ' </br>';
      }
  }
  return s1;
}
if (getThirdParty('https://images-na.ssl-images-amazon.com/images/I/71w5eF78t7L.css?AUIClients/AudibleBrickCitySkin')!=='')
  console.log('SATURADAY IN THE PARK');
  var fs = require("fs");

  console.log("\n *STARTING* \n");
  // Get content from file
  var contents = fs.readFileSync("tues.txt");
  var fileData = JSON.parse(contents);
  var jj = fileData['lighthouseResult'].audits;
  console.log(jj['third-party-summary'].displayValue);

  console.log('HEYA' + findCPDomains(items));
  console.log('-------------' + crc['displayValue']);
  let chains = crc['details'].chains;
  find3PInCriticalRequestChain(chains);
  for (url in chains) {
    console.log(`key= ${url} value = ${chains[url]}`)
  } 
  console.log('JC===' + getThirdPartyJC('https://googleads.g.doubleclick.net/pagead/viewthroughconversion/827055970/?random=1585254894303&cv=9&fst=1585254894303&num=1&bg=ffffff&guid=ON&resp=GooglemKTybQhCsO&u_h=600&u_w=800&u_ah=600&u_aw=800&u_cd=24&u_his=2&u_tz=-420&u_java=false&u_nplug=0&u_nmime=0&gtm=2oa3i0&sendb=1&ig=1&data=event%3Dgtag.config&frm=0&url=https%3A%2F%2Fwww.audible.com%2F&tiba=Audiobooks%20%26%20Original%20Audio%20Shows%20-%20Get%20More%20from%20Audible&hn=www.googleadservices.com&async=1&rfmt=3&fmt=4'));
  console.log('getCPDomains=' + getCPDomains());
  console.log('third party in critical path' + thirdPInCC);
  for (let [key, value] of map) {
      for (let x=0; x < value.length; x++)
          console.log('status code = ' + value[x].statusCode + 'resourceType=' + getResourceType(value[x]));
  }
  // var obj = JSON.parse(text);

  // getDomainName('https://dpm.demdex.net/id?d_visid_ver=3.1.2&d_fieldgroup=MC&d_rtbd=json&d_ver=2&d_orgid=165958B4533AEE5B0A490D45%40AdobeOrg&d_nsid=0&ts=1585254893423');
