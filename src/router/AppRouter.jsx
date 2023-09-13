import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { ChatPage } from "../pages/ChatPage"
import { AuthRouter } from "./AuthRouter"
import { useContext, useEffect } from "react"
import { AuthContext } from "../auth/AuthContext"


// const router = createBrowserRouter([
//     {
//         path:'/',
//         element:< ChatPage/>,
//     },
//     {
//         path:'/auth/*',
//         element:< AuthRouter />,
//     },
//     {
//         path:'/*',
//         element: <Navigate to='/' replace />
//     }

// ])


export const AppRouter = () => {

  const { auth, verificarToken} = useContext( AuthContext );
  // console.log(auth);

  useEffect(() => { // porque cada vez que la app se recarge entonces ejecuta esto una unica vez

    verificarToken()

  }, [ verificarToken ]) // cada vez que cambie el verifaToken se ejecuta, pero al estar memorizado solo se llama en el useEffect pero es necesario colocarlo


  if ( auth.checking ) {
    return <h1>Espere porfavor...</h1>
  }

  
  const router = ( auth.logged )
    ? createBrowserRouter([
      {
          path:'/',
          element:< ChatPage/>,
      },
      {
        path:'/*',
        element: <Navigate to='/' replace />
      }
    ]) 
    : createBrowserRouter([
      {
        path:'/auth/*',
        element:< AuthRouter />, // se podria definir las rutas del auth aqui mismi y proytegerlas pero por el css se veria otra forma
      },
      {
          path:'/*',
          element: <Navigate to='/auth/login' replace />
      }
    ])
      
  
  return (
    <>  
       <RouterProvider router={ router }/>
    </>
  )
}
