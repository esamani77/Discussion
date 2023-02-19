export const CommentText = ({
	text,
	onTagClicked,
}: {
	text: string;
	onTagClicked: (val: string) => void;
}) => {
	const regex = /(@\w+)/g;
	const splitText = text.split(regex);
	const highlightedText = splitText.map((substring, index) => {
		if (substring.match(regex)) {
			return (
				<span
					key={index}
					className="bg-primary bg-primarylight text-primary p-xss rounded-sm cursor-pointer "
					onClick={() => onTagClicked(substring)}
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
