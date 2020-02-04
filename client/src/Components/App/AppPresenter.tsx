import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Feeds from "../../Routes/Feeds";
import NewPhoto from "../../Routes/NewPhoto";
import { Routes } from "../../Routes/routes";
import Header from "../Header";
import * as S from "./AppStyle";

interface IProps {
	data: any;
}

const AppPresenter: React.FC<IProps> = ({
	data: { auth: { isLoggedIn = false } = {} } = {}
}) => {
	console.log(window.location.href.split("/"));
	return (
		<S.Container>
			<BrowserRouter>
				<Header />
				<S.Body>
					<Route path={Routes.HOME} exact={true} component={Feeds} />
					<Route path={Routes.NEW_PHOTO} component={NewPhoto} />
				</S.Body>
			</BrowserRouter>
			{/* {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />} */}
		</S.Container>
	);
};

const LoggedOutRoutes: React.FC = () => (
	<Switch>
		<Redirect path={"*"} to={Routes.HOME} />
	</Switch>
);

const LoggedInRoutes: React.FC = () => (
	<Switch>
		<Route path={Routes.HOME} exact={true} component={Feeds} />
		<Redirect path={"*"} to={Routes.HOME} />
	</Switch>
);

export default AppPresenter;
