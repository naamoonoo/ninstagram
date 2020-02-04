import React from "react";
import { ReactComponent as Camera } from "../../assets/icons/camera.svg";

import * as S from "./CameraButtonStyle";

interface IProps {
	onClick?: () => void;
	className?: any;
}

const CameraButtonPresenter: React.FC<IProps> = ({ onClick, className }) => {
	return (
		<S.Container className={className}>
			<Camera />
		</S.Container>
	);
};

export default CameraButtonPresenter;
