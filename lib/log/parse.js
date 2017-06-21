const readline = require('readline');
const chalk = require('chalk');

module.exports.main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  var teakState = {};
  var multiString = "";
  var multiMax = 0;
  var multiIdx = 0;

  rl.on('line', (line) => {
    const teakMultiMatch = /TeakMulti\[(\d+)-(\d+)\](?:\s*): (.*)/;
    const multiMatch = teakMultiMatch.exec(line);
    if (multiMatch) {
      multiIdx = multiMatch[1];
      multiMax = multiMatch[2];
      multiString = multiString + multiMatch[3];

      if (multiIdx == multiMax) {
        line = multiString;
        multiString = "";
      } else {
        return;
      }
    }

    const teakMatch = /Teak(?:\s*): (.*)/;
    const match = teakMatch.exec(line);
    if (match) {
      const logEvent = JSON.parse(match[1].replace(/\\134/g,'\\'));
      if (logEvent) {
        if (logEvent.event_type === 'session.state') {
          teakState.session = teakState.session || {};
          teakState.session.state = logEvent.event_data.state;
          teakState.session.old_state = logEvent.event_data.old_state;
        } else if (logEvent.event_type === 'teak.state') {
          teakState.sdk = teakState.sdk || {};
          teakState.sdk.state = logEvent.event_data.state;
          teakState.sdk.old_state = logEvent.event_data.old_state;
        } else if (logEvent.event_type === 'session.attribution') {
          teakState.session = teakState.session || {};
          teakState.session.attribution = logEvent.event_data;
        }
      }
    }
  });

  rl.on('close', () => {
    console.log(JSON.stringify(teakState));
  });
}
