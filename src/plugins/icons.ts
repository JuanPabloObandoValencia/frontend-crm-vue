import type { App } from "vue"

import {

    HomeIcon, UserIcon, LockClosedIcon,
    EyeIcon, EyeSlashIcon, ChartBarIcon,
    CurrencyDollarIcon, UsersIcon, FireIcon,
    ClipboardDocumentCheckIcon, Squares2X2Icon

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
        app.component("ChartBarIcon", ChartBarIcon)
        app.component("CurrencyDollarIcon", CurrencyDollarIcon)
        app.component("UsersIcon", UsersIcon)
        app.component("FireIcon", FireIcon)
        app.component("ClipboardDocumentCheckIcon", ClipboardDocumentCheckIcon)
        app.component("Squares2X2Icon", Squares2X2Icon)
    },
}
