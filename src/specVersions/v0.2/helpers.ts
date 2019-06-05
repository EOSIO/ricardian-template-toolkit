export const ifHasValue = function(this: any, val: any, options: Handlebars.HelperOptions) {
  const defined = (typeof val !== 'undefined') && (val !== null)
  if (defined) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
