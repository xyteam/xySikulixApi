#!/usr/bin/env node

// prepare for safeQuote
const safeQuote = require('../lib/safequote');

// Oculix fat jar selection (env override for testing/alternate versions)
const OculixApiVer = safeQuote(process.env.OculixApiVer) || '4.0.0';

const oculixApiJar = `oculixapi-${OculixApiVer}-complete-lux.jar`;
const oculixApiLibPath = `${__dirname}/../lib`;
const oculixApiJarPath = `${oculixApiLibPath}/${oculixApiJar}`;

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// The Oculix fat jar (bundles OpenCV + Tesseract natives) is NOT published to Maven
// Central (only the thin jar is, which lacks the native deps). It is built from the
// Oculix source tree. This script obtains it by:
//   1. reuse an existing jar in lib/
//   2. copy from a pre-built jar path given via OCULIX_JAR=/path/to/jar
//   3. copy from a sibling Oculix checkout's build output (API/target/)
//   4. build it from the sibling Oculix checkout with maven (if mvn is available)
//   5. fail with a clear message
//
// Oculix source location can be overridden with OCULIX_SRC=/path/to/Oculix.

function ensureLib() {
  if (!fs.existsSync(oculixApiLibPath)) fs.mkdirSync(oculixApiLibPath, { recursive: true });
}

function jarUsable(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).size > 10000;
}

// locate the Oculix source tree (sibling of this repo by default)
function findOculixSrc() {
  const env = process.env.OCULIX_SRC;
  if (env) return env;
  const here = path.resolve(__dirname, '..');
  const candidates = [
    path.join(here, '..', 'Oculix'),
    path.join(here, '..', '..', 'Oculix'),
    path.join(here, '..', '..', 'oculix'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(path.join(c, 'API', 'pom.xml'))) return c;
  }
  return null;
}

function buildFromSource(src) {
  const apiDir = path.join(src, 'API');
  const outJar = path.join(apiDir, 'target', oculixApiJar);
  if (jarUsable(outJar)) return outJar;
  // maven may not be on PATH inside docker; if absent, fail with instructions
  let mvn = 'mvn';
  try { execSync('mvn -v', { stdio: 'ignore' }); } catch (e) { return null; }
  console.log(`[oculix] building Oculix fat jar from ${apiDir} ...`);
  execSync(`${mvn} -f "${apiDir}/pom.xml" -Pcomplete-lux-jar -DskipTests clean package`, {
    stdio: 'inherit'
  });
  return jarUsable(outJar) ? outJar : null;
}

(async () => {
  ensureLib();
  // 1. existing jar
  if (jarUsable(oculixApiJarPath)) {
    console.log(`[oculix] ${oculixApiJar} already present`);
    process.exit(0);
  }
  // 2. pre-built jar path
  if (process.env.OCULIX_JAR && jarUsable(process.env.OCULIX_JAR)) {
    fs.copyFileSync(process.env.OCULIX_JAR, oculixApiJarPath);
    console.log(`[oculix] installed ${oculixApiJar} from OCULIX_JAR`);
    process.exit(0);
  }
  // 3 & 4. from Oculix source (copy or build)
  const src = findOculixSrc();
  let obtained = null;
  if (src) {
    const builtJar = path.join(src, 'API', 'target', oculixApiJar);
    if (jarUsable(builtJar)) {
      obtained = builtJar;
    } else {
      obtained = buildFromSource(src);
    }
    if (obtained) {
      fs.copyFileSync(obtained, oculixApiJarPath);
      console.log(`[oculix] installed ${oculixApiJar}`);
      process.exit(0);
    }
  }
  // 5. fail clearly
  console.error(
    `[oculix] FATAL: could not obtain ${oculixApiJar}.\n` +
    `The Oculix fat jar is built from source (https://github.com/oculix-org/Oculix); it is\n` +
    `not on Maven Central. Clone Oculix beside this repo (or set OCULIX_SRC) and ensure\n` +
    `mvn is available, then re-run \`npm install\` (or \`npm run download\`).`
  );
  process.exit(1);
})();
