import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state,action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passReducer = (state,action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length>6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length>6 };
  }
  return { value: "", isValid: false };
};

const collegeReducer = (state,action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length>0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length>0  };
  }
  return { value: "", isValid: false };
};
const Login = (props) => {
  
  
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passState, dispatchPass] = useReducer(passReducer, {
    value: "",
    isValid: false,
  });

  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {
    value: "",
    isValid: false,
  });

  useEffect(() => {
    setFormIsValid(
      emailState.value.includes("@") &&
      passState.value.trim().length > 0 &&
      collegeState.value.trim().length > 0
    );
  }, [emailState.value,  passState.value, collegeState.value]);

  const authctx=useContext(AuthContext)
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({ type: "USER_INPUT", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validateCollegeHandler = () => {
    dispatchCollege({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPass( { type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authctx.onLogin(emailState.value,  passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
          <Input
            type="email"
            id="email"
            label='E-mail'
            isValid={emailState.isValid}
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
          <Input
            type="college"
            id="college"
            label='college'
            isValid={collegeState.isValid}
            value={ collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
          <Input
            type="password"
            id="password"
            label='password'
            isValid={passState.isValid}
            value={ passState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
