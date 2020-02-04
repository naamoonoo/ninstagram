import React, { useState } from "react";
import NewFeedPresenter from "./NewFeedPresenter";

const NewFeedContainer: React.FC = () => {
	const [pictures, setPictures] = useState<string[]>([]);
	const [selected, setSelected] = useState<string>();

	return (
		<NewFeedPresenter
			pictures={pictures}
			setPictures={setPictures}
			selected={selected}
			setSelected={setSelected}
		/>
	);
};

export default NewFeedContainer;
