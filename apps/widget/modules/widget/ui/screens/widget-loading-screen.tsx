"use client"

import { useAtomValue, useSetAtom } from "jotai"
import { contactSessionIdAtomFamily, errorMessageAtom, loadingMessageAtom, organizationIdAtom, screenAtom } from "../../atmos/widget-atoms"
import { WidgetHeader } from "../components/widget-header"
import { LoaderIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useAction, useMutation } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { Id } from "@workspace/backend/_generated/dataModel"


type InitStep = "org" | "session" | "settings" | "vapi" | "done"

export const WidgetLoadingScreen = ({ organizationId }: { organizationId: string | null }) => {
    const [step, setStep] = useState<InitStep>("org")
    const [sessionValid, setSessionValid] = useState(false)

    const setOrganizationId = useSetAtom(organizationIdAtom)
    const loadingMessage = useAtomValue(loadingMessageAtom)
    const setScreen = useSetAtom(screenAtom)
    const setLoadingMessage = useSetAtom(loadingMessageAtom)
    const setErrorMessage = useSetAtom(errorMessageAtom)
    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId || ""))

    const validateOrganization = useAction(api.public.organizations.validate)


    // Step 1 : Validate the organization
    useEffect(() => {
        if (step !== "org") return;

        setLoadingMessage("Finding Organization ID...")
        if (!organizationId) {
            setErrorMessage("Organization ID is required")
            setScreen("error")
            return;
        }

        setLoadingMessage("Verifying organization...")
        validateOrganization({ organizationId }).then((result) => {
            if (result.valid) {
                setOrganizationId(organizationId)
                setStep("session")

            } else {
                setErrorMessage(result.reason || "Invalid Configuration")
                setScreen("error")
            }
        }).catch((error) => {
            setErrorMessage("Unable to verify organization")
            setScreen("error")
        })

    }, [
        step,
        organizationId,
        setErrorMessage,
        setScreen,
        setStep,
        setOrganizationId,
        validateOrganization,
        setLoadingMessage])


    //Step2 : Vaidate the Session

    const validateContactSession = useMutation(api.public.contactSessions.validate)
    useEffect(() => {
        if (step !== "session") return;
        setLoadingMessage("Finding contact Session ID...")

        if (!contactSessionId) {
            setSessionValid(false);
            setStep("done");
            return;
        }
        setLoadingMessage("Validating  Session ID...")
        validateContactSession({ contactSessionId: contactSessionId as Id<"contactSessions"> }).then((result) => {
            setSessionValid(result.valid)
            setStep("done")
        }).catch((error) => {
            setSessionValid(false);
            setStep("done")
        })
    }, [
        step,
        setLoadingMessage,
        contactSessionId,
        validateContactSession,

    ])


    useEffect(()=>{
        if(step !== "done") return;
        const hasValidSession = sessionValid && contactSessionId;
        setScreen(hasValidSession ? "selection" : "auth")
    },[
        step,
        sessionValid,
        contactSessionId,
        setScreen,
    ])

    return (
        <>
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-2 px-2 py-6 font-semibold">
                    <p className="text-3xl">
                        Hi there
                    </p>
                    <p className="text-lg">
                        Let&apos;s get you started
                    </p>

                </div>
            </WidgetHeader>

            <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
                <LoaderIcon className="h-10 animate-spin  w-10 " />
                <p className="text-sm">
                    {loadingMessage || "loading !!"}
                </p>
            </div>

        </>
    )
}
