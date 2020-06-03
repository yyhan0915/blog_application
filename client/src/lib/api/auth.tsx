import client from './client';

//login
export const login = ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    client.post('/api/auth/login', { username, password });
};

//register
export const register = ({
    username,
    password,
}: {
    username: string;
    password: string;
}) => {
    client.post('/api/auth/register', { username, password });
};

//check login
export const check = () => client.get('/api/auth/check');

//logout
export const logout = () => client.post('/api/auth/logout');
