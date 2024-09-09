// R ->
// L <-
// W(n) forward

/* example test case */
// W5RW5RW2RW1R
// RRW11RLLW19RRW12LW1
// LLW100W50RW200W10
// LLLLLW99RRRRRW88LLLRL
// W55555RW555555W444444W1

const validatePattern = /[(W{1}\d+)RL]{1,}/
const commandPattern = /W\d+|[RL]/g

const directionDict = ['North', 'East', 'South', 'West']

const directionMap = {
	north: 0,
	east: 1,
	south: 2,
	west: 3,
}

const turnDict = {
	right: 'R',
	left: 'L',
}

function cleanInput(input) {
	return input[2].trim()
}

function isValidInput(input) {
	try {
		if (input.length <= 2) throw 'no input command'

		let commandInput = cleanInput(input)

		let matched = commandInput.match(validatePattern)
		if (matched[0] !== commandInput) throw 'wrong command'

		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

function turnRobot(turn, directionIndex) {
	let newDirection
	try {
		switch (turn) {
			case turnDict.right:
				if (directionIndex === 3) {
					newDirection = 0
				} else {
					newDirection = directionIndex + 1
				}
				break

			case turnDict.left:
				if (directionIndex === 0) {
          
					newDirection = 3
				} else {
					newDirection = directionIndex - 1
				}
				break

			default:
				throw 'turn error'
		}
    
		return newDirection
	} catch (error) {
		throw error
	}
}

function moveForward(point, directionIndex, x, y) {
	try {
		switch (directionIndex) {
			case directionMap.north:
				y += point
				break

			case directionMap.east:
				x += point
				break

			case directionMap.south:
				y -= point
				break

			case directionMap.west:
				x -= point
				break

			default:
				throw 'move error'
		}

		return { x, y }
	} catch (error) {
		throw error
	}
}

async function complieCommand(rawCommand) {
	try {
		let xAxis = 0,
			yAxis = 0,
			directionIndex = 0

		let commands = rawCommand.match(commandPattern)

		for (let i = 0; i < commands.length; i++) {
			const command = commands[i]

			if (command === turnDict.left || command === turnDict.right) {
				directionIndex = turnRobot(command, directionIndex)
			} else {
				const splitedMoveCommand = command.split('W')
				const point = splitedMoveCommand[1]

				const moveResult = moveForward(point, directionIndex, xAxis, yAxis)
				xAxis = moveResult.x
				yAxis = moveResult.y
			}
		}

    
    return `X: ${xAxis.toString()} Y: ${yAxis.toString()} Direction: ${directionDict[directionIndex]}`
	} catch (error) {
		throw error
	}
}

async function main() {
	try {
		const input = process.argv
		if (!isValidInput(input)) throw 'input error'

		const command = cleanInput(input)

		const result = await complieCommand(command)

    console.log(result)
	} catch (error) {
		console.error(error)
	}
}

main()
