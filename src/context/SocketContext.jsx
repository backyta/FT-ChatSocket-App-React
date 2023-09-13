/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect } from 'react';

import { useSocket } from '../hooks/useSocket'
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';

import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080');
    const { auth } = useContext( AuthContext );
    const { dispatch } = useContext( ChatContext )

    useEffect(() => {
        if ( auth.logged ) { // esto se actualiza en el estadoauth del context, cuando se logea o sale
            conectarSocket();
        }
    }, [ auth, conectarSocket ]) 
    // al usar verificarToken actualiza el aut que es el state y este efecro se dispara denuevo,
    // pero con la misma funcion memorizada por que su dependencia no cambio, se vuelve a memorizar


    useEffect(() => {
        if ( !auth.logged ) {
            desconectarSocket();
        }
    }, [ auth, desconectarSocket ])
    

    //Escuhcar los cambios en los usuarios conectados, viene del server
    useEffect(() => {

        socket?.on('lista-usuarios', ( usuarios ) => {
            dispatch({
                type: types.usuariosCargados,
                payload: usuarios
            })
        });
    }, [ socket, dispatch ]) // por defecto react manda el dispatch como una funcion memorizada, no es necesario hacer un useCallback


    useEffect(() => {
        
        socket?.on('mensaje-personal',( mensaje ) => {
            // console.log(mensaje);

            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje
            })

            // TODO: mover el scro al final
        
            scrollToBottomAnimated('mensajes');


        })
    }, [ socket, dispatch ])


    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}



//? Usando la funcion memorizada.

//* Este es el objetivo por el cual nosotros memorizamos las funciones con el useCallback, porque si no
//* esto siemrpe se ejcutaria cada que el componente se redibuje

//* en el efecto colocamos como dependencia que solo se ejecutara si la funcion memorizada cambia
//* y esta solo cambiara si sus dependencias propias cambian.

//* Si el auth cambia se dispara denuevo, pero se diaparara la misma funcion memorizada no craara otra :)
//* el auth solo cambia con las rutas cuando entramos o no al login, esto retorna el objeto con la propiedad
//* logged en true o false.