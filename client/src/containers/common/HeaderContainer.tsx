import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { userStateType } from '../../modules/reduxTypes';

const HeaderContainer: React.FC = () => {
	const { user } = useSelector(({ user }: { user: userStateType }) => ({
		user: user.user,
	}));
	const dispatch = useDispatch();
	const onLogout = () => {
		dispatch(logout());
	};
	return <Header user={user} onLogout={onLogout}></Header>;
};

export default HeaderContainer;
