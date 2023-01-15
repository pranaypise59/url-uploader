const TelegramBot = require('node-telegram-bot-api');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');

const token = '5736226252:AAGnZJoAZF_sU6wvBDhC-oGxthNwa7zj-Ao';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText.startsWith('/getaudio')) {
        const url = messageText.split(" ")[1];
        bot.sendAudio(chatId, url);
    }
    if (messageText.startsWith('/getvideo')) {
        const url = messageText.split(" ")[1];
        bot.sendVideo(chatId, url);
    }
    if (messageText.startsWith('/getimage')) {
        const url = messageText.split(" ")[1];
        bot.sendPhoto(chatId, url);
    }
    if (messageText.startsWith('/getm3u8')) {
        const url = messageText.split(" ")[1];
        const filepath = 'path/to/save/file.mp4';
        const command = `${ffmpeg.path} -i ${url} -c:v libx264 -c:a aac -strict experimental -b:a 192k -vf scale=-1:720 -y ${filepath}`;
        exec(command, (error) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            bot.sendVideo(chatId, filepath);
        });
    }
});
