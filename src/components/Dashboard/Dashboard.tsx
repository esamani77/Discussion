import { useEffect, useState } from "react";
import { useUser } from "../../contex/user/userContext";
import LoginModal from "../auth/LoginModal";
import Discussion from "../Discussion";

function Dashboard() {
	const [state] = useUser();
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const [showDiscussions, setShowshowDiscussions] = useState(false);

	useEffect(() => {
		if (state.name === "") {
			setShowshowDiscussions(false);
		}
	}, [state.name]);
	const showDiscussionsFn = () => {
		if (state.name === "") {
			setIsLoginModalOpen(true);
		} else {
			setShowshowDiscussions(true);
		}
	};
	return (
		<main className=" font-family h-full w-full flex justify-center">
			{showDiscussions ? (
				<div className="w-quarter3 flex flex-column mt-xxl">
					<Discussion />
				</div>
			) : (
				<div className=" flex justify-center items-center flex-column w-full">
					<h1 className="mb-xs">Welcome to Discussion Board</h1>
					<h4 className="mb-xs">Talk about anything that is in your mind</h4>
					<button
						type="button"
						className="btn btn-primary rounded-sm mb-xs text-lg w-quarter1 py-lg mt-lg w-full"
						onClick={() => showDiscussionsFn()}
					>
						Let us Start
					</button>
				</div>
			)}
			{isLoginModalOpen && (
				<LoginModal showModal={isLoginModalOpen} setShowModal={setIsLoginModalOpen} />
			)}
		</main>
	);
}

export default Dashboard;
