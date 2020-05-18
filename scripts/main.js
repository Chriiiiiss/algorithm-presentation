// Using Daniel Shiffman video to make this code

function removeFromArray(arr, elt) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == elt) {
        arr.splice(i, 1)
      }
    }
  }

function heuristic(a, b) {
let d = dist(a.i, a.j, b.i, b.j)
// let d = abs(a.i - b.i) + abs(a.j - b.j)
return d
}

function gridCoord() {
    console.log("Hello");
    
}

function resetSketch() {
    console.log('ANOTHER ONE BITES THE DUST')
    w = width / cols
    h = height / rows
    openSet = []
    closedSet = []
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
        grid[i][j] = new Spot(i, j)
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
        grid[i][j].addNeighbors(grid)
        }
    }
    start = grid[10][10]
    end = grid[0][0]
    start.wall = false
    end.wall = false
    openSet.push(start)
    loop()
}

function setup() {
createCanvas(700, 700)
let resetButton = createButton("HERE WE GO")
resetButton.mousePressed(resetSketch)
}

function draw() {
if (openSet.length > 0) {
    let winner = 0
    for (let i = 0; i < openSet.length; i++) {
    if (openSet[i].f < openSet[winner].f) {
        winner = i
    }
    }
    var current = openSet[winner]
    if (current === end) {
    noLoop()
    console.log("HIT THE ROAD JACK!")
    }
    removeFromArray(openSet, current)
    closedSet.push(current)
    let neighbors = current.neighbors
    for (let i = 0; i < neighbors.length; i++) {
    let neighbor = neighbors[i]
    if (!closedSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + heuristic(neighbor, current)
        let newPath = false
        if (openSet.includes(neighbor)) {
        if (tempG < neighbor.g) {
            neighbor.g = tempG
            newPath = true
        }
        } else {
        neighbor.g = tempG
        newPath = true
        openSet.push(neighbor)
        }
        if (newPath) {
        neighbor.h = heuristic(neighbor, end)
        neighbor.f = neighbor.g + neighbor.h
        neighbor.previous = current
        }
    }

    }
} else {
    console.log('Ups')
    noLoop()
    return
}
background(255)

for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
    grid[i][j].show()
    }
}

for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0))
}

for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0))
}
path = []
let temp = current
path.push(temp)
while (temp.previous) {
    path.push(temp.previous)
    temp = temp.previous
}


// for (let i = 0 i < path.length i++) {
// path[i].show(color(0, 0, 255))
//}

noFill()
stroke(0, 0, 255)
strokeWeight(w / 2)
beginShape()
for (let i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * h + h / 2)
}
endShape()

}