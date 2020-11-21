import ReactFauxDOM from "react-faux-dom";

function VisualizationGraphics(){
     // Create your element
     var el = ReactFauxDOM.createElement('div')

     // Change stuff using actual DOM functions.
     // Even perform CSS selections!
     el.style.setProperty('color', 'red')
     el.setAttribute('class', 'box')

    // Render it to React elements.
    return el.toReact()
}

export default VisualizationGraphics