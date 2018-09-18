## xySikulixApi: Sikulix API for Linux and Node JS

#### Disclaimer
* All rights of Sikulix and its API belong to the original product providers. Pleaes visit http://sikulix.com/ for more details.
* Codes in project will trigger the downloads of certain Sikulix JAR files through Sikulix provided links.
* You need to agree to the original license agreements with the original product providers directly. This project does not assume any 3rd party licensing responsibility.

#### Project Summary
This project is licensed under the terms of the MIT license.

This project contains node js code that can make Sikulx API functionality available in Node JS coding environment as well as in Linux system commands.

#### Installation Notes
Ubuntu 18.04 and on can use sikulixapi-1.1.4.jar. Older Ubuntu releases can only use sikulixapi-1.1.3.jar.
###### xyPlatform lubuntu VMs:
```
$ npm install
```
###### For lubuntu1804 (ubuntu 18.04):
```
$ ./downloadLatestSikulixApiJar.js --sikulixApiJar=sikulixapi-1.1.4.jar --sikulixUrl=https://raiman.github.io/SikuliX1/sikulixapi.jar
```
###### For lubuntu1604 (ubuntu 16.04):
You need to manually acquire sikulixapi-1.1.3.jar and copy to the current directory.
```
$ cd ~/Downloads
$ wget https://launchpad.net/sikuli/sikulix/1.1.3/+download/sikulixsetup-1.1.3.jar
$ java -jar sikulixsetup-1.1.3.jar
```
Follow UI instructions to download Silulix API
copy sikulixapi-1.1.3.jar to the xySikulixApi directory (this project)

#### Running Notes
```
$ ./findImage.js --sikulixApiJar=sikulixapi-1.1.4.jar --imagePath=testImages/gLogo.png --imageSimilarity=0.8
Picked up _JAVA_OPTIONS: -Xms512m -Xmx512m -Dcom.sun.net.ssl.checkRevocation=false
nodeJava_org_sikuli_script_Match { h: 96, w: 281, y: 825, x: 616 }

$ ./findImage.js --sikulixApiJar=sikulixapi-1.1.4.jar --imagePath=testImages/gLogo.png --imageSimilarity=0.8 --imageFindAll
Picked up _JAVA_OPTIONS: -Xms512m -Xmx512m -Dcom.sun.net.ssl.checkRevocation=false
nodeJava_org_sikuli_script_Match { h: 96, w: 281, y: 825, x: 616 }
nodeJava_org_sikuli_script_Match { h: 96, w: 281, y: 305, x: 361 }
nodeJava_org_sikuli_script_Match { h: 96, w: 281, y: 426, x: 1324 }

```