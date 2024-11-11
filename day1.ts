import * as fs from 'fs';

/*Inputs*/
const input = fs.readFileSync('./inputs/day1.txt', 'utf-8').split("");
const part2Input = fs.readFileSync('./inputs/day1part2.txt', 'utf-8').split("");
const part3Input = fs.readFileSync('./inputs/day1part3.txt', 'utf-8').split("");


/*Part1*/
let output: number = 0
input.forEach((element) => {
    if (element === 'B') {
        output += 1
    }

    if (element === 'C') {
        output += 3
    }
})

/*Part2*/
let result: number = 0
let tot = 0
for (let i = 0; i < part2Input.length - 1; i+=2) {
    let xFound = 0
    tot = 0
    if ((part2Input[i] === 'x' || part2Input[i + 1] === 'x') && !(part2Input[i] === 'x' && part2Input[i + 1] === 'x')) {
        xFound = 1
    }


    if(((part2Input[i] == 'A' || part2Input[i + 1] == 'A') && xFound > 0 )||(part2Input[i] === 'x' && part2Input[i + 1] === 'x')) {
        continue
    }

    if (part2Input[i] == 'B' && part2Input[i + 1] == 'B') {
        tot = 2
    }
    else if (part2Input[i] == 'B' || part2Input[i + 1] == 'B') {
        tot += 1
    }

    if (part2Input[i] == 'C' && part2Input[i + 1] == 'C') {
        tot = 6
    }
    else if (part2Input[i] == 'C' || part2Input[i + 1] == 'C') {
        tot += 3
    }

    if (part2Input[i] == 'D' && part2Input[i + 1] == 'D') {
        tot = 10
    }
    else if (part2Input[i] == 'D' || part2Input[i + 1] == 'D') {
        tot += 5
    }

    if (xFound === 0) {
        tot += 2
    }
    result += tot
}

const values = {
    'x' : 0,
    'A' : 0,
    'B' : 1,
    'C' : 3,
    'D' : 5
}

let runningTotal = 0

for(let i = 0; i < part3Input.length; i += 3) {
    let partArray: string[] = []
    partArray.push(part3Input[i])
    partArray.push(part3Input[i + 1])
    partArray.push(part3Input[i + 2])
    console.log(partArray)
    let xVals = partArray.filter((elm) => elm === 'x').length
    
    partArray.forEach((num) => {
        // console.log('num', num, 'values[num]', values[num])
        runningTotal += values[num]
    })

    if (xVals === 1) {
        runningTotal += 2
    }
    else if (xVals === 0) {
        runningTotal += 6
    }

    console.log(runningTotal)

}

// console.log(smallArray)


console.log("part1", output)
console.log("part2", result)
console.log("part3", runningTotal)