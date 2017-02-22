const R = require('ramda')


// validators
const intDecoder = R.curry((key, data) => {
  if(typeof R.prop(key, data) === 'number')
    return true
  else
    throw(`${key} is not a Number.`)
})
const stringDecoder = R.curry((key, data) => {
  if(typeof R.prop(key, data) === 'string')
    return true
  else
    throw(`${key} is not a String.`)
})
const customDecoder = R.curry((fn, data) => fn(data))
// transform
const flatten = R.curry((key, t, data) =>
  data instanceof Array
  ? R.map(R.over(R.lensProp(key), t))(data)
  : R.over(R.lensProp(key), t, data))
const filter = R.curry((t, data) =>
  data instanceof Array
  ? R.filter(t, data)
  : t(data) ? data : null)
// Resolver
const Resolver = R.curry((v, t, data) => {
  const applyValidators = (acc, d) =>
    data instanceof Array
    ? data.reduce((a, x) => acc && (a && d(x)), true)
    : acc && d(data)
  const applyTransform = d => R.reduce((acc, x) => x(acc), d, t)

  return new Promise((resolve, reject) => {
    (R.reduce(applyValidators, true, v))
    ? resolve(applyTransform(data))
    : reject("Error")
  })
})

module.exports =
  { customDecoder
  , intDecoder
  , stringDecoder
  , flatten
  , filter
  , Resolver }
