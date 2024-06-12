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

JsMacros.on("SendMessage", JavaWrapper.methodToJava((event, context) => {
    const plrs = World.getPlayers()

    let commandType;

    if (!event.message.toString().startsWith("/") && !event.message.toString().startsWith(".")) {
        return;
    } else {
        commandType = event.message.toString().startsWith("/") ? "/" : "."
    }

    function exit() {
        if (commandType === ".") {

        } else if (commandType === "/") {
            event.message = null
        }
    }

    const cmd = event.message.toString().split(" ")[0].substring(1)
    const args = event.message.toString().split(" ").slice(1)

    let playerList = []

    for (i of plrs) {
        playerList.push(i.getName())
    }

    function getPlayer(plrName) {
        for (player of playerList) {
            if (plrName.toLowerCase() === "fat") {
                return "TheCyberium"
            } else if (player.toLowerCase().includes(plrName.toLowerCase())) {
                return player
            }
        }
    }

    const cmds = [

        {
            name: "cchelp",
            description: "List of commands",
            usage: "help <command>",
            execute: () => {
                if (args.length == 0) {
                    let cmdArray = [];
                    Chat.log("\u00A7bList of commands:");
                    Chat.log("\u00A7b------------------");
    
                    for (let i = 0; i < cmds.length; i++) {
                        cmdArray.push(cmds[i].name);
                    }
    
                    for (let i = 0; i < cmdArray.length; i++) {
                        Chat.log("\u00A73" + cmdArray[i]);
                    }
    
                    Chat.log("\u00A7b------------------");
                } else {
                    for (let i = 0; i < cmds.length; i++) {
                        if (args[0] === cmds[i].name) {
                            Chat.log("\u00A7b------------------");
                            Chat.log("\u00A73" + cmds[i].name + "\u00A7b: " + cmds[i].description);
                            Chat.log("\u00A73Usage: \u00A7b" + cmds[i].usage);
                            Chat.log("\u00A7b------------------");
                        }
                    }
                }
            }
        },

        {
            name: "autism",
            description: "autism",
            usage: "autism",
            execute: () => {
                Chat.say("/nickname add &b&ldmu kid")
            }
        },
 
        {
            name: "rld",
            description: "Runs the reload script; reloads all service scripts",
            usage: "rld",
            execute: () => {
                Chat.log(`\u00A7bReloading scripts`)
                JsMacros.runScript("reloadServices.js")
            }
        },

        {
            name: "dbg",
            description: "Toggles debug mode",
            usage: "dbg",
            execute: () => {
                if (GlobalVars.getInt("debug") == 1) {
                    GlobalVars.putInt("debug", 0)
                    Chat.actionbar(`\u00A7bDebug: \u00A73disabled`)
                } else {
                    GlobalVars.putInt("debug", 1)
                    Chat.actionbar(`\u00A7bDebug: \u00A73enabled`)
                }
            }
        },

        {
            name: "afk",
            description: "Toggles AFK mode",
            usage: "afk",
            execute: () => {
                if (GlobalVars.getInt("AFK") == 1) {
                    GlobalVars.putInt("AFK", 0)
                    Chat.actionbar(`\u00A7bAFK: \u00A73disabled`)
                } else {
                    GlobalVars.putInt("AFK", 1)
                    Chat.actionbar(`\u00A7bAFK: \u00A73enabled`)
                }
            }
        },

        {
            name: "drop",
            description: "Drop junk",
            usage: "drop",
            execute: () => {
                const serviceMgr = JsMacros.getServiceManager()
                const serviceName = "dropJunk"

                const status = serviceMgr.status(serviceName)

                if (GlobalVars.getInt("dropJunk") == 1) {
                    GlobalVars.putInt("dropJunk", 0)
                    Chat.actionbar("\u00A7bStopped \u00A73Dropping")
                } else {
                    GlobalVars.putInt("dropJunk", 1)
                    Chat.actionbar("\u00A7bStarted \u00A73Dropping")
                }
            }
        },

        {
            name: "dmg",
            description: "toggles onDamage scripts",
            usage: "dmg",
            execute: () => {
                if (GlobalVars.getInt("Damage") == 1) {
                    GlobalVars.putInt("Damage", 0)
                    Chat.actionbar("\u00A7bDamage Toggled: \u00A73Off")
                } else {
                    GlobalVars.putInt("Damage", 1)
                    Chat.actionbar("\u00A7bDamage Toggled: \u00A73On")
                }
            }
        },

        {
            name: "dnd",
            description: "toggles dnd",
            usage: "dnd",
            execute: () => {
                if (GlobalVars.getInt("DND") == 1) {
                    GlobalVars.putInt("DND", 0)
                    Chat.actionbar("\u00A7bDND Toggled: \u00A73Off")
                } else {
                    GlobalVars.putInt("DND", 1)
                    Chat.actionbar("\u00A7bDND Toggled: \u00A73On")
                }
            }
        },
    ]

    for (const command of cmds) {
        if (command.name == cmd) {
            command.execute()

            exit()
        }
    }
}))