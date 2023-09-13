/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";


export const AuthContext = createContext();

const initialState = {
    uid     : null,
    checking: true,
    logged  : false,
    name    : null,
    email   : null,
};


export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState( initialState );
  const { dispatch } = useContext( ChatContext );



  const login = async ( email, password ) => {

    const resp = await fetchSinToken('login', { email, password }, 'POST');

    if ( resp.ok ) {
      
      localStorage.setItem( 'token', resp.token );
      const { usuario } = resp

      setAuth(( auth ) => ({
        ...auth,
        uid     : usuario.uid ,
        checking: false, // porque ya se que estoy autenticado
        logged  : true, // porque la autenticacion paso
        name    : usuario.nombre,
        email   : usuario.email,
      }))

      // console.log('Autenticado!');
    }

    return resp.ok; // si es false muestra false y choca con la validacion del server
  }
    

  const register = async ( nombre, email, password ) => {

    const resp = await fetchSinToken('login/new', { nombre, email, password }, 'POST');

    if( resp.ok ) {
      
      localStorage.setItem( 'token', resp.token );
      const { usuario } = resp

      setAuth(( auth ) => ({
        ...auth,
        uid     : usuario.uid ,
        checking: false, // porque ya se que estoy autenticado
        logged  : true, // porque la autenticacion paso
        name    : usuario.nombre,
        email   : usuario.email,
      }))

      // console.log('Autenticado!');
      return true;
    }

    return resp.msg
  }

  const verificarToken = useCallback( async () => { // al actualizar la pagina sucede esto
    // leer el token del localstorage y si existe llamar a revalidar token

    const token = localStorage.getItem('token');

    if ( !token ) { // no se deberia poner
      setAuth({
        uid     : null,
        checking: false, //ya tengo el estado de la autenticacion, no esta logeado
        logged  : false,
        name    : null,
        email   : null,
      })

      return false;
    }

    // Si el token si existe
    const resp = await fetchConToken('login/renew');

    if ( resp.ok ) {

      localStorage.setItem( 'token', resp.token );
      const { usuario } = resp

      setAuth(( auth ) => ({
        ...auth,
        uid     : usuario.uid ,
        checking: false, 
        logged  : true, 
        name    : usuario.nombre,
        email   : usuario.email,
      }))

      // console.log('Autenticado!');
      return true;

    }else{
       setAuth({
        uid     : null,
        checking: false, //ya tengo el estado de la autenticacion, no esta logeado
        logged  : false,
        name    : null,
        email   : null,
      })
      return false;
    }


  }, []) // cuando se actualiza la pagina se renderiza nuevamente el componente y se momoriza la funcion


  const logout = () => {

    localStorage.removeItem('token');
    dispatch({
      type: types.limpiarMensajes,
    });

    setAuth({
      checking: false, 
      logged: false
    });

  }

  return (
    <AuthContext.Provider value={{ // Provider proveede todos estos valores al context y del context toman los que estan a bajo de el
        auth,
        login,
        register,
        verificarToken,
        logout,
    }}>
        { children }
    </AuthContext.Provider>
  )
}



//? VarificvarToken dentro del useEffect

//* Si dejeo esto como funcion normal cada vez que se renderize el componente esta funcion va apuntar
//* a un nuevo espacio en memoria y esto diapra multiples creaciones del la funcion que esta dentro del efecto, 
//* para esto memorizamos la funcion para siempre apunte al mismo espacio en memoria con el useCallback