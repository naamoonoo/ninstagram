import React, { useState } from "react";
import { toast } from "react-toastify";
import * as S from "./DargAndDropStyle";

interface IProps {
	className?: string;
	onDropHandler: any;
}

const DargAndDropPresenter: React.FC<IProps> = ({
	className,
	children,
	onDropHandler
}) => {
	const [isDragging, setIsDragging] = useState(false);

	const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragging(true);
	};

	const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragging(false);
	};

	const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsDragging(false);
		if (event.dataTransfer.files && event.dataTransfer.files[0]) {
			if (event.dataTransfer.files.length > 1) {
				toast.error(
					"it doesn't support multi upload, please pick one :)"
				);
			}
			const file = event.dataTransfer.files[0];
			const reader = new FileReader();

			reader.onload = (event: ProgressEvent<FileReader>) => {
				if (event && event.target && event.target.result) {
					onDropHandler(event.target.result as string);
				}
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<S.Container
			className={className}
			onDragStart={handleDragEnter}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDrag}
			onDrop={handleDrop}
		>
			{!isDragging && children}
			{isDragging && <S.Container>"drop here :)"</S.Container>}
		</S.Container>
	);
};

export default DargAndDropPresenter;
