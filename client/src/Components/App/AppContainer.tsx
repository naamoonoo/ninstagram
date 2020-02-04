import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries.local";
import * as S from "./AppStyle";

const AppContainer: React.FC = () => {
	const { data } = useQuery(IS_LOGGED_IN);

	return (
		<S.Container>
			<ThemeProvider theme={theme}>
				<AppPresenter data={data} />
			</ThemeProvider>
			<ToastContainer draggable={true} position={"bottom-center"} />
		</S.Container>
	);
};

export default AppContainer;
