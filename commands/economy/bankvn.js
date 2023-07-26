import axios from 'axios';

const config = {
  name: 'bank',
  aliases: ["bk","b"],
  description: '💰 Bank xuyên lục địa 💰',
  usage: '<Dùng lệnh để hiện menu>',
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: 'WaifuCat',
  extra: {}
};

async function onCall({ message, args }) {
  const targetID = message.senderID;
  const { Users } = global.controllers;

  if (args.length === 0) {
    const response = await axios.get('https://test.catwaifu.repl.co/member');
    const count = response.data;

    message.reply(
      'Menu sử dụng lệnh:\n' +
      '1. Đăng ký tài khoản: `register <tên>`\n' +
      '2. Rút tiền: `withdraw <số tiền>`\n' +
      '3. Nạp tiền: `deposit <số tiền>`\n' +
      '4. Đổi tên: `rename <tên mới>`\n' +
      `💼 Số người dùng: ${count}`
    );
    return;
  }

  if (args[0] === 'register') {
    const name = args[1];

    const response = await axios.get(`https://test.catwaifu.repl.co/register?id=${targetID}&name=${name}`);
    const data = response.data;

    if (data === 'Success') {
      message.reply("💪 Đăng ký tài khoản thành công");
    } else if (data === 'Fail') {
      message.reply("‼️ Bạn đã có tài khoản");
    } else {
      message.reply("❌ Đăng ký tài khoản thất bại");
    }
  } else if (args[0] === 'withdraw') {
    const coin = args[1];

    const response = await axios.get(`https://test.catwaifu.repl.co/withdraw?id=${targetID}&coin=${coin}`);
    const data = response.data;

    if (data === 'Success') {
      await Users.increaseMoney(targetID, coin);
      message.reply("💸 Rút tiền thành công");
    } else if (data === 'Fail') {
      message.reply("‼️ Không đủ tiền để rút");
    } else if (data === 'Error') {
      message.reply("❌ Bạn chưa có tài khoản");
    } else {
      message.reply("❌ Rút tiền thất bại");
    }
  } else if (args[0] === 'deposit') {
    const coin = args[1];

    const response = await axios.get(`https://test.catwaifu.repl.co/deposit?id=${targetID}&coin=${coin}`);
    const data = response.data;

    if (data === 'Success') {
      await Users.decreaseMoney(targetID, coin);
      message.reply("💰 Nạp tiền thành công");
    } else if (data === 'Fail') {
      message.reply("‼️ Quá giới hạn 10,000,000");
    } else if (data === 'Error') {
      message.reply("❌ Bạn chưa có tài khoản");
    } else {
      message.reply("❌ Nạp tiền thất bại");
    }
  } else if (args[0] === 'rename') {
    const name = args[1];

    const response = await axios.get(`https://test.catwaifu.repl.co/rename?id=${targetID}&name=${name}`);
    const data = response.data;

    if (data === 'Success') {
      message.reply("✅ Đổi tên thành công");
    } else if (data === 'Fail') {
      message.reply("❌ Chưa có tài khoản");
    } else {
      message.reply("❌ Đổi tên thất bại");
    }
  } else {
    const response = await axios.get(`https://test.catwaifu.repl.co/check?id=${targetID}`);
    const data = response.data;

    if (data && data.name) {
      const { name, coin, time, interest } = data;

      message.reply(
        `🏦 Tài Khoản: ${name}\n` +
        `💰 Số Dư: ${coin}\n` +
        `⌚ Ngày Tạo: ${time}\n` +
        `🔒 Đã Tính Lãi Lúc: ${interest}`
      );
    } else {
      message.reply("❌ Bạn chưa có tài khoản");
    }
  }
}

export default {
  config,
  onCall,
};
