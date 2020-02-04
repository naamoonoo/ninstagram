import React from "react";
import { ReactComponent as Camera } from "../../assets/icons/camera.svg";

import * as S from "./CameraButtonStyle";

interface IProps {
	onClick?: () => void;
	className?: any;
	hovered?: boolean;
}

const CameraButtonPresenter: React.FC<IProps> = ({
	onClick,
	className,
	hovered
}) => {
	return (
		<S.Container className={className} onClick={onClick} hovered={hovered}>
			<Camera />
		</S.Container>
	);
};

export default CameraButtonPresenter;
