import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import CameraButton from "../CameraButton";

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
	}, [webcamRef, onCapture]);
	return (
		<React.Fragment>
			<Webcam
				audio={false}
				ref={webcamRef}
				width={"100%"}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
				mirrored={true}
			/>
			<CameraButton onClick={capture} hovered={true} />
		</React.Fragment>
	);
};

export default WebcamPresenter;
