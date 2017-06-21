const fs = require('fs');
const path = require('path');
const globby = require('globby');
const readline = require('readline');

const teakFilePatterns = {
  'teak-ios': ["Teak/**/*.m"],
  'teak-android': ["src/**/*.java"]
};

const teakLogPattern = {
  'teak-ios': ["TeakLog_[ie]\\(@\\\"([A-Za-z0-9_\\.]+)\\\"(?:,\\s*)(.*)"],
  'teak-android': ["Teak\\.log\\.[ie]\\(\\\"([A-Za-z0-9_\\.]+)\\\"(?:,\\s*)(.*)"]
};

module.exports.main = () => {
  const repo = process.cwd().split(path.sep).pop();

  teakFiles = [];
  teakFilePatterns[repo].forEach((pattern) => {
    teakFiles = teakFiles.concat(globby.sync(pattern));
  });

  logMatchPatterns = teakLogPattern[repo];

  teakFiles.forEach((filename) => {
    const rl = readline.createInterface({
      input: fs.createReadStream(filename)
    });

    var lineNumber = 0;
    rl.on('line', (line) => {
      lineNumber++;
      logMatchPatterns.forEach((pattern) => {
        const match = line.match(pattern);
        if (match) {
          if (match.input.match(/;$/) == null) {
            throw "Multi-line log call! " + lineNumber + " - " + filename;
          }
          console.log(match[1]);
        }
      });
    });
  });
}