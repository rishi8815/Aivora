"use client"


import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldContent,
    FieldTitle,
} from "@workspace/ui/components/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { WidgetHeader } from "../components/widget-header";
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { useMutation } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import {Doc} from "@workspace/backend/_generated/dataModel"

const fromSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),

})

   //temp orgId
const organizationId = "123";

export const WidgetAuthScreen = () => {
    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            name: "",
            email: "",

        }
    })
      
    const createContactSession = useMutation(api.public.contactSessions.create)
    const onSubmit = async (values: z.infer<typeof fromSchema>) => {
        if(!organizationId){
            return;
        }

        const metadata ={
            userAgent :navigator.userAgent,
            language:navigator.language,
            languages:navigator.languages?.join(","),
            platform:navigator.platform,
            vendor:navigator.vendor,
            screenResolution:`${window.screen.width}x${window.screen.height}`,
            viewportSize:`${window.innerWidth}x${window.innerHeight}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            cookieEnabled:navigator.cookieEnabled,
            referrer:document.referrer || "direct",
            currentUrl:window.location.href,
            
        }
        const contactSessionId = await createContactSession({
            ...values,
            organizationId,
            metadata,
        })

        console.log({contactSessionId})
    }
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

            <form
                className="flex flex-1 flex-col gap-y-4 p-4"
                onSubmit={form.handleSubmit(onSubmit)}>

                <Field>
                    <FieldLabel>Name</FieldLabel>
                    <FieldContent>
                        <Input
                            type="text"
                            placeholder="Enter your name"
                            className="h-10 bg-background"
                            {...form.register("name")}
                        />
                    </FieldContent>
                    <FieldError>{form.formState.errors.name?.message}</FieldError>
                </Field>

                <Field>
                    <FieldLabel>Email</FieldLabel>
                    <FieldContent>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="H-10 bg-background"
                            {...form.register("email")}
                        />
                    </FieldContent>
                    <FieldError>{form.formState.errors.email?.message}</FieldError>
                </Field>

                <Button
                disabled={form.formState.isSubmitting}
                    type="submit"
                    size="lg"
                >
                    Continue
                </Button>

            </form>

        </>
    )

};