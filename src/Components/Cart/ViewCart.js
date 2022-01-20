import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import Axios from "axios";
import { selectOrders, selectUserId, deleteOrder, orderUpdater, useridUpdater} from "../../slices/cartDetailsSlice";
import styles from './ViewCart.module.css';
import cart from '../../img/trolley.png';
import moment from "moment";

const ViewCart = () => {
    const dispatch = useDispatch()
    const orderSelector = useSelector(selectOrders);
    const [total, setTotal] = useState(0);
    const userDetail = useSelector(selectUserId);
    const [view, setView] = useState(false);
    useEffect(() => {
        let x = 0;
        orderSelector.map((orders)=>{
            console.log(orders.price);
            x = x + (orders.price * orders.countProduct);
        })
        setTotal(x);
    }, [orderSelector])

    const orderRemover = (index) => {
        dispatch(deleteOrder(index));
    }

    const checkout = async () => {
        await Axios.post("http://localhost:3001/checkout", {
            userid: userDetail.userid,
            orders: orderSelector,
            datepurchased: moment().format(),
        });
        window.alert("Transaction Completed");
        window.location.reload();

    }

    return(
        <React.Fragment>
            <div className={`${styles.container}`} onClick={()=>setView(true)}>
                    <div className={`${styles.ncontainer}`}>
                        <div className={`${styles.ordercount}`}>{orderSelector.length}</div>
                    </div>
                    <img src={cart} alt='cart' className={`${styles.cart}`} /> 
                </div>
            {!view 
            ? 
                null
            :
                <div className={`${styles.overlay}`} onClick={()=>setView(false)}>
                    <div className={`${styles.viewcart}`} onClick={(e) => e.stopPropagation()}
                    id='viewcart'> 
                        <span>Customer: {userDetail.fn} {userDetail.ln}</span>
                        <span>Date: {moment().format('LL')}</span>
                    {orderSelector.length !== 0 ?
                    <div className={`${styles.vieworders}`}>
                    <ul className={`${styles.orderlistheader}`}>
                        <li>Quantity</li>
                        <li>Product</li>
                        <li>Price</li>
                        <li>Total</li>
                        <li>Edit</li>
                    </ul>
                    {orderSelector.map((orders) => (
                    <ul className={`${styles.orderlist}`} key={orders.index}>
                        <li>{orders.countProduct}</li>
                        <li>{orders.productName}</li>
                        <li>P{orders.price}</li>
                        <li>P{orders.countProduct*orders.price}</li>
                        <li>
                            <div className={`${styles.remove}`} onClick={()=>{
                                    orderRemover(orders.index)
                                }}>
                                    Remove
                            </div>
                        </li>
                    
                    </ul>  
                    ))
                    }
                    </div>
                        : 
                        setView(!view)
                    }
                    <div>
                        <span className={`${styles.alignright}`}>Total : P{total}</span>
                        <span className={`${styles.alignright}`}>
                            <button className={`${styles.checkoutbtn}`} onClick={()=>checkout()}>Check out</button>
                        </span>
                    </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default ViewCart;