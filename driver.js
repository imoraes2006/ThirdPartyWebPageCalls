'use strict';

const fetch = require('node-fetch');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const createPage = require('./output2');
const sites = require('./config/sites.json');
const consts = require('./constants.js');

const s3 = new AWS.S3();
const start = Date.now(); // milliseconds count

/**
 * generateTargetFileName() returns a human-friendly
 * name of the target site
 */
function generateTargetFileName(value) {
  let target = consts.DEFAULT_FALLBACK_TARGET;
  const firstCut = value.indexOf('.');
  if (firstCut > 0) {
    const secondCut = value.indexOf('/', firstCut);
    if (secondCut > firstCut) {
      const s1 = value.substring(firstCut + 1, secondCut);
      target = s1.replace(/\./g, '-');
    }
  }
  return target;
}

/**
 * generateFileName() returns a file name for S3
 * for the output of a target site
 */
function generateFileName(fileName) {
  const targetFileName = generateTargetFileName(fileName);
  const today = new Date();
  const reportFileName = (today.getMonth() + 1).toString() + '-' + today.getDate().toString()
    + '-' + today.getFullYear().toString() + '-' + targetFileName + '.html';
  return reportFileName;
}

/**
 * produceReport() gets data, produces report and
 * stores report on S3
 */
function produceReport(targetUrl, context, callback) {
  const perfUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${targetUrl}`;
  console.log(perfUrl);
  fetch(perfUrl)
    .then((response) => {
      response.json().then(function(obj) {
        const html1 = createPage(obj);
        // generate the file name for storing in S3
        const reportFileName = generateFileName(targetUrl);
        s3.putObject({
          Bucket: process.env.BUCKET,
          Key: reportFileName,
          Body: html1,
        }).promise();
        if (response.ok) {
          return response;
        }
        return Promise.reject(new Error(
            `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
      });
    })
}

const delay = (ms) => new Promise(
  (resolve) => setTimeout(resolve, ms)
);

/**
 * dispatch() runs performance analysis on each site with delay in between
 * as API is limited to one per second
 */
function dispatch(sites, context, callback) {
  delay(2000).then(() => {
    console.log('Resolved after 2 seconds');
    const end = Date.now(); // done
    console.log(`The loop took ${end - start} ms`);
    produceReport(sites, context, callback);
  });
}

module.exports.getperf = (event, context, callback) => {
  for (var attributename in sites) {
    console.log(attributename + ':' + sites[attributename]);
    dispatch(sites[attributename], context, callback);
  }
};
