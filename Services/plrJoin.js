const PathFile = `Storage.json`
const address = World.getCurrentServerAddress().toString();
let SettingsFile;

if (FS.exists(PathFile)) {
    SettingsFile = FS.open(PathFile).read()
    SettingsFile = JSON.parse(SettingsFile)
} else {
    Chat.log("Settings file does not exist");
}

if (SettingsFile != null && !SettingsFile[address]) {
    if (address.includes("local")) { } else {
        Chat.log("\u00A7cNo server settings file found")
        SettingsFile[address] = { Waypoints: [], Settings: {} }

        FS.open(PathFile).write(JSON.stringify(SettingsFile, null, 4))
    }
}

if (SettingsFile != null && SettingsFile[address]) {
    if (!SettingsFile[address].Settings && !address.includes("local")) {
        Chat.log("\u00A7cNo server settings found")
        SettingsFile[address].Settings = {}

        FS.open(PathFile).write(JSON.stringify(SettingsFile, null, 4))
    }
}

// ^^^^^^^^^^ new ^^^^^^^^^^
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
    GlobalVars.putInt("coolDown", 1)
    

    context.releaseLock();
    JsMacros.once("Key", JavaWrapper.methodToJava((event, context) => {
        GlobalVars.putInt("coolDown", 0)
    }))
}))

JsMacros.on("Disconnect", JavaWrapper.methodToJava((event, context) => {
    GlobalVars.putInt("coolDown", 1)
}))
