import type { App } from "vue"

import {

    HomeIcon, UserIcon, LockClosedIcon,
    EyeIcon, EyeSlashIcon,

} from "@heroicons/vue/24/solid"
import { BellIcon } from "@heroicons/vue/24/outline"

export default {
    install(app: App) {
        app.component("HomeIcon", HomeIcon)
        app.component("UserIcon", UserIcon)
        app.component("BellIcon", BellIcon)
        app.component("LockClosedIcon", LockClosedIcon)
        app.component("EyeIcon", EyeIcon)
        app.component("EyeSlashIcon", EyeSlashIcon)
    },
}
