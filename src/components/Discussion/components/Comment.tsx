import { useQueryClient } from "@tanstack/react-query";
import { Like1 } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { likeCommnet } from "../../../api";
import { IComment, IDiscussion } from "../../../api/api.types";
import { DefaultAvatar, Disscusion } from "../../../api/constants";
import { useUser } from "../../../contex/user/userContext";
import { sleep, timeAgo } from "../../../utils";
import { Avatar } from "../../Avatar";
import CommentInput from "./CommentInput";
import CommentText from "./CommentText";

interface ICommentsProps extends IComment {
	replies?: IComment[];
}

export const Comment = (props: ICommentsProps) => {
	const hasReplies = props?.replies;
	const queryClient = useQueryClient();

	const [user] = useUser();
	const [addReply, setAddReply] = useState(false);
	const [tagData, setTagData] = useState("");

	const ref = useRef<HTMLTextAreaElement>(null);

	const focusRef = () => {
		ref.current && ref.current.focus();
	};
	const handleAddReply = async (val: string = "") => {
		if (hasReplies && hasReplies.length === 0) {
			setAddReply(true);
			await sleep(200);
		}
		focusRef();
	};

	return (
		<div className="flex gap-2  my-xs">
			<Avatar
				alt={props.user.name}
				src={props.user?.avatar}
				width={48}
				height={48}
				className="rounded-full"
			/>
			<div className="flex gap-2 flex-col">
				<div className="flex items-center gap-2">
					<p className="text-base text-bold">{props.user.name}</p>
					<small className="text-xs">{timeAgo(props.date)}</small>
				</div>
				<CommentText text={props.text} onTagClicked={setTagData} />
				<div className="flex gap-2 items-center">
					<p
						className={`items-center flex gap-2 rounded-xs py-xss px-xs ${
							props.iLikedIt ? "bg-primary" : "bg-light-gray"
						}`}
						onClick={() =>
							likeCommnet({
								date: props.date,
								id: props.id,
								data: !props.iLikedIt,
								queryClient: queryClient,
							})
						}
					>
						<Like1 size={24} color={props.iLikedIt ? "#FFF" : "gray"} variant="Bold" />
						<span className={`${props.iLikedIt ? "text-white" : "text-black"}`}>{props.likes}</span>
					</p>
					{props.replies && (
						<p
							className="cursor-pointer "
							onClick={() => {
								handleAddReply("");
							}}
						>
							reply
						</p>
					)}
				</div>
				{hasReplies && hasReplies.length > 0 && (
					<div className="border-l">
						{hasReplies.map((reply) => {
							return <Comment {...reply} key={reply.id} />;
						})}
						<CommentInput tagData={tagData} ref={ref} commentId={props.id} />
					</div>
				)}
				{hasReplies && hasReplies.length === 0 && addReply && (
					<CommentInput ref={ref} commentId={props.id} />
				)}
			</div>
		</div>
	);
};

export default Comment;
