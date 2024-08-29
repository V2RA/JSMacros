const serviceMgr = JsMacros.getServiceManager()
const address = World.getCurrentServerAddress().toString()

let nicks = [
    "nickname1",
    "&3nickname2",
];

let titles = [
    "title1",
    "&3title2",
];

function textHandler(text, symbol) {
    if (symbol) {
        return text.replaceAll(/&/g, symbol);
    } else {
        return text.replaceAll(/&/g, "\\u00A7");
    }
}

function raytrace(distance) {
    if (!distance) distance = 10;

    const blockPos = Player.rayTraceBlock(distance, false)
    return `${blockPos.getX()} ${blockPos.getY()} ${blockPos.getZ()}`
}

function getPlayer(plrName, getAll) {
    let plrs = [];
    for (plr of World.getPlayers()) {
        plrs.push(plr.getName())
    }

    if (getAll) {
        return plrs
    }

    for (player of plrs) {
        if (plrName.toLowerCase() === "fat") {
            return "TheCyberium"
        } else if (player.toLowerCase().includes(plrName.toLowerCase())) {
            return player
        }
    }
}

// --------======={ Toggles } ======-------- \\

Chat.createCommandBuilder("toggle")
    .wordArg("type")
    .suggestMatching("dropJunk", "Damage", "DND", "tpEffects", "AFK")
    .executes(JavaWrapper.methodToJava(c => {
        GlobalVars.putInt(c.getArg("type"), GlobalVars.getInt(c.getArg("type")) == 1 ? 0 : 1)
        Chat.actionbar(`\u00A7b${c.getArg("type")} Toggled: \u00A73${GlobalVars.getInt(c.getArg("type")) == 1 ? "enabled" : "disabled"}`)
    })).register();

/*
Chat.createCommandBuilder("drop")
    .executes(JavaWrapper.methodToJava(c => {
        GlobalVars.putInt("dropJunk", GlobalVars.getInt("dropJunk") == 1 ? 0 : 1)
        Chat.actionbar(`\u00A7b${GlobalVars.getInt("dropJunk") == 1 ? "Started" : "Stopped"} \u00A73Dropping`)
    })).register()

Chat.createCommandBuilder("dmg")
    .executes(JavaWrapper.methodToJava(c => {
        GlobalVars.putInt("Damage", GlobalVars.getInt("Damage") == 1 ? 0 : 1)
        Chat.actionbar(`\u00A7bDamage Toggled: \u00A73${GlobalVars.getInt("Damage") == 1 ? "enabled" : "disabled"}`)
    })).register()

Chat.createCommandBuilder("dnd")
    .executes(JavaWrapper.methodToJava(c => {
        GlobalVars.putInt("DND", GlobalVars.getInt("DND") == 1 ? 0 : 1)
        Chat.actionbar(`\u00A7bDND Toggled: \u00A73${GlobalVars.getInt("DND") == 1 ? "enabled" : "disabled"}`)
    })).register()

Chat.createCommandBuilder("tpe")
    .executes(JavaWrapper.methodToJava(c => {
        GlobalVars.putInt("tpEffects", GlobalVars.getInt("tpEffects") == 1 ? 0 : 1)
        Chat.actionbar(`\u00A7bTP effects: \u00A73${GlobalVars.getInt("tpEffects") == 1 ? "enabled" : "disabled"}`)
    })).register()

Chat.createCommandBuilder("afk")
    .executes(JavaWrapper.methodToJava(c => {
        GlobalVars.putInt("AFK", GlobalVars.getInt("AFK") == 1 ? 0 : 1)
        Chat.actionbar(`\u00A7bAFK Toggled: \u00A73${GlobalVars.getInt("AFK") == 1 ? "enabled" : "disabled"}`)
    })).register()
*/

// --------======={ Toggles } ======-------- \\
// --------======={ Misc } ======-------- \\

