let cols = 50
let rows = 50
let w 
let grid = new Array(cols)
let openSet = []
let closeSet = []
let start
let end
let path = []
let WALL_FREQ = 0.1


function removeFromArray(array, elt) {
    for (let i = array.length - 1 ; i >= 0; i--) {
        if (array[i] == elt) {
            array.splice(i, 1)
        }
    }
}

function heuristic(a,b) {
    let d = dist(a.i,a.j,b.i,b.j)
    // let d = abs(a.i - b.i) + abs(a.j - b.j)
    return d 
}


function Spot(i, j) {
    this.i = i
    this.j = j
    this.f = 0
    this.g = 0
    this.h = 0
    this.previous = undefined
    this.wall = false
    this.neighbors = []

    if (random(0, 1) < WALL_FREQ) {
        this.wall = true
    }

    this.show = function(col) {
        fill(col)
        if (this.wall) {
            fill(0)
        }
        rect(this.i * w, this.j * h , w, h)
    }

    this.addNeighbors = function(grid) {
        let i = this.i
        let j = this.j
        if (i < cols - 1) {
            this.neighbors.push(grid[i + 1] [j])
        }
        if (i > 0) {
            this.neighbors.push(grid[i - 1] [j])
        }
        if (j < rows - 1) {
            this.neighbors.push(grid[i] [j + 1])
        }
        if (j > 0) {
            this.neighbors.push(grid[i] [j - 1])
        }
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i - 1] [j - 1])
        }
        if (i < cols - 1 && j > 0) {
            this.neighbors.push(grid[i + 1] [j - 1])
        }
        if (i > 0 && j < rows - 1) {
            this.neighbors.push(grid[i - 1] [j + 1])
        }
        if (i < cols - 1 && j < rows - 1) {
            this.neighbors.push(grid[i + 1] [j + 1])
        }
    }
}

function setup() {
    createCanvas(600, 600)
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

    w = width / cols
    h = height / rows  
    start = grid[0][0]
    end = grid[cols-1][rows-1]
    start.wall = false
    end.wall = false
    openSet.push(start)
}

function draw() {
    background(0)

    if (openSet.length > 0) {
        let winner = 0 
        for (let i = 0; i < openSet.length ; i++) {
            if (openSet[i].f  < openSet[winner].f) {
                winner = i
            }
        }

        var current =  openSet[winner]

        if (openSet[winner] === end) {
            noLoop()
            console.log("This is the end in fire");
            
        }
        
        removeFromArray(openSet, current)
        closeSet.push(current)

        let neighbors = current.neighbors

        for (let i = 0; i < neighbors.length; i++) {
            const neighbor = neighbors[i];

            if (!closeSet.includes(neighbor) && !neighbor.wall) {
                let tempG = current.g + heuristic(neighbor, current)
                var newPath = false
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
        console.log("No Solutions");
        noLoop()
        return
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(color(255))
            end.show(color(255,0,255))
        }
    }

    for (var i = 0; i < closeSet.length; i++) {
        closeSet[i].show(color(255,0,0))
    }
    
    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0,255,0))
    }

    path = []
    let temp = current
    path.push(temp)
    while(temp.previous) {
        path.push(temp.previous)
        temp = temp.previous
    }

    for (var i = 0; i < path.length; i++) {
        path[i].show(color(0,0,255))
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            start.show(color(255,0,255))
            end.show(color(255,0,255))
        }
    }
}