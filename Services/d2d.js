const serviceMgr = JsMacros.getServiceManager()
const d2d = Hud.createDraw2D()

let lastPosition = [0, 0, 0];
let offset = d2d.getHeight()

function setupD2D(index) {
    // X position
    let x = 180
    
    return d2d.addText("rerun", x, d2d.getHeight() - (offset - (index * 10)), 0xFFFFFF, true);
}

d2d.setOnInit(JavaWrapper.methodToJava(() => {
    worldDay = setupD2D(1);
    lightmeter = setupD2D(2);
}));

const ticklistener = JsMacros.on("Tick", JavaWrapper.methodToJava(() => {
    const player = Player.getPlayer()
    let tra = Math.floor(World.getTimeOfDay() / 24000)
    let tar = World.getBlockLight(Math.floor(player.getPos().x), Math.floor(player.getPos().y), Math.floor(player.getPos().z))
    World.getBlock(0, -1, 0)
    
    worldDay?.setText(`\u00A7bWorld day: \u00A73${tra}`);
    
    lightmeter?.setText(`\u00A7bBlock light: \u00A73${tar}`)
}));

Hud.registerDraw2D(d2d);
event.stopListener = JavaWrapper.methodToJava(() => {
    Hud.unregisterDraw2D(d2d);
    JsMacros.off(ticklistener);
});
