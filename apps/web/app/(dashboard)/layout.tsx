import { AuthGuard } from "@/modules/ui/components/auth-gaurd"
import { OrganizationGuard } from "@/modules/ui/components/organization-gaurd"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthGuard>
            <OrganizationGuard>
            {children}
            </OrganizationGuard>
        </AuthGuard>
        
    )
}

export default Layout