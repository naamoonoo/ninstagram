import styled from "styled-components";
import Input from "../../Components/Input";

export const Container = styled.div`
	max-width: 650;
	display: block;
	justify-content: center;
	margin: auto;
	justify-content: center;
	text-align: center;
	padding: 10 auto;
`;

export const SearchBar = styled(Input)`
	margin: 40px 0;
	height: 30px;
	width: 100%;
	font-size: 20px;
	font-weight: bold;
	color: darkgrey;
`;

export const Warning = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	color: red;
	font-weight: lighter;
	margin: 20px 0;
	opacity: 0.9;
`;

export const UsersContainer = styled.div`
	display: block;
	width: 400px;
	margin: 50px auto;
	justify-content: center;
	padding-left: 50px;
`;

export const PhotoContainer = styled.div`
	padding: 5px;
	border: 1px solid lightgrey;
	max-width: 500px;
	margin: 50px auto;
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
