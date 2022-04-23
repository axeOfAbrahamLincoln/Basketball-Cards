function printMenu(menu, menuName) {
	menu.forEach((element, idx) => {
		console.log(`${idx + 1}. ${element}`);
	});
	console.log("");
	console.log(`Choose from the ${menuName} menu [1-${menu.length}]:`);
}
function searchList(list, menu, elementToSearch) {
	if (menu == "4" || menu == "3" || menu == "2") return list.find((elm) => elm[0] == elementToSearch);

	if (menu == "5") {
		return list.filter((elm) => elm[0].includes(elementToSearch) || elm[1].includes(elementToSearch));
	}
	if (menu == "6") {
		return list.filter((elm) => elm[1] == elementToSearch);
	}
}
function printCards(arr2D) {
	let [playerName, team, rpg, ppg, apg] = ["", "", "", "", ""];

	arr2D.forEach((elm, idx) => {
		[playerName, team, rpg, ppg, apg] = [...elm];
		if (arr2D.length > 1) {
			console.log(`${idx + 1}. name: ${playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase()}; team: ${team}`);
			console.log(`   RPG: ${rpg} PPG: ${ppg} APG: ${apg}\n`);
		} else {
			console.log(` name: ${playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase()}; team: ${team}`);
			console.log(` RPG: ${rpg} PPG: ${ppg} APG: ${apg}\n`);
		}
	});
}
function sortedPlayerList(list, sortBy, direction) {
	if ((sortBy == 0 || sortBy == 1) && direction == 1) {
		return list.sort(function (a, b) {
			// sorting alphabetically - ascending
			const nameA = a[sortBy[0]];
			const nameB = b[sortBy[0]];
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			return 0;
		});
	}
	if ((sortBy == 0 || sortBy == 1) && direction == 0) {
		return list
			.sort(function (a, b) {
				// sorting alphabetically - descending
				const nameA = a[sortBy[0]];
				const nameB = b[sortBy[0]];
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}

				return 0;
			})
			.reverse();
	}

	if (!(sortBy == 0 || sortBy == 1) && direction == 0) {
		return list.sort(function (a, b) {
			return b[sortBy[0]] - a[sortBy[0]];
		});
	}
	if (!(sortBy == 0 || sortBy == 1) && direction == 1) {
		return list.sort(function (a, b) {
			return a[sortBy[0]] - b[sortBy[0]];
		});
	}
}
function printTopList(list, sortBy, top) {
	if (list.length >= top) {
		console.log(`Top ${top} players with the ${sortBy[2]}:\n`);
		for (let i = 0; i < top; i++) {
			console.log(`${i + 1}. ${list[i][0]}, team: ${list[i][1]},  ${sortBy[1]}: ${list[i][sortBy[0]]}`);
		}
	} else {
		console.log(`There is just ${list.length} ${list.length == 1 ? "palyer" : "players"} in the system!`);
		console.log(`Top ${list.length} ${list.length == 1 ? "palyer" : "players"} with the ${sortBy[2]}:\n`);
		for (let i = 0; i < list.length; i++) {
			console.log(`${i + 1}. ${list[i][0]}, team: ${list[i][1]}, ${sortBy[1]}: ${list[i][sortBy[0]]}`);
		}
	}
}
function isTaken(list, newName) {
	let name = list.find((elm) => elm[0] == newName);
	if (name) {
		return true;
	} else {
		return false;
	}
}
module.exports = {
	printMenu,
	searchList,
	printCards,
	sortedPlayerList,
	printTopList,
	isTaken,
};
