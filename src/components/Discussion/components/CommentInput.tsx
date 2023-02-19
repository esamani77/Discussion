import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { FC, forwardRef, ReactNode, useEffect, useState } from "react";
import { addCommnet, updateCommnet } from "../../../api";
import { IComment, IDiscussion } from "../../../api/api.types";
import { Disscusion } from "../../../api/constants";
import { useUser } from "../../../contex/user/userContext";
import Avatar from "../../Avatar";
import TextEditor from "../../TextEditor";

const CommentInput = forwardRef<HTMLTextAreaElement, { commentId: number; tagData?: string }>(
	({ commentId, tagData }, ref) => {
		const [user] = useUser();
		const [text, setText] = useState<string>("");

		useEffect(() => {
			console.log(
				"%c tagData",
				"background: #FFF; color: #000;padding: 0.25rem;border-radius: 5px",
				tagData,
			);
			setText(tagData ?? "");
		}, [tagData]);

		const queryClient = useQueryClient();
		const handleUpdate = () => {
			if (commentId && text) {
				addCommnet({
					commentId,
					queryClient,
					reply: {
						text,
						user,
					},
				});
			} else if (text) {
				updateCommnet({ comment: { text, user }, queryClient });
			}
			setText("");
		};
		return (
			<div className="flex justify-center items-center gap-2 w-base w-full  ">
				<Avatar className="rounded-full" alt={user.name} src={user.avatar} width={48} height={48} />
				<TextEditor
					ref={ref}
					onKeyDown={(e) => {
						if (e.key === "Enter" && e.shiftKey == false) {
							handleUpdate();
						}
					}}
					onChange={(e) => {
						setText(e.target.value);
					}}
					value={text}
				/>
			</div>
		);
	},
);
export default CommentInput;
