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
            } else if (plrName.toLowerCase() === "french") {
                return "Conquerors_"
            } else if (plrName.toLowerCase() === "twink") {
                return "Jayson_json"
            } else if (player.toLowerCase() === "bitch") {
                return "wheezebob"
            } else if (player.toLowerCase().includes(plrName.toLowerCase())) {
                return player
            }
        }
    }

    const cmds = {
        "autism": () => {
            Chat.say("/nickname add &b&ldmu kid")
            exit()
        },

        "drop": () => {
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


            exit()
        },

        "dmg": () => {
            if (GlobalVars.getInt("Damage") == 1) {
                GlobalVars.putInt("Damage", 0)
                Chat.actionbar("\u00A7bDamage Toggled: \u00A73Off")
            } else {
                GlobalVars.putInt("Damage", 1)
                Chat.actionbar("\u00A7bDamage Toggled: \u00A73On")
            }

            exit()
        },

        "dnd": () => {
            if (GlobalVars.getInt("DND") == 1) {
                GlobalVars.putInt("DND", 0)
                Chat.actionbar("\u00A7bDND Toggled: \u00A73Off")
            } else {
                GlobalVars.putInt("DND", 1)
                Chat.actionbar("\u00A7bDND Toggled: \u00A73On")
            }

            exit()
        },

        "tl": () => {
            if (args[0] !== undefined) {
                let nick = nicks[args[0]]
                let title = titles[args[0]]

                if (args[1] === "true") {
                    Chat.log(`\u00A7bNickname would be: \u00A73${textHandler(nick, "\u00A7")}`)
                    Chat.log(`\u00A7bTitle would be: \u00A73${textHandler(title, "\u00A7")}`)
                } else {
                    if (args[0] === "list") {
                        for (let i = 0; i < titles.length; i++) {
                            Chat.log(`\u00A7b${i}: ${textHandler(titles[i], "\u00A7")} \u00A7r| ${textHandler(nicks[i], "\u00A7")}`)
                        }
                    } else {
                        Chat.say(`/nickname add ${nick}`);
                        if (title == "") {
                            Chat.say(`/set-title remove e`);
                        } else {
                            Chat.say(`/set-title add ${title}`);
                        }
                    }
                }
            } else {
                Chat.log(`\u00A7bTotal number of titles: ${titles.length}`)
            }

            exit()
        },

        "rld": () => {
            // alias reload
            Chat.log(`\u00A7bReloading scripts`)
            JsMacros.runScript("reloadServices.js")

            exit()
        },

        "afk": () => {
            if (GlobalVars.getInt("AFK") == 1) {
                GlobalVars.putInt("AFK", 0)
                Chat.actionbar(`\u00A7bAFK: \u00A73disabled`)
            } else {
                GlobalVars.putInt("AFK", 1)
                Chat.actionbar(`\u00A7bAFK: \u00A73enabled`)
            }

            exit()
        }
    }

    if (cmd in cmds) {
        cmds[cmd]()
    }
}))