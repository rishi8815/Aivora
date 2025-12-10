"use client"


import { useMutation, useQuery ,Authenticated, Unauthenticated} from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { Button } from "@workspace/ui/components/button"
import { SignInButton, UserButton } from "@clerk/nextjs"
export default function Page() {

  const users = useQuery(api.users.getMany)
  const addUser = useMutation(api.users.add)
  return (
    <>
    <Authenticated>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
      <p>app/web</p>
      <UserButton/>
      <Button onClick={() => addUser()}>Add</Button>
      <p>{JSON.stringify(users)}</p>

    </div>

    </Authenticated>
    <Unauthenticated>
      <p>Must sign In to start the process</p>
        <SignInButton >Sign In</SignInButton>
      </Unauthenticated>
    </>
    
  )
} 
