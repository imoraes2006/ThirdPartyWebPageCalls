<!--
title: Check Third Party code on Web Pages
description: Runs a check of third party calls using Lambda for each web page configured based on synthetic and real user data. The check results in the creation of a web page that gets stored in a defined S3 bucket. 
layout: Doc
framework: v1
platform: AWS
language: nodeJS
authorLink: 'https://github.com/imoraes2006'
authorName: 'Ian Moraes'
authorAvatar: 'https://avatars0.githubusercontent.com/u/2223362?v=4&s=140'
-->
# Web Page Performance Check 

Tool that runs a check of third party call during page load for each web page configured (e.g., anon Home Page for global web sites--US, EU and APAC sites).  It collects both synthetic and real user data on the impact of third party calls. The check results in the creation of a report (HTML version) for that page that gets stored in a configured S3 bucket. The name of the report uses a date time stamp and domain name.  

The report provides a summary that can be consumed by business and marketing partners.   The tool will explicitly list third party calls and their latency during page load and also provide data such as: total size of page, time for processing JS during page load, presents sample of real user data of when content is first displayed (something happening on the screen), and first time meaningful content displayed (something useful shown on the screen).

Some advantages of this tool:
- Collects both test data (synthetic) and real user data 
- Complements existing tools and metrics. It provides current data on the number, list and impact of third party calls made during page load including during the critical rendering path
- Report provides useful insight for our technical, business and marketing partners in an understandable format
- Maintenance and licensing costs are negligible. There is no licensing cost and no hosts to maintain as tool developed in-house and requires no servers to run (limited maintenance and operating costs) 



## Use Cases

- Checks third party tag calls for a web page and produces a report that gets stored in S3

## Setup

- Edit `serverless.yml` and configure the S3 bucket: 
`bucket: <S3 bucket name>`

- Make sure region is defined correctly

- Enable permissions to allow lambda function to store report in S3 bucket. Use a role that has a policy to allows S3 access 

## Deploy

- In order to deploy the endpoint simply run

```bash
serverless deploy
```

- To create a deployment package and upload via AWS console
```zip -r ../function-name.zip .```

- Make sure to specify BUCKET environment variable and increase the timeout from 3 seconds

## Usage

- Note that this service runs as a scheduled event on the 8th of each month

- Check configured S3 bucket for report (html version) of performance check 

In order to execute manually simply run
```bash
./tester
```
