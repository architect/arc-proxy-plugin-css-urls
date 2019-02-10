let css = require('css')
/**
 * @architect/proxy-plugin-css-urls
 *
 * prepends @import url paths with /staging or /production
 *
 * // input
 * @import '/bar.css';
 *
 * // output
 * @import '/staging/bar.css';
 *
 * @param Key - the requested S3 Key
 * @param File - the file contents {headers, body}
 * @returns File - the processed file contents {header, body}
 */
module.exports = function prefixImport(Key, {headers, body}) {
  if (process.env.NODE_ENV === 'testing')
    return {headers, body}
  let prefix
  if (process.env.NODE_ENV === 'staging')
    prefix = '/staging'
  if (process.env.NODE_ENV === 'production')
    prefix = '/production'
  let ast = css.parse(body)
  ast.stylesheet.rules = ast.stylesheet.rules.map(rule=> {
    if (rule && rule.type && rule.type === 'import') {
      rule.import = `'${prefix}${rule.import.replace(/('|")/g, '')}'`
    }
    return rule
  })
  return {
    headers,
    body: css.stringify(ast)
  }
}
