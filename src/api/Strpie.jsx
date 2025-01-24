import axios from "axios";

export const payment = async (token) =>
  await axios.post("https://ecommerce-liard-eight-90.vercel.app/api/user/create-payment-intent",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );