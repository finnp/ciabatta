# ciabatta

A tool for initialising CI tools for your (Open Source / GitHub) project.

Install it with `npm install ciabatta -g`.

After you installed ciabatta, add the tools you want to use. The tools you are adding
have to be installed globally. It works with the [travisjs](https://www.npmjs.org/package/travisjs)
and [appveyor](https://www.npmjs.org/package/appveyor) module. Tools that work the 
same, can be easily added if they conform the following API.

```
<cmdname> init // adds hooks and CI config files to the current folder
<cmdname> badge // outputs a markdown formatted badge
```

If you have `travisjs` and `appveyor` installed, you can add them like this:
```
ciabatta add travisjs --title "Mac/Linux"
ciabatta add appveyor --title Windows
```

## ciabatta badge

When using `travisjs` and `appveyor` like above it would outputs someting like:

```md
Mac/Linux | Windows
---- | ----
[![Build Status](https://travis-ci.org/finnp/ciabatta.svg?branch=master)](https://travis-ci.org/finnp/ciabatta) | [![Windows Build status](http://img.shields.io/appveyor/ci/finnp/ciabatta.svg)](https://ci.appveyor.com/project/finnp/ciabatta/branch/master)
```

## ciabatta init

Creates necessary files and hooks for the used tools. Runs each tool with
`<cmdname> init`.

## Configuration and Tools

### ciabatta add <cmdname> [--title title-for-badge-table]

Adds a new tool to the list.

The command has to conform with the API specified above.

### ciabatta rm <cmdname>

Removes a tools from the list

### ciabatta tools

Shows a list of the currently used tools in new line JSON format.

### ciabatta config

Shows the location of the config file.
