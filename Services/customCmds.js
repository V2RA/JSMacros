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

function c(t) {
    return `\u00A7${t}`;
}

JsMacros.on("SendMessage", JavaWrapper.methodToJava((event, context) => {
    const plrs = World.getPlayers()
    const cmd = event.message.toString().split(" ")[0].substring(1)
    const args = event.message.toString().split(" ").slice(1)

    if (!event.message.toString().startsWith("/")) {
        return;
    }

    // event.message = null
    // ^^^^^^ must go in every command

    let playerList = []

    for (i of plrs) {
        playerList.push(i.getName())
    }

    function getPlayer(plrName) {
        for (player of playerList) {
            if (player.toLowerCase().includes(plrName.toLowerCase())) {
                return player
            }
        }
    }

    if (cmd === "autism") {
        Chat.say("/nickname add &b&ldmu kid")
    }

    if (cmd === "tl") {
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

        event.message = null
    }

    if (cmd === "drop") {
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

        event.message = null
    }

    if (cmd === "dmg") {
        if (GlobalVars.getInt("Damage") == 1) {
            GlobalVars.putInt("Damage", 0)
            Chat.actionbar("\u00A7bDamage Toggled: \u00A73Off")
        } else {
            GlobalVars.putInt("Damage", 1)
            Chat.actionbar("\u00A7bDamage Toggled: \u00A73On")
        }

        event.message = null
    }

    if (cmd === "dnd") {
        if (GlobalVars.getInt("DND") == 1) {
            GlobalVars.putInt("DND", 0)
            Chat.actionbar("\u00A7bDND Toggled: \u00A73Off")
        } else {
            GlobalVars.putInt("DND", 1)
            Chat.actionbar("\u00A7bDND Toggled: \u00A73On")
        }

        event.message = null
    }

    if (cmd === "rld" || cmd === "reload") {
        Chat.log(`\u00A7bReloading scripts`)
        JsMacros.runScript("reloadServices.js")

        event.message = null
    }

    if (cmd === "dbg") {
        if (GlobalVars.getInt("debug") == 1) {
            GlobalVars.putInt("debug", 0)
            Chat.log(`\u00A7bDebug: \u00A73disabled`)
        } else {
            GlobalVars.putInt("debug", 1)
            Chat.log(`\u00A7bDebug: \u00A73enabled`)
        }

        event.message = null
    }

    if (cmd === "afk") {
        if (GlobalVars.getInt("AFK") == 1) {
            GlobalVars.putInt("AFK", 0)
            Chat.log(`\u00A7bAFK: \u00A73disabled`)
        } else {
            GlobalVars.putInt("AFK", 1)
            Chat.log(`\u00A7bAFK: \u00A73enabled`)
        }

        event.message = null
    }
}))
