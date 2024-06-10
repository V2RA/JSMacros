const address = World.getCurrentServerAddress().toString()

let nicks = [
    "&3&lThe&b&lJay",
    "&3&lThe&b&lJay",
    "&3&lThe&b&lJay",
    "&6&lSentinel &b&lJay",
    "&a&lSnake",
    "&a&lSnake",
    "&a&lSnake",
    "&b&ljayleybops",
    "&2&lSold The World"
];

let titles = [
    "&8&l[B&6&lM&8&l]",
    "&3&l[&b&lDD&3&l]",
    "&8&l[&4&lU.N.I.T&8&l]",
    "&8&l[&7&lBoS&8&l]",
    "&8&l[B&6&lM&8&l] &2&lPunished",
    "&3&l[&b&lDD&3&l] &2&lPunished",
    "&8&l[&7&lBoS&8&l] &2&lPunished",
    "&8&l[B&6&lM&8&l]",
    "&a&lThe Man Who"
];

JsMacros.on("SendMessage", JavaWrapper.methodToJava((event, context) => {
    const plrs = World.getPlayers()
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
            } else if (player.toLowerCase().includes(plrName.toLowerCase())) {
                return player
            }
        }
    }

    if (cmd === "autism") {
        Chat.say("/nickname add &b&ldmu kid")
    }
}))