Chat.createCommandBuilder("scriptsettings")
    .wordArg("key")
    .suggestMatching("titleaddcmd", "titleremovecmd", "nicknameaddcmd", "nicknameremovecmd")
    .executes(JavaWrapper.methodToJava(c => {
        const settingsFile = m.StorageFile("get")
        const address = World.getCurrentServerAddress().toString();

        if (settingsFile[address].Settings) {
            if (settingsFile[address].Settings[c.getArg("key")]) {
                Chat.log(`// ${c.getArg("key")} = ${settingsFile[address].Settings[c.getArg("key")]}`)
                Chat.log(`\\\\ Use "{val}" to designate where the value should be positioned within the command.`)
            } else Chat.log(`\u00A7c\u00A7n\u00A7o${c.getArg("key")}\u00A7c does not exist`);
        } else Chat.log(`\u00A7cSettings file does not exist`);
    }))
    .greedyStringArg("value")
    .executes(JavaWrapper.methodToJava(c => {
        const settingsFile = m.StorageFile("get")
        const address = World.getCurrentServerAddress().toString();

        if (settingsFile[address].Settings) {
            settingsFile[address].Settings[c.getArg("key")] = c.getArg("value")
            m.StorageFile("save", settingsFile)
            Chat.log(`// ${c.getArg("key")} = ${c.getArg("value")}`)
        } else Chat.log(`\u00A7cSettings file does not exist`)
    })).register();

Chat.createCommandBuilder("titlelist")
    .wordArg("key")
    .suggestMatching("set", "list", "add", "remove")
    .executes(JavaWrapper.methodToJava(c => {
        const settingsFile = m.StorageFile("get")
        const address = World.getCurrentServerAddress().toString();
        if (settingsFile[address].Titles) {
            if (c.getArg("key") == "list") {
                if (settingsFile[address].Titles.length <= 0) return Chat.log(`\u00A7cNo titles exist`);

                Chat.log(`\u00A7bTitles:`)
                for (title of Object.keys(settingsFile[address].Titles)) {
                    Chat.log(`${title} = ${m.textHandler(settingsFile[address].Titles[title].title, "\u00A7")} \u00A7b| ${m.textHandler(settingsFile[address].Titles[title].nickname, "\u00A7")}`)
                }
            } else return Chat.log(`\u00A7cInvalid arguments`)
        } else {
            Chat.log(`\u00A7cCreating titles list does not exist`)
            settingsFile[address].Titles = []
            m.StorageFile("save", settingsFile)
        }
    }))
    .quotedStringArg("value/nickname")
    .executes(JavaWrapper.methodToJava(c => {
        const settingsFile = m.StorageFile("get")
        const address = World.getCurrentServerAddress().toString();

        if (settingsFile[address].Titles) {
            if (c.getArg("key") == "set") {
                if (!settingsFile[address].Settings.titleaddcmd) return Chat.log(`\u00A7cNo title add command set`);
                if (!settingsFile[address].Settings.nicknameaddcmd) return Chat.log(`\u00A7cNo nickname add command set`);

                if (settingsFile[address].Titles[c.getArg("value/nickname")].title == "") Chat.say(settingsFile[address].Settings.titleremovecmd);
                else Chat.say(`${settingsFile[address].Settings.titleaddcmd.replaceAll("{val}", settingsFile[address].Titles[c.getArg("value/nickname")].title)}`);
                Chat.say(`${settingsFile[address].Settings.nicknameaddcmd.replaceAll("{val}", settingsFile[address].Titles[c.getArg("value/nickname")].nickname)}`)
            } else if (c.getArg("key") == "remove") {
                if (settingsFile[address].Titles[c.getArg("value/nickname")]) {
                    Chat.log(m.textHandler(`\u00A7bRemoved \u00A73${settingsFile[address].Titles[c.getArg("value/nickname")].title} \u00A7b| ${settingsFile[address].Titles[c.getArg("value/nickname")].nickname} \u00A7bfrom the list`, "\u00A7"));
                    settingsFile[address].Titles.splice(c.getArg("value/nickname"), 1)
                    m.StorageFile("save", settingsFile)
                }
            } else return Chat.log(`\u00A7cInvalid arguments`)
        }
    }))
    .quotedStringArg("value2/title")
    .executes(JavaWrapper.methodToJava(c => {
        const settingsFile = m.StorageFile("get")
        const address = World.getCurrentServerAddress().toString();

        if (settingsFile[address].Titles) {
            if (c.getArg("key") == "add") {
                const int = (settingsFile[address].Titles.length || 0)
                settingsFile[address].Titles[int] = { nickname: c.getArg("value/nickname"), title: c.getArg("value2/title") }
                m.StorageFile("save", settingsFile)
                Chat.log(m.textHandler(`\u00A7bAdded \u00A73${c.getArg("value2/title")} ${c.getArg("value/nickname")} \u00A7bto the list`, "\u00A7"));
            }
        }
    })).register();

