const serviceMgr = JsMacros.getServiceManager()
const services = serviceMgr.getServices()

const serviceName = "dropJunk" 

const status = serviceMgr.status(serviceName)

if (status.toString() == "ENABLED") {
    serviceMgr.stopService(serviceName)
    Chat.actionbar("\u00A7bStopped \u00A73Dropping")
} else {
    serviceMgr.startService(serviceName)
    Chat.actionbar("\u00A7bStarted \u00A73Dropping")
}
