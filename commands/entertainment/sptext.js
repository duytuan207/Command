const config = {
  "name": "spamtext",
  "aliases": ["spamt"],
  "description": "",
  "usage": "",
  "cooldown": 3,
  "permissions": [0, 1, 2],
  "credits": "WaifuCat",
  "extra": {}
};

const list = [
  "hello",
  "hello1",
  "hello2",
  "hello3",
];

let index = 0;
let isStopped = false;

export function onCall({ message }) {
  const args = message.body.split(" ").slice(1); 
  if (args[0] === "stop") {
    isStopped = true; 
    message.send("Đã dừng.");
    return;
  }
if (isStopped) {
    isStopped = false;
  }
  
  const sendText = () => {
    message.send(list[index]);
    index = (index + 1) % list.length;
    if (!isStopped) {
      setTimeout(sendText, 1500); 
    }
  };
  sendText();
}

export default {
  config,
  onCall
};
