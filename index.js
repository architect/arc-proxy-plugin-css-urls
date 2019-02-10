var cssmin = require('cssmin')
/**
 * @architect/proxy-plugin-css-min
 *
 * @param Key - the requested S3 Key
 * @param File - the file contents {headers, body}
 * @returns File - the processed file contents {header, body}
 */
module.exports = function css(Key, {headers, body}) {
  return {
    headers,
    body: cssmin(body)
  }
}
