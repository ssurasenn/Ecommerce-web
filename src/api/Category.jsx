import axios from "axios";

export const createCategory = async (token, form) => {
  // code body
  return await axios.post("https://ecommerce-liard-eight-90.vercel.app/api/category", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listCategory = async () => {
  // code body
  return await axios.get("https://ecommerce-liard-eight-90.vercel.app/api/category");
};
export const removeCategory = async (token,id) => {
  // code body
  return await axios.delete("https://ecommerce-liard-eight-90.vercel.app/api/category/"+id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
