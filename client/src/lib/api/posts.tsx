import qs from 'qs';
import client from './client';
import { writeStateType } from '../../modules/reduxTypes';

export const writePost = ({ title, body, tags }: writeStateType) =>
	client.post('/api/posts', { title, body, tags });

export const readPost = (id: writeStateType) => client.get(`/api/posts/${id}`);

export const listPosts = ({
	page,
	username,
	tag,
}: {
	page: number;
	username: string;
	tag: string;
}) => {
	const queryString = qs.stringify({ page, username, tag });
	return client.get(`/api/posts?${queryString}`);
};
