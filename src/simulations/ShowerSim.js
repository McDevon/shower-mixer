import RingBuffer from "../simulations/RingBuffer";
import Plotter from "./Plotter";

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

        this.maxDeltaSpeed = 0.02
        this.lastDiff = 0

        this.reset()
    }

    reset() {
        this.currentTemperature = 17 + Math.random() * 6
        this.mixerTemperature = this.currentTemperature

        for (let i = 0; i < this.delayQueue.size; i++) {
            this.delayQueue.put(this.currentTemperature)
        }

        const graphLen = 30 * 60
        this.graphList = new RingBuffer(graphLen)

        this.plotter = new Plotter(
            550, 350,
            graphLen,
            this.maxTemperature,
            this.minTemperature,
            this.canvas,
            this.targetTemperature + 0.5,
            this.targetTemperature - 0.5
        )

        const mixerValue = 1 - (this.mixerTemperature - this.minTemperature) / (this.maxTemperature - this.minTemperature)

        return mixerValue
    }

    setMixer(mixerValue) {
        this.mixerTemperature = this.minTemperature + (this.maxTemperature - this.minTemperature) * (1 - mixerValue)
        console.log(`Target ${this.mixerTemperature}`)
    }

    fixedUpdate(dt) {
        const distance = (this.mixerTemperature - this.currentTemperature)
        let diff = distance
        const slowDist = this.maxChangeSpeed / (this.maxDeltaSpeed * dt)
        if (Math.abs(distance) < slowDist) {
            const mul = Math.abs(distance) * this.maxDeltaSpeed
            diff = Math.sign(distance) * mul
        }
        if (Math.abs(diff) > this.maxChangeSpeed * dt) {
            diff = this.maxChangeSpeed * Math.sign(diff) * dt
        }

        if (Math.abs(diff) > Math.abs(this.lastDiff) && Math.abs(this.lastDiff - diff) > this.maxDeltaSpeed * dt) {
            diff = this.lastDiff + this.maxDeltaSpeed * dt * Math.sign(diff)
        }

        this.lastDiff = diff
        this.currentTemperature += diff

        const nextTempValue = this.delayQueue.getTail()
        this.delayQueue.put(this.currentTemperature)
        this.graphList.put(nextTempValue)
    }

    update(_) { }

    render(_) {
        const context = this.canvas.getContext('2d')
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.plotter.draw(25, 25, this.graphList.getAll().filter(function (el) {
            return el != null;
        }))
    }
}

const showerSim = () => {
    return new BeerGameSimulation()
}

export default showerSim