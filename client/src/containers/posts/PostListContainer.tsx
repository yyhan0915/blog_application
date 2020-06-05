import React, { useEffect } from 'react';
import qs from 'qs';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../../components/posts/PostList';
import { listPosts } from '../../modules/posts';
import { loadingStateType, userStateType } from '../../modules/reduxTypes';
import { PostListProps } from '../../components/posts/PostList';

interface MatchParams {
    parse?: string;
}
const PostListContainer: React.FC<RouteComponentProps<MatchParams>> = ({
    location,
    match,
}) => {
    const dispatch = useDispatch();
    const { posts, error, loading, user } = useSelector(
        ({
            posts,
            loading,
            user,
        }: {
            posts: PostListProps;
            loading: loadingStateType;
            user: userStateType;
        }) => ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
            user: user.user,
        })
    );

    useEffect(() => {
        const { tag, username, page } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch(listPosts({ tag, username, page }));
    }, [dispatch, location.search]);

    return (
        <PostList
            loading={loading}
            error={error}
            posts={posts}
            showWriteButton={user}
        />
    );
};

export default withRouter(PostListContainer);
