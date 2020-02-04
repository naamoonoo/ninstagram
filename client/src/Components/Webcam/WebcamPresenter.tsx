import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import CameraButton from "../CameraButton";
import * as S from "./WebcamStyle";

interface IProps {
	onCapture: any;
}

const WebcamPresenter: React.FC<IProps> = ({ onCapture }) => {
	const webcamRef = useRef<Webcam & HTMLVideoElement>(null);
	const videoConstraints: MediaTrackConstraints = {
		facingMode: "user"
	};

	const capture = useCallback(() => {
		if (webcamRef && webcamRef.current) {
			const newPicture = webcamRef.current.getScreenshot();
			if (newPicture) {
				onCapture(newPicture);
			}
		}
	}, [webcamRef]);
	return (
		<React.Fragment>
			<Webcam
				audio={false}
				ref={webcamRef}
				width={"100%"}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
			/>
			<CameraButton onClick={capture} hovered={true} />
		</React.Fragment>
	);
};

export default WebcamPresenter;
