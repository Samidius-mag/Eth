const { spawn } = require('child_process');

const loadPrice = () => {
  const child = spawn('node', ['loadprice.js']);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

const sendToBot = () => {
  const child = spawn('node', ['bot.js']);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

const sendToBot2 = () => {
  const child = spawn('node', ['bot2.js']);

  child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

setInterval(loadPrice, 5000);
setInterval(sendToBot, 50000);
setInterval(sendToBot2, 300000);
