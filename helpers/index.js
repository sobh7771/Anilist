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
		if (!str) return;

		const arr = str.split("_");

		return arr
			.map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
			.join(" ");
	},
	getDate(day, month, year) {
		if (!day && !month && !year) {
			return "";
		} else if (!year) {
			return `${month} ${day}`;
		} else if (!day && !month) {
			return year;
		} else if (!day) {
			return `${month}, ${year}`;
		} else if (!month) {
			return `${day}, ${year}`;
		}

		return `${month} ${day}, ${year}`;
	},
	formatTitle(title) {
		return title.length < 39 ? title : `${title.substring(0, 39)}...`;
	},
	getFormat(str) {
		return str === "TV" ? "TV Show" : this.capitalize(str);
	},
	isEmpty(obj) {
		return !Object.keys(obj).length;
	},
	mergeByYear(arr) {
		const mergedObj = {};

		arr.forEach((el) => {
			const year = el.node.startDate.year;

			if (mergedObj.hasOwnProperty(year)) {
				mergedObj[year].push(el);
			} else {
				mergedObj[year] = [el];
			}
		});

		return mergedObj;
	},
};

export default helpers;
