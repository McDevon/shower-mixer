
class BeerGameSimulation {

    init(canvas) {
        this.canvas = canvas

        this.width = canvas.width
        this.height = canvas.height
    }

    fixedUpdate(_) {

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