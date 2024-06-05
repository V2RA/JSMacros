const sm = JsMacros.getServiceManager()

const drop = [
    "granite",
    "diorite",
//    "andesite",
    "bone",
    "dirt",
    "spider_eye",
    "rotten_flesh",
    "gunpowder",
    "silicate_ore",
    "gravel",
    "string",
    "rail",
    "magma_block",
    "quartz",
    "blackstone",
    "basalt",
    "ender_pearl",
    "stone_sword",
    "cactus",
    "raw_dalek_mutant",
    "dalekanium_ingot"
    //   "soul_sand"
]

const limits = {
    netherrack: 288,
    arrow: 64
}

const badNames = [
    "Iron Sword",
    "Bow"
]

let itemsCache = {}

const inv = Player.openInventory();
while (true) {
    if (inv) {
        const totalSlots = inv.getTotalSlots()
        if (totalSlots !== 0) {
            for (let i = 0; i < totalSlots; i++) {
                const v = inv.getSlot(i)
                const itemId = v.getItemId().split(":")[1]
                itemsCache[itemId] = itemsCache[itemId] + v.getCount() || v.getCount()
                if (itemId == "air") {
                    // do nothing
                } else {
                    if (itemsCache[itemId] > limits[itemId]) {
                        Chat.actionbar("\u00A7bDrop limit \u00A73" + itemId)
                        inv.dropSlot(i)
                        itemsCache[itemId] = limits[itemId]
                    }
                    if (drop.includes(itemId)) {
                        Chat.actionbar("\u00A7bDrop itemId \u00A73" + itemId)
                        inv.dropSlot(i)
                    }
                    // not target items with substrings of the bad names
                    for (let j = 0; j < badNames.length; j++) {
                        if (v.getName().getString() == badNames[j]) {
                            Chat.actionbar("\u00A7bDrop name \u00A73" + v.getName().getString())
                            inv.dropSlot(i)
                        }
                    }
                }
            }
        }
        itemsCache = {}
    }
}
