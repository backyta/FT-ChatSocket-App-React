import { types } from "../../types/types";


// const initialState = {
//     uid: '',
//     chatActivo: null, // uid del usuario al que to quiero enviar mensajes
//     usuarios: [], // all los usuarios de la base de datos
//     mensajes: [], // el chat seleccionado
// }

export const chatReducer = ( state, action ) => {

    switch ( action.type ) {
        
        case types.usuariosCargados:
            return{
                ...state,
                usuarios: [ ...action.payload ]
            }
        
        case types.activarChat:
            if ( state.chatActivo === action.payload ) return state;
            // para que no haga nada, y asi se evita el purgar los mensajes.
            return{
                ...state,
                chatActivo: action.payload,
            }
        
        case types.nuevoMensaje:
            if ( state.chatActivo === action.payload.de ||
                state.chatActivo === action.payload.para ) // significa que tengo el chatActivo de la persona que envia el mensaje
                { 
                return{
                    ...state,
                    mensajes: [ ...state.mensajes, action.payload ]// all mensajes que estan en el state se copian y se agrega el nuevo mensaje al array
                }
            }else{
                return state;
            }// caso contrario quiere decir que cualquier otra persona que no tengo activa en el chat me envio un mensaje por o cual no quiero hacer nada


        case types.cargarMensajes:
            return {
                ...state,
                mensajes: [ ...action.payload ]
            }

        case types.limpiarMensajes:
            return {
                ...state,
                uid: '',
                chatActivo: null,
                usuarios: [], 
                mensajes: [], 
            }

        default:
            return state;
    }

} 