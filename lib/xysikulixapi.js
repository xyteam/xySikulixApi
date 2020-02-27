"use strict"

const java = require('java');
java.options.push('-Xmx1024m');

const SikulixApiVer = process.env.SikulixApiVer || '2.0.1';
const sikuliApiJar = `sikulixapi-${SikulixApiVer}.jar`;
const sikuliApiLibPath = `${__dirname}/../lib`;
const sikuliApiJarPath = `${sikuliApiLibPath}/${sikuliApiJar}`
java.classpath.push(sikuliApiJarPath);
const sikulixapi = java.import('org.sikuli.script');

module.exports = sikulixapi;
