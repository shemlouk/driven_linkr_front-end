import concatErrorMessages from "../../utils/concatErrorMessages";
import ButtonSpinner from "../../components/ButtonSpinner";
import { Fragment, useCallback, useState } from "react";
import { INPUTS } from "../../utils/constants/index";
import * as F from "../../components/formComponents";
import { Link, useNavigate } from "react-router-dom";
import SignPage from "../../layouts/SignPage/index";
import { useForm } from "react-hook-form";
import API from "../../config/api";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(2).max(50),
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
      await API.post(`/signup`, data);
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
              data-test={input.dataTest}
            />
          </Fragment>
        ))}
        <F.Submit disabled={isLoading} data-test="sign-up-btn">
          {isLoading ? <ButtonSpinner /> : "Sign Up"}
        </F.Submit>
      </form>
      <Link to="/" data-test="login-link">
        Switch back to log in
      </Link>
    </SignPage>
  );
};

export default SignUp;
