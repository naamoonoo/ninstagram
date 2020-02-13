import React from "react";
import Profile from "../../Components/Profile";
import { FindFeedsByHashtag, FindUserByUsername } from "../../types/api";
import * as S from "./SearchStyle";
import { forceHistory } from "../../utils/history";
import { Routes } from "../routes";

interface IProps {
	search: string;
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	userData?: FindUserByUsername;
	feedData?: FindFeedsByHashtag;
	isUserSearch?: boolean;
}

const SearchPresenter: React.FC<IProps> = ({
	search,
	onChangeHandler,
	userData: { FindUserByUsername: { users = [] } = {} } = {},
	feedData: { FindFeedsByHashtag: { feeds = [] } = {} } = {},
	isUserSearch
}) => {
	const renderByMode = () => {
		if (isUserSearch === undefined) {
			return;
		}

		if (isUserSearch && users) {
			return (
				<S.UsersContainer>
					{users.map(
						user =>
							user && (
								<Profile
									key={user.id}
									{...user}
									size={"40px"}
								/>
							)
					)}
				</S.UsersContainer>
			);
		} else if (!isUserSearch && feeds) {
			return (
				<S.PhotoContainer>
					{feeds.map(
						feed =>
							feed && (
								<S.Image
									key={feed.id}
									src={feed.photo}
									onClick={() =>
										forceHistory.push(
											Routes.FEED + `/${feed.id}`
										)
									}
								/>
							)
					)}
				</S.PhotoContainer>
			);
		}
		// ) : (
	};
	return (
		<S.Container>
			<S.SearchBar
				label={""}
				value={search}
				onChange={onChangeHandler}
				placeholder={"@username or #tag"}
			/>
			{renderByMode()}
		</S.Container>
	);
};

export default SearchPresenter;
