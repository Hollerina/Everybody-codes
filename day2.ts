import * as fs from 'fs'

/*Inputs*/
const input = fs
  .readFileSync('./inputs/day2part1.txt', 'utf-8')
  .replace('\n', '')
  .split('\n')
const input2 = fs
  .readFileSync('./inputs/day2part2.txt', 'utf-8')
  .replace('\n', '')
  .split('\n')
const input3 = fs
  .readFileSync('./inputs/day2part3.txt', 'utf-8')
  .replace('\n', '')
  .split('\n')

/*Part 1*/
const words = input[0].replace('WORDS:', '').split(',')

const calculateMatches = (wordsArray, sentence) => {
  let numberOfMatches: number = 0
  wordsArray.forEach((element) => {
    const regex = new RegExp(element, 'g')
    const matches = sentence.match(regex)

    if (matches !== null) {
      numberOfMatches += matches.length
    }
  })

  return numberOfMatches
}

/** Part 2 */
const words2 = input2[0].replace('WORDS:', '').split(',')

const calculateMatchesSymbols = (
  words,
  sentence,
  indexArray,
  double
): { matchingSymbols: number; indexedArray: string[] } => {
  words.forEach((word) => {
    const backwardsWord = word.split('').reverse().join('')
    const regexForward = new RegExp(word, 'g')
    let matchesForward = sentence.match(regexForward) || []
    const regexBackwards = new RegExp(backwardsWord, 'g')
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
      let index = sentence.indexOf(match, prev + 1)
      if (index > sentence.length / 2 && double) {
        index = index - sentence.length / 2
      }
      prev = index

      for (let i = 0; i < word.length; i++) {
        let newIndex = index + i
        if (newIndex >= sentence.length / 2 && double) {
          newIndex = newIndex - sentence.length / 2
        }
        indexArray[newIndex] = '*'
      }
    })
  })

  return {
    matchingSymbols: indexArray.filter((val) => val === '*').length,
    indexedArray: indexArray,
  }
}

let total: number = 0
for (let i = 1; i < input2.length; i++) {
  let indexArray2 = new Array(input2[i].length)
  indexArray2.fill('')
  let { matchingSymbols } = calculateMatchesSymbols(
    words2,
    input2[i],
    indexArray2,
    false
  )
  total += matchingSymbols
}

/** Part 3 */
let words3 = input3[0].replace('WORDS:', '').split(',')

input3.shift()
//Split sentences into 2D array
const splitArray: string[][] = []
for (let i = 0; i < input3.length; i++) {
  splitArray.push(input3[i].split(''))
}

let runeSymbols = 0
let indexArrayPart3: string[][] = []
for (let i = 0; i < splitArray.length; i++) {
  let tempArray = new Array(input3[0].length).fill('')
  indexArrayPart3.push(tempArray)
}

//Horizontal
for (let i = 0; i < splitArray.length; i++) {
  let { matchingSymbols, indexedArray } = calculateMatchesSymbols(
    words3,
    splitArray[i].join(''),
    indexArrayPart3[i],
    false
  )
  indexArrayPart3[i] = indexedArray

  runeSymbols += matchingSymbols
  let tempString = input3[i] + input3[i]
  ;({ indexedArray } = calculateMatchesSymbols(
    words3,
    tempString,
    indexArrayPart3[i],
    true
  ))
  indexArrayPart3[i] = indexedArray
}
//Vertical
for (let i = 0; i < splitArray[0].length; i++) {
  let downSentence = ''
  for (let j = 0; j < splitArray.length; j++) {
    downSentence += splitArray[j][i]
  }
  let tempDown = new Array(downSentence.length).fill('')
  let { matchingSymbols, indexedArray } = calculateMatchesSymbols(
    words3,
    downSentence,
    tempDown,
    false
  )

  //Replace the ith column with this new indexedArray
  for (let j = 0; j < splitArray.length; j++) {
    if (indexArrayPart3[j][i] === '*') {
      continue
    }
    indexArrayPart3[j][i] = indexedArray[j]
  }
  runeSymbols += matchingSymbols
}

let total2 = 0
for (let i = 0; i < indexArrayPart3.length; i++) {
  total2 += indexArrayPart3[i].filter((val) => val === '*').length
}

console.log('Part 1', calculateMatches(words, input[1]))
console.log('Part 2', total)
console.log('Part 3', total2)
