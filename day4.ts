import * as fs from 'fs'

/*Inputs*/
const input1 = fs
  .readFileSync('./inputs/day4part1.txt', 'utf-8')
  .split('\n')
  .map((value) => Number(value))

const input2 = fs
  .readFileSync('./inputs/day4part2.txt', 'utf-8')
  .split('\n')
  .map((value) => Number(value))

const input3 = fs
  .readFileSync('./inputs/day4part3.txt', 'utf-8')
  .split('\n')
  .map((value) => Number(value))

/** Part 1 & 2*/

const findDifference = (input: number[]) => {
  let smallest: number = Math.min(...input)
  let differences: number = 0

  input.forEach((num) => (differences += num - smallest))

  return differences
}

/** Part 3 */
let differences: number = 0

const findMedian = (numbers: number[]) => {
  numbers.sort((a, b) => a - b)
  const middleIndex = Math.floor(numbers.length / 2)

  if (numbers.length % 2 === 0) {
    return (numbers[middleIndex - 1] + numbers[middleIndex]) / 2
  } else {
    return numbers[middleIndex]
  }
}

const median = findMedian(input3)

input3.forEach((num) => {
  if (num < median) {
    differences += median - num
  } else {
    differences += num - median
  }
})

console.log('Part 1:', findDifference(input1))
console.log('Part 2:', findDifference(input2))
console.log('Part 3:', differences)
