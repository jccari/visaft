import React, { useEffect, useRef, useContext } from 'react'
import { select } from 'd3-selection'
import { max } from 'd3-array'
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'
import * as d3 from "d3"
import { map } from "lodash";
import { AppContext } from "contexts/AppContext";

// Inspiration from
// https://www.d3-graph-gallery.com/graph/barplot_grouped_basicWide.html

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const BarChartGroup = ({ data, domain, subgroups }) => {
    const d3svg = useRef(null)
    //const {domain, subgroups} = useContext(AppContext)

    function clearNode(){
        let chart = document.getElementById("bar-chart-group");
        // console.log("clearNode", chart)
        if (chart)
            chart?.querySelectorAll('*').forEach(n => n.remove());
    }

    useEffect(() => {
        // console.log("BarChartGroup Render");
        // console.log("domain", domain, subgroups, data)
        clearNode()
        // if ((data || domain || subgroups) && !d3svg.current) {
        if ( data && domain && subgroups && d3svg.current) {
            // console.log("BarChartGroup Render 2");
            let svg = select(d3svg.current)

            // append the svg object to the body of the page
            svg = svg
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

            // console.log("datafromcsv", data)
            // List of subgroups = header of the csv files = soil condition here
            // var subgroups = data.columns.slice(1)
            // var subgroups = ["Nitrogen", "normal", "stress"]
            // var subgroups = ["normal", "stress"]

            // List of groups = species here = value of the first column called group -> I show them on the X axis
            var groups =  domain//map(data, function(d){return(d.group)})
            console.log("groups", groups)
            console.log("groups", subgroups)

            // Add X axis
            var x = scaleBand()
                .domain(groups)
                .range([0, width])
                .padding([0.2])
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(axisBottom(x).tickSize(0));

            let yMax = max(data, item => item.total)
            // Add Y axis
            var y = scaleLinear()
                .domain([0, yMax])
                .range([ height, 0 ]);
            svg.append("g")
                .call(axisLeft(y)); 

            // Another scale for subgroup position?
            var xSubgroup = scaleBand()
                .domain(subgroups)
                .range([0, x.bandwidth()])
                .padding([0.05])

            // color palette = one color per subgroup
            var color = scaleOrdinal()
                .domain(subgroups)
                .range(['#e41a1c','#377eb8','#4daf4a','#8000ff','#00ff00'])
                // .range(['#e41a1c','#377eb8','#4daf4a','#8000ff','#00ff00'])

            // Show the bars
            svg.append("g")
                .selectAll("g")
                // Enter in data = loop group per group
                .data(data)
                .enter()
                .append("g")
                    .attr("transform", function(d) { 
                        console.log("x", d.hashtag, x(d.hashtag));
                        return "translate(" + x(d.hashtag) + ",0)"; })
                .selectAll("rect")
                .data(function(d) { return subgroups.map(function(key) { 
                    // console.log("key", key, d.total)
                    return {key: d.hashtag, value: d.total}; }); })
                .enter().append("rect")
                    .attr("x", function(d) { return xSubgroup(d.key); })
                    .attr("y", function(d) { return y(d.value); })
                    .attr("width", xSubgroup.bandwidth())
                    .attr("height", function(d) { return height - y(d.value); })
                    .attr("fill", function(d) { return color(d.key); });
        }
    }, [data, domain, subgroups])

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

export default BarChartGroup
