
class Plotter {

    constructor(width, height, maxVals, top, bottom, canvas, targetTop, targetBottom) {
        this.width = width
        this.height = height
        this.maxVals = maxVals
        this.top = top
        this.bottom = bottom
        this.targetTop = targetTop
        this.targetBottom = targetBottom
        this.stepLength = width / maxVals
        this.verticalStep = height / (top - bottom)
        this.cx = canvas.getContext('2d')

    }

    draw(x, y, data) {
        
        this.cx.strokeStyle = '#FFAA00'
        this.cx.lineWidth = 2
        this.cx.beginPath()
        for (let i = 0, count = data.length; i < count; i++) {
            const value = data[i]
            const x0 = x + this.stepLength * i
            const y0 = y + this.height - (this.verticalStep * (value - this.bottom))
            if (i === 0) {
                this.cx.moveTo(x0, y0)
            } else {
                this.cx.lineTo(x0, y0)
            }
        }
        this.cx.stroke()

        this.cx.strokeStyle = '#000000'
        this.cx.lineWidth = 1
        this.cx.beginPath()
        this.cx.moveTo(x, y)
        this.cx.lineTo(x, y + this.height)
        this.cx.moveTo(x, y + this.height / 2)
        this.cx.lineTo(x + this.width, y + this.height / 2)
        this.cx.stroke()
    }
}

export default Plotter