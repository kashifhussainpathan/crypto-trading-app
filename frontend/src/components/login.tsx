import { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./formInput";
import Button from "./@ui/button";
import { signInInputs } from "../constants/authConstants";
import { useLoginMutation } from "../features/user/userSlice";

interface ILogin {
  navigateAuth: () => void;
}

const Login: FC<ILogin> = ({ navigateAuth }) => {
  const navigate = useNavigate();

  const [values, setValues] = useState<{
    email: string;
    password: string;
    username: string;
  }>({
    email: "",
    password: "",
    username: "",
  });

  const [login, { isLoading, error, isSuccess }] = useLoginMutation();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const { email, password, username } = values;

      //@ts-ignore
      const { data } = await login({ email, username, password });
      localStorage.setItem("accessToken", data?.data?.accessToken);
      localStorage.setItem("refreshToken", data?.data?.refreshToken);

      if (isSuccess) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="w-[300px] mx-auto bg-white px-4 py-1 rounded-md bg-opacity-70 backdrop-filter backdrop-blur-3xl">
        <div className="w-full bg-gray-100 py-2 flex justify-center items-center px-2 mt-4">
          <p className="font-medium text-lg">Login</p>
        </div>
        <form className="flex flex-col items-center py-4 w-full">
          {signInInputs?.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name as keyof typeof values] || ""}
              onChange={onChange}
            />
          ))}
          <Button onClick={handleSubmit} className="w-full">
            {isLoading ? (
              <div
                className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
                role="status"
                aria-label="loading"
              ></div>
            ) : (
              "Login"
            )}
          </Button>

          {error && (
            <p className="mt-4 text-red-500 text-center">
              {/* @ts-ignore */}
              {error?.data?.message}
            </p>
          )}
        </form>
      </div>
      <p className="text-center text-white mt-1">
        Don't have an account?{" "}
        <span
          className="text-blue-700  cursor-pointer"
          onClick={() => navigateAuth()}
        >
          Signup
        </span>{" "}
      </p>
    </>
  );
};

export default Login;
