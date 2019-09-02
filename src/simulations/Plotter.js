
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
        this.stepLength = (this.width - this.margin * 2) / maxVals
        this.verticalStep = (this.height - this.margin * 2) / (top - bottom)
        this.cx = canvas.getContext('2d')

    }

    drawLine(value, prevx, prevStartX, posTop, posBottom, region) {
        this.cx.stroke()
        
        if (region !== 1) {
            this.cx.fillStyle = region === 0 ? '#BBBBFF55' : '#FFBBBB55'
            this.cx.lineTo(prevx, value < this.targetBottom ? posBottom : posTop)
            this.cx.lineTo(prevStartX, value < this.targetBottom ? posBottom : posTop)
            this.cx.fill()
        }
    }

    draw(data) {

        const x0 = this.pixel(this.margin), y0 = this.pixel(this.margin)
        const x1 = this.pixel(x0 + this.width - this.margin * 2), y1 = this.pixel(y0 + this.height - this.margin * 2)
        
        
        const posTop = y0 + this.height - (this.verticalStep * (this.targetTop - this.bottom))
        const posBottom = y0 + this.height - (this.verticalStep * (this.targetBottom - this.bottom))
        this.cx.strokeStyle = '#002200'
        this.cx.lineWidth = 2
        let prevx = x0, prevy = y0 + this.height - (this.verticalStep * (data[0] - this.bottom))
        let prevRegion = 1

        this.cx.beginPath()
        this.cx.moveTo(prevx, prevy)

        let strokeCount = 0
        let prevStartX = x0
        let prevValue = data[0]
        for (let i = 0, count = data.length; i < count; i++) {
            const value = data[i]
            const region = value < this.targetBottom ? 0 : value > this.targetTop ? 2 : 1
            const xd = x0 + this.stepLength * i
            const yd = y0 + this.height - (this.verticalStep * (value - this.bottom))
            if (region !== prevRegion) {
                this.drawLine(prevValue, prevx, prevStartX, posTop, posBottom, prevRegion)
                this.cx.beginPath()
                this.cx.moveTo(prevx, prevy)
                strokeCount += 1
                prevRegion = region
                prevStartX = prevx
                prevValue = value
            }
            this.cx.lineTo(xd, yd)

            prevx = xd
            prevy = yd
        }
        this.drawLine(prevValue, prevx, prevStartX, posTop, posBottom, prevRegion)
        
        console.log(`Strokes: ${strokeCount}`)
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