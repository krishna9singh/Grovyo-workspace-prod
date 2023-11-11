"use client";
import { API } from "@/Essentials";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [id, setId] = useState("");
  const [orderDetails, setOrderDetails] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`${API}/fetchallorders/${id}`)
        .then((res) => {
          console.log(res.data);
          setOrderDetails([res.data]);
          setOrder(res.data.orders);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  console.log(order);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    setId(id);
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center  items-center gap-4">
        <div>
          {orderDetails.map((o, i) => (
            <div key={i}>
              <div>all orders: {o?.allorders}</div>
              <div>completedOrders: {o?.completedOrders?.length}</div>
              <div>customers: {o?.customers}</div>
              <div>damaged orders: {o?.damaged?.length}</div>
              <div>pending orders: {o?.pendingOrders?.length}</div>
              <div>returned orders: {o?.returned?.length}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-5 justify-center items-center">
          {order.map((d, j) => (
            <div key={j}>
              <div>customer name : {}</div>
              <div>Order Date : {d?.createdAt.slice(0, 10)}</div>
              <div>Payment Type : {d?.paymentMode}</div>
              <div>Status : {d?.currentStatus}</div>
              <div>Quantity : {d?.quantity}</div>
              <div>orderId: {d?.orderId}</div>
              <div>Total: {d?.total}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
