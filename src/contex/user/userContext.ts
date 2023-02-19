import { createContext, useContext } from "react";
import { UserState, UserAction } from "./../../types/user";

export const fallbackUser: UserState = {
	avatar: "",
	name: "",
};

export const UserContext = createContext<[UserState, React.Dispatch<UserAction>]>([
	fallbackUser,
	() => {
		return;
	},
]);

UserContext.displayName = "UserContext";

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a CountProvider");
	}
	return context;
};
