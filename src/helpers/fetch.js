import { getEnvironments } from "./getEnviroments"

const { VITE_API_URL } = getEnvironments();

const baseURL = VITE_API_URL;

export const fetchSinToken = async ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseURL }/${ endpoint }`;

    if ( method === 'GET') {

        const resp = await fetch( url );
        return await resp.json(); // parsea o deserialoza el json del servidor a un objeto js

    }else{
        const resp = await fetch( url, {
            method,
            headers: {
                'Content-type':'application/json'
            },
            body:JSON.stringify( data ) // se debe mandar la data serializada en formato JSON, al backend
        })

        return await resp.json();
    }
}


export const fetchConToken = async ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseURL }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET') {

        const resp = await fetch( url, {
            headers:{
                'x-token': token 
            }
        } );

        return await resp.json(); // parsea o deserialoza el json del servidor a un objeto js

    }else{
        const resp = await fetch( url, {
            method,
            headers: {
                'Content-type':'application/json',
                'x-token': token
            },
            body:JSON.stringify( data ) // se debe mandar la data serializada en formato JSON, al backend
        })

        return await resp.json();
    }

}