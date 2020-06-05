import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteActionButtonsBlock = styled.div`
	margin-top: 1rem;
	margin-bottom: 3rem;
	button + button {
		margin-left: 0.5rem;
	}
`;

const StyledButton = styled(Button)`
	height: 2.125rem;
	& + & {
		margin-left: 0.5rem;
	}
`;

interface writeActionButtonsProps {
	onCancel?: () => void;
	onPublish?: () => void;
	isEdit: boolean;
	//임시
}

const WriteActionButtons: React.FC<writeActionButtonsProps> = ({
	onCancel,
	onPublish,
	isEdit,
}) => {
	return (
		<WriteActionButtonsBlock>
			<StyledButton cyan={1} onClick={onPublish}>
				포스트 {isEdit ? '수정' : '등록'}
			</StyledButton>
			<StyledButton onClick={onCancel}>취소</StyledButton>
		</WriteActionButtonsBlock>
	);
};

export default WriteActionButtons;
