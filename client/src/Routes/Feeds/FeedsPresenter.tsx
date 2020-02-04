import React from "react";
import CameraButton from "../../Components/CameraButton";
import Feed from "../../Components/Feed";
import { Routes } from "../routes";
import * as S from "./FeedsStyle";

interface IProps {
	data: any;
	onReachToEnd: () => void;
	history: any;
}

const renderFeed = (feeds: any[]) => {
	return feeds.map(feed => {
		return <Feed key={feed.id} {...feed} />;
	});
};

const FeedsPresenter: React.FC<IProps> = ({
	data: { GetFeeds: { feeds = [] } = {} } = {},
	onReachToEnd,
	history
}) => {
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
			{renderFeed(feeds)}
			<CameraButton onClick={() => history.push(Routes.NEW_PHOTO)} />
		</S.Container>
	);
};

export default FeedsPresenter;
