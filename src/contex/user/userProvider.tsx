import { useReducer } from "react";
import { fallbackUser, UserContext } from "./userContext";
import UserReducer from "./userReducer";
type UserProviderProps = {
	children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
	const [state, dispatch] = useReducer(UserReducer, fallbackUser);
	return <UserContext.Provider value={[state, dispatch]}>{children}</UserContext.Provider>;
};

export default UserProvider;
