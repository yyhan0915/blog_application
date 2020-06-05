import React from 'react';
import { Helmet } from 'react-helmet-async';

import Responsive from '../components/common/Responsive';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';

const WritePage: React.FC = () => {
	return (
		<Responsive>
			<Helmet>
				<title>글 작성하기 - REACTERS</title>
			</Helmet>
			<EditorContainer />
			<TagBoxContainer />
			<WriteActionButtonsContainer />
		</Responsive>
	);
};

export default WritePage;
