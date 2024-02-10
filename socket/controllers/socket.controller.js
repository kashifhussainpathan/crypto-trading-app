import axios from "axios";

export const closeOrder = async (id, profit, token) => {
  try {
    await axios.patch(
      "http://localhost:8000/api/v1/users/order",
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
