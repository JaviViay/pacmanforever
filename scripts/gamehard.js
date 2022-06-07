document.addEventListener('DOMContentLoaded', () => {

  var scoreScreen = document.getElementById('score')
  var width = 28
  var score = 0
  var map = document.querySelector('.map')
  var layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1,
    1,3,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,4,1,4,1,1,1,1,4,1,4,1,1,0,1,1,0,1,1,1,
    4,4,4,0,0,0,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,0,0,0,4,4,4,
    1,1,1,0,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,0,1,1,1,
    1,1,1,0,0,0,0,1,1,4,5,5,5,5,5,5,5,5,4,1,1,0,0,0,0,1,1,1,
    1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,1,
    1,0,1,1,0,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,0,1,1,0,1,
    1,0,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,1,0,1,
    1,0,1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,1,0,1,
    1,0,1,1,0,0,3,1,1,0,0,0,0,1,1,0,0,0,0,1,1,3,0,0,1,1,0,1,
    1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,
    1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,0,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]
  // 0 - pacpoits
  // 1 - wall
  // 2 - ghost-house
  // 3 - powerfruit
  // 4 - empty
  // 5 - pacman-house

  var squares = []

  //create your board
  function genesis() {
    for (var i = 0; i < layout.length; i++) {
      var square = document.createElement('div')
      map.appendChild(square)
      squares.push(square)

      //add layout to the board
      if(layout[i] === 0) {squares[i].classList.add('pacpoint')}
      else if (layout[i] === 1) {squares[i].classList.add('wall')}
      else if (layout[i] === 2) {squares[i].classList.add('ghost-house')}
      else if (layout[i] === 3) {squares[i].classList.add('powerfruit')}
      else if (layout[i] === 5) {squares[i].classList.add('pacman-house')}
    }
  }
  genesis()

  //create Characters
  //draw pacman onto the board
  var pacmanCurrentIndex = Math.round(Math.random()*(462 - 463)+462)
  squares[pacmanCurrentIndex].classList.add('pacman')

  //move pacman
  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman')
    switch(e.keyCode) {
      //right hand
      case 37:
        if(
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -1].classList.contains('ghost-house')
          )
        pacmanCurrentIndex -= 1
        if (squares[pacmanCurrentIndex -1] === squares[363]) {
          pacmanCurrentIndex = 391
        }
        break
      case 38:
        if(
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex -width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -width].classList.contains('ghost-house')
          ) 
        pacmanCurrentIndex -= width
        break
      case 39:
        if(
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +1].classList.contains('ghost-house')
        )
        pacmanCurrentIndex += 1
        if (squares[pacmanCurrentIndex +1] === squares[392]) {
          pacmanCurrentIndex = 364
        }
        break
      case 40:
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex +width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +width].classList.contains('ghost-house')
        )
        pacmanCurrentIndex += width
        break
      //left hand
      case 65:
        if(
          pacmanCurrentIndex % width !== 0 &&
          !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -1].classList.contains('ghost-house')
          )
        pacmanCurrentIndex -= 1
        if (squares[pacmanCurrentIndex -1] === squares[363]) {
          pacmanCurrentIndex = 391
        }
        break
      case 87:
        if(
          pacmanCurrentIndex - width >= 0 &&
          !squares[pacmanCurrentIndex -width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex -width].classList.contains('ghost-house')
          ) 
        pacmanCurrentIndex -= width
        break
      case 68:
        if(
          pacmanCurrentIndex % width < width - 1 &&
          !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +1].classList.contains('ghost-house')
        )
        pacmanCurrentIndex += 1
        if (squares[pacmanCurrentIndex +1] === squares[392]) {
          pacmanCurrentIndex = 364
        }
        break
      case 83:
        if (
          pacmanCurrentIndex + width < width * width &&
          !squares[pacmanCurrentIndex +width].classList.contains('wall') &&
          !squares[pacmanCurrentIndex +width].classList.contains('ghost-house')
        )
        pacmanCurrentIndex += width
        break
    }
    squares[pacmanCurrentIndex].classList.add('pacman')
    pacPointEaten()
    powerFruitEaten()
    checkForDefeat()
    checkForWin()
  }
  document.addEventListener('keyup', movePacman)

  //what happens when you eat a pac-dot
  function pacPointEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pacpoint')) {
      score++
      scoreScreen.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove('pacpoint')
    }
  }

  //what happens when you eat a power-fruit
  function powerFruitEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('powerfruit')) {
      score +=5
      ghosts.forEach(ghost => ghost.isScared = true)
      setTimeout(unScareGhosts, 10000)
      squares[pacmanCurrentIndex].classList.remove('powerfruit')
    }
  }

  //make the ghosts stop flashing
  function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
  }

  //create ghosts using constructors
  class Ghost {
    constructor(nameGhost, startIndex, speed) {
      this.nameGhost = nameGhost
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
    }
  }

  //insert ghosts
  ghosts = [
    new Ghost('blinky', 376, 100),
    new Ghost('pinky', 377, 150),
    new Ghost('inky', 378, 300),
    new Ghost('clyde', 379, 450),
    new Ghost('funky', 404, 250),
    new Ghost('spunky', 405, 350),
    new Ghost('sue', 406, 500),
    new Ghost('kynki', 407, 200)
    ]

  //draw my ghosts onto the map
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.nameGhost)
    squares[ghost.currentIndex].classList.add('ghost')
    })

  //move the Ghosts randomly
  ghosts.forEach(ghost => moveGhost(ghost))

  function moveGhost(ghost) {
     directions =  [-1, +1, width, -width]
    var direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
      //if the next square your ghost is free (no ghost or wall or pacman-house)
      if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        !squares[ghost.currentIndex + direction].classList.contains('wall')  &&
        !squares[ghost.currentIndex + direction].classList.contains('pacman-house') ) {
          //remove the ghosts classes
          squares[ghost.currentIndex].classList.remove(ghost.nameGhost)
          squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
          //move into that space
          ghost.currentIndex += direction
          squares[ghost.currentIndex].classList.add(ghost.nameGhost, 'ghost')
      //else find a new random direction
      } else direction = directions[Math.floor(Math.random() * directions.length)]

      //if the ghost is currently scared
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }

      //if the ghost is currently scared and pacman is on it
      if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
        squares[ghost.currentIndex].classList.remove(ghost.nameGhost, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score +=20
        squares[ghost.currentIndex].classList.add(ghost.nameGhost, 'ghost')
      }
    checkForDefeat()
    }, ghost.speed)
  }

  //check for a game over
  function checkForDefeat() {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("DEFEAT"); }, 5)
    }
  }

  //check for a victory
  function checkForWin() {
    if (score >= 350) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function(){ alert("VICTORY"); }, 5)}
    }
  })