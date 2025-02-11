export class AIPlayer {
  winningPatterns : number[][];

  constructor(winningPatterns : number[][]) {
    this.winningPatterns = winningPatterns;
  }

  makeTurn(board : string[]) {
    let allFields = board;

    // list of tuples consisting of the field marker and the index in the board array
    const fieldsTuples : [string, number][] = allFields.map((el, index) => [el, index]);

    // list of field positions of all free fields in the game
    const aiFieldsIndices : number[] = fieldsTuples.filter(el => el[0] === 'O').map(el => el[1]);

    // list of field positions of all free fields in the game
    const freeFieldsIndices : number[] = fieldsTuples.filter(el => el[0] === '').map(el => el[1]);

    // AI player tries to win by checking the own fields
    if (aiFieldsIndices.length >= 2) {

      // create a list of index tuples for better matching querying
      // e.g. [2, 4, 7] => [[2, 4], [4, 7]]
      const tupleList: [number, number][] = [];
      for (let i = 0; i < aiFieldsIndices.length - 1; i++) {
        tupleList.push([aiFieldsIndices[i], aiFieldsIndices[i + 1]]);
      }

      const indices : number[] = [];

      // iterate over all possible winning patterns
      this.winningPatterns.forEach(pattern => {
        tupleList.forEach(mainSubList => {
          const common = pattern.filter(num => mainSubList.includes(num));
          if (common.length >= 2) {
            // Find the extra element in subList that is not in mainSubList
            const extra = pattern.filter(num => !mainSubList.includes(num));
            indices.push(...extra);
          }
        });
      });

      // list of indices which lead to a win for AI player
      const possibleIndices = indices.filter(index => freeFieldsIndices.includes(index));
      
      if (possibleIndices.length > 0) {
        return possibleIndices[0];
      }
    }

    // if AI player as no 2 fields in a row and the player has also no 2 fields in a row then a random field is selected
    const randSelection : number = freeFieldsIndices[Math.floor(Math.random() * freeFieldsIndices.length)];

    return randSelection;
  }
}
