import React, { useEffect, useState }  from "react";
import Axios from "axios";
// import { useSelector, useDispatch } from 'react-redux'


import styles from './Payment.module.css';

const Payment = (props) =>{
    const [userdetail, setUserDetail] = useState(null);
    const [payables, setPayables] = useState(null);
    const [fromdate, setFromDate] = useState(null);
    const [todate, setToDate] = useState(null);

    useEffect( async () =>{
        getPayables()
        // let result = await Axios.post("http://localhost:3001/getpayables");
        // setPayables(result.data);
    },[fromdate, todate]);

    const getPayables = async () =>{

        let result = await Axios.post("http://localhost:3001/getpayables", {
            fromdate: fromdate,
            todate: todate,
        });

        console.log(result);
    }

    const userIdGetter = async (object) => {
        let result = await Axios.post("http://localhost:3001/selectuser", {
                            userid: object
                        });
        if(result.data === null){
            window.alert("User Not Found!");
        }
        else{
            setUserDetail(result)
        }
    }


    return( 
            <React.Fragment>
                <div className={`${styles.container}`}> 
                    <ul className={`${styles.ul}`}>
                        <li className={`${styles.input}`}>
                            <label>Customer Name or ID</label>
                            <input onKeyDown={(e)=>{
                                if(e.code == "Enter"){
                                    userIdGetter(e.target.value);
                                }
                            }}/>
                        </li>
                        <li className={`${styles.input}`}>
                            <label>Date Start</label>
                            <input type="date" id="datefrom" name="datefrom" onChange={(e)=>{
                                 setFromDate(e.target.value);
                            }}/>
                        </li>
                        <li className={`${styles.input}`}>
                            <label>Date End</label>
                            <input type="date" id="dateto" name="dateto" onChange={(e)=>{
                                 setToDate(e.target.value);
                            }}/>
                        </li>
                    </ul>
                    <table className={`${styles.customers}`}>
                        <tbody>
                            <tr>
                                <th>ID #</th>
                                <th>Customer</th>
                                <th>Amount Payable</th>
                                <th>Balance</th>
                                <th>Task</th>
                            </tr>
                        </tbody>
                        <tbody>
                            {payables === null ?

                             <tr>
                                <td>a</td>
                                <td>a</td>
                                <td>a</td>
                                <td>a</td>
                                <td>a</td>
                            </tr>
                            :
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            }
                           
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
            )
}

export default Payment;