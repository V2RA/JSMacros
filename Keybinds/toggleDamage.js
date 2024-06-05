if (GlobalVars.getInt("Damage") == 1) {
    GlobalVars.putInt("Damage", 0)
    Chat.actionbar("\u00A7bDamage Toggled: \u00A73Off")
} else {
    GlobalVars.putInt("Damage", 1)
    Chat.actionbar("\u00A7bDamage Toggled: \u00A73On")
}
