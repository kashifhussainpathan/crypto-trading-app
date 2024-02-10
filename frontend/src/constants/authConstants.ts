interface InputProps {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  pattern: string;
  errorMessage: string;
  required: boolean;
}

export const signInInputs: InputProps[] = [
  {
    id: 1,
    name: "username",
    type: "text",
    placeholder: "jhon",
    errorMessage:
      "Username should be 3-16 characters and shouldn't include any special character!",
    label: "Username",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Jhon@gmail.com",
    errorMessage: "Please enter a valid email address!",
    label: "Email",
    pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
    required: true,
  },
  {
    id: 3,
    name: "password",
    type: "password",
    placeholder: "12345",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    label: "Password",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  },
];

export const signUnInputs: InputProps[] = [
  {
    id: 1,
    name: "fullName",
    type: "text",
    placeholder: "jhon doe",
    errorMessage: "",
    label: "Full Name",
    pattern: "",
    required: true,
  },
  {
    id: 2,
    name: "username",
    type: "text",
    placeholder: "jhon",
    errorMessage:
      "Username should be 3-16 characters and shouldn't include any special character!",
    label: "Username",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    id: 3,
    name: "email",
    type: "email",
    placeholder: "jhon@gmail.com",
    errorMessage: "Please enter a valid email address!",
    pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
    label: "Email",
    required: true,
  },

  {
    id: 4,
    name: "password",
    type: "password",
    placeholder: "12345",
    errorMessage:
      "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
    label: "Password",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
  },
  {
    id: 5,
    name: "confirmPassword",
    type: "password",
    placeholder: "12345",
    errorMessage: "Password don't match!",
    label: "Confirm Password",
    pattern: "",
    required: true,
  },
];
