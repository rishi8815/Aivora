
import { OrganizationList } from "@clerk/nextjs"
 export const OrgViewSelect =()=>{
    return (
        <OrganizationList
        afterCreateOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
        hidePersonal
        skipInvitationScreen />
    )
}