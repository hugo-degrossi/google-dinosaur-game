import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "../helper/updateCustomCssProperty.js"

const dinoElement = document.querySelector('[data-dino]')

const JUMP_SPEED = .45
const GRAVITY = .0019
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let currentFrameTime
let dinoFrame
let yVelocity


export function setupDino() {
    isJumping = false
    currentFrameTime = 0
    dinoFrame = 0
    yVelocity = 0

    setCustomProperty(dinoElement, "--bottom", 0)

    document.removeEventListener('keydown', onJump)
    document.addEventListener('keydown', onJump)
}

export function updateDino(delta, speedScale) {

    handleRun(delta, speedScale)
    handleJump(delta)

}

export function getDinoHitbox() {
    return dinoElement.getBoundingClientRect()
}

export function setDinoLose() {
    dinoElement.src = `../assets/dino-lose.png`
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        dinoElement.src = `../assets/dino-stationary.png`
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT

        dinoElement.src = `assets/dino-run-${dinoFrame}.png`
        currentFrameTime -= FRAME_TIME
    }

    currentFrameTime += delta * speedScale

}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(dinoElement, "--bottom", yVelocity * delta)

    if (getCustomProperty(dinoElement, "--bottom") <= 0) {
        setCustomProperty(dinoElement, "--bottom", 0)
        isJumping = false
    }

    yVelocity -= GRAVITY * delta

}


function onJump(e) {
    if (e.code !== 'Space' || isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}