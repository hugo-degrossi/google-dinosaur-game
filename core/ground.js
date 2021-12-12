import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "../helper/updateCustomCssProperty.js"

const SPEED = .05
const groundElements = document.querySelectorAll('[data-ground]')


export function setupGround() {
    setCustomProperty(groundElements[0], "--left", 0)
    setCustomProperty(groundElements[1], "--left", 300)
}

export function updateGround(delta, speedScale) {
    groundElements.forEach(ground => {
        incrementCustomProperty(ground, "--left", delta * SPEED * -1 * speedScale)


        if (getCustomProperty(ground, "--left") <= -300) {
            incrementCustomProperty(ground, "--left", 600)
        }

    })
}