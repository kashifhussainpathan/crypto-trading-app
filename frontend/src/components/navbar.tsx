import { Link } from "react-router-dom";
import profile from "../assets/dummy-user.webp";
import logo from "../assets/logo.jpg";
import {
  useGetUserQuery,
  useRefreshTokenMutation,
} from "../features/user/userSlice";
import { useEffect } from "react";

const Navbar = () => {
  const token = localStorage.getItem("accessToken");

  const { data: user, error } = useGetUserQuery({ token });
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const handleRefreshToken = async () => {
      try {
        const token = localStorage.getItem("refreshToken");
        //@ts-ignore
        const { data } = await refreshToken(token);

        localStorage.setItem("accessToken", data?.accessToken);
        localStorage.setItem("refreshToken", data?.refreshToken);
      } catch (error) {
        console.log({ error });
      }
    };

    //@ts-ignore
    if (error?.data?.message === "jwt expired") {
      handleRefreshToken();
    }
  }, [error]);

  return (
    <nav className="flex justify-between items-center pr-14 pl-6 h-[8vh] shadow-md mb-2">
      <div className="font-bold text-2xl flex items-center gap-1">
        <img src={logo} alt="logo" className="w-12 object-cover rounded-full" />
        <Link to={"/"}> Coinbase </Link>
      </div>

      <div className="font-medium">
        <div>
          <Link to={"/profile"}>
            <img
              src={user?.avatar ? user?.avatar : profile}
              alt="profile"
              className="w-7 h-7 object-cover rounded-full shadow border-gray-400 border"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
