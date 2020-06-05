import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import { userStateType } from '../../modules/reduxTypes';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

const PostListBlock = styled(Responsive)`
    margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }
    h2 {
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color: ${palette.gray[6]};
        }
    }
    p {
        margin-top: 2rem;
    }
`;

type postBasic = {
    publishedDate: Date;
    user?: { username?: string };
    tags: string[];
    title: string;
    body: string;
    _id: number;
};
interface PostItemProps {
    post: postBasic;
}
const PostItem: React.FC<PostItemProps> = ({ post }) => {
    const { publishedDate, user, tags, title, body, _id } = post;
    return (
        <PostItemBlock>
            <h2>
                <Link to={`/@${user.username}/${_id}`}>{title}</Link>
            </h2>
            <SubInfo
                username={user.username}
                publishedDate={new Date(publishedDate)}
            />
            <Tags tags={tags} />
            <p>{body}</p>
        </PostItemBlock>
    );
};

export interface PostListProps {
    posts: postBasic[];
    loading: string;
    error: string;
    showWriteButton: userStateType['user'];
}
const PostList: React.FC<PostListProps> = ({
    posts,
    loading,
    error,
    showWriteButton,
}) => {
    if (error) {
        return <PostListBlock>에러가 발생하였습니다.</PostListBlock>;
    }
    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                {showWriteButton && (
                    <Button cyan={1} to='/write'>
                        새 글 작성하기기
                    </Button>
                )}
            </WritePostButtonWrapper>
            {!loading && posts && (
                <div>
                    {posts.map(post => (
                        <PostItem post={post} key={post._id} />
                    ))}
                </div>
            )}
        </PostListBlock>
    );
};

export default PostList;
