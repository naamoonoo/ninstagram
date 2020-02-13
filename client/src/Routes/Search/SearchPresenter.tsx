import React from "react";
import Profile from "../../Components/Profile";
import {
	FindHashtagsByTag,
	FindHashtagsByTag_FindHashtagsByTag_tags,
	FindUserByUsername,
	GetTaggedFeeds
} from "../../types/api";
import { forceHistory } from "../../utils/history";
import { Routes } from "../routes";
import * as S from "./SearchStyle";

interface IProps {
	search: string;
	tag: string | undefined;
	onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	userData?: FindUserByUsername;
	feedData?: GetTaggedFeeds;
	tagData?: FindHashtagsByTag;
	isUserSearch?: boolean;
}

const SearchPresenter: React.FC<IProps> = ({
	search,
	onChangeHandler,
	tag,
	userData: { FindUserByUsername: { users = [] } = {} } = {},
	tagData: { FindHashtagsByTag: { tags = [] } = {} } = {},
	feedData: { GetTaggedFeeds: { feeds = [] } = {} } = {},
	isUserSearch
}) => {
	const renderTag = (tag: FindHashtagsByTag_FindHashtagsByTag_tags) => {
		const { tag: tagName, feeds } = tag;
		return (
			<S.TagContainer
				key={tagName}
				onClick={() => forceHistory.push(`/search/${tagName}`)}
			>
				<S.Tag>{`#${tagName}`}</S.Tag>
				<S.TagDetail>{feeds ? feeds.length : 0} feeds</S.TagDetail>
			</S.TagContainer>
		);
	};

	const renderByMode = () => {
		if (isUserSearch === undefined) {
			return;
		}

		if (isUserSearch && users) {
			return users.map(
				user =>
					user && <Profile key={user.id} {...user} size={"40px"} />
			);
		} else if (!isUserSearch && tags) {
			return tags.map(tag => tag && renderTag(tag));
		}
	};

	const renderPhoto = () => {
		return (
			feeds &&
			feeds.map(
				feed =>
					feed && (
						<S.Image
							key={feed.id}
							src={feed.photo}
							onClick={() =>
								forceHistory.push(Routes.FEED + `/${feed.id}`)
							}
						/>
					)
			)
		);
	};
	return (
		<S.Container>
			{tag ? (
				<React.Fragment>
					<S.TagHeader>{`#${tag}`}</S.TagHeader>
					<S.PhotoContainer>{renderPhoto()}</S.PhotoContainer>
				</React.Fragment>
			) : (
				<React.Fragment>
					{" "}
					<S.SearchBar
						label={""}
						value={search}
						onChange={onChangeHandler}
						placeholder={"@username or #tag"}
					/>
					<S.ResultContainer>{renderByMode()}</S.ResultContainer>
				</React.Fragment>
			)}
		</S.Container>
	);
};

export default SearchPresenter;
