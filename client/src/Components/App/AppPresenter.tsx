import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Feeds from "../../Routes/Feeds";
import Login from "../../Routes/Login";
import NewFeed from "../../Routes/NewFeed";
import NewPhoto from "../../Routes/NewPhoto";
import { Routes } from "../../Routes/routes";
import SocialLogin from "../../Routes/SocialLogin";
import Header from "../Header";
import * as S from "./AppStyle";

interface IProps {
	isLoggedIn: boolean;
}

const AppPresenter: React.FC<IProps> = ({ isLoggedIn }) => {
	return (
		<S.Container>
			<BrowserRouter>
				<Route
					path={"*"}
					render={props => (
						<Header {...props} isLoggedIn={isLoggedIn} />
					)}
				/>
				<S.Body>
					<Route path={Routes.HOME} exact={true} component={Feeds} />
					<Route path={Routes.NEW_PHOTO} component={NewPhoto} />
					<Route path={Routes.NEW_FEED} component={NewFeed} />
					<Route path={Routes.LOGIN} component={Login} />
					<Route path={Routes.AUTH} component={SocialLogin} />
					{/* <Redirect path={"*"} to={Routes.HOME} /> */}
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
	</Switch>
);

export default AppPresenter;
