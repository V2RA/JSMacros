JsMacros.on("PlayerJoin", JavaWrapper.methodToJava((event, context) => {
    const playerName = event.player.getName()

    const pingForPlayers = [
        "DrisBigMan",
        "Thomsk10"
    ]

    if (GlobalVars.getInt("coolDown") === 0) {
        if (pingForPlayers.includes(playerName)) {
            Chat.actionbar("\u00a73\u00a7o" + playerName.toString() + " \u00a7b\u00a7ohas joined")
            World.playSound("minecraft:entity.experience_orb.pickup", 1);
        }

        if (playerName === "DrisBigMan") {
            Chat.say("baldy")
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
    Time.sleep(2500)
    GlobalVars.putInt("coolDown", 0)
}))

JsMacros.on("Disconnect", JavaWrapper.methodToJava((event, context) => {
    GlobalVars.putInt("coolDown", 1)
}))