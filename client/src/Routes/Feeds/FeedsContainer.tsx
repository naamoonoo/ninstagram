import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_CURRENT_USER } from "../../SharedQueries";
import {
	CreateLike,
	CreateLikeVariables,
	DeleteLike,
	DeleteLikeVariables,
	GetCurrentUser,
	GetFeeds,
	GetFeedsVariables,
	SubscribeMessage,
} from "../../types/api";
import { Routes } from "../routes";
import FeedsPresenter from "./FeedsPresenter";
import {
	GET_FEEDS,
	LIKE_CREATE,
	LIKE_DELETE,
	SUBSCRIBE_FEED,
	SUBSCRIBE_MESSAGE,
} from "./FeedsQueries";
import { forceHistory } from "../../utils/history";

interface IProps extends RouteComponentProps {}

const FeedsContainer: React.FC<IProps> = ({ history, match }) => {
	const [newFeed, setNewFeed] = useState(false);
	const [page, setPage] = useState(1);
	const { data: userData, refetch: userRefetch } = useQuery<GetCurrentUser>(
		GET_CURRENT_USER
	);
	const { data, refetch: feedRefetch } = useQuery<
		GetFeeds,
		GetFeedsVariables
	>(GET_FEEDS, {
		fetchPolicy: "cache-and-network",
		variables: {
			page,
		},
	});

	const [onLike] = useMutation<CreateLike, CreateLikeVariables>(LIKE_CREATE, {
		onCompleted: ({ CreateLike: { res, error } }) => {
			if (res) {
				userRefetch();
				feedRefetch();
			} else {
				toast.error(error);
			}
		},
	});

	const [onDisLike] = useMutation<DeleteLike, DeleteLikeVariables>(
		LIKE_DELETE,
		{
			onCompleted: ({ DeleteLike: { res, error } }) => {
				if (res) {
					userRefetch();
					feedRefetch();
				} else {
					toast.error(error);
				}
			},
		}
	);

	useSubscription(SUBSCRIBE_FEED, {
		onSubscriptionData: () => {
			setNewFeed(true);
			feedRefetch();
		},
	});

	useSubscription<SubscribeMessage>(SUBSCRIBE_MESSAGE, {
		onSubscriptionData: ({ subscriptionData: { data, error } }) => {
			if (data && data.SubscribeMessage) {
				const { sender, content, checked } = data.SubscribeMessage;
				if (!checked) {
					toast.success(`${sender.firstName} : ${content}`, {
						position: "top-right",
						onClick: () =>
							history.push(Routes.CHAT, {
								receiverId: sender.id,
							}),
					});
				}
			} else if (error) {
				toast.error(error);
			}
		},
	});

	const onReachToEnd = () => {
		if (match.path === Routes.HOME) {
			setPage(page + 1);
			feedRefetch();
		}
	};

	return (
		<FeedsPresenter
			data={data}
			onReachToEnd={onReachToEnd}
			history={history}
			onLike={onLike}
			onDisLike={onDisLike}
			userData={userData}
			newFeed={newFeed}
			setNewFeed={setNewFeed}
		/>
	);
};

export default FeedsContainer;
