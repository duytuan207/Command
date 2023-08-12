import axios from 'axios';

const config = {
  name: 'bank',
  aliases: ["bk","b"],
  description: 'Bank Online',
  usage: '<Use command to show menu>',
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: 'WaifuCat',
  extra: {}
};

async function onCall({ message, args }) {
  const targetID = message.senderID;
  const { Users } = global.controllers;

  if (args.length === 0) {

    message.reply(
      'Menu using commands:\n' +
      '1. Register an account: `register <name>`\n' +
      '2. Withdraw money: `withdraw <amount>`\n' +
      '3. Deposit money: `deposit <amount>`\n' +
      '4. Rename account: `rename <new name>`\n' +
      '5. Info account: `check <new name>`'
    );
    return;
  }

  if (args[0] === 'register') {
    const name = args[1];

    const response = await axios.get(`https://bank.apibasic2023.repl.co/register?id=${targetID}&name=${name}`);
    const data = response.data;

    if (data === 'Success') {
      message.reply("💪 Account registration successful");
    } else if (data === 'Fail') {
      message.reply("‼️ You already have an account");
    } else {
      message.reply("❌ Account registration failed");
    }
  } else if (args[0] === 'withdraw') {
    const coin = args[1];

    const response = await axios.get(`https://bank.apibasic2023.repl.co/withdraw?id=${targetID}&coin=${coin}`);
    const data = response.data;

    if (data === 'Success') {
      await Users.increaseMoney(targetID, coin);
      message.reply("💸 Money withdrawal successful");
    } else if (data === 'Fail') {
      message.reply("‼️ Insufficient funds to withdraw");
    } else if (data === 'Error') {
      message.reply("❌ You don't have an account yet");
    } else {
      message.reply("❌ Money withdrawal failed");
    }
  } else if (args[0] === 'deposit') {
    const coin = args[1];

    const response = await axios.get(`https://bank.apibasic2023.repl.co/deposit?id=${targetID}&coin=${coin}`);
    const data = response.data;

    if (data === 'Success') {
      await Users.decreaseMoney(targetID, coin);
      message.reply("💰 Money deposit successful");
    } else if (data === 'Fail') {
      message.reply("❌ You don't have an account yet");
    } else {
      message.reply("❌ Money deposit failed");
    }
  } else if (args[0] === 'rename') {
    const name = args[1];

    const response = await axios.get(`https://bank.apibasic2023.repl.co/rename?id=${targetID}&name=${name}`);
    const data = response.data;

    if (data === 'Success') {
      message.reply("✅ Rename successful");
    } else if (data === 'Fail') {
      message.reply("❌ No account found");
    } else {
      message.reply("❌ Rename failed");
    }
  } else {
    const response = await axios.get(`https://bank.apibasic2023.repl.co/check?id=${targetID}`);
    const data = response.data;

    if (data && data.name) {
      const { name, coin, time, interest } = data;

      message.reply(
        `🏦 Account: ${name}\n` +
        `💰 Balance: ${coin}`
      );
    } else {
      message.reply("❌ You don't have an account yet");
    }
  }
}

export default {
  config,
  onCall,
};
