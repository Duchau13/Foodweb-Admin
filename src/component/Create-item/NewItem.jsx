import React from "react";
import classes from './NewItem.module.css'
import Input from "../Input/Input";
import { Link } from "react-router-dom";
//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { useState } from "react";
//import api from "../../redux/axois"
import axios from "axios";


const NewItem = () => {

    const token = localStorage.getItem('token')
    const [items,setItems] = useState({
        name: "",
        image:"",
        id_type: "",
        quantity:"",
        price:"",
        ingredient: "",
        energy:"",
        description:"",
    })
    const navigate = useNavigate();
    //const {id} = useParams();
    const [error, setError] = useState("")


    
    console.log(items);
    //console.log(items[0]);
    


    const handleSubmit = (e) =>{
        e.preventDefault();

        try{
        {
            axios.post('http://localhost:3005/items/create', items,
                {
                    headers: {
                        Access_token: token,
                    }
                }
            )
            .then(res =>{
                alert("thêm thành công")
                navigate('/')
            })
            .catch(err =>{
                setError(err.response.data.message)
            })
        }
        
        }catch(error){
            console.log(error.response.data);
        }
        
    }
    console.log(error)
    const handleChange = (e) => {
        
        const itemsClone = {...items};
        itemsClone[e.target.name] = e.target.value;
        setItems(itemsClone);
    
    }

    

    return (
        <div>
            <Link to="/" className={classes["back-icon"]}>
                <i class="fa-solid fa-chevron-left"></i>
                <h>Quay lai</h>
            </Link>
            <div className={classes["container"]}>
                <div className={classes["form-main"]}>
                    <h1>Thêm mới thức ăn</h1>
                    <p className={classes["text-err"]}>{error}</p>
                    <form action="" className={classes["add-form"]}>
                        
                        <Input
                            name="name"
                            label="Tên thức ăn"
                            placeholder="Nhập tên thức ăn"
                            required={true}
                            value={items.name}
                            onChange={handleChange}
                        />
                        
                        <Input
                            name="image"
                            label="Ảnh"
                            placeholder="Nhập đường dẫn hình ảnh"
                            required={true}
                            value={items.image}
                            onChange={handleChange}
                        />
                        
                        <select name="id_type" onChange={handleChange}>
                            <option value=""></option>
                            <option value="1">Burgers</option>
                            <option value="2">Đồ uống</option>
                            <option value="3">Đồ ngọt</option>
                            <option value="4">Pasta</option>
                            <option value="5">Pizza</option>
                        </select>
                        <Input
                            type="number"
                            name="quantity"
                            label="Số lượng"
                            placeholder="Nhập số lượng "
                            required={true}
                            value={items.quantity}
                            onChange={handleChange}
                        />
                        <Input
                            type="number"
                            name="price"
                            label="Giá"
                            placeholder="Nhập Giá "
                            required={true}
                            value={items.price}
                            onChange={handleChange}
                        />
                        <Input
                            type="text"
                            name="ingredient"
                            label="Nguyên liệu"
                            placeholder="Nhập thành phần nguyên liệu "
                            required={true}
                            value={items.ingredient}
                            onChange={handleChange}
                        />
                        <Input
                            type="number"
                            name="energy"
                            label="Năng lượng"
                            placeholder="Nhập năng lượng thức ăn "
                            required={true}
                            value={items.energy}
                            onChange={handleChange}
                        />
                        <div className={classes.textArea}>
                            <label htmlFor="">
                                Nhập mô tả sản phẩm
                            </label>
                            <textarea rows="3" cols="60" name="description" value={items.description} placeholder="" onChange={handleChange}>
                            
                            </textarea>
                        </div>
                        
                        <button className={classes['button-submit']}
                                onClick={handleSubmit}
                        >
                            Thêm mới
                        </button>
                    </form>
                       
                </div>
            </div>
        </div>
    )
};
export default NewItem;