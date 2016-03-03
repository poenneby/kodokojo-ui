# Kodo Kojo UI

This is the UI for Kodo Kojo project
// TODO

## License

`kodokojo-ui` is a licensed under [GNU General Public License v3](http://www.gnu.org/licenses/gpl-3.0.en.html).

## Contribute

Please, read following [Contribution page](CONTRIBUTE.md)

## Prerequiste

### Development   
NodeJS (see package.json file for version)


### Production   
Docker 1.8 or newer

Working build of [kodokojo](https://github.com/kodokojo/kodokojo) project 

## Installation & build

### Development

    npm install
    npm run start:dev
    
Install npm packages, build development files into static/, start webpack dev server on localhost:3000

    open http://localhost:3000

### Local "production"

    npm install
    npm run start:prod
    
Install npm packages, build production files into static/, start webpack dev server on localhost:3000

    open http://localhost:8080
  

### Production

    ./build.sh
    
Build production version of the project, put static/ content into /delivery/kodokojo-ui-<version>.tar.gz


Thanks to all Open source project which made possible to done such project!