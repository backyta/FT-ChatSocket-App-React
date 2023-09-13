/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react"
import { chatReducer } from "./chatReducer";


export const ChatContext = createContext();

const initialState = {
    uid: '',
    chatActivo: null, // uid del usuario al que to quiero enviar mensajes
    usuarios: [], // all los usuarios de la base de datos
    mensajes: [], // el chat seleccionado
}

export const ChatProvider = ({ children }) => {

  const [ chatState, dispatch ] = useReducer(chatReducer, initialState); // dispatch despacha todas las acciones que caen en el action del reducer



  return (
    <>
        <ChatContext.Provider value={{
           chatState,
           dispatch
        }}>
            { children }
        </ChatContext.Provider>
    </>
  )
}
