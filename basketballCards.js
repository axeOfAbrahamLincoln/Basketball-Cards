const { nextLine } = require("@learnly/simple-reader");

const fs = require("fs");

const { printMenu, searchList, printCards, sortedPlayerList, printTopList, isTaken } = require("./functions");

// DECLARING VARIABLES

let programData;
let userPrgMenuChoice;
const programMenu = [
	"Add player to database",
	"Update player's data",
	"Delete player from database",
	"Print a player data card",
	"Search",
	"Lists",
	"Save and exit",
];
let userTop3MenuChoice;
const top3Menu = ["RPG", "PPG", "APG\n", "Back to list menu"];
let userListMenuChoice;
const listMenu = ["TOP3", "Players by team", "All players\n", "Back to main menu"];
let userUpdateMenuChoice;
const updateMenu = ["TEAM", "ReboundPerGame", "PointsPerGaem", "AssistsPerGame\n", "Save and Exit"];

let topList = 3;
const descend = 0;
const ascend = 1;

const playerDetails = ["player name", "team name", "Rebound Per Game(RPG)", "Points Per Game(PPG)", "Assists Per Game(APG)"];

const NAME = [0];
const TEAM = [1];
const RPG = [2, "RPG", "highest rebounds average"];
const PPG = [3, "PPG", "highest points average"];
const APG = [4, "APG", "highest assists average"];

// READ DATA FROM FILE
try {
	// declaring programData from a readed file
	programData = fs
		.readFileSync("database.txt", "utf-8")
		.split(/\r?\n/)
		.filter((element) => element); // filtering all falsy values, for example when the database.txt has just one empty line, makes rid of that empty string
	console.log("Database loaded...\n");
} catch (err) {
	// declaring programData if there is no file to load (file doesnt exists),
	console.log("No file to load, list is empty\n");
	programData = []; //
}

// declaring player list from a readed file
let playerList = programData.map((elm) => elm.split(","));

//if i need a database, uncomment the lines below, and comment out the line above at the first run! Save it and set it back
//
// playerList = [
// 	["adam", "bulls", "1", "2", "3"],
// 	["peter", "bulls", "4", "5", "6"],
// 	["gabor", "bulls", "7", "8", "9"],
// 	["szilard", "bulls", "10", "11", "12"],
// 	["istvan", "bulls", "13", "14", "15"],
// 	["csaba", "bulls", "16", "17", "18"],
// 	["jozsi", "lakers", "19", "20", "21"],
// 	["bela", "lakers", "22", "23", "24"],
// 	["karesz", "lakers", "25", "26", "27"],
// 	["viola", "lakers", "28", "29", "30"],
// 	["lajos", "lakers", "31", "32", "33"],
// 	["valeria", "69ers", "34", "35", "36"],
// 	["rita", "69ers", "37", "38", "39"],
// 	["eliza", "69ers", "40", "41", "42"],
// 	["ajten", "69ers", "43", "44", "45"],
// 	["mineta", "69ers", "46", "47", "48"],
// 	["karolina", "69ers", "49", "50", "51"],
// ];

