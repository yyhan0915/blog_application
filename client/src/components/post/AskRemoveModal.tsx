import React from 'react';
import AskModal from '../common/AskModal';

interface AskRemoveModal {
	visible: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}
export const AskRemoveModal: React.FC<AskRemoveModal> = ({
	visible,
	onConfirm,
	onCancel,
}) => {
	return (
		<AskModal
			visible={visible}
			title='포스트 삭제'
			description='포스트를 정말 삭제하시겠습니까?'
			confirmText='삭제'
			onConfirm={onConfirm}
			onCancel={onCancel}
		/>
	);
};

export default AskRemoveModal;
