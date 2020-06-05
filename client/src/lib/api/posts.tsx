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
	// return client.get(`/api/posts/`);
};

export const updatePost = ({
	id,
	title,
	body,
	tags,
}: {
	id: string;
	title: string;
	body: string;
	tags: string[];
}) =>
	client.patch(`/api/posts/${id}`, {
		title,
		body,
		tags,
	});

export const removePost = (id: string) => client.delete(`/api/posts/${id}`);
