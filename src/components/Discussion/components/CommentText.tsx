export const CommentText = ({ text }: { text: string }) => {
	const regex = /(@\w+)/g;
	const splitText = text.split(regex);
	const highlightedText = splitText.map((substring, index) => {
		if (substring.match(regex)) {
			return (
				<span
					key={index}
					className="bg-primary bg-primarylight text-primary p-xss rounded-sm cursor-pointer "
					onClick={() => console.log("FUCK U")}
				>
					{substring}
				</span>
			);
		}
		return substring;
	});

	return <div className="text-gray">{highlightedText}</div>;
};

export default CommentText;
