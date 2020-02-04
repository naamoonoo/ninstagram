import React, { useState } from "react";
import NewPhotoPresenter from "./NewPhotoPresenter";

const NewPhotoContainer: React.FC = () => {
	const [pictures, setPictures] = useState<string[]>([]);
	const [selected, setSelected] = useState<string>();
	const [isCameraMode, setIsCameraMode] = useState(true);

	const onCaptureHandler = (newPicture: string) => {
		setPictures((oldPictures: string[]) => [...oldPictures, newPicture]);
	};

	return (
		<NewPhotoPresenter
			pictures={pictures}
			onCaptureHandler={onCaptureHandler}
			selected={selected}
			setSelected={setSelected}
			isCameraMode={isCameraMode}
			setIsCameraMode={setIsCameraMode}
		/>
	);
};

export default NewPhotoContainer;
