import { Fragment, useCallback, useContext, useState } from "react";
import concatErrorMessages from "../../utils/concatErrorMessages";
import { SessionContext } from "../../hooks/SessionContext";
import ButtonSpinner from "../../components/ButtonSpinner";
import * as F from "../../components/formComponents";
import { INPUTS } from "../../utils/constants/index";
import { Link, useNavigate } from "react-router-dom";
import SignPage from "../../layouts/SignPage/index";
import { useForm } from "react-hook-form";
import API from "../../config/api";
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
        data: {
          id,
          name,
          token,
          profilePicture,
          network: { ids },
        },
      } = await API.post(`/signin`, formData);

      const sessionData = {
        auth: { headers: { Authorization: `Bearer ${token}` } },
        user: { name, profilePicture, id, network: ids ?? [] },
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
