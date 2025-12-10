import { AuthLayout } from "@/modules/ui/layouts/auth-layout"



const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

export default RootLayout