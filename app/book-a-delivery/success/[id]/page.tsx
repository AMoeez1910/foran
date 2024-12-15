import React from "react";

const fetchOrderData = async (orderId: string) => {
  const response = await fetch(
    process.env.URL + `/api/get-order-details/${orderId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch order data");
  }
  const data = await response.json();
  return data;
};

interface CheckoutProps {
  params: {
    id: string;
  };
}

export default async function Checkout({ params }: CheckoutProps) {
  const { id } = params;
  let orderData = null;
  try {
    orderData = await fetchOrderData(id);
    console.log("Order data:", orderData);
  } catch (error) {
    console.error("Error fetching order data:", error);
  }

  return (
    <div>
      <h1>Checkout</h1>
      <p>Order ID: {id}</p>
      <h2>Order Details:</h2>
      <pre>{JSON.stringify(orderData, null, 2)}</pre>
    </div>
  );
}
