export function timeAgo(someDateInThePast: number) {
	let result = "";
	const difference = Date.now() - someDateInThePast;

	if (difference < 5 * 1000) {
		return "just now";
	} else if (difference < 90 * 1000) {
		return "moments ago";
	}

	// it has minutes
	if ((difference % 1000) * 3600 > 0) {
		if (Math.floor((difference / 1000 / 60) % 60) > 0) {
			const s = Math.floor((difference / 1000 / 60) % 60) == 1 ? "" : "s";
			result = `${Math.floor((difference / 1000 / 60) % 60)} minute${s} `;
		}
	}

	// it has hours
	if ((difference % 1000) * 3600 * 60 > 0) {
		if (Math.floor((difference / 1000 / 60 / 60) % 24) > 0) {
			const s = Math.floor((difference / 1000 / 60 / 60) % 24) == 1 ? "" : "s";
			result = `${Math.floor((difference / 1000 / 60 / 60) % 24)} hour${s}`;
		}
	}

	// it has days
	if ((difference % 1000) * 3600 * 60 * 24 > 0) {
		if (Math.floor(difference / 1000 / 60 / 60 / 24) > 0) {
			const s = Math.floor(difference / 1000 / 60 / 60 / 24) == 1 ? "" : "s";
			result = `${Math.floor(difference / 1000 / 60 / 60 / 24)} day${s} `;
		}
	}

	return `${result} ago`;
}
