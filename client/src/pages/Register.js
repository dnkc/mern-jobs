import { useState } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const {
    isLoading,
    showAlert,
    displayAlert,
    clearAlert,
    registerUser,
    loginUser,
  } = useAppContext();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      clearAlert();
      return;
    }
    // const onSubmit = (e) => {
    //   e.preventDefault()
    //   const { name, email, password, isMember } = values
    //   if (!email || !password || (!isMember && !name)) {
    //     displayAlert()
    //     return
    //   }
    //   const currentUser = { name, email, password }
    //   if (isMember) {
    //     setupUser({
    //       currentUser,
    //       endPoint: 'login',
    //       alertText: 'Login Successful! Redirecting...',
    //     })
    //   } else {
    //     setupUser({
    //       currentUser,
    //       endPoint: 'register',
    //       alertText: 'User Created! Redirecting...',
    //     })
    //   }
    // }

    const currentUser = { name, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        {/* email */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
