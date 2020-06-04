import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TagBox from '../../components/write/TagBox';
import { changeField } from '../../modules/write';
import { writeStateType } from '../../modules/reduxTypes';

const TagBoxContainer = () => {
	const dispatch = useDispatch();
	const tags = useSelector(
		({ write }: { write: writeStateType }) => write.tags
	);

	const onChangeTags = (nextTags: string[]) => {
		dispatch(
			changeField({
				key: 'tags',
				value: nextTags,
			})
		);
	};
	return <TagBox onChangeTags={onChangeTags} tags={tags}></TagBox>;
};

export default TagBoxContainer;
