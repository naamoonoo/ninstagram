import React from "react";
import { isMobile } from "react-device-detect";
import { ReactComponent as CameraIcon } from "../../assets/icons/camera.svg";
import { ReactComponent as PhotoUploadIcon } from "../../assets/icons/photoUpload.svg";
import CameraButton from "../../Components/CameraButton";
import Webcam from "../../Components/Webcam";
import { useTitle } from "../../utils/hooks";
import * as S from "./NewPhotoStyle";

interface IProps {
	pictures: string[];
	setPictures: any;
	onCaptureHandler: any;
	selected?: string;
	setSelected: any;
	isCameraMode: boolean;
	setIsCameraMode: any;
	onUploadImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
	history: any;
}

const NewPhotoPresenter: React.FC<IProps> = ({
	pictures,
	onCaptureHandler,
	setPictures,
	selected,
	setSelected,
	isCameraMode,
	setIsCameraMode,
	onUploadImage,
	history
}) => {
	useTitle("ninstgram | New Photo");
	const renderPreview = (pictures: string[]) => {
		return pictures.map(picture => (
			<S.Preview
				key={picture}
				src={picture}
				onClick={() => setSelected(picture)}
			/>
		));
	};

	const changeMode = (isCameraMode: boolean) => {
		setIsCameraMode(isCameraMode);
		setSelected(undefined);
		setPictures([]);
	};

	return (
		<S.Container>
			<S.Header>
				{!isMobile && (
					<S.Icon
						selected={isCameraMode}
						onClick={() => changeMode(true)}
					>
						<CameraIcon />
					</S.Icon>
				)}
				<S.Icon
					selected={!isCameraMode}
					onClick={() => changeMode(false)}
				>
					<PhotoUploadIcon />
				</S.Icon>
				<S.Time>now</S.Time>
			</S.Header>
			{isCameraMode ? (
				<React.Fragment>
					<S.Camera>
						{selected ? (
							<S.Image src={selected} />
						) : (
							<Webcam onCapture={onCaptureHandler} />
						)}
					</S.Camera>
					{pictures.length > 0 && (
						<S.PreviewDiv>{renderPreview(pictures)}</S.PreviewDiv>
					)}
				</React.Fragment>
			) : (
				<React.Fragment>
					{selected ? (
						<S.Image src={selected} />
					) : (
						<S.Upload onDropHandler={setSelected}>
							<S.UploadInput
								id={"photo"}
								type="file"
								accept="image/*"
								onChange={onUploadImage}
							/>
							<S.UploadLabel htmlFor="photo">
								{isMobile
									? "Click here to take selfie or upload image"
									: "click or drag your image"}
							</S.UploadLabel>
						</S.Upload>
					)}
				</React.Fragment>
			)}

			{(selected || !isCameraMode) && (
				<CameraButton
					hovered={isCameraMode || (selected ? true : false)}
					onClick={() =>
						history.push("/new-feed", { photo: selected })
					}
				/>
			)}
		</S.Container>
	);
};

export default NewPhotoPresenter;
