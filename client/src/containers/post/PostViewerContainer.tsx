import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import PostActionButtons from '../../components/post/PostActionButtons';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import {
    postStateType,
    loadingStateType,
    userStateType,
} from '../../modules/reduxTypes';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

interface MatchParams {
    postId: string;
}

const PostViewerContainer: React.FC<RouteComponentProps<MatchParams>> = ({
    match,
    history,
}) => {
    const { postId } = match.params;
    const dispatch = useDispatch();
    const { post, error, loading, user } = useSelector(
        ({
            post,
            loading,
            user,
        }: {
            post: postStateType;
            loading: loadingStateType;
            user: userStateType;
        }) => ({
            post: post.post,
            error: post.error,
            loading: loading['post/READ_POST'],
            user: user.user,
        })
    );

    useEffect(() => {
        dispatch(readPost(postId));
        return () => {
            dispatch(unloadPost());
        };
    }, [dispatch, postId]);

    const onEdit = async () => {
        await dispatch(setOriginalPost(post));
        await history.push('/write');
    };

    const onRemove = async () => {
        try {
            await removePost(postId);
            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };

    const ownPost = (user && user._id) === (post && post.user._id);

    return (
        <PostViewer
            post={post}
            loading={loading}
            error={error}
            actionButtons={
                ownPost && (
                    <PostActionButtons onRemove={onRemove} onEdit={onEdit} />
                )
            }
        />
    );
};

export default withRouter(PostViewerContainer);
