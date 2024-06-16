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
        return text.replace(/&/g, symbol);
    } else {
        return text.replace(/&/g, "\\u00A7");
    }
}

function getPlayers() {
    let plrs = World.getPlayers()
    let plrList = []

    for (i of plrs) {
        plrList.push(i.getName())
    }

    return plrList
}

function getPlayer(plrName) {
    for (player of getPlayers()) {
        if (plrName.toLowerCase() === "fat") {
            return "TheCyberium"
        } else if (player.toLowerCase().includes(plrName.toLowerCase())) {
            return player
        }
    }
}

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}


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


// --------======={ Creating your own commands } ======-------- \\

// Chat.createCommandBuilder("COMMANDNAME") -- Name of the command
//     .intArg("name")
//     .greedyStringArg("name")
//     .quotedStringArg("name")
//     .executes(JavaWrapper.methodToJava(c => { 
//         -- What to do when the command is executed
//     })).register()

// https://jsmacros.wagyourtail.xyz/?/1.8.0/xyz/wagyourtail/jsmacros/client/api/classes/CommandBuilder.html
// This link contains all arguments for the command structure