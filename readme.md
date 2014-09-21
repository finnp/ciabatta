# ciabatta

A tool for initialising CI tools for your (Open Source / GitHub) project.

Install it with `npm install ciabatta -g`.

Right now it depends on global installations of [travisjs](https://www.npmjs.org/package/travisjs)
and [appveyor](https://www.npmjs.org/package/appveyor). This is because I would like
to make it easily extensible in the future with custom tools.

```
ciabatta add travisjs --title "Mac/Linux" --color red
ciabatta add appveyor --title Windows --color blue
```

## ciabatta badge

Outputs a table of badges like this
```md
travisjs | appveyor
---- | ----
[![Build Status](https://travis-ci.org/finnp/ciabatta.svg?branch=master)](https://travis-ci.org/finnp/ciabatta) | [![Windows Build status](http://img.shields.io/appveyor/ci/finnp/ciabatta.svg)](https://ci.appveyor.com/project/finnp/ciabatta/branch/master)
```

## ciabatta init

Creates necessary files and hooks for `appveyor` and `travisjs`.
