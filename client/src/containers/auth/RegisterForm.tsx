import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const RegisterForm: React.FC<RouteComponentProps> = ({ history }) => {
    const [error, setError] = useState<null | string>(null);
    const dispatch = useDispatch();
    const { form, auth, authError, user } = useSelector(
        ({ auth, user }: { auth: any; user: any }) => ({
            form: auth.register,
            auth: auth.auth,
            authError: auth.Error,
            user: user.user,
        })
    );

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value,
            })
        );
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password, passwordConfirm } = form;
        if ([username, password, passwordConfirm].includes('')) {
            setError('fill all blanks');
            return;
        }
        // 비밀번호가 일치하지 않는다면
        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(
                changeField({ form: 'register', key: 'password', value: '' })
            );
            dispatch(
                changeField({
                    form: 'register',
                    key: 'passwordConfirm',
                    value: '',
                })
            );
            return;
        }
        await dispatch(register({ username, password }));
        await dispatch(check(username));
    };

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
            if (authError.response.status === 409) {
                setError('이미 존재하는 계정입니다.');
                return;
            }
            setError('회원가입 실패');
            return;
        }
        if (auth) {
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    // useEffect(() => {
    // 	if (user) {
    // 		console.log('check API 성공');
    // 		console.log(user);
    // 		history.push('/');
    // 	}
    // }, [user, history]);

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
            type='register'
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default withRouter(RegisterForm);
