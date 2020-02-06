import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_CURRENT_USER } from "../../SharedQueries";
import {
	CreateLike,
	CreateLikeVariables,
	DeleteLike,
	DeleteLikeVariables,
	GetFeeds,
	GetFeedsVariables
} from "../../types/api";
import FeedsPresenter from "./FeedsPresenter";
import { GET_FEEDS, LIKE_CREATE, LIKE_DELETE } from "./FeedsQueries";

interface IProps extends RouteComponentProps {}

const FeedsContainer: React.FC<IProps> = ({ history }) => {
	const [page, setPage] = useState(1);
	const { data: userData, refetch: userRefetch } = useQuery(GET_CURRENT_USER);
	const { data, refetch } = useQuery<GetFeeds, GetFeedsVariables>(GET_FEEDS, {
		fetchPolicy: "cache-and-network",
		variables: {
			page
		}
	});

	const [onLike] = useMutation<CreateLike, CreateLikeVariables>(LIKE_CREATE, {
		onCompleted: ({ CreateLike: { res, error } }) => {
			if (res) {
				userRefetch();
			} else {
				toast.error(error);
			}
		}
	});
	const [onDisLike] = useMutation<DeleteLike, DeleteLikeVariables>(
		LIKE_DELETE,
		{
			onCompleted: ({ DeleteLike: { res, error } }) => {
				if (res) {
					userRefetch();
				} else {
					toast.error(error);
				}
			}
		}
	);

	const onReachToEnd = () => {
		setPage(page + 1);
		refetch();
	};

	return (
		<FeedsPresenter
			data={data}
			onReachToEnd={onReachToEnd}
			history={history}
			onLike={onLike}
			onDisLike={onDisLike}
			userData={userData}
		/>
	);
};

export default FeedsContainer;
