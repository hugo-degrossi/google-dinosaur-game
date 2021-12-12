import { updateGround, setupGround } from "./core/ground.js"
import { updateDino, setupDino, getDinoHitbox, setDinoLose } from "./core/dino.js"
import { updateCactus, setupCactus, getCactusHitboxes } from "./core/cactus.js"

const GAME_WIDTH = 100
const GAME_HEIGHT = 30
const SPEED_SCALE_INCREASE = .00001
const SCORE_SCALE_INCREASE = .01

const gameElement = document.querySelector("[data-game]")
const scoreElement = document.querySelector("[data-score]")
const startScreenElement = document.querySelector("[data-start-screen]")


setPixelToGameScale()
window.addEventListener('resize', setPixelToGameScale)
window.addEventListener('keydown', handleStart, { once: true })

let lastTime
let speedScale
let score

function update(time) {

    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }

    const delta = time - lastTime
    // Update Objects
    updateGround(delta, speedScale)
    updateDino(delta, speedScale)
    updateCactus(delta, speedScale)
    // Update values
    updateSpeedScale(delta)
    updateScore(delta)

    if (checkLose()) return handleLose()

    lastTime = time
    window.requestAnimationFrame(update)
}

function checkLose() {
    return getCactusHitboxes().some(hitbox => isCollision(hitbox, getDinoHitbox()))
}

function handleStart() {
    lastTime = null
    score = 0
    startScreenElement.classList.add("hide")

    speedScale = 1
    setupGround()
    setupDino()
    setupCactus()
    window.requestAnimationFrame(update)
}

function setPixelToGameScale() {
    let gameToPixelScale

    if( window.innerWidth / window.innerHeight < GAME_WIDTH / GAME_HEIGHT) {
        gameToPixelScale = window.innerWidth / GAME_WIDTH
    } else {
        gameToPixelScale = window.innerHeight / GAME_HEIGHT
    }
    
    gameElement.style.width = `${GAME_WIDTH * gameToPixelScale}px`
    gameElement.style.height = `${GAME_HEIGHT * gameToPixelScale}px`

}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
    score += delta * SCORE_SCALE_INCREASE
    scoreElement.textContent = Math.floor(score)
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right && 
        rect1.top < rect2.bottom && 
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
        )
}

function handleLose() {
    setDinoLose()
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, { once: true })
        startScreenElement.classList.remove("hide")
    }, 200)
}