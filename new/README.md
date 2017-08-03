# Angular 2 Starter

FOLDER STRUCTURE
----------------
```bash
  /
  ├── config                  : (directory for gulp/karma configuration)
  ├── e2e                     : end to end test folder (work in Progress)
  └── src                     : source code
    ├── app                         : main application
    |   └── component                     : application component folder
    |   |   └── *actual component*             : component logics, modules, router
    |   |   └── *actual component*             : component logics, modules, router
    |   └── framework                     : framework source code
    |   └── page                          : page/container folder
    |   └── shared                        : shared component folder
    ├── assets                      : assets folder
    |   └── fonts                         : contains web font files
    |   └── images                        : contains image files
    |   └── styles                        : contains default SASS/CSS files
    |   └── mock                          : mock data folder
    └── test                        : test script (work in progress)
```

## Prerequisites
You need to have [Node.js and npm](https://nodejs.org/en/)
- Support Node v6.9.1 - latest
- Support npm v3.10.8 - latest
- Support [Yarn](https://yarnpkg.com/)

Go to the starter directory and install the packages ([Yarn](https://github.com/yarnpkg/yarn) is recommended):
```bash
npm install
```

Then copy `.env.example` and rename it as `.env`. 

## Start
Let's start up, run following:
```bash
// Build DLL first, run this once after adding new package
npm run build:dll

// Start the app
npm start
```

and done! Open a browser and go to http://localhost:8080 and you can start developing Angular!
Every changes to the file will refresh the browser automatically
and it'll also compile your changed TypeScripts files to Javascript files.

> If any error occured when starting, please retry `npm run build:dll`.
That means DLL build is too old and need to be refreshed.

## Testing
This starter comes with testing workflow

### Unit testing
Just run
```bash
npm test
```
and it'll compile all TypeScript files, start Karma, then remap Istanbul coverage so that it shows TypeScript coverage, not the transpiled JavaScript coverage.

![Coverage result](http://s33.postimg.org/w7m9ckdkf/Screen_Shot_2016_06_04_at_8_15_53_AM.png)

### E2E testing
Firstly start the server:
```bash
npm start
```
To begin testing, run:
```bash
npm run e2e
```

## Production

You can create production build by running:
```bash
npm run build
```
or you can create production build and then serve it using Lite Server by running:
```bash
npm run serve-build
```
