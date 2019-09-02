
class Plotter {

    constructor(maxVals, top, bottom, canvas, targetTop, targetBottom) {
        this.margin = 5
        this.width = canvas.width - this.margin * 2
        this.height = canvas.height - this.margin * 2
        this.maxVals = maxVals
        this.top = top
        this.bottom = bottom
        this.targetTop = targetTop
        this.targetBottom = targetBottom
        this.stepLength = this.width / maxVals
        this.verticalStep = this.height / (top - bottom)
        this.cx = canvas.getContext('2d')

    }

    draw(data) {

        const x0 = this.pixel(this.margin), y0 = this.pixel(this.margin)
        const x1 = this.pixel(x0 + this.width - this.margin * 2), y1 = this.pixel(y0 + this.height - this.margin * 2)
        
        this.cx.strokeStyle = '#FFAA00'
        this.cx.lineWidth = 1
        this.cx.beginPath()
        for (let i = 0, count = data.length; i < count; i++) {
            const value = data[i]
            const xd = x0 + this.stepLength * i
            const yd = y0 + this.height - (this.verticalStep * (value - this.bottom))
            if (i === 0) {
                this.cx.moveTo(xd, yd)
            } else {
                this.cx.lineTo(xd, yd)
            }
        }
        this.cx.stroke()

        this.cx.strokeStyle = '#000000'
        this.cx.fillStyle = '#000000'
        this.cx.lineWidth = 1

        this.cx.beginPath()
        this.cx.moveTo(x0, y0)
        this.cx.lineTo(x0, y1)
        this.cx.stroke()
        this.cx.beginPath()
        this.cx.moveTo(x0, y0)
        this.cx.lineTo(x0 - 2, y0 + 10)
        this.cx.lineTo(x0 + 2, y0 + 10)
        this.cx.fill()

        this.cx.beginPath()
        this.cx.moveTo(x0, y1)
        this.cx.lineTo(x1, y1)
        this.cx.stroke()
        this.cx.beginPath()
        this.cx.moveTo(x1, y1)
        this.cx.lineTo(x1 - 10, y1 - 2)
        this.cx.lineTo(x1 - 10, y1 + 2)
        this.cx.fill()

        this.cx.strokeStyle = '#77AA77'
        this.cx.beginPath()
        this.cx.moveTo(x0, this.pixel(y0 + this.height - (this.verticalStep * (this.targetTop - this.bottom))))
        this.cx.lineTo(x1, this.pixel(y0 + this.height - (this.verticalStep * (this.targetTop - this.bottom))))
        this.cx.moveTo(x0, this.pixel(y0 + this.height - (this.verticalStep * (this.targetBottom - this.bottom))))
        this.cx.lineTo(x1, this.pixel(y0 + this.height - (this.verticalStep * (this.targetBottom - this.bottom))))
        this.cx.stroke()
    }

    pixel(value) {
        return Math.round(value) + 0.5
    }
}

export default Plotter