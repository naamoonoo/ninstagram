import React from "react";
import * as S from "./ProfileStyle";

interface IProps {
	id: string;
	fullName: string;
	profilePhoto?: string;
}

const ProfilePresenter: React.FC<IProps> = () => {
	return (
		<S.Container>
			<S.ProfileImg
				src={"https://simpleicon.com/wp-content/uploads/user1.svg"}
			/>
			<S.Name>naamoonoo.y</S.Name>
		</S.Container>
	);
};

export default ProfilePresenter;
