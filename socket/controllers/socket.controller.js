import axios from "axios";

const BASE_URL = `${process.env.BASE_URL}/api/v1/users/order`;

export const closeOrder = async (id, profit, token) => {
  try {
    await axios.patch(
      BASE_URL,
      { id, profit },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Failed to close order:", error);
  }
};
