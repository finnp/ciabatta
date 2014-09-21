#!/usr/bin/env node
var programs = [
  {'cmd': 'travisjs', 'title': 'Mac/Linux', color: 'blue'},
  {'cmd': 'appveyor', 'title': 'Windows', color: 'red'}
]

var spawn = require('child_process').spawn
var concat = require('concat-stream')
var split = require('split')
var chalk = require('chalk')

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
    child.stdout
      .pipe(split())
      .on('data', function (line) {
        line = line.trim()
        if(line.length > 0)
          console.log(paint(program), line)
      })
  })
} else {
  console.error('Usage: ciabatta [command]')
}

function paint(program) {
  var sig = '[' + program.cmd + ']'
  if('color' in program && program.color in chalk) {
    sig = chalk[program.color](sig)
  }
  return sig
}
