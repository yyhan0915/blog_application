import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { check } from '../../modules/user';

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
                form: 'login',
                key: name,
                value,
            })
        );
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password } = form;
        dispatch(login({ username, password }));
    };

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
            console.log('error occur');
            console.log(authError);
            setError('failed to login');
            return;
        }
        if (auth) {
            console.log('로그인 성공');
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if (user) {
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [history, user]);
    return (
        <AuthForm
            type='login'
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(LoginForm);
