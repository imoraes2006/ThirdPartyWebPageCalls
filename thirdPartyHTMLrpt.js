'use strict';
module.exports = (obj) => {
  // console.log(`IN THIRD PARTY THIRD PARTY CALLS FOR ${obj.targetSite} IS ${obj.outsideCalls}`);
  let str1 = `<html>
            <style>
                div {
                  font-family: arial, sans-serif;
                }
                table {
                  font-family: arial, sans-serif;
                  border-collapse: collapse;  
                  width: 100%;
                }
                td, th {
                  border: 1px solid #dddddd;
                  text-align: left;
                  padding: 8px;
                }
                tr:nth-child(even) {
                  background-color: #dddddd;
                }
            </style>
            <body>
              <h2>REPORT OF THIRD PARTY CALLS FOR ${obj.targetSite}</h2>
              <div><p>Hey there! I ran a test of the anon home page to assess third party calls (that is calls from an Audible user's browser to non-Amazon servers). 
              To do this, I acted as an anonymous user accessing the page and then ran some checks and also got some real data from actual users from Google's public data warehouse. </p>
              <p>    
              Third party calls are made as a result of third party (3P) tags and can be simply described as JavaScript code from an external party that is intentionally included and executed as part of Audible web applications. 
              Marketing introduces and manages 3P tags on all Audible marketplaces using Adobe DTM to capture events and actions on our web sites and this data is sent to third party servers.
              Further, some 3P tags (secondary call tags) are called from another third party tag whereas others (piggybacking tags) are called from a 3P tag that Audible added intentionally to get the piggybacking tag to be called. 
              Note that cookies are not tags.  Tags can be used to set cookies. Note Google Chrome plans to phase out support for third-party cookies in Chrome in the next two years. 
              Finally, after all the web page assets (HTML, CSS, Javascript) are downloaded by a browser, there are steps required to display something on a web page.  These steps are known as the critical rendering path. 
              Calls from a page to third party servers can occur during the critical rendering path and can impact the rendering of the page. 
               </p>
           
              <p>So, let's start with some highlights. 

              <ul>
                <li>Tags on the page are making <b>${obj.outsideCalls}</b> calls to other (non-Audible) web sites while the page is being loaded for the first time. If you want even more details on the third party tags on your site, you know who to contact :)</li>
                <li>The total size of your page was <b>${obj.totPageMB}</b> (just saying that Google recommends that it be less than 0.5 MB).  In general, the more content that needs to be downloaded during the loading of a page, the slower the page. </li>
                <li>Based on a sample of real Chrome browser users visiting this page, about ${obj.cpdCtr}% of them see some content displayed on their screen in under a second (the higher the number the better). I abandon slow web sites do you? 
                At ${obj.firstMeaningfulPaint} the user feels that the primary content of the page is displayed.
                At ${obj.timeToInteractive} the page is displayed and able to consistently respond to user input</li>
                </ul></p> 
              The goal of this effort and others is to create awareness in order to significantly reduce and eliminate data being shared with third parties. More detail is shown below. </div>    
              <h2>DETAILS</h2>
              <table>
                <tr>
                  <td>Target website</td>
                  <td>${obj.targetSite}</td>
                </tr>
                <tr>
                  <td><a href="https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/">Total size of page</a></td>
                  <td>${obj.totPageSize}</td>
                </tr>
                <tr>
                  <td>Third party site calls during page load</td>
                  <td>${obj.badGuys}</td>
                </tr>
                <tr>
                   <td><a href="https://developers.google.com/web/fundamentals/performance/critical-rendering-path">Number of third party calls in critical path</a></td>
                   <td>${obj.thirdPCNCP}</td>
                </tr>
                <tr>
                   <td>Third party domains in critical path</td>
                   <td>${obj.cpDoms}</td>
                </tr>
                <tr>
                    <td>Blocked browser time from third party code</td>
                    <td>${obj.blockingTime}</td>
                </tr>
                <tr>
                  <td><a href="https://developers.google.com/web/tools/lighthouse/audits/bootup">Time for processing JavaScript during loading of page</a></td>
                  <td>${obj.jsParseTime}</td>
                </tr>
                <tr>
                <tr>
                  <td><a href="https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#time_to_interactive">Time when page displayed and responds to input</a></td>
                  <td>${obj.timeToInteractive}</td>
                </tr>
              </table>
            </body>
          </html>`;

        return str1;
}