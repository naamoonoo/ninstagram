import React from "react";
import CameraButton from "../../Components/CameraButton";
import Feed from "../../Components/Feed";
import * as S from "./FeedDetailStyle";

interface IProps {
	feedData: any;
	ref: React.RefObject<HTMLInputElement>;
	input: string;
	onChangeInput: (event: React.ChangeEvent<Element>) => any;
	updateMutation: any;
	deleteMutation: any;
}

const FeedDetailPresenter: React.FC<IProps> = ({
	feedData: { GetFeed: { feed = {} } = {} } = {},
	ref,
	input,
	onChangeInput,
	updateMutation,
	deleteMutation
}) => {
	return (
		<S.Container>
			<Feed
				key={feed.id}
				{...feed}
				isCurrentUser={false}
				isUpdate={true}
				unfoldComment={true}
			>
				<S.TextInput ref={ref} value={input} onChange={onChangeInput} />
			</Feed>
			<S.Button onClick={deleteMutation}>DELETE</S.Button>
			<CameraButton hovered={true} onClick={updateMutation} />
		</S.Container>
	);
};

export default FeedDetailPresenter;
