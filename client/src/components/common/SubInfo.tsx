import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import { postStateType } from '../../modules/reduxTypes';

interface SubInfoBlockProps {
	hasMarginTop?: boolean;
	publishedDate?: Date | string | number;
	children?: JSX.Element[];
}
interface SubInfoProps extends SubInfoBlockProps {
	username: string;
}
const SubInfoBlock = styled.div<SubInfoBlockProps>`
	${props =>
		props.hasMarginTop &&
		css`
			margin-top: 1rem;
		`}
        color : ${palette.gray[6]};
        span+span:before {
            color : ${palette.gray[4]};
            padding-left : 0.25rem;
            padding-right: 0.25rem;
            content : '\\B7'
        }
`;

const SubInfo: React.FC<SubInfoProps> = ({
	username,
	publishedDate,
	hasMarginTop,
}) => {
	return (
		<SubInfoBlock hasMarginTop={hasMarginTop}>
			<span>
				<b>
					<Link to={`/@${username}`}>{username}</Link>
				</b>
			</span>
			<span>{new Date(publishedDate).toLocaleDateString()}</span>
		</SubInfoBlock>
	);
};

export default SubInfo;
