import { useContext } from "react"
import { AuthContext } from "../auth/AuthContext"

export const SearchBox = () => {

  const { auth, logout } = useContext( AuthContext );

  // En el caso de que el contexto del auth este arriba del chatContext,, podriamos hacer que es
  // en este componnete podemos disparar ambas acciones de manera simultanea, se ve la forma de 
  // usar el dispatch

  return (
    <>
         {/* <!-- Searchbox inicio --> */}
         <div className="headind_srch">
                <div className="recent_heading mt-2">
                    <h4>{ auth.name }</h4>
                </div>
                <div className="srch_bar">
                    <div className="stylish-input-group">
                        <button 
                            className="btn text-danger"
                            onClick={ logout }
                            >
                            Salir
                        </button>
                    </div>
                </div>
            </div>
            {/* <!-- Searchbox Fin --> */}
    </>
  )
}

//* Cuandos algo y quiero dar boton atras en el navegadior este intenta regresar ala ruta anterior
//* y al no estar autenrucado solo agarra el browser router del no autenticado por lo que no existe esa 
//* ruta y redireciona a todos al /* al login o viceversa en el publico
