const sm = JsMacros.getServiceManager()

while (true) {
    const inv = Player.openInventory();
    if (inv) {
        const slots = inv.getMap()

        const totalSlots = inv.getTotalSlots()
        if (totalSlots === 0 || Player.getGameMode() === "Creative") {

        } else {
            const slot = inv.getSlot(5)
            let isOn = false

            if (slot.getItemID().toString() === "dalekmod:sonic_screwdriver_2") {
                isOn = true
            } else {
                isOn = false
            }

            while (isOn) {
                let rand = Math.floor(Math.random() * 20) + 5;
                Chat.say("/particle poof ^ ^1.5 ^0.75 0 0 0 0 2 force")
                Chat.say("/playsound dalekmod:entity.sonic_second master @a[distance=..20] ~ ~ ~")
                Time.sleep(rand * 1000)
                break
            }
        }
    }
}
