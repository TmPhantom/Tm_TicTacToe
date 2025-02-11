export class AIPlayer {

    constructor() {}

    makeTurn(board : string[]) {
        let allFields = board;

        // list of tuples consisting of the field marker and the index in the board array
        const fieldsTuples : [string, number][] = allFields.map((el, index) => [el, index]);

        // list of field positions of all free fields in the game
        const freeFieldsIndices : number[] = fieldsTuples.filter(el => el[0] === '').map(el => el[1]);
        const randSelection : number = freeFieldsIndices[Math.floor(Math.random() * freeFieldsIndices.length)];

        return randSelection;
    }
}