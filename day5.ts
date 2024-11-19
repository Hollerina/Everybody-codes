import * as fs from 'fs'

/*Inputs*/
const input1 = fs
  .readFileSync('./inputs/day5part1.txt', 'utf-8')
  .split('\n')
  .map((arr) => arr.replace(/ /g, ''))

let colArray: number[][] = []

for (let i = 0; i < input1[0].length; i++) {
  let temp: number[] = []
  for (let j = 0; j < input1.length; j++) {
    temp.push(Number(input1[j][i]))
  }
  colArray.push(temp)
}

console.log(colArray)
for (let index = 0; index < 10; index++) {
  let startValue: number = 0
  startValue = colArray[index % 4].shift() as number
  let temp: number[] = []
  temp = [
    ...colArray[(index + 1) % 4].slice(0, startValue - 1),
    startValue,
    ...colArray[(index + 1) % 4].slice(startValue - 1),
  ] as number[]

  colArray[(index + 1) % 4] = temp
}

let result: string = ''
for (let i = 0; i < colArray.length; i++) {
  result += String(colArray[i][0])
}

console.log(result)
