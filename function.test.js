const { searchList, sortedPlayerList, isTaken, updateList } = require("./functions");

const array = [
	["adam", "bulls", "1", "2", "3"],
	["peter", "bulls", "4", "5", "6"],
	["gabor", "bulls", "7", "8", "9"],
	["szilard", "bulls", "10", "11", "12"],
	["istvan", "bulls", "13", "14", "15"],
	["csaba", "bulls", "16", "17", "18"],
	["jozsi", "lakers", "19", "20", "21"],
	["bela", "lakers", "22", "23", "24"],
	["karesz", "lakers", "25", "26", "27"],
	["viola", "lakers", "28", "29", "30"],
	["lajos", "lakers", "31", "32", "33"],
	["valeria", "69ers", "34", "35", "36"],
	["rita", "69ers", "37", "38", "39"],
	["eliza", "69ers", "40", "41", "42"],
	["ajten", "69ers", "43", "44", "45"],
	["mineta", "69ers", "46", "47", "48"],
	["karolina", "69ers", "49", "50", "51"],
];
test("search list", () => {
	expect(searchList(array, "2", "karolina")).toEqual(["karolina", "69ers", "49", "50", "51"]);
	expect(searchList(array, "3", "adam")).toEqual(["adam", "bulls", "1", "2", "3"]);
	expect(searchList(array, "4", "mineta")).toEqual(["mineta", "69ers", "46", "47", "48"]);
	searchList(array, "5", "er");
	expect(searchList(array, "5", "er")).toEqual([
		["peter", "bulls", "4", "5", "6"],
		["jozsi", "lakers", "19", "20", "21"],
		["bela", "lakers", "22", "23", "24"],
		["karesz", "lakers", "25", "26", "27"],
		["viola", "lakers", "28", "29", "30"],
		["lajos", "lakers", "31", "32", "33"],
		["valeria", "69ers", "34", "35", "36"],
		["rita", "69ers", "37", "38", "39"],
		["eliza", "69ers", "40", "41", "42"],
		["ajten", "69ers", "43", "44", "45"],
		["mineta", "69ers", "46", "47", "48"],
		["karolina", "69ers", "49", "50", "51"],
	]);
	expect(searchList(array, "6", "69ers")).toEqual([
		["valeria", "69ers", "34", "35", "36"],
		["rita", "69ers", "37", "38", "39"],
		["eliza", "69ers", "40", "41", "42"],
		["ajten", "69ers", "43", "44", "45"],
		["mineta", "69ers", "46", "47", "48"],
		["karolina", "69ers", "49", "50", "51"],
	]);
});

test("taken", () => {
	expect(isTaken(array, "adam")).toBe(true),
		expect(isTaken(array, "69ers")).toBe(false),
		expect(isTaken(array, "Adam")).toBe(false),
		expect(isTaken(array, "ada")).toBe(false),
		expect(isTaken(array, "")).toBe(false);
});
test("partial search", () => {
	expect(searchList(array, 5, "adam")).toEqual([array[0]]);
	expect(searchList(array, 5, "9ers")).toEqual([array[11], array[12], array[13], array[14], array[15], array[16]]);
	expect(searchList(array, 5, "ERS")).toEqual([]);
	expect(searchList(array, 5, "3")).toEqual([]);
});

test("sorted list", () => {
	sortedPlayerList(array, [0], 1);
	expect(array[0]).toEqual(["adam", "bulls", "1", "2", "3"]);
	expect(array[array.length - 1]).toEqual(["viola", "lakers", "28", "29", "30"]);
	sortedPlayerList(array, [0], 0);
	expect(array[0]).toEqual(["viola", "lakers", "28", "29", "30"]);
	expect(array[array.length - 1]).toEqual(["adam", "bulls", "1", "2", "3"]);
	sortedPlayerList(array, [2], 1);
	expect(array[0]).toEqual(["adam", "bulls", "1", "2", "3"]);
	expect(array[array.length - 1]).toEqual(["karolina", "69ers", "49", "50", "51"]);
	sortedPlayerList(array, [3], 0);
	expect(array[0]).toEqual(["karolina", "69ers", "49", "50", "51"]);
	expect(array[array.length - 1]).toEqual(["adam", "bulls", "1", "2", "3"]);
});

test("update list", () => {
	updateList("warriors", array, 1, 1);
	expect(array[1][1]).toBe("warriors");
});
