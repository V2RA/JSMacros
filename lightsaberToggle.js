const sm = JsMacros.getServiceManager()

const inv = Player.openInventory();
if (inv) {
    const totalSlots = inv.getTotalSlots()
    if (totalSlots !== 0) {
        for (let i = 0; i < totalSlots; i++) {
            const v = inv.getSlot(i)
            if (v.getName().getString().includes("Lightsaber") || v.getName().getString().includes("Darksaber")) {
                let itemName = v.getName().getString()
                if (itemName.includes("On")) {
                    itemName = itemName.replace("On", "Off")
                } else if (itemName.includes("Off")) {
                    itemName = itemName.replace("Off", "On")
                }
                itemName = itemName.replaceAll("\u00a7", "&")
                itemName = itemName.replaceAll("&r", "")
                
                if (inv.getSelectedHotbarSlotIndex() === (i - 36)) {
                    Chat.say(`/display-name ${itemName}`)
                }
            }
        }
    }
}
