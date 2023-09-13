import { useContext } from "react"
import { IncomingMessage } from "./IncomingMessage"
import { OutgoingMessage } from "./OutgoingMessage"
import { SendMessage } from "./SendMessage"
import { ChatContext } from "../context/chat/ChatContext"
import { AuthContext } from "../auth/AuthContext"


export const Messages = () => {

  const { chatState } = useContext( ChatContext )
  const { auth } = useContext( AuthContext );
    // console.log(chatState.mensajes);
    // console.log(auth.uid);


  return (
    <>
        {/* <!-- Chat inicio --> */}
        <div className="mesgs">

            {/* <!-- Historia inicio --> */}

            <div 
              id="mensajes"
              className="msg_history"
            >

                {
                    chatState.mensajes.map( msg => (
                        ( msg.para === auth.uid ) 
                        // el msg es para ambos porque solo se renderiza del lado izquiero di lo recibe y 
                        // del lado contrario si lo envia, ahi entra en juego el ternario

                            ? <IncomingMessage key={ msg._id } msg={ msg }/> // id de mongo que viene del backend
                            : <OutgoingMessage key={ msg._id } msg={ msg }/>
                    ))
                }

            </div>
            {/* <!-- Historia Fin --> */}

            <SendMessage/>

        </div>
        {/* <!-- Chat Fin --> */}
    </>
  )
}
