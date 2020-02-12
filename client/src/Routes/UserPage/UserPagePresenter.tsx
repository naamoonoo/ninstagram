import React from "react";
import Profile from "../../Components/Profile";
import { forceHistory } from "../../utils/history";
import { useTitle } from "../../utils/hooks";
import { Routes } from "../routes";
import * as S from "./UserPageStyle";

interface IProps {
	userData: any;
	history: any;
	isCurrentUser: boolean;
	logOutMutation: any;
}

const UserPagePresenter: React.FC<IProps> = ({
	userData: { GetUserById: { user = {} } = {} } = {},
	history,
	isCurrentUser,
	logOutMutation
}) => {
	useTitle("Ninstgram | User Page");
	const renderPhotos = (feeds: any[]) => {
		return feeds.map(feed => {
			return (
				<S.Image
					src={feed.photo}
					key={feed.id}
					onClick={() => history.push(Routes.FEED + `/${feed.id}`)}
				/>
			);
		});
	};
	return (
		<S.Container>
			<S.ProfileContainer>
				<Profile
					{...user}
					size={"75px"}
					fontSize={"1.2em"}
					clickable={false}
				/>
				{isCurrentUser && (
					<S.Infos>
						<S.Info
							onClick={() =>
								history.push(Routes.VERIFICATION + `/email/no`)
							}
						>
							EMAIL {user.isEmailVerified ? "✅" : "❌"}
						</S.Info>
						<S.Info
							onClick={() =>
								history.push(Routes.VERIFICATION + `/phone/no`)
							}
						>
							PHONE {user.isPhoneVerified ? "✅" : "❌"}
						</S.Info>
						{!user.fbId && !user.googleId && (
							<S.Info
								onClick={() =>
									history.push(Routes.CHANGE_PASSWORD)
								}
							>
								PASSWORD ⚙️
							</S.Info>
						)}
					</S.Infos>
				)}
			</S.ProfileContainer>
			{user && user.feeds && user.feeds.length > 0 && (
				<S.PhotoContainer>{renderPhotos(user.feeds)}</S.PhotoContainer>
			)}
			{isCurrentUser && (
				<S.Button
					onClick={() => {
						logOutMutation();
						forceHistory.push(Routes.HOME);
					}}
				>
					Logout
				</S.Button>
			)}
		</S.Container>
	);
};

export default UserPagePresenter;
