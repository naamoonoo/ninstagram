import React from "react";
import { ReactComponent as ToTop } from "../../assets/icons/TopButton.svg";
import CameraButton from "../../Components/CameraButton";

import Feed from "../../Components/Feed";
import { Routes } from "../routes";
import * as S from "./FeedsStyle";

interface IProps {
	data: any;
	onReachToEnd: () => void;
	history: any;
	onLike: any;
	onDisLike: any;
	userData: any;
	newFeed: boolean;
	setNewFeed: any;
}

const FeedsPresenter: React.FC<IProps> = ({
	data: { GetFeeds: { feeds = [] } = {} } = {},
	onReachToEnd,
	history,
	onLike,
	onDisLike,
	userData: { GetCurrentUser: { user = {} } = {} } = {},
	newFeed,
	setNewFeed
}) => {
	const renderFeed = (feeds: any[]) => {
		return feeds.map(feed => {
			const liked =
				user &&
				user.likes &&
				user.likes.findIndex((like: any) => like.feedId === feed.id) >=
					0;
			return (
				<Feed
					key={feed.id}
					{...feed}
					onLike={onLike}
					onDisLike={onDisLike}
					liked={liked}
					isCurrentUser={user.id === feed.user.id}
				/>
			);
		});
	};

	window.onscroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
		) {
			onReachToEnd();
		}
	};

	const scrollToTop = () => {
		window.scrollTo({ top: 0 });
		setNewFeed(false);
	};

	return (
		<S.Container>
			{newFeed && (
				<S.NewFeed onClick={scrollToTop}>
					<ToTop width={200} height={50} />
				</S.NewFeed>
			)}
			{user && feeds && renderFeed(feeds)}
			{user && user.id && (
				<CameraButton onClick={() => history.push(Routes.NEW_PHOTO)} />
			)}
		</S.Container>
	);
};

export default FeedsPresenter;
