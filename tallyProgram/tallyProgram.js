class Parser{
    constructor(str){
        if (str == null)
            this.strToParse = 0
        else
            this.strToParse = str
    }
    test(){
        return this.strToParse
    }
}

class scoreBoard{
    constructor(str){
        this.identifiers = new Array()
        this.score = new Array()
        this.names = str.split(" ")
        for (var e in this.names){
            this.identifiers[e] = this.names[e][0]
        }
    }
    tallyScore(str){
        str = str.toUpperCase();
        for (var x in this.names){
            if (this.score[x] == null)
                this.score[x] = 0
        }
        for (var i = 0; i < str.length; i++){
            this.score[this.identifiers.indexOf(str[i])]++
        }
    }
    printBoard(){
        var s = "";
        for (var x in this.names){
            s += this.names[x] + ": " + this.score[x] + "\n"
        }
        return s
    }
}
function sum(a, b) {
  return a + b;
}

module.exports = {
    create(str){
        return new scoreBoard(str)
    },
    tallyPrint(names, scores){
        t = new scoreBoard(names)
        t.tallyScore(scores)
        return t.printBoard()
    }
}



//console.log(module)

board = new scoreBoard("Alice Bob Charles")
board.tallyScore("abcbcbcbaaabcbcbcaaaccccbbbaa")
board.printBoard()

board.tallyScore("abcbcbcbaaabcbcbcaaaccccbbbaa")
console.log(board.printBoard())

