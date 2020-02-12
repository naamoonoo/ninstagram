import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import NewPhotoPresenter from "./NewPhotoPresenter";

interface IProps extends RouteComponentProps {}

const NewPhotoContainer: React.FC<IProps> = ({ history }) => {
	const [pictures, setPictures] = useState<string[]>([]);
	const [selected, setSelected] = useState<string>();
	const [isCameraMode, setIsCameraMode] = useState(true);

	const onCaptureHandler = (newPicture: string) => {
		setPictures((oldPictures: string[]) => [...oldPictures, newPicture]);
	};

	const onUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { files }
		} = event;
		if (files && files[0]) {
			const file = files[0];
			const reader = new FileReader();

			reader.onload = (event: ProgressEvent<FileReader>) => {
				if (event && event.target && event.target.result) {
					setSelected(event.target.result as string);
				}
			};

			reader.readAsDataURL(file);
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
