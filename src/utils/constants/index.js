export const API_URL = process.env.REACT_APP_API_URL;

export const INPUTS = [
  {
    form: ["signup", "signin"],
    name: "email",
    type: "email",
    placeholder: "email",
    dataTest: "email",
  },
  {
    form: ["signup", "signin"],
    name: "password",
    type: "password",
    placeholder: "password",
    dataTest: "password",
  },
  {
    form: ["signup"],
    name: "username",
    type: "text",
    placeholder: "username",
    dataTest: "username",
  },
  {
    form: ["signup"],
    name: "profilePicture",
    type: "url",
    placeholder: "picture url",
    dataTest: "picture-url",
  },
];
