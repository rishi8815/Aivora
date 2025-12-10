"use client"


import { useMutation, useQuery, } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"
import { SignInButton, UserButton, OrganizationSwitcher } from "@clerk/nextjs"
export default function Page() {

  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)
  return (
    <>

      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <p>app/web</p>
        <OrganizationSwitcher hidePersonal />
        <UserButton />
        <Button onClick={() => addUser()}>Add</Button>
        <p>{JSON.stringify(users)}</p>

      </div>


    </>
  )
} 
