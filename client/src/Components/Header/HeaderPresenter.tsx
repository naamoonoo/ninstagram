import React from "react";
import { ReactComponent as Back } from "../../assets/icons/backArrow.svg";
import { ReactComponent as Menu } from "../../assets/icons/menu.svg";
import { history } from "../../utils/history";
import * as S from "./HeaderStyle";

interface IProps {}

const HeaderPresenter: React.FC<IProps> = ({}) => {
	const isHome = false;
	console.log(window.location.href);
	return (
		<S.Container>
			{isHome && (
				<S.Back onClick={() => history.goBack()}>
					<Back />
				</S.Back>
			)}
			<S.Title>ninstagram</S.Title>
			<S.Menu>
				<Menu />
			</S.Menu>
		</S.Container>
	);
};

export default HeaderPresenter;
