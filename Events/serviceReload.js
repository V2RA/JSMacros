const serviceMgr = JsMacros.getServiceManager()
const services = serviceMgr.getServices()

for (i of services) {
    Chat.actionbar(i)
    Time.sleep(150)
    if (serviceMgr.status(i).toString() == "STOPPED") {
    
    } else {
        serviceMgr.restartService(i)
    }
}
