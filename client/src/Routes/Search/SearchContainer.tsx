import { useLazyQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
	FindHashtagsByTag,
	FindHashtagsByTagVariables,
	FindUserByUsername,
	FindUserByUsernameVariables,
	GetTaggedFeeds,
	GetTaggedFeedsVariables
} from "../../types/api";
import SearchPresenter from "./SearchPresenter";
import { SEARCH_FEEDS, SEARCH_TAGS, SEARCH_USERS } from "./SearchQueries";

interface IProps
	extends RouteComponentProps<{
		tag: string;
	}> {}

const SearchContainer: React.FC<IProps> = ({
	match: {
		params: { tag: tagParams }
	}
}) => {
	const [search, setSearch] = useState("");
	const [tag, setTag] = useState<string>();
	const [isUserSearch, setIsUserSearch] = useState<boolean>();

	const [getUsers, { data: userData }] = useLazyQuery<
		FindUserByUsername,
		FindUserByUsernameVariables
	>(SEARCH_USERS, { variables: { search: search.substr(1) } });

	const [getTags, { data: tagData }] = useLazyQuery<
		FindHashtagsByTag,
		FindHashtagsByTagVariables
	>(SEARCH_TAGS, { variables: { search: search.substr(1) } });

	const [getFeeds, { data: feedData }] = useLazyQuery<
		GetTaggedFeeds,
		GetTaggedFeedsVariables
	>(SEARCH_FEEDS, { variables: { tag: tag || "" } });

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const {
			target: { value }
		} = event;
		const isValidSearch = value.startsWith("@") || value.startsWith("#");
		setSearch(value);
		if (value.length === 0) {
			setIsUserSearch(undefined);
		}
		if (search.length === 1) {
			if (!isValidSearch) {
				return toast.error("You should Start with @ or #");
			}
			if (search.startsWith("@")) {
				setIsUserSearch(true);
			} else {
				setIsUserSearch(false);
			}
		}

		if (search.length > 1 && isUserSearch) {
			getUsers();
		} else {
			getTags();
		}
	};

	useEffect(() => {
		if (tagParams) {
			setTag(tagParams);
			setIsUserSearch(false);
			getFeeds();
		} else {
			setTag(undefined);
			setIsUserSearch(true);
		}
	}, [tagParams]);

	return (
		<SearchPresenter
			search={search}
			tag={tag}
			onChangeHandler={onChangeHandler}
			userData={userData}
			feedData={feedData}
			tagData={tagData}
			isUserSearch={isUserSearch}
		/>
	);
};

export default SearchContainer;
