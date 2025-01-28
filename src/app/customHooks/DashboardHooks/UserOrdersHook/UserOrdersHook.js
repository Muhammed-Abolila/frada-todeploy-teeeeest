import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetMyOrders } from "../../../Redux/Actions/OrdersActions";
const UserOrdersHook = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const getMyOrdersFunc =  () => {
            try {
                 dispatch(GetMyOrders())
            } catch (e) {
                console.log(e);
            }
        };
        getMyOrdersFunc();
    }, []);
    let MyOrderRes = useSelector(state => state.OrderReducer.MyOrders);
    let orderData = [];
    try {
        if (MyOrderRes.data) {
            orderData = MyOrderRes.data
        }
    } catch (e) {
        console.log(e);
    }
    // Show Order status
    const Orderstatus = (OrderStatusID) => {
        if (OrderStatusID == 1) {
            return <h6 className="subtitle">تحت المراجعة</h6>
        } else if (OrderStatusID == 2) {
            return <h6 className="subtitle">قيد الشحن</h6>
        }
        else if (OrderStatusID == 4 || OrderStatusID == 5 || OrderStatusID == 9) {
            return <h6 className="subtitle">مؤجلة</h6>
        }
        else if (OrderStatusID == 6) {
            return <h6 className="subtitle">تم التسليم</h6>
        }
        else if (OrderStatusID == 7) {
            return <h6 className="subtitle">ملغاه من جانب الأدمن</h6>
        } else if (OrderStatusID == 8) {
            return <h6 className="subtitle">معلقة</h6>
        }
        else if (OrderStatusID == 10) {
            return <h6 className="subtitle">ملغاه من جانب العميل</h6>
        }
    }
    console.log(orderData);
    return [orderData, Orderstatus]
}

export default UserOrdersHook
