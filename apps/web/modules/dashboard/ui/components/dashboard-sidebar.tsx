"use client"
import React from "react"
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs"
import Link from "next/link";
import Image from "next/image"

import {
    CreditCard,
    CreditCardIcon,
    InboxIcon,
    LayoutDashboardIcon,
    LibraryBigIcon,
    Mic,
    PaletteIcon,


} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,

    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    useSidebar,
} from "@workspace/ui/components/sidebar"
import { usePathname } from "next/navigation"



const customerSupportItems = [
    {
        title: "Conversations",
        url: "/conversations",
        icon: InboxIcon,
    },
    {
        title: "Knowledge Base",
        url: "/files",
        icon: LibraryBigIcon,
    },


]

const configurationItems = [
    {
        title: "Widget Customization",
        url: "/customization",
        icon: PaletteIcon,
    }, {
        title: "Integrations",
        url: "/integrations",
        icon: LayoutDashboardIcon,
    }, {
        title: "Voice Assistant",
        url: "/plugins/vapi",
        icon: Mic,
    }
]

const accountItem = [
    {
        title: "Plans & Billing",
        url: "/billing",
        icon: CreditCardIcon,
    }
]

function SideBarSkeleton() {
    return (
        <SidebarMenu>
            {Array.from({ length: 2 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                    <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}

export const DashboardSidebar = () => {

    const { open } = useSidebar()
    const pathname = usePathname()
    const isActive = (url: string) => {
        if (url === "/") {
            return pathname === "/"
        }
        return pathname.startsWith(url)
    }
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuButton asChild size="lg">
                        <OrganizationSwitcher hidePersonal skipInvitationScreen
                            appearance={{
                                elements: {
                                    rootBox: "w-full! h-8!",
                                    avatarBox: "size-4! rounded-sm!",
                                    organizationSwitcherTrigger: "w-full! justify-start! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
                                    organizationPreview: "group-data-[collapsible=icon]:justify-center! gap-2!",
                                    organizationPreviewTextContainer: "group-data-[collapsible=icon]:hidden! text-xs! font-medium! text-sidebar-foreground!",
                                    organizationSwitcherTriggerIcon: "group-data-[collapsible=icon]:hidden! ml-auto! text-sidebar-foreground!"

                                }
                            }} />
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="overflow-x-hidden">
                {/* Customer support */}
                <SidebarGroup>
                    <SidebarGroupLabel>Customer Support</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <React.Suspense fallback={<SideBarSkeleton />}>
                            <SidebarMenu>
                                {customerSupportItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(item.url)} >
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </React.Suspense>
                    </SidebarGroupContent>

                </SidebarGroup>
                <SidebarSeparator />
                {/* configuraions */}

                <SidebarGroup>
                    <SidebarGroupLabel>Configuration
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <React.Suspense fallback={<SideBarSkeleton />}>
                            <SidebarMenu>
                                {configurationItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(item.url)} >
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </React.Suspense>
                    </SidebarGroupContent>

                </SidebarGroup>

                <SidebarSeparator />

                {/* //Plans & Billing */}
                <SidebarGroup>
                    <SidebarGroupLabel>Account
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <React.Suspense fallback={<SideBarSkeleton />}>
                            <SidebarMenu>
                                {accountItem.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild tooltip={item.title} isActive={isActive(item.url)} >
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </React.Suspense>
                    </SidebarGroupContent>

                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="overflow-hidden w-full flex items-center ">
                            <UserButton
                            appearance={{
                                elements :{
                                    rootBox : "w-full! h-8!",
                                    userButtonTrigger : "w-full! p-2! hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground!  group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! ",
                                    userButtonBox : "w-full! flex-row-reverse! justify-end! gap-2! group-data-[collapsible=icon]:justify-center! text-sidebar-foreground!",
                                    userButtonOuter : "pl-0! group-data-[collapsible=icon]:hidden!",

                                }
                            }}
                                showName={open}
                            />
                        </div>

                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />

        </Sidebar>
    )
}