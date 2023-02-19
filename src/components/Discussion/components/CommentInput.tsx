import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { FC, forwardRef, ReactNode, useState } from "react";
import { addCommnet, updateCommnet } from "../../../api";
import { IComment, IDiscussion } from "../../../api/api.types";
import { Disscusion } from "../../../api/constants";
import { useUser } from "../../../contex/user/userContext";
import Avatar from "../../Avatar";
import TextEditor from "../../TextEditor";

const CommentInput = forwardRef<HTMLTextAreaElement, { commentId: number }>(
	({ commentId }, ref) => {
		const [user] = useUser();
		const [text, setText] = useState<string>("");
		const queryClient = useQueryClient();
		const handleUpdate = () => {
			if (commentId) {
				addCommnet({
					commentId,
					queryClient,
					reply: {
						text,
						user,
					},
				});
			} else {
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
