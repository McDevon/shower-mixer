import RingBuffer from "../simulations/RingBuffer";
import Plotter from "./Plotter";
import PidController from "./PidController";

class ShowerSimulation {

    init(canvas) {
        this.canvas = canvas

        this.width = canvas.width
        this.height = canvas.height

        const delaySeconds = 3

        this.delayQueue = new RingBuffer(delaySeconds * 60)
        this.running = true

        this.targetTemperature = 36
        this.minTemperature = 15
        this.maxTemperature = 55
        this.maxChangeSpeed = 4
        this.completionTime = 4
        this.completeTimer = 0

        this.maxDeltaSpeed = 0.02
        this.lastDiff = 0

        this.running = false
        this.usePid = false

        this.reset()
    }

    reset(completionCallback) {

        this.controlMinTemperature = this.minTemperature + Math.random() * 12
        this.controlMaxTemperature = this.maxTemperature - Math.random() * 10
        this.currentTemperature = this.controlMinTemperature + Math.random() * 3
        this.mixerTemperature = this.currentTemperature
        this.completionCallback = completionCallback

        for (let i = 0; i < this.delayQueue.size; i++) {
            this.delayQueue.put(this.currentTemperature)
        }

        const graphLen = 30 * 60
        this.graphList = new RingBuffer(graphLen)

        this.plotter = new Plotter(
            graphLen,
            this.maxTemperature,
            this.minTemperature,
            this.canvas,
            this.targetTemperature + 0.5,
            this.targetTemperature - 0.5
        )

        this.pid = new PidController(0.001, 0.00015, 0,
            0, 1, true)

        const mixerValue = this.tempToMixer(this.mixerTemperature)
        return mixerValue
    }

    setRunning(value) {
        this.running = value
    }

    setUsePid(value) {
        this.usePid = value
    }

    setPidValues({p, i, d}) {
        this.pid.p = p
        this.pid.i = i
        this.pid.d = d
    }

    tempToMixer(value) {
        return 1 - (value - this.controlMinTemperature) / (this.controlMaxTemperature - this.controlMinTemperature)
    }

    mixerToTemp(value) {
        return this.controlMinTemperature + (this.controlMaxTemperature - this.controlMinTemperature) * (1 - value)
    }

    completed() {
        console.log('COMPLETED!')
        this.completionCallback(this.tempToMixer(this.mixerTemperature))
    }

    setMixer(mixerValue) {
        this.mixerTemperature = this.mixerToTemp(mixerValue)
        console.log(`Target ${this.mixerTemperature}`)
    }

    fixedUpdate(dt) {
        if (!this.running) { return }

        if (this.usePid) {
            const controlValue = 1 - this.pid.step(this.delayQueue.getTail() || this.currentTemperature, this.targetTemperature)
            this.mixerTemperature = this.mixerToTemp(controlValue)
        }

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

        if (nextTempValue < this.targetTemperature + 0.5 && nextTempValue > this.targetTemperature - 0.5) {
            this.completeTimer += dt
            if (this.completeTimer >= this.completionTime) {
                this.completed()
            }
        } else {
            this.completeTimer = 0
        }
    }

    update(_) { }

    render(_) {
        const context = this.canvas.getContext('2d')
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.plotter.draw(this.graphList.getAll().filter(function (el) {
            return el != null;
        }))
    }
}

const showerSim = () => {
    return new ShowerSimulation()
}

export default showerSim