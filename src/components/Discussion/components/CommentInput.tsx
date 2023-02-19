import { useQueryClient } from "@tanstack/react-query";
import { IComment, IDiscussion } from "../../../api/api.types";
import { Disscusion } from "../../../api/constants";
import { useUser } from "../../../contex/user/userContext";
import Avatar from "../../Avatar";
import TextEditor from "../../TextEditor";

const CommentInput = () => {
  const [user] = useUser();

  return (
    <div className="flex justify-center items-center gap-2 w-base w-full  ">
      <Avatar
        className="rounded-full mx-base"
        alt={user.name}
        src={user.avatar}
        width={48}
        height={48}
      />
      <TextEditor />
    </div>
  );
};

export default CommentInput;
