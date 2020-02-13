import styled from "styled-components";

export const Container = styled.div`
	max-width: 800px;
	display: inline;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding: 0 auto;
`;

export const ProfileContainer = styled.div`
	display: flex;
	max-width: 750px;
	margin: 20px auto 40px auto;
	position: relative;
	align-items: center;
`;

export const Infos = styled.div`
	height: 100%;
	width: 150px;
	position: absolute;
	right: 0px;
	align-items: center;
	display: block;
`;

export const Info = styled.div`
	margin: 10px 0;
	color: darkgrey;
	font-weight: bold;
	text-transform: uppercase;
	display: flex;
	align-items: center;
	letter-spacing: 1px;
	font-size: 1.1em;
	cursor: pointer;
	border-left: 4px solid lightgrey;
	padding-left: 5px;
	&:hover {
		color: black;
		text-decoration: underline;
	}
`;

export const PhotoContainer = styled.div`
	padding: 5px;
	border: 1px solid lightgrey;
	max-width: 500px;
	margin: 0 auto;
	display: table;
`;

export const Image = styled.img`
	width: 33%;
	height: 160px;
	overflow: hidden;
	float: left;
	padding: 2px;
	cursor: pointer;
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
