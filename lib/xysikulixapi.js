"use strict"

// node-java general
const java = require('java');

// sikulixapi
const SikulixApiVer = process.env.SikulixApiVer || '2.0.4';
const sikuliApiJar = `sikulixapi-${SikulixApiVer}.jar`;
const sikuliApiLibPath = `${__dirname}/../lib`;
const sikuliApiJarPath = `${sikuliApiLibPath}/${sikuliApiJar}`
java.classpath.push(sikuliApiJarPath);

// import classes for export
const App = java.import('org.sikuli.script.App');
const Button = java.import('org.sikuli.script.Button');
const Mouse = java.import('org.sikuli.script.Mouse');
const OCR = java.import('org.sikuli.script.OCR');
const Pattern = java.import('org.sikuli.script.Pattern');
const Region = java.import('org.sikuli.script.Region');
const Settings = java.import('org.sikuli.basics.Settings');
const Screen = java.import('org.sikuli.script.Screen');

// export classes
module.exports = {App, Button, Mouse, OCR, Pattern, Region, Settings, Screen}
