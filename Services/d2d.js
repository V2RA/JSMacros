const serviceMgr = JsMacros.getServiceManager()
const d2d = Hud.createDraw2D()

let lastPosition = [0, 0, 0];

d2d.setOnInit(JavaWrapper.methodToJava(() => {
    worldDay = d2d.addText("rerun", 180, d2d.getHeight() - 505, 0xFFFFFF, true);
    lightmeter = d2d.addText("rerun", 180, d2d.getHeight() - 495, 0xFFFFFF, true);
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
