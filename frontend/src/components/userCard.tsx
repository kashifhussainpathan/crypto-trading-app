import { FC } from "react";
import { IOrder } from "../models/order.type";
import Button from "./@ui/button";
import { useLogoutMutation } from "../features/user/userSlice";

export interface IUserCard {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  balance: number;
  avatar: string;
  orders: IOrder[];
  createdAt: string;
  updatedAt: string;
}
//@ts-ignore
const UserCard: FC<IUserCard> = ({ user }) => {
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await logout({ token: refreshToken });

      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[300px] mx-auto bg-white px-4 py-4 rounded-md bg-opacity-60 backdrop-filter backdrop-blur-3xl">
      <img
        src={user?.avatar}
        alt="user avatar"
        className=" w-20 h-20 rounded-full object-cover mx-auto"
      />

      <div className="w-full mx-auto text-center mt-2">
        <p className="font-semibold text-lg">{user?.fullName}</p>
        <p>@{user?.username}</p>
        <p>{user?.email}</p>
        <p className="font-semibold">
          Balance: ${parseFloat(user?.balance).toFixed(2)}
        </p>
        <Button className="w-full" onClick={handleLogout}>
          {isLoading ? (
            <div
              className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
              role="status"
              aria-label="loading"
            ></div>
          ) : (
            "Logout"
          )}
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
