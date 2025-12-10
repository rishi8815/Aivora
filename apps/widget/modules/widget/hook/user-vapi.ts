import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";


interface TranscriptionMessage{
    role :"user" | "assistant";
    text : string;
}

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi |null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptionMessage[]>([]);
  useEffect(()=>{
    //only for testing the vapi api otherwise customer will provide their own vapi api key
    const vapiInstance = new Vapi("eba652d9-0c2e-4b75-9820-1ac1fe701962")
    setVapi(vapiInstance)

    vapiInstance.on("call-start",()=>{
        setIsConnected(true)
        setIsConnecting(false)
        setTranscript([])
    })

    vapiInstance.on("call-end",()=>{
        setIsConnected(false)
        setIsConnecting(false)
        setIsSpeaking(false)
    })
    vapiInstance.on("speech-start",()=>{
        setIsSpeaking(true)
    })
    vapiInstance.on("speech-end",()=>{
        setIsSpeaking(false)
    })
     vapiInstance.on("error",(error)=>{
        console.log(error,"VAPI_ERROR")
        setIsConnecting(false)
     })
     vapiInstance.on("message",(message)=>{
        if(message.type==="transcript" && message.transcriptType === "final"){
            setTranscript((prev)=>[
                ...prev,
                {
                    role:message.role==="user" ? "user" : "assistant",
                    text:message.transcript
                }
            ])
        }
     })

     return ()=>{
        vapiInstance?.stop()
     }
  },[])

  const startCall = () => {
    setIsConnecting(true)
    if(vapi){

        //only for testing the vapi api otherwise customer will provide their own AssistantIDs
        vapi.start("43552c99-2ac8-4203-adee-3e0fe76ee28a")
    }
  }

  const endCall =()=>{
    if(vapi){
        vapi.stop()
    }
  }
  return{
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall
  }

}