import client from './client';
import { auth_userAccountPayload } from '../../modules/reduxTypes';
//login
export const login = ({ username, password }: auth_userAccountPayload) => {
	client.post('/api/auth/login', { username, password });
};

//register
export const register = ({ username, password }: auth_userAccountPayload) => {
	client.post('/api/auth/register', { username, password });
};

//check login
export const check = () => client.get('/api/auth/check');

//logout
export const logout = () => client.post('/api/auth/logout');
