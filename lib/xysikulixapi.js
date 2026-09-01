"use strict"

// Oculix bridge (replaces node-java). Oculix preserves the org.sikuli.script.*
// namespace, so the import surface is unchanged. Uses java-bridge (Rust/napi,
// prebuilt) instead of node-java (JNI, broken on Node >=20).
const { classpath, importClass, ensureJvm } = require('java-bridge');

// prepare for safeQuote
const safeQuote = require('../lib/safequote');

// safe quote any external input
// OculixApiVer selects the Oculix fat jar; env override for testing/alternate versions
const OculixApiVer = safeQuote(process.env.OculixApiVer) || '4.0.0';

const oculixApiJar = `oculixapi-${OculixApiVer}-complete-lux.jar`;
const oculixApiLibPath = `${__dirname}/../lib`;
const oculixApiJarPath = `${oculixApiLibPath}/${oculixApiJar}`;

// ensure the JVM is created with heap options and the Oculix jar on the classpath
ensureJvm({
  opts: ['-Xms128m', '-Xmx512m'],
  classpath: [oculixApiJarPath]
});

// import classes for export (identical org.sikuli.script.* namespace in Oculix)
const App = importClass('org.sikuli.script.App');
const Button = importClass('org.sikuli.script.Button');
const Image = importClass('org.sikuli.script.Image');
const ImagePath = importClass('org.sikuli.script.ImagePath');
const Mouse = importClass('org.sikuli.script.Mouse');
const OCR = importClass('org.sikuli.script.OCR');
const Pattern = importClass('org.sikuli.script.Pattern');
const Region = importClass('org.sikuli.script.Region');
const Settings = importClass('org.sikuli.basics.Settings');
const Screen = importClass('org.sikuli.script.Screen');

// export classes
 module.exports = {App, Button, Image, ImagePath, Mouse, OCR, Pattern, Region, Settings, Screen}
