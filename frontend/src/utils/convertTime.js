// Fungsi untuk menghitung selisih waktu dalam jam
const calculateTimeDiffInHours = (startTime, endTime) => {
	const diffInMilliseconds = new Date(endTime) - new Date(startTime);
	return Math.floor(diffInMilliseconds / (1000 * 60 * 60));
};

// Fungsi konversi waktu
export const convertTime = (timestamp) => {
	const currentTime = new Date();
	const timePosted = new Date(timestamp);

	const hoursDiff = calculateTimeDiffInHours(timePosted, currentTime);

	if (hoursDiff >= 24) {
		const day = timePosted.getDate();
		const month = timePosted.toLocaleString("default", { month: "long" });
		const year = timePosted.getFullYear();
		const time = timePosted.toLocaleTimeString("en-US", {
			hour: "2-digit",
			minute: "2-digit",
		});

		return `${time} - ${day} ${month} ${year}`;
	} else if (hoursDiff < 1) {
		const minutesDiff = Math.floor((currentTime - timePosted) / (1000 * 60));
		return `${minutesDiff} menit yang lalu`;
	} else {
		return `${hoursDiff} jam yang lalu`;
	}
};
