"use client"

import { useVapi } from "@/modules/widget/hook/user-vapi"
import { Button } from "@workspace/ui/components/button"

export default function Page() {

  const { isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall } = useVapi()

  return (
    <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto">
      <Button onClick={startCall}>Start Call</Button>
      <Button variant="destructive" onClick={endCall}>End Call</Button>

      <p>
        isConnected : {isConnected}
      </p>
      <p>
        isConnecting : {isConnecting}
      </p>
      <p>
        isSpeaking : {isSpeaking}
      </p>
      <p>
       {JSON.stringify(transcript)}
      </p>
    </div>

  )
}
