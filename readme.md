# Introduction

## Create a program that stores a basketball players stats. Each player has the following details:

Name (assume this will be unique)
Team
Average rebounds per game (RPG)
Average points per game (PPG)
Average assists per game (APG)
The program should have the following features:

### Add a player.

The details of the player should be saved to a file such that it can be retrieved the next time the program starts

### Delete a player by name.

Given the name of a player, your program should delete the player details

### Update a player's details.

Given the name of a player, your program should allow the users to update the details including team, RPG, PPG, and APG

### Search for a player by name.

Given a name of the player, display it's details, if the player cannot be found, print "no such player"

### Partial search

that allows the user to enter a part of the player or teams name and all matching players are listed.

> Example: If the program has the following players (Name: Lebron, Team: Lakers), (Name: Giannis, Team: Bucks), (Name: Kyrie, Team: Nets), (Name: Kevin, Team: Nets) and the following search is made:
>
> 1. User does search with characters "et", the program should print details of Kyrie and Kevin as their team name "Nets" has the characters "et"
> 2. User does search with characters "leb", the program should print details of Lebron

### List

1. List players by team. Given a team's name, list all the players that are in that team
2. List top 3 players with the highest rebounds average, in sorted order.
3. List top 3 players with the highest points average, in sorted order.
4. List top 3 players with the highest assists average, in sorted order.
5. List all players
