import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ReactComponent as Back } from "../../assets/icons/backArrow.svg";
import { ReactComponent as Login } from "../../assets/icons/login.svg";
import { ReactComponent as User } from "../../assets/icons/user.svg";
import { Routes } from "../../Routes/routes";
import * as S from "./HeaderStyle";

interface IProps extends RouteComponentProps {
	isLoggedIn: boolean;
}

const HeaderPresenter: React.FC<IProps> = ({ history, match, isLoggedIn }) => {
	const isHome = match.url === "/feeds";
	const path = isLoggedIn ? Routes.USER_PAGE : Routes.LOGIN;
	return (
		<S.Container>
			{!isHome && (
				<S.Back onClick={() => history.goBack()}>
					<Back />
				</S.Back>
			)}
			<S.Title onClick={() => history.push(Routes.HOME)}>
				ninstagram
			</S.Title>
			<S.Menu onClick={() => history.push(path)}>
				{isLoggedIn ? <User /> : <Login />}
			</S.Menu>
		</S.Container>
	);
};

export default HeaderPresenter;
