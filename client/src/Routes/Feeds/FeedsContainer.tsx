import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import FeedsPresenter from "./FeedsPresenter";
import { GET_FEEDS } from "./FeedsQueries";
import { RouteComponentProps } from "react-router-dom";

interface IProps extends RouteComponentProps {}
const FeedsContainer: React.FC<IProps> = ({ history }) => {
	const [page, setPage] = useState(1);
	const { data, refetch } = useQuery(GET_FEEDS, {
		variables: {
			page
		}
	});

	const onReachToEnd = () => {
		setPage(page + 1);
		refetch();
	};

	console.log(data);
	return (
		<FeedsPresenter
			data={data}
			onReachToEnd={onReachToEnd}
			history={history}
		/>
	);
};

export default FeedsContainer;
