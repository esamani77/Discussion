import { UserState, UserAction } from "./../../types/user";

const UserReducer: React.Reducer<UserState, UserAction> = (state, action) => {
	switch (action.type) {
		case "SET":
			return {
				...action.payload,
			};
		case "UNSET":
			return {
				...state,
				avatar: "",
				name: "",
			};

		default: {
			throw new Error(`Unhandled action : ${action}`);
		}
	}
};

export default UserReducer;
