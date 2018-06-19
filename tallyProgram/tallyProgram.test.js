test('use scoreBoard', () => {
    const scoreBoard = require('./tallyProgram')
    scoreBoard.create("Alice Bob Charles")
    expect(scoreBoard.tallyPrint("Alice Bob Charles","abcbcbcbaaabcbcbcaaaccccbbbaa")).toBe("Alice: 9\nBob: 10\nCharles: 10\n")
})

