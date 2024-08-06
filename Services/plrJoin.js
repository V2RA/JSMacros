JsMacros.on("PlayerJoin", JavaWrapper.methodToJava((event, context) => {
    const playerName = event.player.getName()

    const pingForPlayers = [
        "DrisBigMan"
    ]

    if (GlobalVars.getInt("coolDown") === 0) {
        if (pingForPlayers.includes(playerName)) {
            World.playSound("minecraft:entity.experience_orb.pickup", 1);
        }

        Time.sleep(Math.floor(Math.random() * 3) * 1000);

        if (playerName === "DrisBigMan") {
            Chat.say("wb baldy")
        } 
        
    }

    Chat.log("\u00a73\u00a7o" + playerName.toString() + " \u00a7b\u00a7ohas joined")
    context.releaseLock();
}));

JsMacros.on("PlayerLeave", JavaWrapper.methodToJava((event, context) => {
    const playerName = event.player.getName()

    Chat.log("\u00a73\u00a7o" + playerName.toString() + " \u00a7b\u00a7ohas left")

    context.releaseLock();
}));

JsMacros.on("JoinServer", JavaWrapper.methodToJava((event, context) => {

    context.releaseLock();
    JsMacros.once("Key", JavaWrapper.methodToJava((event, context) => {
        GlobalVars.putInt("coolDown", 0)
    }))
}))

JsMacros.on("Disconnect", JavaWrapper.methodToJava((event, context) => {
    GlobalVars.putInt("coolDown", 1)
}))
