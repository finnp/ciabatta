#!/usr/bin/env node
var programs = [
  {'cmd': 'travisjs', 'title': 'Mac/Linux'},
  {'cmd': 'appveyor', 'title': 'Windows'}
]

var spawn = require('child_process').spawn
var concat = require('concat-stream')

var argv = require('minimist')(process.argv.slice(2))

var command = argv._[0]

if(command === 'badge' || command === 'badges') {

  console.log(programs.map(function (p) {
    return p.title
  }).join(' | '))
  
  console.log(programs.map(function (p) { 
    return Array(p.title.length + 1).join('-')}
  ).join(' | '))
  
  var todo = programs.length
  
  var table = {}
  
  programs.forEach(function(program) {
    var child = spawn(program.cmd, ['badge'])
    child.stdout.pipe(concat(function (badge) {
      table[program.cmd] = badge.toString().trim()
      todo--
      if(todo === 0) {
        console.log(programs.map(function (program) {
          return table[program.cmd]
        }).join(' | '))
      }
    }))  
  })
} else if(command === 'init') {
  programs.forEach(function (program) {
    var child = spawn(program.cmd, ['init'])
    child.stdout.pipe(process.stdout)
  })
} else {
  console.error('Usage: ciabatta [command]')
}
