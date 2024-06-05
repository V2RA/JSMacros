const sm = JsMacros.getServiceManager()

const inv = Player.openInventory();
if (inv) {
    const slots = inv.getMap()

    if (GlobalVars.getInt("Damage") == 1) {

        const totalSlots = inv.getTotalSlots()
        if (totalSlots === 0 || Player.getGameMode() === "Creative") {
        } else {
            for (let i = 0; i < totalSlots; i++) {
                const v = inv.getSlot(i)
                const vName = v.getName().getString()
                if (i === 5 || i === 6 || i === 7 || i === 8) {

                } else if (vName.includes("Ranger")) {
                    if (vName.includes("Helmet")) {
                        inv.swap(i, 5)
                    } else if (vName.includes("Chestplate")) {
                        inv.swap(i, 6)
                    } else if (vName.includes("Pants")) {
                        inv.swap(i, 7)
                    } else if (vName.includes("Boots")) {
                        inv.swap(i, 8)
                    }
                } else if (vName.includes("Bullet")) {
                }
            }
        }
        inv.setSelectedHotbarSlotIndex(36)
    }
}
