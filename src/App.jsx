import Head from "./components/Head"
import Body from "./components/Body"
import { Route, Routes } from "react-router-dom"
import Menu from "./components/Menu"
import { CartContext, Cordinates, Visibilty } from "./context/contextApi"
import { useEffect, useState } from "react"
import Cart from "./components/Cart"
import { useSelector } from "react-redux"
import SignIn from "./components/SignIn"
import Search from "./components/Search"
function App() {
  // const [visible,setVisible] = useState(false);
  const visible = useSelector((state)=>state.ToggleSlice.searchToggle)
  const LoginVisible = useSelector((state)=>state.ToggleSlice.loginToggle);
  const [cord,setCord] = useState({lat :28.5355161,lng :77.3910265});
  // const[cartData,setCartData] = useState([]);
  // function getLocal(){
  //   let data= JSON.parse(localStorage.getItem("cartData")) || []
  //   setCartData(data)
  // }
  // useEffect(()=>{
  //   getLocal()
  // },[])
  return (
    // <CartContext.Provider value={{cartData,setCartData}}>
      <Cordinates.Provider value={{cord,setCord}}>
      {/* <Visibilty.Provider value={{visible,setVisible}}> */}
        <div className={(visible || LoginVisible?"overflow-hidden max-h-screen":"")}>
          <Routes>
            <Route path="/" element={<Head/>}>
              <Route path="/" element={<Body/>}></Route>
              <Route path="/resturantMenu/:id" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<h1>Coming soon</h1>} />
            </Route>
          </Routes>
        </div>
      {/* </Visibilty.Provider> */}
    </Cordinates.Provider>
  // </CartContext.Provider>
    
    
    
  )
}

export default App
