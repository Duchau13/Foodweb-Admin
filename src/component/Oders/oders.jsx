//import { Link } from 'react-router-dom'
import classes from './oders.module.css'
import Navbar from '../Navbar/navbar'
import React, { useEffect, useState } from "react";
import api from '../../redux/axois'
import { useNavigate} from "react-router-dom";




const Oders = () => {
    const token = localStorage.getItem('token')
    const [orders,setOrders] = useState([])
    const [fromday,setFromday] = useState(0)
    const [today,setToday] = useState(0)
    const [status,setStatus] = useState(0)
    const navigate = useNavigate();

    /*
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate("/login")
        }
  
      })
    */
    useEffect(() => {
        async function getData(){
          const res = await api.get("/orders",
            {
            headers: {
                Access_token: token,
            }
            }
            
          )
          return res
        }
        getData().then((res) => {
          setOrders(res.data)
        })
        getData().catch((err) => {
          console.log(err)
        })
      },[token])
      //console.log(orders)

        const handleChange1 =(e) => {
        setFromday(e.target.value)
        }
        const handleChange2 =(e) => {
        setToday(e.target.value)
        }
        const handleChangeStatus =(e) => {
            setStatus(e.target.value)
        }
        console.log(status)
        //console.log(fromday)
        //console.log(today)

    function Status(e) {
        const order = e.value
        //console.log(order)
        if(order===0){
            return(
                <p className={classes['text-wait']} >Chưa xác nhận </p>
            )
        }
        if(order===1){
            return <p className={classes['text-confirm']} >Đã xác nhận </p>
        }
        else{
            return <p className={classes['text-cancel']}>Đã huỷ</p>
        }
    }

    const fetchData = async () => {
        const res = await api.get(`/orders/thongkedonhang?tuNgay=${fromday}&denNgay=${today}`,
        {
            headers: {
                Access_token: token,
            }
        }
        )
        const data = res.data.orderList;
        return data;
        
    }
    const fetchDataOnlyStatus = async () => {
        const res = await api.get(`/orders/thongkedonhang?status=${status}`,
        {
            headers: {
                Access_token: token,
            }
        }
        )
        const data = res.data.orderList;
        return data;
        
    }
    const fetchDataAll = async () => {
        const res = await api.get(`/orders/thongkedonhang?tuNgay=${fromday}&denNgay=${today}&status=${status}`,
        {
            headers: {
                Access_token: token,
            }
        }
        )
        const data = res.data.orderList;
        return data;
        
    }

    

    const handlePgaeclick = async (data) => {
            //let currentPage = data.selected +1;
        if(fromday!==0 && today!==0 && status===0){
            const currentData = await fetchData();
            console.log(currentData)
            setOrders(currentData)
        }
        if(fromday===0 && today===0 && status!==0){
            const currentData = await fetchDataOnlyStatus();
            console.log(currentData)
            setOrders(currentData)
        }
        if(fromday!==0 && today!==0 && status!==0){
            const currentData = await fetchDataAll();
            console.log(currentData)
            setOrders(currentData)
        }
                 
    }
      
    return(
        <div>
            <Navbar/>
            <div className={classes['title']}>
                <h1>Danh sách đơn đặt hàng</h1>
            </div>
            <div className={classes['container-table']}>
            <div className={classes['form-search']}>
                <input type="date"
                    onChange={handleChange1} 
                />
                <p>Đến ngày</p>
                <input type="date"
                    onChange={handleChange2} 
                />
                <label htmlFor="">Trạng thái</label>
                <select className={classes['form-select']}
                    onChange={handleChangeStatus}
                >
                    <option></option>
                    <option value="0">Chưa xác nhận</option>
                    <option value="1">Đã xác nhận</option>
                    <option value="2">Đã Huỷ</option>
                </select>
                <button
                    onClick={handlePgaeclick}
                >
                    Tìm kiếm
                </button>
            </div>
            <table className="table ">
                <thead className={classes['table-header']}>
                    <tr>
                        <th>Tên Khách Hàng</th>
                        <th>Thời gian đặt hàng</th>
                        <th>Ghi chú</th>
                        <th>Phương thức tt</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái thanh toán</th>
                    </tr>
                </thead>
                <tbody>
                {orders.map((order =>{
                            return (
                                <tr key={order.id_order}>
                                    <th className={classes['name-oder']}>
                                    <h1
                                        onClick={() => navigate(`/oder/${order.id_order}`)}
                                    >
                                        {order.name_customer}
                                    </h1>
                                    </th>
                                    <th className={classes['time-oder']}>{order.datetime}</th>
                                    <th className={classes['des-oder']}>{order.description}</th>
                                    <th className={classes['pay-oder']}>{order.name_payment}</th>
                                    <th>{order.total}</th>
                                    <th><Status value={order.status}/></th>
                                </tr>
                            )
                }))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Oders;

