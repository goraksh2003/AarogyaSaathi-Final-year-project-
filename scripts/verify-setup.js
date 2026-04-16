const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

function check(label, value) {
  const ok = Boolean(value);
  const status = ok ? 'OK' : 'MISSING';
  console.log(`${status} - ${label}${ok ? `: ${value}` : ''}`);
  return ok;
}

function run(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch {
    return '';
  }
}

function findAdb() {
  const androidHome = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
  const candidates = [];

  if (androidHome) {
    candidates.push(path.join(androidHome, 'platform-tools', 'adb.exe'));
  }

  const localSdk = path.join(process.env.LOCALAPPDATA || '', 'Android', 'Sdk', 'platform-tools', 'adb.exe');
  candidates.push(localSdk);

  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return '';
}

console.log('React Native setup check');
console.log('------------------------');

const nodeVersion = process.version;
const npmVersion = run('npm -v');
const javaVersion = run('java -version 2>&1');
const adbPath = findAdb();
const androidHome = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT || '';
const jdkHome = process.env.JAVA_HOME || '';

check('Node.js', nodeVersion);
check('npm', npmVersion);
check('JAVA_HOME', jdkHome);
check('Android SDK env', androidHome);
check('adb', adbPath || 'not found');

console.log('');
console.log('Java version output:');
console.log(javaVersion || 'java not available on PATH');
console.log('');
console.log('Quick next steps:');
console.log('1. Install Android SDK platform-tools and an emulator from Android Studio.');
console.log('2. Set ANDROID_HOME to your Android SDK path.');
console.log('3. Add platform-tools and emulator folders to PATH.');
console.log('4. Run: npm start');
console.log('5. Run: npm run android');
