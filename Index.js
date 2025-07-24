const express = require('express');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = process.env.PORT || 3000;

const SERVER_IP = process.env.SERVER_IP;
const SERVER_PORT = process.env.SERVER_PORT;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

app.get('/', (req, res) => {
  res.send('Bot is running...');
});

setInterval(async () => {
  try {
    await axios.get(`http://${SERVER_IP}:${SERVER_PORT}`);
    console.log('Ping successful');
  } catch (err) {
    console.log('Ping failed');
    bot.sendMessage(CHAT_ID, `⚠️ Falix server is offline or not responding.`);
  }
}, 5 * 60 * 1000); // ping every 5 mins

app.listen(port, () => {
  console.log(`App is live on port ${port}`);
});
              
