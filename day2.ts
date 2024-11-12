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
  console.log(sentence)
  words.forEach((word) => {
    console.log(indexArray)
    console.log('word', word)
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
      console.log(index)
      if (index > sentence.length / 2 && double) {
        index = index - sentence.length / 2
      }
      prev = index

      for (let i = 0; i < word.length; i++) {
        let newIndex = index + i
        console.log(sentence.length)
        if (newIndex >= sentence.length / 2 && double) {
          newIndex = newIndex - sentence.length / 2
        }
        console.log('newIndex', newIndex)
        indexArray[newIndex] = '*'
      }
    })
  })

  console.log('index', indexArray)

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
console.log(words3)

// words3[words3.length - 1] = words3[words3.length - 1].substring(
//   0,
//   words3[words3.length - 1].length - 2
// )
// console.log(words3)
input3.shift()
//Split sentences into 2D array
const splitArray: string[][] = []
for (let i = 0; i < input3.length; i++) {
  splitArray.push(input3[i].split(''))

  // if (i === input3.length - 1) {
  //   splitArray.push(input3[i].split(''))
  // } else {
  //   splitArray.push(input3[i].substring(0, input3[i].length - 1).split(''))
  // }
}

let runeSymbols = 0
let indexArrayPart3: string[][] = []
for (let i = 0; i < splitArray.length; i++) {
  let tempArray = new Array(input3[0].length).fill('')
  indexArrayPart3.push(tempArray)
}

console.log(indexArrayPart3)

const calculateMatchesSymbolsVertical = (words, sentence) => {}

//Horizontal
for (let i = 0; i < splitArray.length; i++) {
  //Start with length ways
  console.log(input3[i])
  let { matchingSymbols, indexedArray } = calculateMatchesSymbols(
    words3,
    splitArray[i].join(''),
    indexArrayPart3[i],
    false
  )
  console.log(indexArrayPart3)
  console.log(indexedArray)
  indexArrayPart3[i] = indexedArray

  runeSymbols += matchingSymbols
  // console.log(runeSymbols)
  let tempString = input3[i] + input3[i]
  console.log('tempString', tempString)
  ;({ indexedArray } = calculateMatchesSymbols(
    words3,
    tempString,
    indexArrayPart3[i],
    true
  ))
  indexArrayPart3[i] = indexedArray
}
console.log('vertical', indexArrayPart3)
//Vertical
for (let i = 0; i < splitArray[0].length; i++) {
  let downSentence = ''
  // console.log(i)
  for (let j = 0; j < splitArray.length; j++) {
    downSentence += splitArray[j][i]
  }
  console.log(downSentence)
  let tempDown = new Array(downSentence.length).fill('')
  let { matchingSymbols, indexedArray } = calculateMatchesSymbols(
    words3,
    downSentence,
    tempDown,
    false
  )

  //Replace the ith column with this new indexedArray
  for (let j = 0; j < splitArray.length; j++) {
    console.log('indexed', indexedArray)
    console.log('i,j', i, j)
    if (indexArrayPart3[j][i] === '*') {
      continue
    }
    console.log('here')
    indexArrayPart3[j][i] = indexedArray[j]
  }
  runeSymbols += matchingSymbols
  console.log(indexArrayPart3)

  // let tempString = downSentence + downSentence
  // console.log('tempString', tempString)
  // ;({ indexedArray } = calculateMatchesSymbols(
  //   words3,
  //   tempString,
  //   tempDown,
  //   true
  // ))

  // for (let j = 0; j < splitArray.length; j++) {
  //   console.log('indexed', indexedArray)
  //   console.log('i,j', i, j)
  //   if (indexArrayPart3[j][i] === '*') {
  //     continue
  //   }
  //   console.log('here')
  //   indexArrayPart3[j][i] = indexedArray[j]
  // }

  // indexArrayPart3[i] = indexedArray
  // indexArrayPart3 = indexedArray

  console.log('r', runeSymbols)
}

let total2 = 0
for (let i = 0; i < indexArrayPart3.length; i++) {
  total2 += indexArrayPart3[i].filter((val) => val === '*').length
}

console.log(indexArrayPart3)

console.log('Part 1', calculateMatches(words, input[1]))
console.log('Part 2', total)
console.log('Part 3', total2)
