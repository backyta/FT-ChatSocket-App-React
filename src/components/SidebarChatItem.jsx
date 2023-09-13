/* eslint-disable react/prop-types */

import { useContext } from "react"
import { ChatContext } from "../context/chat/ChatContext"
import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";
import { scrollBottom } from "../helpers/scrollToBottom";

export const SidebarChatItem = ({ usuario }) => {

  const { chatState, dispatch } = useContext( ChatContext );
  const { chatActivo } = chatState;

  const onClick = async () => {

    dispatch({
        type: types.activarChat,
        payload: usuario.uid,
    });

    // Cargar los mensaje de chat al hacer click en su recuadro
    if( chatActivo !== usuario.uid ){ // si es igual o si esta activo ya al presionar el mismo no se dipara otra peticion pero si es otro recuadro ahi si se dipara la peticion
        // console.log('disparar');
        
        const resp = await fetchConToken(`mensajes/${ usuario.uid }`); // mensajes que envie al id del usuario del recuadro
        // console.log( resp.mensajes );
        dispatch({
            type: types.cargarMensajes,
            payload: resp.mensajes.reverse(),
        });
    }

    //TODO: Mover el scroll

    scrollBottom('mensajes');


  }



  return (
    <>
        <div 
            className={`chat_list  ${ ( usuario.uid === chatActivo ) && 'active_chat' }` }
            onClick={ onClick }
            >
            {/* active_chat */}
            <div className="chat_people">
                <div className="chat_img"> 
                    <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" />
                </div>
                <div className="chat_ib">
                    <h5>{ usuario.nombre }</h5>

                    {
                        ( usuario.online )
                            ? <span className="text-success">Online</span>
                            : <span className="text-danger">Offline</span>
                    }
                    
                    
                </div>
            </div>
        </div>

    </>
  )
}
 
//* el active chat se coloca solo si el chat activo es igual al uid de esta persona, la clase chat-activo
//* selecciona el cuadrado de manera visual que esta activo.

//? Cuando activo el chat en el reducer osea el id se coloca, en el active chat deberia de purgar todos
//? los mensajes que tengo almacenados ahi, porque es un nuevo chat, tengo que pugar toda esa informacion
//? pero purgar solo los de ese usuario y no de todos.