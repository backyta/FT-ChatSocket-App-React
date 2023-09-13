import { useContext, useState } from "react"
import { SocketContext } from "../context/SocketContext";
import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";


export const SendMessage = () => {

  const [ mensaje, setMensaje ] = useState('');
  const { socket } = useContext( SocketContext );
  const { auth } = useContext( AuthContext );
  const { chatState } = useContext( ChatContext );


  const onChange = ({ target }) => {
    setMensaje( target.value );
  }

  const onSubmit = ( ev ) =>{
    ev.preventDefault();

    if ( mensaje.length === 0 ) return;
    setMensaje('');

    //Emitir al backend un evento de socket para enviar al mensaje
    // {
    //     de: // UID del usuario enviando el mensaje
    //     para: // UID del usuario que recibe el mensaje
    //     mensaje: // lo que quiero enviar
    // }

    socket.emit('mensaje-personal', {
        de: auth.uid,
        para: chatState.chatActivo, // solo se muestra si hay un chat activo seleccionado
        mensaje
    })
 
    // Hacer el dispatch de el mensaje....


  }


  return (
    <>
        {/* <!-- Enviar mensaje Inicio --> */}
        <form onSubmit={ onSubmit }>
            <div className="type_msg row">
                <div className="input_msg_write col-sm-9">
                    <input 
                        type="text" 
                        className="write_msg" 
                        placeholder="Mensaje..." 
                        value={ mensaje }
                        onChange={ onChange }
                        />
                </div>
                <div className="col-sm-3 text-center">
                    <button className="msg_send_btn mt-3" type="submit">
                        enviar
                    </button>
                </div>
            </div>
        </form>
        {/* <!-- Enviar mensaje Fin --> */}
    </>
  )
}
