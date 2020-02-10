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
npm install
npm run download                       # which will download sikulixapi-2.0.1.jar
SikulixApiVer=2.0.2 npm run download   # which will download sikulixapi-2.0.2.jar
```

#### test out
```
google-chrome test_images/targetImage.png &
node scripts/findTargetImage.js --onArea=onScreen --sampleImagePath=`pwd`/test_images/sampleImage.png --maxSimilarityOrText='Seen'
```

#### development note
Base functions are available in command-line form.
API No modules have been exported yet. This will come soon.
