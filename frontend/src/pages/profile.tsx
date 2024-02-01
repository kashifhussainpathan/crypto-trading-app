import SignUp from "../components/signup";

const Profile = () => {
  return (
    <section className="h-screen bg-[url('./assets/crypto-bg.jpg')] bg-center bg-cover ">
      <div className="h-screen w-screen bg-opacity-60 backdrop-filter backdrop-blur-sm grid place-content-center bg-gray-600">
        <SignUp />
      </div>
    </section>
  );
};

export default Profile;
