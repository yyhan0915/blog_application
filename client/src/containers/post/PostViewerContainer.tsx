import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewr';
import { RouteComponentProps } from 'react-router-dom';
import { postStateType, loadingStateType } from '../../modules/reduxTypes';
import { RootState } from '../../modules/';
interface MatchParams {
	postId: string;
}

const PostViewerContainer: React.FC<RouteComponentProps<MatchParams>> = ({
	match,
}) => {
	const { postId } = match.params;
	const dispatch = useDispatch();
	const { post, error, loading } = useSelector(
		({
			post,
			loading,
		}: {
			post: postStateType;
			loading: loadingStateType;
		}) => ({
			post: post.post,
			error: post.error,
			loading: loading['post_READ_POST'],
		})
	);

	useEffect(() => {
		dispatch(readPost(postId));
		return () => {
			dispatch(unloadPost());
		};
	}, [dispatch, postId]);
	return <PostViewer post={post} loading={loading} error={error} />;
};

export default withRouter(PostViewerContainer);
