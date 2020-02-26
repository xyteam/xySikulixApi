## xySikulixApi: Sikulix API for Linux and Node JS

#### Disclaimer
* All rights of Sikulix and its API belong to the original product providers. Pleaes visit http://sikulix.com/ for more details.
* Codes in project will trigger the downloads of certain Sikulix JAR files through Sikulix provided links.
* You need to agree to the original license agreements with the original product providers directly. This project does not assume any 3rd party licensing responsibility.

#### Project Summary
This project is licensed under the terms of the MIT license.

This project contains node js code that can make Sikulx API functionality available in Node JS coding environment as well as in Linux system commands.

#### Installation Notes
```
npm install                            # which will download sikulixapi-2.0.1.jar
SikulixApiVer=2.0.2 npm install        # which will download sikulixapi-2.0.2.jar
```

#### test out
```
google-chrome test_images/targetImage.png &
npm test

or
npm run test-positive
npm run test-negative
```

#### development note
```
#!/usr/bin/env node
// above: since JVM is a heavy process it is advised to run a separate node process for it.

const java = require('java');
const xysikulixapi = require('xysikulixapi');

// Sikuli Property
const App = xysikulixapi.App;
const Region = xysikulixapi.Region;
const Screen = xysikulixapi.Screen;
const Pattern = xysikulixapi.Pattern;

// Prepare
var mySampleImagePath = '/full/Path/To/ImageFile';         // define a sample image
var mySimilarity = 0.95;                                   // define similarity as 95%
var myScreen = new Screen();                               // get screen 0 (default as 0)
var myScreenRegion = new Region(myScreen.getBoundsSync()); // define a new region from myScreen
var myPattern = (new Pattern(mySampleImagePath)).similarSync(java.newFloat(mySimilarity)); // define a Pattern that is 95% similar to the sample image

// Actions
const oneTarget = myScreenRegion.findSync(myPattern);      // find one target
oneTarget.highlight(0.1);                                  // flash a highlight on the target
let targetText oneTarget.textSync();                       // retrive text from target
console.log(targetText);                                   // print retrived text

const allTargets = myScreenRegion.findAllSync(myPattern);  // find all targets 
while (allTargets.hasnextSync()) {                         // loop through all targets
   let oneTarget = allTargets.nextSync();                  // process each target
   ...
}
...
```

#### example
Here is [a working example](./bin/findTargetImages.js)
