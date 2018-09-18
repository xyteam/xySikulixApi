#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

const java = require('java');
const sikuliApiJar = argv.sikulixApiJar || 'sikulixapi-1.1.4.jar';
const imagePath = argv.imagePath;
const imageSimilarity = argv.imageSimilarity || 0.8;
const imageFindAll = argv.imageFindAll || false;

try {
  java.classpath.push(sikuliApiJar);
  const Screen = java.import('org.sikuli.script.Screen');
  const Pattern = java.import('org.sikuli.script.Pattern');
  var sc = new Screen();
  var sim = java.newFloat(imageSimilarity);
  var pat = new Pattern(imagePath);

  if (imageFindAll) {
    var loc = sc.findAllSync(pat.similarSync(sim));
    while (loc.hasNextSync()) {
      console.log(loc.nextSync()); 
    }
  } else {
    var loc = sc.findSync(pat.similarSync(sim));
    console.log(loc);
  }    
} catch(e) {
  console.log(e);
}