// \\ --------======={ Misc } ======-------- // \\
// --------======={ Quality Of Life } ======-------- \\

Chat.createCommandBuilder("to")
    .greedyStringArg("player")
    .executes(JavaWrapper.methodToJava(c => {
        Chat.say(`/tp @s ${getPlayer(c.getArg("player"))}`)
    })).register();

Chat.createCommandBuilder("bring")
    .wordArg("player")

    .executes(JavaWrapper.methodToJava(c => {
        Chat.say(`/tp ${getPlayer(c.getArg("player"))} @s`)
    }))

    .intArg("distance")
    .executes(JavaWrapper.methodToJava(c => {
        Chat.say(`/tp ${getPlayer(c.getArg("player"))} ^ ^ ^${c.getArg("distance")}`)
    })).register();

// \\ --------======={ Quality Of Life } ======-------- // \\
// --------======={ Gamemodes } ======-------- \\

Chat.createCommandBuilder("gmc")
    .executes(JavaWrapper.methodToJava(c => {
        Chat.say(`/gamemode creative`)
    }))
    .quotedStringArg("player")
    .executes(JavaWrapper.methodToJava(c => {
        Chat.say(`/gamemode creative ${getPlayer(c.getArg("player"))}`)
    })).register()

Chat.createCommandBuilder("gms")
    .executes(JavaWrapper.methodToJava(c => {
        Chat.say(`/gamemode survival`)
    }))
    .quotedStringArg("player")
    .executes(JavaWrapper.methodToJava(c => {
        Chat.say(`/gamemode survival ${getPlayer(c.getArg("player"))}`)
    })).register()

Chat.createCommandBuilder("gmsp")
    .executes(JavaWrapper.methodToJava(c => {
        Chat.say(`/gamemode spectator`)
    }))
    .quotedStringArg("player")
    .executes(JavaWrapper.methodToJava(c => {
        Chat.say(`/gamemode spectator ${getPlayer(c.getArg("player"))}`)
    })).register()

Chat.createCommandBuilder("gma")
    .executes(JavaWrapper.methodToJava(c => {
        Chat.say(`/gamemode adventure`)
    }))
    .quotedStringArg("player")
    .executes(JavaWrapper.methodToJava(c => {
        Chat.say(`/gamemode adventure ${getPlayer(c.getArg("player"))}`)
    })).register()

// \\ --------======={ Gamemodes } ======-------- // \\
/*
// --------======={ Creating your own commands } ======-------- \\

 Chat.createCommandBuilder("COMMANDNAME") -- Name of the command
     .intArg("name")
     .greedyStringArg("name")
     .quotedStringArg("name")
     .executes(JavaWrapper.methodToJava(c => { 
         -- What to do when the command is executed
     })).register()

https://jsmacros.wagyourtail.xyz/?/1.8.0/xyz/wagyourtail/jsmacros/client/api/classes/CommandBuilder.html
This link contains all arguments for the command structure
*/