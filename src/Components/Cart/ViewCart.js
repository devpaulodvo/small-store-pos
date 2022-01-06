import React, { useEffect, useState, useRef, useCallback } from "react";
import styles from './ViewCart.module.css';
import cart from '../../img/trolley.png';

const ViewCart = () => {
    const [view, setView] = useState(false);
    
    const modalRef = useRef();

    useEffect(() => {

    }, [])
    
    const openModal = () => {
        
            setView(prev => !prev);
        
    }

    const closeModal = e => {
        if(modalRef.current === e.target){
            setView(false);
        }
    }

    const keyPress = useCallback(e=>{
        if(e.keyPress === 'Escape' && view){
            setView(false)
        }
    }, [setView, view])

    return(
        <React.Fragment>
            {!view 
            ? 
                <div className={`${styles.container}`} onClick={()=>setView(true)}>
                    <img src={cart} alt='cart' className={`${styles.cart}`} /> 
                </div>
            :
                <div className={`${styles.overlay}`} onClick={()=>setView(false)}>
                    <div className={`${styles.viewcart}`} onClick={(e) => e.stopPropagation()}
                    id='viewcart'>
                        <p className={`${styles.close}`}>x</p>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default ViewCart;