JsMacros.on("Sound", JavaWrapper.methodToJava((event, context) => {
    if (event.sound.includes("fall")) {
        const player = Player.getPlayer()
        const playerPos = player.getPos()
        const eventPos = event.position
        const distance = Math.sqrt(Math.pow(playerPos.x - eventPos.x, 2) + Math.pow(playerPos.y - eventPos.y, 2) + Math.pow(playerPos.z - eventPos.z, 2))

        if (distance <= 0.5) {

        }
    }
}))
c