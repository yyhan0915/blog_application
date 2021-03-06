import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, loginSaga } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { check } from "../../modules/user";

const LoginForm: React.SFC<RouteComponentProps> = ({ history }) => {
  const [error, setError] = useState<null | string>(null);

  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(
    ({ auth, user }: { auth: any; user: any }) => ({
      auth: auth.auth,
      authError: auth.authError,
      user: user.user,
      form: auth.login,
    })
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: "login",
        key: name,
        value,
      })
    );
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = form;
    await dispatch(loginSaga({ username, password }));
    await dispatch(check(username));
  };

  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log("error occur");
      console.log(authError);
      setError("failed to login");
      return;
    }
    if (auth) {
      console.log("로그인 성공");
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem("user", JSON.stringify(user));
        history.push("/");
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  }, [history, user]);
  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(LoginForm);
