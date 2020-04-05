const MAX_ASSET_LIMIT = 1000000; // Flag when a web page asset is > 1 MB
const AUDIBLE_DOMAIN = 'audible.com';
const AMAZON_DOMAIN = 'amazon.com';
const AUDIBLE_JP = 'amazon.co.jp';
const AUDIBLE_CA = 'audible.ca';
const AUDIBLE_CO = 'audible.co.';
const AUDIBLE_DE = 'audible.de';
const DATA_URI = 'data:image';
const NO_LARGE_ITEM_SUMMARY = 'While the page is being loaded, I found no large files being downloaded to the users device/laptop';
const LARGE_ITEM_SUMMARY = 'While the page is being loaded, I found one or more files greater than 1 MB in size being downloaded to the users device/laptop';
const DEFAULT_FALLBACK_TARGET = 'check-the-uri';
module.exports = {
  MAX_ASSET_LIMIT: MAX_ASSET_LIMIT,
  AUDIBLE_DOMAIN: AUDIBLE_DOMAIN,
  AUDIBLE_JP: AUDIBLE_JP,
  AUDIBLE_CA: AUDIBLE_CA,
  AUDIBLE_DE: AUDIBLE_DE,
  AUDIBLE_CO: AUDIBLE_CO,
  AMAZON_DOMAIN: AMAZON_DOMAIN,
  DATA_URI: DATA_URI,
  NO_LARGE_ITEM_SUMMARY: NO_LARGE_ITEM_SUMMARY,
  LARGE_ITEM_SUMMARY: LARGE_ITEM_SUMMARY,
  DEFAULT_FALLBACK_TARGET: DEFAULT_FALLBACK_TARGET
};
