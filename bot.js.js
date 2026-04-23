const TelegramBot = require('node-telegram-bot-api');

// Введите сюда свой токен!
const token = '8671269055:AAH5G75YJbR4a5aZxfIkYcoRwdRgAThEYxAnode';

const bot = new TelegramBot(token, { polling: true });

// Команда старт
bot.onText(/^\/start$/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Привет! Я твой Telegram-бот.\n\nДоступные команды:\n/tarif — показать тарифы\n/youtube — получить ссылку на YouTube `
  );
});

// Команда тариф (латиница и кириллица)
bot.onText(/^\/tarif$|^тариф$/i, (msg) => {
  bot.sendMessage(msg.chat.id, `Вот доступные тарифы:\n1) 100\n2) 200\n3) 300`);
});

// Команда youtube (латиница и кириллица)
bot.onText(/^\/youtube$|^ютуб$/i, (msg) => {
  bot.sendMessage(msg.chat.id, `Вот нужная ссылка:\nhttps://www.youtube.com/watch?v=ksvMrgdd8ec`);
});