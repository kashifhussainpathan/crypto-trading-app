import { useState } from "react";
import Login from "../components/login";
import SignUp from "../components/signup";
import UserCard from "../components/userCard";
import { useGetUserQuery } from "../features/user/userSlice";

const Profile = () => {
  const token = localStorage.getItem("accessToken");

  const { data: user } = useGetUserQuery(
    { token },
    { refetchOnMountOrArgChange: true }
  );

  const [toggleAuth, setToggleAuth] = useState<boolean>(false);

  const handleToggleAuth = () => {
    setToggleAuth(!toggleAuth);
  };

  return (
    <section className="h-[90vh] bg-[url('./assets/crypto-bg.jpg')] bg-center bg-cover ">
      <div className="h-[90vh] w-screen bg-opacity-60 backdrop-filter backdrop-blur-sm grid place-content-center bg-gray-600">
        {user ? (
          //@ts-ignore
          <UserCard user={user} />
        ) : toggleAuth ? (
          <SignUp navigateAuth={handleToggleAuth} />
        ) : (
          <Login navigateAuth={handleToggleAuth} />
        )}
      </div>
    </section>
  );
};

export default Profile;
