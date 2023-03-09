import concatErrorMessages from "../../utils/concatErrorMessages.js";
import { Fragment, useCallback, useContext, useState } from "react";
import { INPUTS, API_URL } from "../../utils/constants/index.js";
import { SessionContext } from "../../hooks/SessionContext.js";
import ButtonSpinner from "../../components/ButtonSpinner.js";
import * as F from "../../components/formComponents.js";
import SignPage from "../../layouts/SignPage/index.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(8).max(16),
})
  .options({ presence: "required" })
  .required();

const inputs = INPUTS.filter((input) => input.form.includes("signin"));

const SignIn = () => {
  const { updateSession } = useContext(SessionContext);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submit = useCallback(async (formData) => {
    setIsLoading(true);
    try {
      const { error } = schema.validate(formData, { abortEarly: false });
      if (error) {
        alert(concatErrorMessages(error));
        console.error(error);
        setIsLoading(false);
        return;
      }

      const {
        data: { token, username, profilePicture },
      } = await axios.post(`${API_URL}/signin`, formData);

      const sessionData = {
        auth: { headers: { Authorization: `Bearer ${token}` } },
        user: { username, profilePicture },
      };

      localStorage.session = JSON.stringify(sessionData);
      updateSession(sessionData);

      navigate("/timeline");
    } catch ({ response: { status } }) {
      switch (status) {
        case 404:
          alert("Email not found!");
          break;
        case 401:
          alert("Password incorrect!");
          break;
        default:
          alert("Could not sign in! Try again later.");
          break;
      }
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
        <F.Submit disabled={isLoading} data-test="login-btn">
          {isLoading ? <ButtonSpinner /> : "Sign In"}
        </F.Submit>
      </form>
      <Link to="/sign-up" data-test="sign-up-link">
        First time? Create an account!
      </Link>
    </SignPage>
  );
};

export default SignIn;
