import { useLazyQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
	FindFeedsByHashtag,
	FindFeedsByHashtagVariables,
	FindUserByUsername,
	FindUserByUsernameVariables
} from "../../types/api";
import SearchPresenter from "./SearchPresenter";
import { SEARCH_FEEDS, SEARCH_USERS } from "./SearchQueries";

const SearchContainer: React.FC = () => {
	const [search, setSearch] = useState("");
	const [isUserSearch, setIsUserSearch] = useState<boolean>();

	const [getUsers, { data: userData }] = useLazyQuery<
		FindUserByUsername,
		FindUserByUsernameVariables
	>(SEARCH_USERS, { variables: { search: search.substr(1) } });
	const [getFeeds, { data: feedData }] = useLazyQuery<
		FindFeedsByHashtag,
		FindFeedsByHashtagVariables
	>(SEARCH_FEEDS, { variables: { search: search.substr(1) } });

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
			getFeeds();
		}
	};

	return (
		<SearchPresenter
			search={search}
			onChangeHandler={onChangeHandler}
			userData={userData}
			feedData={feedData}
			isUserSearch={isUserSearch}
		/>
	);
};

export default SearchContainer;
