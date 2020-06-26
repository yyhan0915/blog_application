import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

interface TagsProps {
	tags: string[];
}

const TagsBlock = styled.div`
	margin-top: 0.5rem;
	.tag {
		display: inline-block;
		color: ${palette.cyan[7]};
		text-decoration: none;
		margin-right: 0.5rem;
		&:hover {
			color: ${palette.cyan[6]};
		}
	}
`;

const Tags: React.FC<TagsProps> = ({ tags }) => {
	return (
		<TagsBlock>
			{tags.map(tag => (
				<Link className='tag' to={`/?tag=${tag}`} key={tag}>
					#{tag}
				</Link>
			))}
		</TagsBlock>
	);
};

export default Tags;
