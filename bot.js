const { exec } = require('child_process');
const TelegramBot = require('node-telegram-bot-api');

const token = '6237100701:AAFDTCeZw8wWGc6MQw1oBvea6Nk-zKrV3t4';
const chatId = '-1001549330679';

const bot = new TelegramBot(token, { polling: false });

const sendMessage = (message) => {
  bot.sendMessage(chatId, message);
};

exec('node logic.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }

  const lines = stdout.trim().split('\n');
  const message = lines.join('\n');

  sendMessage(message);
  console.log('Отправлено');
});
