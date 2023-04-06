
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css'
import Home from './component/Home/Home'
import ListItems from "./component/ListItems/ListItems";
import NewItem from "./component/Create-item/NewItem";
import Update from "./component/Create-item/UpdateItem";
import Oders from "./component/Oders/oders";
import OderDetail from "./component/Oders/oderDetail";
import Revenu from "./component/Revenu/Revenu";


function App() {

  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('token')){
        navigate("/login")
    }

  },[])
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<ListItems/>} />
          <Route path="/login" element ={<Home/>} />
          <Route path="/item/:id" element ={<Update/>} />
          <Route path="/NewItem" element={<NewItem/>} />
          <Route path="/oders" element={<Oders/>} />
          <Route path="/oder/:id_order" element={<OderDetail/>} />
          <Route path="/revenu" element={<Revenu/>} />
      </Routes>
    </div>
  );
}

export default App;
