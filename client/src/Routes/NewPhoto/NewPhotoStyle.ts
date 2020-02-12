import styled from "styled-components";
import DragAndDrop from "../../Components/DargAndDrop";

export const Container = styled.div`
	display: block;
	justify-content: center;
	align-items: center;
	margin: auto;
	max-width: 750px;
	border: 1px solid lightgrey;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

export const Header = styled.div`
	width: 100%;
	height: 45px;
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
`;

export const Time = styled.span`
	color: grey;
	position: absolute;
	right: 15px;
	font-weight: lighter;
	font-size: 14px;
`;

export const Camera = styled.div`
	display: block;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: auto;
	border-top: 1px solid lightgrey;
	border-bottom: 1px solid lightgrey;
	overflow: hidden;
	padding: 20 20;
	position: relative;
`;

export const PreviewDiv = styled.div`
	height: 80px;
	width: 100%;
	display: flexbox;
	margin: 10px 0;
	padding: 5px 2px;
	overflow-x: scroll;
	overflow-y: hidden;
	white-space: nowrap;
`;

export const Preview = styled.img`
	width: auto;
	height: 100%;
	overflow: hidden;
	margin: 0 2px;
	cursor: pointer;
	-webkit-transition: 0.3s ease-in-out;
	transition: 0.3s ease-in-out;
	:hover {
		border: 3px solid grey;
	}
	:active {
		border: 5px solid red;
	}
`;

export const Image = styled.img`
	width: 100%;
	height: auto;
	border-top: 1px solid lightgrey;
	border-bottom: 1px solid lightgrey;
	overflow: hidden;
`;

interface IIconProp {
	selected: boolean;
}
export const Icon = styled.div<IIconProp>`
	cursor: pointer;
	height: 25px;
	width: auto;
	margin: 5px;
	fill: ${props => (props.selected ? "black" : "lightgrey")};
`;

export const Upload = styled(DragAndDrop)`
	width: 100%;
	min-height: 500px;
	border-top: 1px solid lightgrey;
	border-bottom: 1px solid lightgrey;
	display: block;
	align-items: center;
	justify-content: center;
`;

export const UploadInput = styled.input`
	color: white;
	opacity: 0;
	height: 100px;
	&:focus {
		outline: none;
	}
`;

export const UploadLabel = styled.label`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28px;

	&:hover {
		filter: blur(1px);
		-webkit-filter: blur(1px);
		transition: filter 0.5s;
	}
	& img {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 160px;
		height: 160px;
		border-radius: 50%;
		overflow: hidden;
	}
`;
