import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { fileUploader } from "../../utils/fileUploader";
import NewPhotoPresenter from "./NewPhotoPresenter";

interface IProps extends RouteComponentProps {}

const NewPhotoContainer: React.FC<IProps> = ({ history }) => {
	const [pictures, setPictures] = useState<string[]>([]);
	const [selected, setSelected] = useState<string>();
	const [isCameraMode, setIsCameraMode] = useState(true);

	const onCaptureHandler = (newPicture: string) => {
		setPictures((oldPictures: string[]) => [...oldPictures, newPicture]);
	};

	const onUploadImage = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const {
			target: { files }
		} = event;
		if (files) {
			const photoUrl = await fileUploader(files);
			if (photoUrl) {
				setSelected(photoUrl);
			}
		}
	};

	return (
		<NewPhotoPresenter
			pictures={pictures}
			onCaptureHandler={onCaptureHandler}
			setPictures={setPictures}
			selected={selected}
			setSelected={setSelected}
			isCameraMode={isCameraMode}
			setIsCameraMode={setIsCameraMode}
			onUploadImage={onUploadImage}
			history={history}
		/>
	);
};

export default NewPhotoContainer;
