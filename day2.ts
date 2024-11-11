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

const calculateMatchesSymbols = (words, sentence) => {
  console.log(sentence)
  let indexArray = new Array(sentence.length)
  indexArray.fill("")
  words.forEach((word) => {
    const backwardsWord = word.split("").reverse().join("")
    const regexForward = new RegExp(word, "g")
    let matchesForward = sentence.match(regexForward) || []
    const regexBackwards = new RegExp(backwardsWord, "g")
    const matchesBackwards = sentence.match(regexBackwards) || []

    //concat into one array
    let mixedMatches = []
    if (word.length > 1) {
      mixedMatches = matchesForward.concat(matchesBackwards)
      console.log(mixedMatches)
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

  return indexArray.filter((val) => val === "*").length
}

let total: number = 0
for (let i = 1; i < input2.length; i++) {
  total += calculateMatchesSymbols(words2, input2[i])
}

console.log("Part 1", calculateMatches(words, input[1]))
console.log("Part 2", total)
