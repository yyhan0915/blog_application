import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { userInitialStateType } from '../../modules/user';

const HeaderContainer = () => {
    const { user } = useSelector(
        ({ user }: { user: userInitialStateType }) => ({
            user: user.user,
        })
    );
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    };
    return <Header user={user} onLogout={onLogout}></Header>;
};

export default HeaderContainer;
