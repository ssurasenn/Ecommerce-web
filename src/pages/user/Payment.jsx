
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/Strpie";
import useEcomStore from '../../store/ecom-store'
import CheckoutForm from "../../components/CheckOutForm";

const stripePromise = loadStripe("pk_test_51QWhIAIMGXbiVGVR5e0mWq2pCwYYCegrOLLJAodlDEerZG8fbOoeUpucMf6Xj4xmdTeSig76L9v5qTuTbQ8Mc8eQ00KkFB2SwK");


const Payment = () => {
  const token = useEcomStore((s)=>s.token)
  const [clientSecret, setClientSecret] = useState("");

  useEffect(()=>{
    payment(token)
    .then((res)=>{
      console.log(res)
      setClientSecret(res.data.clientSecret)
    })
    .catch((err)=>{
      console.log(err)
    })

  },[])

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <div>
      {
        clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} 
          stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )
      }

    </div>
  )
}

export default Payment