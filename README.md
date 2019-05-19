![logo](https://user-images.githubusercontent.com/816965/38487336-1d193960-3c23-11e8-8da6-9575b0eac3e9.png)

# React Native JavaScript Terminal

This is a React Native wrapper around [rohanchandra]()'s extensible `javascript-terminal` emulator. The goal of this library is to provide a consistent and easily-portable React Native interface to `javascript-terminal`.

An open-source JavaScript terminal emulator library, that works in your browser and Node.js.

[Demo](https://rohanchandra.gitlab.io/javascript-terminal/demo/)

## Features
* In-memory file system, backed by Immutable.js
* Selected *NIX commands emulated (such as `ls`, `cd`, `head`, `cat`, `echo`, `rm`)
* Command parsing
* Support for environment variables
* Autocompletion of terminal commands

For more information, please check out the original [repo](https://github.com/rohanchandra/javascript-terminal). Whilst you're there, you should follow [@rohanchandra](https://github.com/rohanchandra).

## Installation
Install with `npm` or with `yarn`.

```shell
npm install react-native-terminal-component --save
```

```shell
yarn add react-native-terminal-component
```

## Usage

```javascript
import React from 'react';
import Terminal from 'react-native-terminal-component';

export default class App extends React.Component {
  render() {
    return (
      <Terminal
        style={{
          flex: 1,
        }}
      />
    );
  }
}
```

### Examples
This library does not prescribe a method for displaying terminal output or the user interface, so I've provided examples in Node.js, pure JavaScript/HTML/CSS and with React/JavaScript/HTML/CSS:

1. View the `/demo-cli` directory for an example of usage in Node.js
2. View the `/demo-web` directory for an example of usage in plain HTML and JavaScript
3. Visit the [React Terminal Component website](https://github.com/rohanchandra/react-terminal-component) for usage with HTML, CSS, JavaScript and React
4. View the `/demo-rn` directory for an example of usage in React Native.

## Building

### Set-up

First, make sure you have  [Node.js](https://nodejs.org/en/download/), [Yarn](https://yarnpkg.com/en/docs/install) and [Git](https://git-scm.com/downloads) installed.

Now, fork and clone repo and install the dependencies.

```shell
git clone https://github.com/rohanchandra/javascript-terminal.git
cd javascript-terminal/
yarn install
```

### Scripts

#### Build scripts
* `yarn build`  - creates a development and production build of the library in `lib`
* `yarn build-rn` - generates the react-native wrapper interface stored in `demo-rn/terminal.min.js` for the component (this must be re-ran for each modification made to `react-native.wrapper.js`)

#### Test scripts
* `yarn test` - run tests
* `yarn test:min` - run tests with summary reports
* `yarn test:coverage` - shows test coverage stats
* `yarn artifact:coverage-report` - creates [HTML test coverage report](https://rohanchandra.gitlab.io/javascript-terminal/coverage/)  in `.nyc_output`

#### Demo scripts
* `yarn cli` - demo of using the emulator library in a Node.js command-line interface (this requires you have built the library with `yarn build`)

## License

Copyright 2018 Rohan Chandra

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
