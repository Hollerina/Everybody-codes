import * as fs from "fs"

/*Inputs*/
const input = fs
  .readFileSync("./inputs/day2part1.txt", "utf-8")
  .replace("\n", "")
  .split("\n")
const input2 = fs
  .readFileSync("./inputs/day2part2.txt", "utf-8")
  .replace("\n", "")
  .split("\n")
const input3 = fs
.readFileSync("./inputs/day2part3.txt", "utf-8")
.replace("\n", "")
.split("\n")


/*Part 1*/
const words = input[0].replace("WORDS:", "").split(",")

const calculateMatches = (wordsArray, sentence) => {
  let numberOfMatches: number = 0
  wordsArray.forEach((element) => {
    const regex = new RegExp(element, "g")
    const matches = sentence.match(regex)

    if (matches !== null) {
      numberOfMatches += matches.length
    }
  })

  return numberOfMatches
}

/** Part 2 */
const words2 = input2[0].replace("WORDS:", "").split(",")

const calculateMatchesSymbols = (words, sentence, indexArray): {matchingSymbols:number, indexedArray:string[]} => {
  words.forEach((word) => {
    console.log(indexArray)
    const backwardsWord = word.split("").reverse().join("")
    const regexForward = new RegExp(word, "g")
    let matchesForward = sentence.match(regexForward) || []
    const regexBackwards = new RegExp(backwardsWord, "g")
    const matchesBackwards = sentence.match(regexBackwards) || []

    //concat into one array
    let mixedMatches = []
    if (word.length > 1) {
      mixedMatches = matchesForward.concat(matchesBackwards)
    } else if (word.length == 1) {
      mixedMatches = matchesBackwards
    }
    let prev = -1 
    mixedMatches.forEach((match) => {
      if (sentence.indexOf(match, prev + 1) === -1) {
        prev = -1
      }
      const index = sentence.indexOf(match, prev + 1)
      prev = index

      for (let i = 0; i < word.length; i++) {
        indexArray[index + i] = "*"
      }
    })
  })

  console.log('index', indexArray)

  return {matchingSymbols: indexArray.filter((val) => val === "*").length, indexedArray: indexArray}
}

let total: number = 0
for (let i = 1; i < input2.length; i++) {
  let indexArray2 = new Array(input2[i].length)
  indexArray2.fill("")
  let {matchingSymbols} = calculateMatchesSymbols(words2, input2[i], indexArray2)
  total += matchingSymbols
}

/** Part 3 */
let words3 = input3[0].replace("WORDS:", "").split(",")
words3[words3.length - 1] = words3[words3.length - 1].substring(0, words3[words3.length -1].length -2)
input3.shift()
//Split sentences into 2D array
const splitArray: string[][] = []
for(let i = 0; i < input3.length; i++) {
  if(i === input3.length - 1) {
    splitArray.push(input3[i].split(""))
  }
  else {
    splitArray.push(input3[i].substring(0, input3[i].length - 1).split(""))
  }
}

let runeSymbols = 0
let indexArrayPart3: string[][] = []
for (let i = 0; i < splitArray.length; i++) {
  let tempArray = new Array(input3[0].length - 1).fill("")
  indexArrayPart3.push(tempArray)
}

console.log(indexArrayPart3)

const calculateMatchesSymbolsVertical = (words, sentence) => {

}

//Horizontal
for(let i = 0; i < splitArray.length; i++) {
  //Start with length ways
  console.log(input3[i])
  let {matchingSymbols, indexedArray} = calculateMatchesSymbols(words3, splitArray[i].join(""), indexArrayPart3[i])
  console.log(indexArrayPart3)
  console.log(indexedArray)
  indexArrayPart3[i] = indexedArray

  runeSymbols += matchingSymbols
  // console.log(runeSymbols)
}
// console.log(indexArrayPart3)
//Vertical
for(let i = 0; i < splitArray[0].length; i++) {
  let downSentence = ""
  // console.log(i)
  for(let j = 0; j <splitArray.length; j++) {
    downSentence += splitArray[j][i]
  }
  console.log(downSentence)
  let tempDown = new Array(downSentence.length).fill("")
  let {matchingSymbols, indexedArray} = calculateMatchesSymbols(words3, downSentence, tempDown)

  //Replace the ith column with this new indexedArray
  for (let j = 0; j < splitArray.length; j++) {
    console.log(indexedArray)
    indexArrayPart3[i][j] = indexedArray[j]
  }
  runeSymbols += matchingSymbols
  console.log(indexArrayPart3)
  // indexArrayPart3 = indexedArray

  console.log('r',runeSymbols)
}

console.log(indexArrayPart3)

console.log("Part 1", calculateMatches(words, input[1]))
console.log("Part 2", total)
