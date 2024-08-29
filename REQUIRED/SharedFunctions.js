const m = {}

m.textHandler = function e(text, symbol) {
    if (symbol) {
        return text.replaceAll(/&/g, symbol);
    } else {
        return text.replaceAll(/&/g, "\\u00A7");
    }
},

    m.raytrace = function e(distance) {
        if (!distance) distance = 10;

        const blockPos = Player.rayTraceBlock(distance, false)
        return `${blockPos.getX()} ${blockPos.getY()} ${blockPos.getZ()}`
    },

    m.StorageFile = function e(x, stg) {
        const PathFile = `Storage.json`
        let Storage;

        if (FS.exists(PathFile)) {
            Storage = FS.open(PathFile).read()
            Storage = JSON.parse(Storage)
        } else {
            return Chat.log("Storage file does not exist");
        }

        if (x == "get") {
            return Storage
        } else if (x == "save") {
            return FS.open(PathFile).write(JSON.stringify(stg, null, 4))
        }
    },

    m.getPlayer = function e(plrName, getAll) {
        let plrs = [];
        for (plr of World.getPlayers()) {
            plrs.push(plr.getName())
        }

        if (getAll) {
            return plrs
        }

        if (plrName == "all") return "@a";
        if (plrName == "@r" || plrName == "random") return plrs[Math.floor(Math.random() * plrs.length)];
        if (plrName.includes("@")) return plrName

        for (player of plrs) {
            if (plrName.toLowerCase() === "fat") {
                return "TheCyberium"
            } else if (plrName.toLowerCase() === "french") {
                return "Conquerors_"
            } else if (plrName.toLowerCase() === "twink") {
                return "Jayson_json"
            } else if (player.toLowerCase() === "bitch" || player.toLowerCase() === "bob") {
                return "wheezebob"
            } else if (player.toLowerCase().includes(plrName.toLowerCase())) {
                return player
            }
        }
    },

    m.init = function e() {
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
    }

module.exports = m