let css = require('css')
/**
 * arc-proxy-plugin-urls
 *
 * prepends mjs import declarations with /staging or /production
 *
 * // input
 * import foo from '/bar'
 *
 * // output
 * import foo from '/staging/bar'
 *
 * @param Key - the requested S3 Key
 * @param File - the file contents {headers, body}
 * @returns File - the processed file contents {header, body}
 */
module.exports = function mjs(Key, {headers, body}) {
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
