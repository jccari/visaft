// import * as d3 from "d3";
// const d3 = {
//     ...require('d3-shape'),
//     ...require('d3-array'),
//     ...require('d3-scale'),
//     ...require('d3-axis'),
//     ...require('d3-selection'),
//     ...require('d3-transition')
//   }
import { scaleOrdinal, scaleLinear } from "d3-scale";
import ReactFauxDOM from "react-faux-dom";

const jsondata = [
    {
        "Letter": "A",
        "Freq": 20	
    },
    {
        "Letter" : "B",
        "Freq": 12
    },
    {
        "Letter" : "C",
        "Freq": 47
    }
]

function VisualizationGraphics(){
    // set the dimensions of the canvas
    var margin = {top: 20, right: 20, bottom: 70, left: 40},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // set the ranges
    // var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
    var x = scaleOrdinal.rangeRoundBands([0, width], .05);

    var y = scaleLinear.range([height, 0]);

    // define the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);


    // add the SVG element
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");


    // load the data
    d3.json(jsondata, function(error, data) {

        data.forEach(function(d) {
            d.Letter = d.Letter;
            d.Freq = +d.Freq;
        });
        
        // scale the range of the data
        x.domain(data.map(function(d) { return d.Letter; }));
        y.domain([0, d3.max(data, function(d) { return d.Freq; })]);

        // add axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" );

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Frequency");


        // Add bar chart
        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.Letter); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.Freq); })
            .attr("height", function(d) { return height - y(d.Freq); });

    });

    // Render it to React elements.
    return svg.toReact()
}

export default VisualizationGraphics