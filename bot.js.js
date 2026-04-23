const TelegramBot = require('node-telegram-bot-api');

// Твой токен (не забывай — если опубликовал токен, желательно потом его сменить!)
const token = '8671269055:AAFEXLLSLSI4DFQCNOyhvOfcoCApBOUU9vg';

const bot = new TelegramBot(token, { polling: true });

// Главное меню (основные команды)
const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'Параметры челена', callback_data: 'param_menu' }],
      [{ text: 'Настроение Лики', callback_data: 'lika_menu' }],
      [{ text: 'Анекдот', callback_data: 'joke' }]
    ]
  }
};

// Меню для "Параметры челена"
const paramMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'не в мега прайме 17', callback_data: 'not_mega' }],
      [{ text: 'Фото', callback_data: 'param_photo' }],
      [{ text: '⬅ Назад', callback_data: 'back_to_main' }]
    ]
  }
};

// Меню для "Настроение Лики"
const likaMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: 'грустное', callback_data: 'lika_sad' }],
      [{ text: 'веселое', callback_data: 'lika_happy' }],
      [{ text: '⬅ Назад', callback_data: 'back_to_main' }]
    ]
  }
};

// Хэндлер команды /start — всегда главное меню
bot.onText(/^\/start$/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Выбери команду:', mainMenu);
});

// Обработка нажатий на кнопки
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  // Главное меню
  if (query.data === 'back_to_main') {
    bot.editMessageText('Выбери команду:', {
      chat_id: chatId,
      message_id: messageId,
      ...mainMenu
    });
  }

  // Параметры челена
  if (query.data === 'param_menu') {
    bot.editMessageText('Параметры челена:', {
      chat_id: chatId,
      message_id: messageId,
      ...paramMenu
    });
  }
  if (query.data === 'not_mega') {
    bot.sendMessage(chatId, 'что еще хочешь узнать ?');
  }
  if (query.data === 'param_photo') {
    bot.sendPhoto(chatId, 'https://cdn.discordapp.com/attachments/468428480934182945/1496518686180114482/ba5065024ad7955a9821b5d33ab31215_8002d531-3ef8-4b7f-b3c4-bb87876acf96_500.png?ex=69ea2d22&is=69e8dba2&hm=eeb343523b293933eb5e75f65296a64f2b38232a9561e5a53287045248e765f6&');
  }

  // Настроение Лики
  if (query.data === 'lika_menu') {
    bot.editMessageText('Настроение Лики:', {
      chat_id: chatId,
      message_id: messageId,
      ...likaMenu
    });
  }
  if (query.data === 'lika_sad') {
    bot.sendPhoto(chatId, 'https://cdn.discordapp.com/attachments/468428480934182945/1496523191190032434/image.png?ex=69ea3154&is=69e8dfd4&hm=40335bbab2df40a0e93369f5f14bb1bb0be30ebb2e9d16861b0a7050a26004ea&');
  }
  if (query.data === 'lika_happy') {
    bot.sendPhoto(chatId, 'https://media.discordapp.net/attachments/468428480934182945/1496523694472822996/image.png?ex=69ea31cc&is=69e8e04c&hm=5ef300846c42cb2d5fd486325f34a53ec00f46c8c1c214479afd21206c0f068e&=&format=webp&quality=lossless&width=1665&height=718');
  }

  // Анекдот
  if (query.data === 'joke') {
    bot.sendMessage(chatId,
      `Студент на экзамене вытянул билет с вопросом про полимеры, но совершенно не может ничего рассказать.
Профессор ему говорит:
- Я вам, молодой человек, подскажу, и если вы ответите, поставлю тройку.
Студент согласился.
- Вот я вчера, когда шёл с работы, увидел вас в подъезде со своей дочкой. Скажите, чем вы там занимались?
Лицо студента проясняется, и он радостно восклицает:
- А, вспомнил! Ебанит!
Лицо профессора грустнеет, с разочарованием ставит тройку и произносит:
- А я думал, что только целлюлоза!)`);
  }

  // Убираем "часики"
  bot.answerCallbackQuery(query.id);
});