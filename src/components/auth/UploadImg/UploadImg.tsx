import React, { useRef } from "react";

function UploadImg({
	selectedFile,
	setSelectedFile,
}: {
	selectedFile: string | null;
	setSelectedFile: (val: string | null) => void;
}) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(URL.createObjectURL(file));
		}
	};

	const handleButtonClick = (): void => {
		fileInputRef.current?.click();
	};

	return (
		<div>
			<input
				type="file"
				accept="image/*"
				onChange={(evt) => handleFileChange(evt)}
				className=" rounded-sm hidden"
				ref={fileInputRef}
			/>
			<button
				type="button"
				onClick={() => handleButtonClick()}
				className="btn rounded-sm w-full my-xss"
			>
				Upload a profile
			</button>
		</div>
	);
}

export default UploadImg;
