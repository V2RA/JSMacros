// Goes in services

JsMacros.on("RecvMessage", JavaWrapper.methodToJava((event, context) => {
    const pingNames = ["v2ra", "jay", "snake"];

    const fullMessage = event.text.getStringStripFormatting();
    const match = fullMessage.match(/^<([^>]+)>\s*(.*)/);
    
    if (match) {
        const playerName = match[1];
        let messageOnly = match[2];
        
        messageOnly = messageOnly.toLowerCase();
        
        const containsPingName = pingNames.some(name => messageOnly.includes(name.toLowerCase()));
        
        if (containsPingName) {
            Chat.actionbar(`\u00a73\u00a7o${playerName} \u00a7b\u00a7ohas mentioned you`);
            World.playSound("minecraft:entity.experience_orb.pickup", 1);
        }
    }
}));
