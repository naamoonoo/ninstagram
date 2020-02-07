import React from "react";
import { ReactComponent as CameraIcon } from "../../assets/icons/camera.svg";
import { ReactComponent as PhotoUploadIcon } from "../../assets/icons/photoUpload.svg";
import CameraButton from "../../Components/CameraButton";
import Webcam from "../../Components/Webcam";
import * as S from "./NewPhotoStyle";

interface IProps {
	pictures: string[];
	setPictures: any;
	onCaptureHandler: any;
	selected?: string;
	setSelected: any;
	isCameraMode: boolean;
	setIsCameraMode: any;
	onUploadImage: (
		event: React.ChangeEvent<HTMLInputElement>
	) => Promise<void>;
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
					onClick={() => {
						setIsCameraMode(true);
						setSelected(undefined);
						setPictures([]);
					}}
				>
					<CameraIcon />
				</S.Icon>
				<S.Icon
					selected={!isCameraMode}
					onClick={() => {
						setIsCameraMode(false);
						setSelected(undefined);
						setPictures([]);
					}}
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
						<S.Upload>
							<S.UploadInput
								id={"photo"}
								type="file"
								accept="image/*"
								onChange={onUploadImage}
							/>
							<S.UploadLabel htmlFor="photo">
								"click or drag your image"
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
