"use client"

import { useQuery } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
export default function Page() {

  const users = useQuery(api.users.getMany)
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div>app/widget</div>
      <p>{JSON.stringify(users)}</p>

    </div>
  )
}
