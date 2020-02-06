import React from "react";
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
}

const FeedsPresenter: React.FC<IProps> = ({
	data: { GetFeeds: { feeds = [] } = {} } = {},
	onReachToEnd,
	history,
	onLike,
	onDisLike,
	userData: { GetCurrentUser: { user = {} } = {} } = {}
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
				/>
			);
		});
	};

	console.log(user);
	// console.log(user.likes.inclues())
	window.onscroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop ===
			document.documentElement.offsetHeight
		) {
			onReachToEnd();
		}
	};

	return (
		<S.Container>
			{user && feeds && renderFeed(feeds)}
			<CameraButton onClick={() => history.push(Routes.NEW_PHOTO)} />
		</S.Container>
	);
};

export default FeedsPresenter;
