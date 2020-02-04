import React, { useCallback, useRef } from "react";
import { ReactComponent as CameraIcon } from "../../assets/icons/camera.svg";
import { ReactComponent as PhotoUploadIcon } from "../../assets/icons/photoUpload.svg";
import CameraButton from "../../Components/CameraButton";
import Webcam from "../../Components/Webcam";
import * as S from "./NewPhotoStyle";

interface IProps {
	pictures: string[];
	onCaptureHandler: any;
	selected?: string;
	setSelected: any;
	isCameraMode: boolean;
	setIsCameraMode: any;
}

const NewPhotoPresenter: React.FC<IProps> = ({
	pictures,
	onCaptureHandler,
	selected,
	setSelected,
	isCameraMode,
	setIsCameraMode
}) => {
	const renderPreview = (pictures: string[]) => {
		return pictures.map(picture => (
			<S.Preview
				key={picture}
				src={picture}
				onClick={() => setSelected(picture)}
			/>
		));
	};

	return (
		<S.Container>
			<S.Header>
				<S.Icon
					selected={isCameraMode}
					onClick={() => setIsCameraMode(true)}
				>
					<CameraIcon />
				</S.Icon>
				<S.Icon
					selected={!isCameraMode}
					onClick={() => setIsCameraMode(false)}
				>
					<PhotoUploadIcon />
				</S.Icon>
				<S.Time>now</S.Time>
			</S.Header>
			{isCameraMode ? (
				<S.Camera>
					{selected ? (
						<S.Image src={selected} />
					) : (
						<Webcam onCapture={onCaptureHandler} />
					)}
				</S.Camera>
			) : (
				<S.Upload>
					<S.UploadInput type="file" />
					{/* click Here or drap your image to here */}
				</S.Upload>
			)}

			<S.PreviewDiv>{renderPreview(pictures)}</S.PreviewDiv>
			{selected && <CameraButton hovered={true} />}
		</S.Container>
	);
};

export default NewPhotoPresenter;
