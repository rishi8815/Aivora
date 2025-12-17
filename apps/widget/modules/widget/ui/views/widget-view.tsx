"use client"

import { useAtomValue } from "jotai"
//import { WidgetFooter } from "../components/widget-footer"
//import { WidgetHeader } from "../components/widget-header"
import { WidgetAuthScreen } from "../screens/widget-auth-screen"
import { screenAtom } from "../../atmos/widget-atoms"
import { WidgetErrorScreen } from "../screens/widget-error-screen"
import { WidgetLoadingScreen } from "../screens/widget-loading-screen"

interface Props {
    organizationId: string | null
}

export const WidgetView = ({ organizationId }: Props) => {
    const screen = useAtomValue(screenAtom)

    const screenComponents ={
        loading:<WidgetLoadingScreen organizationId={organizationId}/>,
        error: <WidgetErrorScreen/> ,
        auth:<WidgetAuthScreen/>,
        selection:<p>TODO:Selection</p>,
        inbox:<p>TODO:Inbox</p>,
        chat:<p>TODO:Chat</p>,
        contact:<p>TODO:Contact</p>,
        voice:<p>TODO:Voice</p>

    }
    return (
        <main className=" min-h-screen min-w-screen flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted">
          
           {screenComponents[screen]}
            {/* <WidgetFooter/> */}
        </main>
    )
}
