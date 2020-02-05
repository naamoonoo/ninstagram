import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { GetFeeds, GetFeedsVariables } from "../../types/api";
import FeedsPresenter from "./FeedsPresenter";
import { GET_FEEDS } from "./FeedsQueries";

interface IProps extends RouteComponentProps {}

const FeedsContainer: React.FC<IProps> = ({ history }) => {
	const [page, setPage] = useState(1);
	const { data, refetch } = useQuery<GetFeeds, GetFeedsVariables>(GET_FEEDS, {
		variables: {
			page
		}
	});

	const onReachToEnd = () => {
		setPage(page + 1);
		refetch();
	};

	return (
		<FeedsPresenter
			data={data}
			onReachToEnd={onReachToEnd}
			history={history}
		/>
	);
};

export default FeedsContainer;
