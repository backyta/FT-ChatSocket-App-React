import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';


export const useSocket = ( serverPath ) => {
    
    // const socket = useMemo(() => io.connect( serverPath, {transports: ['websocket']} ), [ serverPath ] );

    const [socket, setSocket] = useState(null);
    const [ online, setOnline ] = useState(false);

    const conectarSocket = useCallback(() => {

        // identificar quien se esta conectando y quien desconecto, por la conxion al socket no por restAPI

        const token = localStorage.getItem('token');
        // mandar el token en la conexion, podemos hacerlo mendiante query

        const socketTemp = io.connect( serverPath, {
            transports: ['websocket'],
            autoConnect: true, //se mantenga siempre conectado
            forceNew: true, //cuando se llame el sockettemp, siempre va crear una nueva conexion, si no le ponemos esto y desconectamos intentara usar la conexion anterior
            query: {
                'x-token': token
            }
        });
        setSocket( socketTemp );

    }, [ serverPath ])


    const desconectarSocket = useCallback(() => {

        socket?.disconnect();
    }, [ socket ])



    useEffect(() => {
        setOnline( socket?.connected ); // verifica si esta conectado, el estado incial de conexion cuando se monta el componente
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true )); // escucha si el socket se conecto y se setea en true
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])



    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}


//* UseMemo nos sirve para controlar el estado del socket 

//? usCallback usado en un useEffect

//* Se necesita 2 funciones, pero como estas se van a llamar dentro de un useEffect, necesito memorizarlas
//* de esta manera cada vez que se renderize el useEffect por si cambian sus dependencias, ejectara
//* la funcion memorizada y no creara otra a menos de que la dependencia del useCallback cambie,
//* y si se generan nuevamete de alguna manera, si solo el argumento cambia entonces que se vuelva a 
//* generar si no que se mantengaigual

//* Si la dependencia del useCallback cambia se vuelve a memorizar.

//? forceNew

//* cuando se llame el sockettemp, siempre va crear una nueva conexion, si no le ponemos esto y 
//* desconectamos intentara usar la conexion anterior, asi evitamos inconvenientes
