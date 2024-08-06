JsMacros.on("RecvMessage", JavaWrapper.methodToJava((event, context) => {
    context.releaseLock();
    const pingNames = ["name"];
    const antiPing = ["notmyname"]
    const thanks = ["thanks", "thx", "ty", "thank you",];

    const fullMessage = event.text.getStringStripFormatting();
    const match = fullMessage.match(/^(?:\[\*{1,3}\])?\s*([^>]+)>\s*(.*)/);

    if (match) {
        const playerName = match[1];
        let messageOnly = match[2];

        messageOnly = messageOnly.toLowerCase();

        const containsPingName = pingNames.some(name => messageOnly.includes(name.toLowerCase()));
        const containsThanks = thanks.some(name => messageOnly.includes(name.toLowerCase()));

        const notMe = antiPing.some(name => messageOnly.includes(name.toLowerCase()))

        if (GlobalVars.getInt("AFK") == 1) {
            // if AFK
            if (containsPingName && !notMe) {
                Time.sleep(Math.floor(Math.random() * 3) * 100);
                Chat.say(`im AFK brb`); // change this to your afk message
            }

        } else if (containsPingName && !containsThanks && !notMe) {
            // if ping name but no thanks
            Time.sleep(Math.floor(Math.random() * 3) * 100);

            Chat.actionbar(`\u00a73\u00a7o${playerName} \u00a7b\u00a7ohas mentioned you`);
            Chat.toast(`Ping from ${playerName}`, `${match[2]}`)
            if (GlobalVars.getInt("DND") == 0) {
                World.playSound("minecraft:entity.experience_orb.pickup", 1);
            }

            GlobalVars.putString("lastPing", playerName)

        } else if (containsPingName && containsThanks && !notMe) {
            // if ping name and thanks
            Time.sleep(Math.floor(Math.random() * 3) * 100);
            Chat.actionbar(`\u00a73\u00a7o${playerName} \u00a7b\u00a7ohas mentioned you and said thanks`);
            Chat.toast(`Ping from ${playerName}`, `${match[2]}`)
            if (GlobalVars.getInt("DND") == 0) {
                World.playSound("minecraft:entity.experience_orb.pickup", 1);
            }

            Chat.say("yw") // remove if you don't want to reply
            GlobalVars.putString("lastPing", playerName)
        }
    }
}));
