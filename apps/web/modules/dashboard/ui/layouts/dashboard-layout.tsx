import { AuthGuard } from "@/modules/ui/components/auth-gaurd"
import { OrganizationGuard } from "@/modules/ui/components/organization-gaurd"
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@workspace/ui/components/sidebar"
import { cookies } from "next/headers"
import { DashboardSidebar } from "../components/dashboard-sidebar"



export const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"



    return (
        <AuthGuard>
            <OrganizationGuard>
                <SidebarProvider defaultOpen={defaultOpen}>
                    <DashboardSidebar />
                    <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                        {/* <header className="flex h-14 items-center gap-2 border-b bg-background px-4">
                        
                            <div className="font-semibold">Dashboard</div>
                        </header> */}
                        <div className="flex-1 overflow-auto p-6">
                            {children}
                        </div>
                    </main>
                </SidebarProvider>
            </OrganizationGuard>
        </AuthGuard>
    )
}