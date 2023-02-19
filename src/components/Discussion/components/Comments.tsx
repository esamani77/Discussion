import { IDiscussion } from "../../../api/api.types";
import { Comment } from "./Comment";
export const Comments = ({ comments }: { comments: IDiscussion[]  }) => {
  return (
    <>
      {comments.map((item) => {
        return (
          <div className="border-b py-base">
            <Comment {...item} key={item.id} />
          </div>
        );
      })}
    </>
  );
};

export default Comments;
