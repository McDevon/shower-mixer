import RingBuffer from "../simulations/RingBuffer";

class BeerGameSimulation {

    init(canvas) {
        this.canvas = canvas

        this.width = canvas.width
        this.height = canvas.height

        const delaySeconds = 5

        this.delayQueue = new RingBuffer(delaySeconds * 60)
        this.running = true

        this.targetTemperature = 36
        this.minTemperature = 15
        this.maxTemperature = 50
        this.maxChangeSpeed = 3

        this.reset()
    }

    reset() {
        this.currentTemperature = 17 + Math.random() * 6
        this.mixerTemperature = this.currentTemperature

        for (let i = 0; i < this.delayQueue.size; i++) {
            this.delayQueue.put(this.currentTemperature)
        }

        this.graphList = new RingBuffer(30 * 60)

        return this.mixerTemperature
    }

    setMixer(mixerValue) {
        this.mixerTemperature = this.minTemperature + (this.maxTemperature - this.minTemperature) * (1 - mixerValue)
        console.log(`Target ${this.mixerTemperature}`)
    }

    fixedUpdate(dt) {
        let diff = (this.mixerTemperature - this.currentTemperature)
        if (Math.abs(diff) > this.maxChangeSpeed * dt) {
            diff = this.maxChangeSpeed * Math.sign(diff) * dt
        }

        this.currentTemperature += diff
        
        const nextTempValue = this.delayQueue.getTail()
        this.delayQueue.put(this.currentTemperature)
        this.graphList.put(nextTempValue)

        console.log(`Current temp ${nextTempValue}`)
    }

    update(dt) {
        //console.log(`Time ${dt}`)
    }

    render(_) {
        
    }
}

const showerSim = () => {
    return new BeerGameSimulation()
}

export default showerSim