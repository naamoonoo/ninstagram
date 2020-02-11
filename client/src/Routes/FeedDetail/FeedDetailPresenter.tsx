import React from "react";
import CameraButton from "../../Components/CameraButton";
import Feed from "../../Components/Feed";
import * as S from "./FeedDetailStyle";

interface IProps {
	userData: any;
	feedData: any;
	input: string;
	onChangeInput: (event: React.ChangeEvent<Element>) => any;
	updateMutation: any;
	deleteMutation: any;
	updateProfilePhoto: any;
}

const FeedDetailPresenter: React.FC<IProps> = ({
	userData: { GetCurrentUser: { user = {} } = {} } = {},
	feedData: { GetFeed: { feed = {} } = {} } = {},
	input,
	onChangeInput,
	updateMutation,
	deleteMutation,
	updateProfilePhoto
}) => {
	const isOwner = user && feed && feed.user && user.id === feed.user.id;
	return (
		<S.Container>
			<Feed
				key={feed.id}
				{...feed}
				isCurrentUser={false}
				isUpdate={true}
				unfoldComment={true}
			>
				{isOwner && (
					<S.TextInput value={input} onChange={onChangeInput} />
				)}
			</Feed>
			{isOwner && (
				<S.ButtonContainer>
					<S.Button
						style={{ backgroundColor: "#0F9D58" }}
						onClick={() =>
							updateProfilePhoto({
								variables: {
									profilePhoto: feed.photo
								}
							})
						}
					>
						SET AS PROFILE
					</S.Button>
					<S.Button
						style={{ backgroundColor: "#3b5998" }}
						onClick={updateMutation}
					>
						UPDATE
					</S.Button>
					<S.Button
						style={{ backgroundColor: "#DB4437" }}
						onClick={deleteMutation}
					>
						DELETE
					</S.Button>
				</S.ButtonContainer>
			)}
		</S.Container>
	);
};

export default FeedDetailPresenter;
