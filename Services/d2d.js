const d2d = Hud.createDraw2D()
let tpsmeter;

d2d.setOnInit(JavaWrapper.methodToJava(() => {
    tpsmeter = d2d.addText("rerun", 520, d2d.getHeight() - 355, 0xFFFFFF, true);
    lightmeter = d2d.addText("rerun", 520, d2d.getHeight() - 345, 0xFFFFFF, true);
}));

const ticklistener = JsMacros.on("Tick", JavaWrapper.methodToJava(() => {
    const player = Player.getPlayer()
    let tra = Math.floor(World.getTimeOfDay() / 24000)
    let tar = World.getBlockLight(Math.floor(player.getPos().x), Math.floor(player.getPos().y), Math.floor(player.getPos().z))
    World.getBlock(0, -1, 0)
    tpsmeter?.setText(`\u00A7bWorld day: \u00A73${tra}`);
    lightmeter?.setText(`\u00A7bBlock light: \u00A73${tar}`)
}));

Hud.registerDraw2D(d2d);
event.stopListener = JavaWrapper.methodToJava(() => {
    Hud.unregisterDraw2D(d2d);
    JsMacros.off(ticklistener);
});
