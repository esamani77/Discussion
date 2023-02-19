import { useQueryClient } from "@tanstack/react-query";
import { Like1 } from "iconsax-react";
import { useRef, useState } from "react";
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
  const [user] = useUser();
  const queryClient = useQueryClient();

  const handleAddCommnet = ({
    commentId,
    reply,
  }: {
    commentId: number;
    reply: IComment;
  }) => {
    queryClient.setQueryData(
      [Disscusion],
      // ✅ this is the way
      (oldData: IDiscussion[] | undefined) => {
        if (oldData) {
          const updatedDiscussion = structuredClone(oldData) as IDiscussion[];
          updatedDiscussion.map((item) => {
            if (item.id === commentId) {
              item.replies = [
                ...item.replies,
                {
                  iLikedIt: false,
                  likes: 0,
                  text: reply.text,
                  user: reply.user,
                  date: reply.date,
                  id: Number((Math.random() * 1000).toFixed()),
                },
              ];
            }
            return item;
          });

          return updatedDiscussion;
        }
      }
    );
  };
  const handleLikeComment = (date: number, id: number) => {
    queryClient.setQueryData(
      [Disscusion],
      // ✅ this is the way
      (oldData: IDiscussion[] | undefined) => {
        if (oldData) {
          const clonedDiscussion = structuredClone(oldData) as IDiscussion[];
          const updatedDiscussion = clonedDiscussion.map((item) => {
            if (item.date === date && item.id === id && !item.iLikedIt) {
              return {
                ...item,
                iLikedIt: true,
                likes: item.likes + 1,
              };
            }
            if (item.replies && item.replies.length > 0) {
              item.replies = item.replies.map((reply) => {
                if (reply.date === date && reply.id === id && !reply.iLikedIt) {
                  return {
                    ...reply,
                    iLikedIt: true,
                    likes: reply.likes + 1,
                  };
                }
                return reply;
              });
            }
            return item;
          });

          return updatedDiscussion;
        }
      }
    );
  };
  return (
    <div className="flex gap-2  my-xs" key={props.id}>
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
        <CommentText text={props.text} />
        <div className="flex gap-2 items-center">
          <p
            className={`items-center flex gap-2 rounded-xs py-xss px-xs ${
              props.iLikedIt ? "bg-primary" : "bg-light-gray"
            }`}
            onClick={() => handleLikeComment(props.date, props.id)}
          >
            <Like1
              size={24}
              color={props.iLikedIt ? "#FFF" : "gray"}
              variant="Bold"
            />
            <span className={`${props.iLikedIt ? "text-white" : "text-black"}`}>
              {props.likes}
            </span>
          </p>
          {props.replies && (
            <p
              onClick={() =>
                handleAddCommnet({
                  commentId: props.id,
                  reply: {
                    date: Date.now(),
                    id: 1,
                    iLikedIt: false,
                    likes: 0,
                    text: "this is a test comment",
                    user: user,
                  },
                })
              }
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
            <CommentInput />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
