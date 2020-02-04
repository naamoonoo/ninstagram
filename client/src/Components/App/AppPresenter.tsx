import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Routes } from "../../Routes/routes";
import CameraButton from "../CameraButton";
import Feed from "../Feed";
import Header from "../Header";
import * as S from "./AppStyle";

interface IProps {
	data: any;
}

const AppPresenter: React.FC<IProps> = ({
	data: { auth: { isLoggedIn = false } = {} } = {}
}) => {
	console.log(window.location.href.split("/")[4]);
	return (
		<S.Container>
			<Header isHome={window.location.href.split("/").length !== 4} />
			<S.Body>
				<Feed />
				<Feed />
				<Feed />
				<Feed />
				<Feed />
			</S.Body>
			<CameraButton />
			<BrowserRouter>
				{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
			</BrowserRouter>
		</S.Container>
	);
};

const LoggedOutRoutes: React.FC = () => (
	<Switch>
		{/* <Route path={Routes.HOME} exact={true} component={} /> */}
		<Redirect path={"*"} to={Routes.HOME} />
	</Switch>
);

const LoggedInRoutes: React.FC = () => (
	<Switch>
		<Redirect path={"*"} to={Routes.HOME} />
	</Switch>
);

export default AppPresenter;