// STARTING THE PROGRAM
while (true) {
	console.log("***** Basketball Players Database *****\n");
	// print main menu
	printMenu(programMenu, "program");
	// read user menu choice
	userPrgMenuChoice = Number(nextLine());

	// Add player to database (1)
	if (userPrgMenuChoice == 1) {
		let addDetails;
		let playerCard = [];
		let save;
		while (true) {
			// for loop for adding details to player card
			for (let i = 0; i < playerDetails.length; i++) {
				// 0,1 adding string(player name and team)
				if (i <= 1) {
					console.log(`Add ${playerDetails[i]}:`);
					addDetails = nextLine().toLowerCase();
					//if name is taken
					if (isTaken(playerList, addDetails)) {
						console.log("\nthis name is already taken\n");
						i--;
						continue;
					}
					//empty string
					else if (!addDetails) {
						console.log(`\n!!! ${playerDetails[i]} is obligatory`);
						i--;
						continue;
					}
					// correct entry
					else {
						playerCard.push(addDetails);
						console.log("\nentry saved\n");
					}
				}
				// 2,3,4 adding numbers(rpg,ppg,apg)
				else {
					console.log(`Add ${playerDetails[i]}:`);
					console.log("(or press enter to set it to zero)");
					addDetails = Number(nextLine());
					if (addDetails >= 0) {
						playerCard.push(addDetails);
						console.log("\nsaved\n");
					} else {
						console.log(`\n!!! cant be set as ${playerDetails[i]}`);
						i--;
						continue;
					}
				}
			}
			// finish the adding process
			while (true) {
				console.log("Press 0 to cancel and exit");
				console.log("Press 1 to save and exit");
				save = Number(nextLine());
				if (save == 0) {
					break;
				} else if (save == 1) {
					console.log("Player card:");
					printCards([playerCard]);
					playerList.push(playerCard); //add card to playerList
					console.log("\nSaved!");
					break;
				} else {
					console.log("\nwrong answer\n");
				}
			}
			break;
		}
	}
	// Update player's data (2) and Print a player data card (4)
	else if (userPrgMenuChoice == 2 || userPrgMenuChoice == 4) {
		console.log(`\n***  ${programMenu[userPrgMenuChoice - 1]}  *** \n`);
		//if playerList is empty
		if (playerList == false) {
			console.log("Nothing to read, database is empty\n");
			console.log("press ENTER to continue");
			nextLine();
		}
		//if playerList has entries
		else {
			console.log("Enter the name of the player:");
			let search = nextLine().toLowerCase();

			let searchResult = searchList(playerList, userPrgMenuChoice, search); // searching for the EXACT name

			// if result has no match for the searched word
			if (!searchResult) {
				console.log("\nno such a player");
				console.log("press ENTER to continue");
				nextLine();
				continue; // back to program menu
			} else {
				//if there is a match for the searched player
				if (userPrgMenuChoice == 4) {
					console.log(`\nPlayer card:`);
					printCards([searchResult]); // print Player details
					console.log("press ENTER to continue");
					nextLine();
					continue; //back to program menu
				} else if (userPrgMenuChoice == 2) {
					while (true) {
						console.log(`\nPlayer card:`);
						printCards([searchResult]); // print player details
						let index = playerList.findIndex((x) => x.includes(search)); // define index of the selected card in parent array
						console.log("What would you like to update? :\n");
						printMenu(updateMenu, "update"); // print the update menu
						userUpdateMenuChoice = Number(nextLine()); // user entry from update menu
						// false entries (not a number, or wrong number)
						if (!userUpdateMenuChoice || userUpdateMenuChoice > updateMenu.length || userUpdateMenuChoice <= 0) {
							console.log("!!!! incorrect menu number !!!!\n");
							console.log("press Enter to continue");
							nextLine();
							continue; // back to update menu
						}
						// save and exit
						else if (userUpdateMenuChoice == 5) {
							break; // back to program menu
						}
						// if correct menu selected
						else {
							while (true) {
								console.log(`Enter new ${updateMenu[userUpdateMenuChoice - 1]}`);
								// team name update (string)
								if (userUpdateMenuChoice == 1) {
									let newEntry = nextLine().toLowerCase();
									// correct entry( have to contain a character)
									if (newEntry) {
										updateList(newEntry, playerList, index, userUpdateMenuChoice);
										console.log("\n!!updated!!\n");
										console.log("press Enter to continue");
										nextLine();
										break; //back to update menu
									}
									// false entry (no character)
									else {
										console.log("\n!!! player must have a team !!!\n");
										console.log("press Enter to continue");
										nextLine();
										break; //back to update menu
									}
								}
								// rpg,ppg,apg update (numbers)
								else {
									console.log("(or press enter to set it to zero)");
									let newEntry = Number(nextLine());
									// correct entry (positiv number)
									if (newEntry >= 0) {
										updateList(newEntry, playerList, index, userUpdateMenuChoice);
										console.log("\n!!! updated !!!\n");
										console.log("press Enter to continue");
										nextLine();
										break; // back to update menu
									}
									//false entry (minus number or string)
									else {
										console.log("\n!!! not a number !!!");
										console.log("press Enter to continue");
										nextLine();
										break; // back to update menu
									}
								}
							}
						}
					}
				}
			}
		}
	}
	// Delete player from database (3)
	else if (userPrgMenuChoice == 3) {
		console.log(`\n***  ${programMenu[userPrgMenuChoice - 1]}  *** \n`);
		//if playerList is empty
		if (playerList == false) {
			console.log("Nothing to delete, database is empty\n");
			console.log("press ENTER to continue");
			nextLine();
		}
		//if playerList has entries
		else {
			while (true) {
				console.log("Type the name of the player you want to delete");
				let search = nextLine().toLowerCase();

				let searchResult = searchList(playerList, userPrgMenuChoice, search); // searching for the EXACT name
				// if no player name found
				if (!searchResult) {
					console.log("\nno such a player");
					console.log("press ENTER to continue");
					nextLine();
					break;
				} else {
					//if player found in playerList
					console.log(`\nPlayer card:`);
					printCards([searchResult]); // print the player card before ask to delete
					while (true) {
						console.log(`Are you sure you want to delete "${searchResult[0].charAt(0).toUpperCase() + searchResult[0].slice(1).toLowerCase()}"? (y/n)`);
						let answer = nextLine().toLowerCase();
						if (answer == "y") {
							let index = playerList.indexOf(searchResult); // index of a selected player
							playerList.splice(index, 1); // delete array of a selected player
							console.log(`\n${searchResult[0].charAt(0).toUpperCase() + searchResult[0].slice(1).toLowerCase()} is deleted`);
							console.log("press ENTER to continue");
							nextLine();
							break;
						} else if (answer == "n") {
							//cancel the delete
							console.log("\ncanceled");
							console.log("press ENTER to continue");
							nextLine();
							break;
						} else {
							//false answer from user
							console.log("wrong answer");
							continue;
						}
					}
				}
				break;
			}
		}
	}
	// Search (5)
	else if (userPrgMenuChoice == 5) {
		console.log(`\n***  ${programMenu[userPrgMenuChoice - 1]}  *** \n`);
		//if playerList is empty
		if (playerList == false) {
			console.log("Nothing to search, database is empty\n");
			console.log("press ENTER to continue");
			nextLine();
		}
		//if playerList has entries
		else {
			console.log("Enter (part of) the player Name or Team:");
			let search = nextLine().toLowerCase();

			let searchResult = searchList(playerList, userPrgMenuChoice, search); //  searching for the PART of the name of the player or team
			// if result has no match for the searched word
			if (!searchResult) {
				console.log("\nno such a player OR team");
				console.log("press ENTER to continue");
				nextLine();
				break;
			} else {
				// if there is a match
				console.log("Search result:\n");
				printCards(searchResult); // printing all the found players and teams
				console.log("press ENTER to continue");
				nextLine();
				continue;
			}
		}
	}
	// Lists (6)
	else if (userPrgMenuChoice == 6) {
		console.log(`\n***  ${programMenu[userPrgMenuChoice - 1]}  *** \n`);
		// if playerList is empty
		if (playerList == false) {
			console.log("Nothing to list, database is empty\n");
			console.log("press ENTER to continue");
			nextLine();
		} else {
			//if playerList has  entry
			let listMenuRun = true;
			while (listMenuRun) {
				console.log(`***  ${programMenu[userPrgMenuChoice - 1]}  *** \n`);
				printMenu(listMenu, "list");
				userListMenuChoice = Number(nextLine());
				// top3 menu
				if (userListMenuChoice == 1) {
					while (true) {
						console.log(`***  ${listMenu[userListMenuChoice - 1]}  *** \n`);

						printMenu(top3Menu, "TOP3 list"); //print the top3 menu
						userTop3MenuChoice = Number(nextLine()); // user selecting a top3 menu number
						//printing top3 list sorted by RPG
						if (userTop3MenuChoice == 1) {
							printTopList(sortedPlayerList(playerList, RPG, descend), RPG, topList);
							console.log("\npress ENTER to go back to main menu");
							nextLine();
							listMenuRun = false; // set false to break the list menu (while loop)
							break; // break the top3 menu than list menu and go back to program menu
						}
						//printing top3 list sorted by PPG
						else if (userTop3MenuChoice == 2) {
							printTopList(sortedPlayerList(playerList, PPG, descend), PPG, topList);
							console.log("\npress ENTER to go back to main menu");
							nextLine();
							listMenuRun = false; // set false to break the list menu (while loop)
							break;
						}
						//printing top3 list sorted by PPG
						else if (userTop3MenuChoice == 3) {
							printTopList(sortedPlayerList(playerList, APG, descend), APG, topList);
							console.log("\npress ENTER to go back to main menu");
							nextLine();
							listMenuRun = false; // set false to break the list menu (while loop)
							break; // break the top3 menu than list menu and go back to program menu
						}
						// back to List Menu
						else if (userTop3MenuChoice == 4) {
							break; // break the top3 menu
						}
						// wrong number and start the top3 menu
						else {
							console.log("!!!! incorrect menu number !!!!\n");

							continue; // from top3 menu
						}
					}
				} else if (userListMenuChoice == 2) {
					// list players by team
					console.log("Enter the team name:");
					let search = nextLine().toLowerCase();
					let sortedTeamList = sortedPlayerList(searchList(playerList, userPrgMenuChoice, search), NAME, ascend);

					// if no result
					if (sortedTeamList == false) {
						console.log("\nno such a team"); // if no result
						console.log("press ENTER to continue");
						nextLine();
						continue; //from list menu
					}
					// if has result then print the list
					else {
						console.log("Search result:\n");
						printCards(sortedTeamList);
						console.log("press ENTER to continue");
						nextLine();

						break; // continue from program menu
					}
				} else if (userListMenuChoice == 3) {
					// list all the players
					printCards(sortedPlayerList(playerList, NAME, ascend));
					console.log("press ENTER to continue");
					nextLine();

					break; // break the listMenu loop and continue from program menu
				} else if (userListMenuChoice == 4) {
					break; //break the loop to continue from program menu
				} else {
					console.log("!!!! incorrect menu no# !!!!\n");
					continue; // from list menu
				}
			}
		}
	}
	// Exit (7)
	else if (userPrgMenuChoice == 7) {
		console.log(`\n***  ${programMenu[userPrgMenuChoice - 1]}  *** \n`);
		// writing a file if playerList is empty
		if (playerList == false) {
			console.log("Saving an empty player list\n");
			// declaring newProgramData as empty array
			let newProgramData = [];
			try {
				//writing newProgramData as a string into Database.txt
				fs.writeFileSync("database.txt", newProgramData.toString());
				console.log("!!! File saved !!!!\n\n Program exit");
				break;
			} catch (err) {
				console.log("Something went wrong while writing content, and a program closed! Original file kept" + err);
				break;
			}
		}
		// writing newProgramData if playerList has entry
		else {
			// declaring newProgramData from a playerList(as a giant string)
			let newProgramData = playerList
				.map((elm) => elm.toString()) // making an array of strings transforming child arrays to string
				.reduce((a, b) => String(a) + "\n" + String(b)); //joining every element(string) of the array to make one giant string(every string into new line)

			// write newProgramData to Database.txt (overwrite)
			try {
				fs.writeFileSync("Database.txt", newProgramData);
				console.log("!!! File saved !!!!\n\n Program exit");
				break;
			} catch (err) {
				console.log("Something went wrong while writing content, and a program closed! Original file kept" + err);
				break;
			}
		}
	}
	// None of them
	else {
		console.log("!!!! incorrect menu no# !!!!\n");
		continue;
	}
}
