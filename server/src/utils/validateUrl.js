const validUrl = require('valid-url');

function isValidUrl(url) {
  return !!validUrl.isWebUri(url);
}

module.exports = isValidUrl;
