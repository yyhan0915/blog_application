import redux from 'redux';
//auth
export interface authStateType {
	[id: string]: object | string | null;
}

export type auth_changeFieldPayload = {
	form?: string;
	key?: string;
	value?: string;
};
export type auth_changeFieldPayload_ = {
	payload: { form: string; key: string; value: string };
};
export type auth_userAccountPayload = {
	username: string;
	password: string;
};
//loading
export interface loadingStateType {
	post_READ_POST?: string;
}
//user
export interface userStateType {
	user: { user: string; username: string };
	checkError: null | string;
}
//write
export interface writeStateType {
	title: string;
	body: string;
	tags: string[];
	post: { _id: number; user: { username: string } };
	postError: null | string;
	originalPostId: string | number;
}

// posts
export interface postStateType {
	post: {
		title: string;
		body: string;
		user: {
			username: string;
		};
		publishedDate: Date | string | number;
		tags: string[];
		error: {
			response:
				| any
				| {
						status: number;
				  };
		};
	};
	error: any;
}

//posts
export interface postsStateType {
	posts: string[];
	error: any;
}
