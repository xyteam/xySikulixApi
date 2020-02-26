"use strict"

const java = require('java');
java.options.push('-Xmx1024m');

const SikulixApiVer = process.env.SikulixApiVer || '2.0.1';
const sikuliApiJar = `sikulixapi-${SikulixApiVer}.jar`;
const sikuliApiLibPath = `${__dirname}/../lib`;
const sikuliApiJarPath = `${sikuliApiLibPath}/${sikuliApiJar}`
java.classpath.push(sikuliApiJarPath);
const App = java.import('org.sikuli.script.App');
const Region = java.import('org.sikuli.script.Region');
const Screen = java.import('org.sikuli.script.Screen');
const Pattern = java.import('org.sikuli.script.Pattern');

module.exports = {App, Region, Screen, Pattern}
