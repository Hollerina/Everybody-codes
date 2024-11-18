import * as fs from 'fs'

/*Inputs*/
const input1 = fs.readFileSync('./inputs/day3part1.txt', 'utf-8').split('\n')

/** Part 1 */
const input2DArray = input1.map((line) => line.split(''))
let hashTagArray: number[][] = []
let earthBlocks = 0
let unremovable: number[][] = []

//Inital finding of blocks
for (let i = 0; i < input2DArray.length; i++) {
  for (let j = 0; j < input2DArray[i].length; j++) {
    if (input2DArray[i][j] === '#') {
      earthBlocks += 1
      hashTagArray.push([i, j])
    }
  }
}

//While there are elements in hashTagArray continue searching
let index = 0
while (hashTagArray.length > 0) {
  if (index > hashTagArray.length - 1) {
    index = 0
    for (let i = 0; i < unremovable.length; i++) {
      input2DArray[unremovable[i][0]][unremovable[i][1]] = '.'
    }

    unremovable = []
  }

  //Check all directions
  if (
    input2DArray[hashTagArray[index][0] - 1][hashTagArray[index][1]] !== '#'
  ) {
    unremovable.push([hashTagArray[index][0], hashTagArray[index][1]])
    hashTagArray.splice(index, 1)
    continue
  }
  if (
    input2DArray[hashTagArray[index][0]][hashTagArray[index][1] + 1] !== '#'
  ) {
    unremovable.push([hashTagArray[index][0], hashTagArray[index][1]])
    hashTagArray.splice(index, 1)
    continue
  }
  if (
    input2DArray[hashTagArray[index][0] + 1][hashTagArray[index][1]] !== '#'
  ) {
    unremovable.push([hashTagArray[index][0], hashTagArray[index][1]])
    hashTagArray.splice(index, 1)
    continue
  }
  if (
    input2DArray[hashTagArray[index][0]][hashTagArray[index][1] - 1] !== '#'
  ) {
    unremovable.push([hashTagArray[index][0], hashTagArray[index][1]])
    hashTagArray.splice(index, 1)
    continue
  }
  earthBlocks += 1
  index += 1
}

console.log('Part 1:', earthBlocks)
