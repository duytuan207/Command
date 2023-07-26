const config = {
    name: "flop",
    aliases: ["kall","kickall"],
    description: "Kick toàn bộ người dùng khỏi nhóm",
    usage: "",
    cooldown: 5,
    permissions: [1],
    credits: "WaifuCat",
};

function kickAllMembers(threadID) {
    return new Promise((resolve, reject) => {
        global.api.getThreadInfo(threadID, (err, info) => {
            if (err) return reject(err);
            
            const memberIDs = info.participantIDs.filter(id => id !== global.botID);
            
            let success = 0, fail = 0;
            
            memberIDs.forEach(async (memberID) => {
                try {
                    await kick(memberID, threadID);
                    success++;
                } catch (e) {
                    console.error(e);
                    fail++;
                }
                
                if (success + fail === memberIDs.length) {
                    resolve({ success, fail });
                }
            });
        });
    });
}

function kick(userID, threadID) {
    return new Promise((resolve, reject) => {
        global.api.removeUserFromGroup(userID, threadID, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

async function onCall({ message, getLang }) {
    if (!message.isGroup) return;
    
    const threadID = message.threadID;
    
    try {
        const { success, fail } = await kickAllMembers(threadID);
        message.reply(`Kick thành công ${success} người dùng. Lỗi khi kick ${fail} người dùng.`);
    } catch (e) {
        console.error(e);
        message.reply("Lỗi, có thể bot chưa là admin!");
    }
}

export default {
    config,
    onCall
};
