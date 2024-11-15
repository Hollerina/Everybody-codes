import * as fs from 'fs'

/*Inputs*/
const input1 = fs.readFileSync('./inputs/day3part1.txt', 'utf-8').split('\n')

/** Part 1 */
const input2DArray = input1.map((line) => line.split(''))
let hashTagArray: number[][] = []
let earthBlocks = 0

//Inital finding of blocks
for (let i = 0; i < input2DArray.length; i++) {
  for (let j = 0; j < input2DArray[i].length; j++) {
    if (input2DArray[i][j] === '#') {
      earthBlocks += 1
      hashTagArray.push([i, j])
    }
  }
}
console.log(hashTagArray)

//While there are elements in hashTagArray continue searching
let index = 0
while (hashTagArray) {
  console.log(hashTagArray[index])
  console.log(index)
  console.log('length', hashTagArray.length)
  if (
    input2DArray[hashTagArray[index][0] - 1][hashTagArray[index][1]] !== '#'
  ) {
    hashTagArray.splice(index, 1)
    if (index === hashTagArray.length - 1) {
      index = 0
    }
    console.log('fail1')

    continue
  }
  if (
    input2DArray[hashTagArray[index][0]][hashTagArray[index][1] + 1] !== '#'
  ) {
    hashTagArray.splice(index, 1)
    if (index === hashTagArray.length - 1) {
      index = 0
    }
    console.log('fail2')

    continue
  }
  if (
    input2DArray[hashTagArray[index][0] + 1][hashTagArray[index][1]] !== '#'
  ) {
    hashTagArray.splice(index, 1)
    if (index === hashTagArray.length - 1) {
      index = 0
    }
    console.log('fail3')

    continue
  }
  if (
    input2DArray[hashTagArray[index][0]][hashTagArray[index][1] - 1] !== '#'
  ) {
    hashTagArray.splice(index, 1)
    if (index === hashTagArray.length - 1) {
      index = 0
    }
    console.log('fail4')

    continue
  }
  console.log(hashTagArray[index])

  index += 1
  if (index === hashTagArray.length - 1) {
    index = 0
  }
}
