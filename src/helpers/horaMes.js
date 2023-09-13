
import moment from 'moment'
// import 'moment/moment';

//moment.locale('es'); // areglar esto que lanza siemrpe en ingles

// console.log(xd);
export const horaMes = ( fecha ) => {

    const hoyMes = moment( fecha );
    return hoyMes.format('HH:mm a | MMMM Do');
} 

// Si solo lo estamos usando en archivo moment se hace la configuracion de cambio de idioma en este archivo
// si lo vamos a utilizar en varios lugares de nuestra aplicacion podemos hacerlo en un lugar mas alto
// par ano tener que llamar esta config varias veces