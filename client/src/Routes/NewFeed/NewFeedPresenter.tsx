import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import CameraButton from "../../Components/CameraButton";
import * as S from "./NewFeedStyle";

interface IProps {
	pictures: string[];
	setPictures: any;
	selected?: string;
	setSelected: any;
}

const NewFeedPresenter: React.FC<IProps> = ({
	pictures,
	setPictures,
	selected,
	setSelected
}) => {
	const webcamRef = useRef<Webcam & HTMLVideoElement>(null);
	const videoConstraints: MediaTrackConstraints = {
		facingMode: "user"
	};

	const capture = useCallback(() => {
		if (webcamRef && webcamRef.current) {
			const newPicture = webcamRef.current.getScreenshot();
			if (newPicture) {
				setPictures((oldPictures: string[]) => [
					...oldPictures,
					newPicture
				]);
			}
		}
	}, [webcamRef]);

	const renderPreview = (pictures: string[]) => {
		return pictures.map(picture => (
			<S.Preview
				key={picture}
				src={picture}
				onClick={() => setSelected(picture)}
			/>
		));
	};
	console.log(pictures);
	return (
		<S.Container>
			<S.Header>
				Take
				<S.Time>now</S.Time>
			</S.Header>
			<S.Camera>
				{selected ? (
					<S.Image src={selected} />
				) : (
					<Webcam
						audio={false}
						ref={webcamRef}
						width={"100%"}
						screenshotFormat="image/jpeg"
						videoConstraints={videoConstraints}
					/>
				)}
			</S.Camera>
			<S.PreviewDiv>{renderPreview(pictures)}</S.PreviewDiv>
			<CameraButton onClick={capture} hovered={true} />
		</S.Container>
	);
};

export default NewFeedPresenter;
