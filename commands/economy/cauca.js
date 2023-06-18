import fetch from 'node-fetch';

const config = {
  name: 'fishing',
  aliases: ["f"],
  description: '',
  usage: '',
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: 'WaifuCat',
  extra: {}
};

export async function onCall({ message, args, data }) {
  const { Users } = global.controllers;

  try {
    const targetID = message.senderID;
    let totalAmount = 0;
    let catchData = [];

    for (let i = 0; i < 3; i++) {
      const response = await fetch('https://waifucat.pythonanywhere.com/fish');
      const data = await response.json();

      const name = data.name;
      const coin = parseInt(data.coin);

      totalAmount += coin;

      catchData.push({
        name: `Cá ${name}`,
        coin: ` ${coin.toLocaleString()} coin`
      });
    }

    let replyMessage = `🎣  *Bạn đã câu được*  🎣\n`;
    for (let i = 0; i < catchData.length; i++) {
      replyMessage += `🐟  ${catchData[i].name}: ${catchData[i].coin}\n`;
    }

    replyMessage += `💰  Tổng tiền: ${totalAmount.toLocaleString()} coin  💰`;

    message.reply(replyMessage);
  } catch (error) {
    console.error(error);
    message.reply('Đã xảy ra lỗi trong quá trình câu cá!');
  }
}

export default {
  config,
  onCall,
};