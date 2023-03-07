import concatErrorMessages from "../../utils/concatErrorMessages.js";
import { INPUTS, API_URL } from "../../utils/constants/index.js";
import ButtonSpinner from "../../components/ButtonSpinner.js";
import * as F from "../../components/formComponents.js";
import { Fragment, useCallback, useState } from "react";
import SignPage from "../../layouts/SignPage/index.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Joi from "joi";

const schema = Joi.object({
  username: Joi.string().min(2).max(50),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(8).max(16),
  profilePicture: Joi.string().uri(),
})
  .options({ presence: "required" })
  .required();

const inputs = INPUTS.filter((input) => input.form.includes("signup"));

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const { error } = schema.validate(data, { abortEarly: false });
      if (error) {
        alert(concatErrorMessages(error));
        console.error(error);
        setIsLoading(false);
        return;
      }
      await axios.post(`${API_URL}/signup`, data);
      navigate("/");
    } catch ({ response }) {
      if (response.status === 409) alert("Email already signed up!");
      setIsLoading(false);
    }
  });

  return (
    <SignPage>
      <form onSubmit={handleSubmit(submit)}>
        {inputs.map((input, index) => (
          <Fragment key={index}>
            <F.Input
              {...register(input.name)}
              type={input.type}
              disabled={isLoading}
              placeholder={input.placeholder}
            />
          </Fragment>
        ))}
        <F.Submit disabled={isLoading}>
          {isLoading ? <ButtonSpinner /> : "Sign Up"}
        </F.Submit>
      </form>
      <Link to="/">Switch back to log in</Link>
    </SignPage>
  );
};

export default SignUp;
