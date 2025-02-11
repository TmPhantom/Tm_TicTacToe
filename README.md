# Description

This project was built with react and TypeScript using vite with the command `npm create vite@latest hangman -- --template react-ts`.

# Start the project
Start the project with running the following command: `npm run dev`.
Make sure you use an actual node version which can be checked with the command `node --version`.

# Projekt Explanation

This project maintains an array with 9 fields as an intenr structure storing the board.
The fields of the board are nunberd as following:
|0|1|2|
|3|4|5|
|6|7|8|

By using the indices [0,1,2,3,4,5,6,7,8,9] a specific field of the board is referenced.
These indices are used for setting the markers to the respective field of the board.