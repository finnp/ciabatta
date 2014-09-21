#!/usr/bin/env node
var programs = ['travisjs', 'appveyor']
var spawn = require('child_process').spawn
var concat = require('concat-stream')

var argv = require('minimist')(process.argv.slice(2))

var command = argv._[0]

if(command === 'badge' || command === 'badges') {

  console.log(programs.join(' | '))
  console.log(programs.map(function () { return '----'}).join(' | '))
  
  var table = {}
  var todo = programs.length
  
  programs.forEach(function (program) {
    var child = spawn(program, ['badge'])
    child.stdout.pipe(concat(function (badge) {
      table[program] = badge.toString().trim()
      todo--
      if(todo === 0) {
        console.log(programs.map(function (program) {
          return table[program]
        }).join(' | '))
      }
    }))
  })
} else {
  console.error('Usage: ciabatta [command]')
}
