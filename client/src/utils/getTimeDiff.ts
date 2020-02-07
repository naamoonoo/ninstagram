export const getTimeDiff = (time: Date) => {
	const now = new Date();
	const diff = (now.getTime() - time.getTime()) / 1000;
	if (diff < 60) {
		return `${Math.floor(diff)} s`;
	} else if (diff / 60 < 60) {
		return `${Math.floor(diff / 60)} m`;
	} else if (diff / 3600 < 24) {
		return `${Math.floor(diff / 3600)} h`;
	} else {
		return `${Math.floor(diff / (3600 * 24))} d`;
	}
};
