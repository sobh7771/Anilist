const helpers = {
	getMonth(i) {
		const months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"June",
			"July",
			"Aug",
			"Sept",
			"Oct",
			"Nov",
			"Dec",
		];

		return months[i];
	},
	getSeason(month) {
		const seasons = {
			Jan: "Winter",
			Feb: "Winter",
			Mar: "Spring",
			Apr: "Spring",
			May: "Spring",
			June: "Summer",
			July: "Summer",
			Aug: "Summer",
			Sept: "Full",
			Oct: "Full",
			Nov: "Full",
			Dec: "Winter",
		};

		return seasons[month];
	},
	getNextSeason(currSeason) {
		const seasons = ["Spring", "Summer", "Fall", "Winter"];

		const i = seasons.indexOf(currSeason);

		return seasons[i === 3 ? 0 : i + 1];
	},
	capitalize(str) {
		const arr = str.split("_");

		return arr
			.map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
			.join(" ");
	},
};

export default helpers;
