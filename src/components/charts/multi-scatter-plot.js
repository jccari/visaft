// Inspiration
// https://www.d3-graph-gallery.com/graph/connectedscatter_multi.html
// https://www.d3-graph-gallery.com/graph/connectedscatter_legend.html

import React, { useEffect, useRef, useContext } from 'react'
import { select } from 'd3-selection'
import * as d3 from "d3"

import { AppContext } from "contexts/AppContext";


// margin convention often used with D3
const margin = { top: 100, right: 80, bottom: 100, left: 80 }
const width = 900 - margin.left - margin.right
const height = 600 - margin.top


const ScatterPlot = ({data}) => {
    const d3svg = useRef(null)
    const {getTweetsbyDimension, keywordsFilter, dimensionSelected} = useContext(AppContext)


    function formatDate(data){
        data?.forEach((item) => item.date = d3.timeParse("%Y-%m-%d")(item.lastDate))
    }

    function clearNode() {
        let chart = document.getElementById("bar-chart-group");
        chart?.querySelectorAll('*').forEach(n => n.remove());
    }

    async function mouseClick(){
        // what group are we hovering?
        var item = d3.select(this).datum(); // This was the tricky part
        // console.log("mouseclick", item)
        await getTweetsbyDimension(keywordsFilter? keywordsFilter : '', dimensionSelected, item, 0)
    }

    useEffect(() => {
        formatDate(data)
        console.log("data", data);
        clearNode()
        if (data && d3svg.current) {
            let svg = select(d3svg.current)
            // append the svg object to the body of the page
            svg = svg
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            // Add X axis --> it is a date format
            var x = d3.scaleTime()
                .domain(d3.extent(data, function (d) { return d.date; }))
                .range([0, width]);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            let yMax = d3.max(data, item => item.total )
            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, yMax])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // Add the line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(function (d) { return x(d.date) })
                    .y(function (d) { return y(d.total) })
                )

            // Add the points
            svg
                .append("g")
                .selectAll("dot")
                .data(data)
                .enter().append("circle")
                    .attr("id", function (d) { return d.lastDate})
                    .attr("cx", function (d) { return x(d.date) })
                    .attr("cy", function (d) { return y(d.total) })
                    .attr("r", 7)
                    .attr("fill", "#69b3a2")
                .on("click", mouseClick)
        }
    }, [data])

    return (
        <svg
            id="bar-chart-group"
            className="bar-chart-container"
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
            role="img"
            ref={d3svg}
        ></svg>
    )
}

export default ScatterPlot