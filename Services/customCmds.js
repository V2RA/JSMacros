JsMacros.on("SendMessage", JavaWrapper.methodToJava((event, context) => {
    const cmd = event.message.toString().split(" ")[0].substring(1)
    const args = event.message.toString().split(" ").slice(1)

    if (cmd === "autism") {
        Chat.say("/nickname add &b&ldmu kid")
    }
}))
