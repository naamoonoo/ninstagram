import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ChangePassord from "../../Routes/ChangePassword";
import FeedDetail from "../../Routes/FeedDetail";
import Feeds from "../../Routes/Feeds";
import Login from "../../Routes/Login";
import NewFeed from "../../Routes/NewFeed";
import NewPhoto from "../../Routes/NewPhoto";
import { Routes } from "../../Routes/routes";
import SocialLogin from "../../Routes/SocialLogin";
import UserPage from "../../Routes/UserPage";
import Verification from "../../Routes/Verification";
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
					<Switch>
						<Route
							path={Routes.HOME}
							exact={true}
							component={Feeds}
						/>
						<Route path={Routes.NEW_PHOTO} component={NewPhoto} />
						<Route path={Routes.NEW_FEED} component={NewFeed} />
						<Route path={Routes.SIGN_UP} component={Login} />
						<Route path={Routes.LOGIN} component={Login} />
						<Route path={Routes.AUTH} component={SocialLogin} />
						<Route path={Routes.FEED_FORM} component={FeedDetail} />
						<Route
							path={Routes.CHANGE_PASSWORD}
							component={ChangePassord}
						/>
						<Route
							path={Routes.FORGET_PASSWORD}
							component={ChangePassord}
						/>
						<Route
							path={Routes.VERIFICATION_FORM}
							exact={false}
							component={Verification}
						/>
						<Route
							path={Routes.USER_PAGE_FORM}
							component={UserPage}
						/>
						<Route
							path={Routes.USER_PAGE}
							exact={true}
							component={UserPage}
						/>
						<Redirect path={"*"} to={Routes.HOME} />
					</Switch>
				</S.Body>
			</BrowserRouter>
			{/* {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />} */}
		</S.Container>
	);
};

// const LoggedOutRoutes: React.FC = () => (
// 	<Switch>
// 		<Redirect path={"*"} to={Routes.HOME} />
// 	</Switch>
// );

// const LoggedInRoutes: React.FC = () => (
// 	<Switch>
// 		<Route path={Routes.HOME} exact={true} component={Feeds} />
// 	</Switch>
// );

export default AppPresenter;
