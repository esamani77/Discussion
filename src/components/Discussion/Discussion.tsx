import { useState } from "react";
import Comment from "./components";
import { useDisscusionQuery } from "../../api";
import { Record } from "iconsax-react";
import { useUser } from "../../contex/user/userContext";
import CommentInput from "./components/CommentInput";

function Discussion() {
  const [user] = useUser();
  const { data, isLoading } = useDisscusionQuery();
  return (
    <>
      <CommentInput />
      <div className="w-screen h-1 border-b py-xs"></div>
      {isLoading ? (
        <Record
          size="32"
          color="#2ccce4"
          variant="Broken"
          className="spin-animation "
        />
      ) : data && data.length > 0 ? (
        <Comment comments={data} />
      ) : (
        <p>No comments yet add yours</p>
      )}
    </>
  );
}

export default Discussion;
