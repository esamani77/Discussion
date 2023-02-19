import { sleep } from "../utils";
import { discussions } from "./mockData";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Disscusion } from "./constants";
import { IComment, IDiscussion } from "./api.types";

const getComments = async () => {
	await sleep(1000);
	return discussions;
};

export const useDisscusionQuery = () => {
	return useQuery({
		queryFn: getComments,
		queryKey: [Disscusion],
		staleTime: Infinity,
		refetchOnMount: false,
		cacheTime: 60 * 1000 * 5,
	});
};

export const addCommnet = ({
	commentId,
	reply,
	queryClient,
}: {
	commentId: number;
	reply: Pick<IComment, "text" | "user">;
	queryClient: QueryClient;
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
								date: Date.now(),
								id: Number((Math.random() * 1000).toFixed()),
							},
						];
					}
					return item;
				});

				return updatedDiscussion;
			}
		},
	);
};

export const updateCommnet = ({
	comment,
	queryClient,
}: {
	comment: Pick<IComment, "text" | "user">;
	queryClient: QueryClient;
}) => {
	queryClient.setQueryData(
		[Disscusion],
		// ✅ this is the way
		(oldData: IDiscussion[] | undefined) => {
			return oldData
				? [
						...oldData,
						{
							date: Date.now(),
							id: Number((Math.random() * 100).toFixed()),
							iLikedIt: false,
							likes: 0,
							replies: [],
							text: comment.text,
							user: comment.user,
						},
				  ]
				: oldData;
		},
	);
};

export const likeCommnet = ({
	date,
	id,
	data,
	queryClient,
}: {
	date: number;
	id: number;
	data: boolean;
	queryClient: QueryClient;
}) => {
	queryClient.setQueryData(
		[Disscusion],
		// ✅ this is the way
		(oldData: IDiscussion[] | undefined) => {
			if (oldData) {
				const clonedDiscussion = structuredClone(oldData) as IDiscussion[];
				const updatedDiscussion = clonedDiscussion.map((item) => {
					if (item.date === date && item.id === id) {
						return {
							...item,
							iLikedIt: data,
							likes: item.likes + (data ? 1 : -1),
						};
					}
					if (item.replies && item.replies.length > 0) {
						item.replies = item.replies.map((reply) => {
							if (reply.date === date && reply.id === id) {
								return {
									...reply,
									iLikedIt: data,
									likes: reply.likes + (data ? 1 : -1),
								};
							}
							return reply;
						});
					}
					return item;
				});

				return updatedDiscussion;
			}
		},
	);
};
