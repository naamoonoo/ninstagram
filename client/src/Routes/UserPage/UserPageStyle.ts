import styled from "styled-components";

export const Container = styled.div`
	max-width: 700px;
	display: inline;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 0 auto;
`;

export const ProfileContainer = styled.div`
	margin: 20px 40px 40px 40px;
	width: 100%;
`;

export const PhotoContainer = styled.div`
	padding: 5px;
	border: 1px solid lightgrey;
	max-width: 750px;
	margin: 0 auto;
	display: table;
	justify-content: center;
	align-items: center;
`;

export const Image = styled.img`
	/* float: left; */
	width: 33%;
	max-height: 150px;
	overflow: hidden;
	margin: auto;
	padding: 2px;
	cursor: pointer;
	bottom: 0;
	top: 0;

	/* &:hover {
		width: 60%;
		height: auto;
	} */
`;

export const Button = styled.button`
	display: block;
	height: 30px;
	width: 200px;
	color: white;
	background-color: #db4437;
	margin: 10px auto 0 auto;
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 3px;
`;
