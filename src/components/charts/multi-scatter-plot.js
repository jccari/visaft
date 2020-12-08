// Inspiration
//https://www.d3-graph-gallery.com/graph/connectedscatter_multi.html

//https://www.d3-graph-gallery.com/graph/connectedscatter_legend.html

import React, { useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import * as d3 from "d3"

// https://stackoverflow.com/questions/47047798/how-to-change-horizontal-bar-chart-to-vertical-bar-chart-in-d3-v4

// margin convention often used with D3
// const margin = { top: 80, right: 60, bottom: 80, left: 60 }
const margin = { top: 100, right: 80, bottom: 100, left: 80 }
const width = 900 - margin.left - margin.right
const height = 600 - margin.top 

const data = [
    {date: d3.timeParse("%Y-%m-%d")("2018-04-14"), value: 8140.71},
    {date: d3.timeParse("%Y-%m-%d")("2018-04-15"), value: 8338.42},
    {date: d3.timeParse("%Y-%m-%d")("2018-04-16"), value: 8371.15},
    {date: d3.timeParse("%Y-%m-%d")("2018-04-17"), value: 8285.96},
    {date: d3.timeParse("%Y-%m-%d")("2018-04-18"), value: 8197.8},
    {date: d3.timeParse("%Y-%m-%d")("2018-04-19"), value: 8298.69},
    {date: d3.timeParse("%Y-%m-%d")("2018-04-20"), value: 8880.23},
    {date: d3.timeParse("%Y-%m-%d")("2018-04-21"), value: 8997.57},
    {date: d3.timeParse("%Y-%m-%d")("2018-04-22"), value: 9001.64},
    {date: d3.timeParse("%Y-%m-%d")("2018-04-23"), value: 8958.55}
]

const ScatterPlot = () => {
  const d3svg = useRef(null)

  function clearNode(){
    let chart = document.getElementById("bar-chart-group");
    chart?.querySelectorAll('*').forEach(n => n.remove());
}

  useEffect(() => {
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
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([ 0, width ]);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        
            // Add Y axis
        var y = d3.scaleLinear()
            .domain( [8000, 9200])
            .range([ height, 0 ]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.value) })
                )
        
                // Add the points
        svg
            .append("g")
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
                .attr("cx", function(d) { return x(d.date) } )
                .attr("cy", function(d) { return y(d.value) } )
                .attr("r", 5)
                .attr("fill", "#69b3a2")
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

// style={{ pointerEvents: 'all', width: '100%', height: '100%' }}
