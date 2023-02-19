import { IDiscussion } from "../../../api/api.types";
import { Comment } from "./Comment";
export const Comments = ({ comments }: { comments: IDiscussion[] }) => {
	return (
		<>
			{comments.map((item) => {
				return (
					<div className="border-b py-base " key={item.id}>
						<Comment {...item} />
					</div>
				);
			})}
		</>
	);
};

export default Comments;
