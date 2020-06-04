import React from 'react';
import styled, { StyledComponent } from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';
import { responsiveProps } from './Responsive';
const HeaderBlock = styled.div`
	position: fixed;
	width: 100%;
	background: white;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const UserInfo = styled.div`
	font-weight: 800;
	margin-right: 1rem;
`;
const Wrapper: StyledComponent<
	React.FC<responsiveProps>,
	any,
	{},
	never
> = styled(Responsive)`
	height: 4rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.logo {
		font-size: 1.125rem;
		font-weight: 800;
		letter-spacing: 2px;
	}
	.right {
		display: flex;
		align-items: center;
	}
`;

const Spacer = styled.div`
	height: 4rem;
`;

interface headerProps {
	user?: { user: string; username: string };
	onLogout?: () => void;
}
const Header: React.FC<headerProps> = ({ user, onLogout }) => {
	return (
		<>
			<HeaderBlock>
				<Wrapper>
					<Link to='/' className='logo'>
						REACTERS
					</Link>
					{user ? (
						<div className='right'>
							<UserInfo>{user.username}</UserInfo>
							<Button onClick={onLogout}>로그아웃</Button>
						</div>
					) : (
						<div className='right'>
							<Button to='/login'>로그인</Button>
						</div>
					)}
				</Wrapper>
			</HeaderBlock>
			<Spacer />
		</>
	);
};

export default Header;