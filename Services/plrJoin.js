// Goes in services

JsMacros.on("PlayerJoin", JavaWrapper.methodToJava((event, context) => {
    const playerName = event.player.getName()

    // template for specific player messages
    // if (playerName === "DrisBigMan") {
    //    
    // } else if (playerName === "Thomsk10") {
    // 
    // }
    
    Chat.log("\u00a73\u00a7o" + playerName.toString() + " \u00a7b\u00a7ohas joined")
    
    context.releaseLock();
}));

JsMacros.on("PlayerLeave", JavaWrapper.methodToJava((event, context) => {
    const playerName = event.player.getName()
    
    Chat.log("\u00a73\u00a7o" + playerName.toString() + " \u00a7b\u00a7ohas left")
    
    context.releaseLock();
}));
