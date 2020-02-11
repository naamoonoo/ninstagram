import { useQuery } from "@apollo/react-hooks";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries.local";

const AppContainer: React.FC = () => {
	const { data: { auth: { isLoggedIn = false } = {} } = {} } = useQuery(
		IS_LOGGED_IN
	);

	console.log(isLoggedIn);
	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				<AppPresenter isLoggedIn={isLoggedIn} />
			</ThemeProvider>
			<ToastContainer draggable={true} position={"bottom-center"} />
		</React.Fragment>
	);
};

export default AppContainer;
