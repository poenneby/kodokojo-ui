
# Kodo Kojo UI

This is the UI for Kodo Kojo project 

[![Join the chat at https://gitter.im/kodokojo/kodokojo](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000)](https://gitter.im/kodokojo/kodokojo) 

[![Open Source Love](https://badges.frapsoft.com/os/v2/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badge/) 
[![](https://img.shields.io/badge/license-GPLv3-blue.svg?style=flat)](http://www.gnu.org/licenses/gpl-3.0.en.html)     

[![](https://img.shields.io/badge/version-0.1.0-orange.svg?style=flat&maxAge=2592000)](https://github.com/kodokojo/kodokojo-ui#kodo-kojo-ui) 
[![node](https://img.shields.io/badge/node-5.x.x-yellow.svg?style=flat&maxAge=2592000)](https://github.com/kodokojo/kodokojo-ui#kodo-kojo-ui) 
[![npm](https://img.shields.io/badge/npm-3.x.x-blue.svg?style=flat&maxAge=2592000)](https://github.com/kodokojo/kodokojo-ui#kodo-kojo-ui)  

[![Dependency Status](https://dependencyci.com/github/kodokojo/kodokojo-ui/badge)](https://dependencyci.com/github/kodokojo/kodokojo-ui)


## License

`kodokojo-ui` is a licensed under [GNU General Public License v3](http://www.gnu.org/licenses/gpl-3.0.en.html).

## Contribute

Please, read following [Contribution page](CONTRIBUTING.md).

## Prerequisite

- NodeJS (see package.json file for version).
- Consider using nvm to switch node version in development easily.
- Docker 1.8 or newer.
- A working build of [kodokojo](https://github.com/kodokojo/kodokojo) project.

## Browser support

The UI is tested on Firefox and Chrome  

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome |
| --------- | --------- |
| last version| last version
<sub><sub>thanks to @godban for the badge generator</sup></sub>

## Installation & build

### Development

You have to set two environment variables.
If you are running Kodo Kojo backend in **local mode**, set variables as follow:

    NODE_ENV=development
    BABEL_ENV=development
    
If you are running Kodo Kojo backend that reroute to **AWS cluster**, set variables as follow:  

    NODE_ENV=development
    BABEL_ENV=production

You can use `API_ENV` to use an external Kodo Kojo backend api dns.

    API_ENV=kodokojo.mydomaine.com

First install npm packages, build development files into static/, start webpack dev server on localhost:3000.

    $ npm install
    $ eval $(docker-machine env default) // mount docker env variables
    $ npm run start:dev
    
Then open ui project in browser.

    $ open http://localhost:3000


In any case, you will need to run Kodo Kojo backend to be able to test and develop locally, please [refers to proper documentation](https://github.com/kodokojo/kodokojo/blob/master/README.md) for explanation details.

### Local "production"

*If you want to test production build*

Set environment variables to:  

    NODE_ENV=development
    BABEL_ENV=production

Install npm packages, build production files into static/, start webpack dev server on localhost:3000.

    $ npm install
    $ npm run start:prod
    
Then open ui project in browser.

    $ open http://localhost:3000


### Build production release

Build production docker image of the front release.    
Note: works on OSX and Linux. For Windows users you have to run the build.sh script manually.

    $ npm run build:docker
    
It build the project, then put static/ content into /delivery/target/kodokojo-ui-\<version>.tar.gz and finally build the docker image with Nginx server (kodokojo/kodokojo-ui).
    
    
### Run styleguide

Build and run styleguide.

    $ npm run styleguide
    
Then open your browser.

    $ open http://localhost:9001
    

### Add license in source files headers

    $ npm run license


### Tests

Run tests.

    $ npm test
    
Run tests in watch mode.

    $ npm run test:watch
    
Run coverage.

    $ npm run coverage
    $ open ./coverage/lcov-report/index.html 



:heart: Thanks to all Open source projects which made such project possible!
