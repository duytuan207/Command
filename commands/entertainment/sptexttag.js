const config = {
  name: "spamtext",
  aliases: ["spamt"],
  description: "",
  usage: "",
  cooldown: 3,
  permissions: [0, 1, 2],
  credits: "WaifuCat",
  extra: {},
};

const list = [
  "hello",
  "hello1",
];

let index = 0;
let isStopped = false;
let delay = 5000; // Delay 5s chỉnh lại cho phù hợp nhe hiện tại rất chậm

export async function onCall({ message }) {
  const { reply, mentions } = message;

  const args = message.body.split(" ").slice(1);
  if (args[0] === "stop") {
    isStopped = true;
    await message.send("Đã dừng.");
    return;
  }

  if (mentions && Object.keys(mentions)[0]) {
    const mention = Object.keys(mentions)[0];
    const tag = mentions[mention].replace("@", "");

    const sendTaggedText = async (i) => {
      if (i >= list.length || isStopped) {
        if (isStopped) {
          isStopped = false;
        }
        return;
      }

      const body = `${list[i]} ${tag}`;

      await new Promise((resolve) => {
        setTimeout(async () => {
          if (!isStopped) {
            await message.send({
              body,
              mentions: [{ tag, id: mention }],
            });
          }
          resolve();
        }, delay * (i + 1));
      });

      if (!isStopped) {
        sendTaggedText((i + 1) % list.length);
      }
    };

    await sendTaggedText(index);
  } else {
    const sendText = async () => {
      if (isStopped) {
        isStopped = false;
        return;
      }

      await message.send(list[index]);
      index = (index + 1) % list.length;

      if (!isStopped) {
        setTimeout(sendText, delay);
      }
    };

    await sendText();
  }
}

export default {
  config,
  onCall
};
