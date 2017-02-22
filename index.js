const R = require('ramda')
const { Resolver
      , flatten
      , filter
      , customDecoder
      , intDecoder
      , stringDecoder } = require('./lib')

const validators =
  [ intDecoder('id'), stringDecoder('name')
  , customDecoder(data => data.email.includes('@')) ]
const transformaters =
  [ flatten('address', x => x.city)
  , flatten('company', x => x.name) ]

fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json())
.then(R.tap(console.log))
.then(data => Resolver(validators, transformaters, data))
.then(R.tap(console.log))
.catch(R.tap(console.log))


