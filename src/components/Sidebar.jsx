import { useContext } from "react"
import { SidebarChatItem } from "./SidebarChatItem"
import { ChatContext } from "../context/chat/ChatContext"
import { AuthContext } from "../auth/AuthContext";

export const Sidebar = () => {
  
  const { chatState } = useContext( ChatContext );
  const { auth } = useContext( AuthContext)


  return (
    <>
        {/* <!-- Sidebar inicio --> */}
        <div className="inbox_chat">
            {
                chatState.usuarios
                .filter( usuario => auth.uid !== usuario.uid)
                .map( ( usuario ) => (
                    <SidebarChatItem 
                      key={ usuario.uid }
                      usuario={ usuario }
                      />
                ))
            }
            

        {/* <!-- Espacio extra para scroll --> */}
        <div className="extra_space"></div>

        </div>
        {/* <!-- Sidebar Fin --> */}
    </>
  )
}
