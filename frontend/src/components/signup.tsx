import { ChangeEvent, SyntheticEvent, useState } from "react";
import FormInput from "./formInput";
import Button from "./@ui/button";
import { signUnInputs } from "../constants/authConstants";
import {
  useLoginMutation,
  useSignupMutation,
} from "../features/user/userSlice";

const SignUp = () => {
  const [values, setValues] = useState<{
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const [signup, { isLoading, error }] = useSignupMutation();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    try {
      // await signup({
      //   email: values.email,
      //   password: values.password,
      //   username: values.username,
      //   fullName: values.fullName,
      // });
      const response = await login({
        email: "kashifpathan@gmail.com",
        username: "kashifpathan",
        password: "kashif1@",
      });

      localStorage.setItem("accessToken", response?.data?.data.accessToken);
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dynamicInputs = signUnInputs?.map((input) => {
    if (input.name === "confirmPassword") {
      return {
        ...input,
        pattern: values.password,
      };
    }
    return input;
  });

  return (
    <div className="w-[300px] mx-auto bg-white px-4 py-1 rounded-md bg-opacity-70 backdrop-filter backdrop-blur-3xl">
      <div className="w-full bg-gray-100 py-2 flex justify-center items-center px-2 mt-4">
        <p className="font-medium text-lg">Create Account</p>
      </div>
      <form className="flex flex-col items-center py-4 w-full">
        {dynamicInputs?.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name as keyof typeof values] || ""}
            onChange={onChange}
          />
        ))}

        <Button
          onClick={handleSubmit}
          className="border-2 !border-gray-600 p-2 w-full !mt-1"
        >
          {isLoading ? "Creating.." : "Create Account"}
        </Button>

        {error && (
          <p className="mt-4 text-red-500 text-center">{error?.data.message}</p>
        )}
      </form>
    </div>
  );
};

export default SignUp;
