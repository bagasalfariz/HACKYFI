// bot.js
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const bot = new TelegramBot(process.env.TELEGRAM_API_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome to HackyFI! Use /register to start.");
});

bot.onText(/\/register/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username;
  try {
    const response = await axios.post("http://localhost:5000/users/register", {
      telegramId: chatId.toString(),
      username,
    });
    bot.sendMessage(chatId, "Registration successful!");
  } catch (error) {
    bot.sendMessage(chatId, "Registration failed.");
  }
});

bot.onText(/\/mission_complete/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await axios.post("http://localhost:5000/missions/complete", {
      userId: chatId.toString(),
      missionId: "mission_id", // Replace with actual mission ID
    });
    bot.sendMessage(chatId, `Mission completed! You have earned ${response.data.coins} coins.`);
  } catch (error) {
    bot.sendMessage(chatId, "Mission completion failed.");
  }
});
