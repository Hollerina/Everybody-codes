import * as fs from 'fs'

/*Inputs*/
const input1 = fs.readFileSync('./inputs/day3part2.txt', 'utf-8').split('\n')
const input2 = fs.readFileSync('./inputs/day3part3.txt', 'utf-8').split('\n')

/** Part 1 & 2*/
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

const input2DArrayPart3 = input2.map((line) => line.split(''))
let hashTagArrayPart3: number[][] = []
let earthBlocksPart3 = 0
let unremovablePart3: number[][] = []

//Inital finding of blocks
for (let i = 0; i < input2DArrayPart3.length; i++) {
  for (let j = 0; j < input2DArrayPart3[i].length; j++) {
    if (input2DArrayPart3[i][j] === '#') {
      earthBlocksPart3 += 1
      hashTagArrayPart3.push([i, j])
    }
  }
}

let ind = 0
while (hashTagArrayPart3.length > 0) {
  if (ind > hashTagArrayPart3.length - 1) {
    ind = 0
    for (let i = 0; i < unremovablePart3.length; i++) {
      input2DArrayPart3[unremovablePart3[i][0]][unremovablePart3[i][1]] = '.'
    }
    unremovablePart3 = []
  }

  if (
    hashTagArrayPart3[ind][0] === 0 ||
    hashTagArrayPart3[ind][1] === 0 ||
    hashTagArrayPart3[ind][0] === input2DArrayPart3.length - 1 ||
    hashTagArrayPart3[ind][1] === input2DArrayPart3[0].length - 1
  ) {
    unremovablePart3.push([
      hashTagArrayPart3[ind][0],
      hashTagArrayPart3[ind][1],
    ])
    hashTagArrayPart3.splice(ind, 1)
    continue
  }
  if (
    input2DArrayPart3[hashTagArrayPart3[ind][0] - 1][
      hashTagArrayPart3[ind][1]
    ] !== '#'
  ) {
    //Check all directions
    unremovablePart3.push([
      hashTagArrayPart3[ind][0],
      hashTagArrayPart3[ind][1],
    ])
    hashTagArrayPart3.splice(ind, 1)
    continue
  }
  if (
    input2DArrayPart3[hashTagArrayPart3[ind][0] - 1][
      hashTagArrayPart3[ind][1] - 1
    ] !== '#'
  ) {
    unremovablePart3.push([
      hashTagArrayPart3[ind][0],
      hashTagArrayPart3[ind][1],
    ])
    hashTagArrayPart3.splice(ind, 1)
    continue
  }
  if (
    input2DArrayPart3[hashTagArrayPart3[ind][0] - 1][
      hashTagArrayPart3[ind][1] + 1
    ] !== '#'
  ) {
    unremovablePart3.push([
      hashTagArrayPart3[ind][0],
      hashTagArrayPart3[ind][1],
    ])
    hashTagArrayPart3.splice(ind, 1)
    continue
  }
  if (
    input2DArrayPart3[hashTagArrayPart3[ind][0] + 1][
      hashTagArrayPart3[ind][1] - 1
    ] !== '#'
  ) {
    unremovablePart3.push([
      hashTagArrayPart3[ind][0],
      hashTagArrayPart3[ind][1],
    ])
    hashTagArrayPart3.splice(ind, 1)
    continue
  }
  if (
    input2DArrayPart3[hashTagArrayPart3[ind][0] + 1][
      hashTagArrayPart3[ind][1] + 1
    ] !== '#'
  ) {
    unremovablePart3.push([
      hashTagArrayPart3[ind][0],
      hashTagArrayPart3[ind][1],
    ])
    hashTagArrayPart3.splice(ind, 1)
    continue
  }
  if (
    input2DArrayPart3[hashTagArrayPart3[ind][0]][
      hashTagArrayPart3[ind][1] + 1
    ] !== '#'
  ) {
    unremovablePart3.push([
      hashTagArrayPart3[ind][0],
      hashTagArrayPart3[ind][1],
    ])
    hashTagArrayPart3.splice(ind, 1)
    continue
  }
  if (
    input2DArrayPart3[hashTagArrayPart3[ind][0] + 1][
      hashTagArrayPart3[ind][1]
    ] !== '#'
  ) {
    unremovablePart3.push([
      hashTagArrayPart3[ind][0],
      hashTagArrayPart3[ind][1],
    ])
    hashTagArrayPart3.splice(ind, 1)
    continue
  }
  if (
    input2DArrayPart3[hashTagArrayPart3[ind][0]][
      hashTagArrayPart3[ind][1] - 1
    ] !== '#'
  ) {
    unremovablePart3.push([
      hashTagArrayPart3[ind][0],
      hashTagArrayPart3[ind][1],
    ])
    hashTagArrayPart3.splice(ind, 1)
    continue
  }
  earthBlocksPart3 += 1
  ind += 1
}

console.log('Part 1:', earthBlocks)
console.log('Part 3:', earthBlocksPart3)
