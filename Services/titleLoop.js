const address = World.getCurrentServerAddress().toString()

let nicks = [
"&b&lJay", 
"&b&lJay", 
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
"&8&l[&7&lBoS&8&l]",
"&8&l[B&6&lM&8&l] &2&lPunished", 
"&3&l[&b&lDD&3&l] &2&lPunished", 
"&8&l[&7&lBoS&8&l] &2&lPunished",
"&8&l[B&6&lM&8&l]",
"&a&lThe Man Who"
];

let x = 0;

JsMacros.on("Key", JavaWrapper.methodToJava((event) => {
    if (event.key == "key.keyboard.z") {
    if (address === "dmu.swdteam.com/193.70.80.159:25565" || address === "193.70.80.159:25565") {
        if (event.action === 1) {
            let nick = nicks[x];
            let title = titles[x];

            Chat.say(`/nickname add ${nick}`);
            if (title == "") {
                Chat.say(`/set-title remove e`);
            } else {
                Chat.say(`/set-title add ${title}`);
            }
            x += 1;
            if (x >= nicks.length) {
                x = 0;
            }
        }
        }
    }
}));
