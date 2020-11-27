import React, { useEffect, useRef } from 'react'
import { select } from 'd3-selection'
import { max } from 'd3-array'
import { scaleLinear, scaleBand } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'

// https://stackoverflow.com/questions/47047798/how-to-change-horizontal-bar-chart-to-vertical-bar-chart-in-d3-v4

// margin convention often used with D3
// const margin = { top: 80, right: 60, bottom: 80, left: 60 }
const margin = { top: 100, right: 80, bottom: 100, left: 80 }
const width = 600 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom

const color = ['#f05440', '#d5433d', '#b33535', '#283250']

const BarChart = ({ data }) => {
  const d3svg = useRef(null)

  useEffect(() => {
    if (data && d3svg.current) {
      let svg = select(d3svg.current)

      // scales
      const yMax = max(data, d => d.revenue)

      // https://bl.ocks.org/taigereye/10a79a8d5b18a7c3d2833e79231351d8
    const yScale = scaleLinear()
    	.domain([0, yMax])
    	.range([height - margin.bottom, margin.top]);

    //   const yScale = scaleLinear()
    //     .domain([0, yMax])
    //     .range([0,width])

      const xScale = scaleBand()
        .domain(data.map(d => d.genre))
        .rangeRound([0, height])
        .paddingInner(0.25)

      // append group translated to chart area
      svg = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)

      // draw header
    //   svg
    //     .append('g')
    //     .attr('class', 'bar-header')
    //     .attr('transform', `translate(0, ${-margin.top / 2})`)
    //     .append('text')
    //     .append('tspan')
    //     .text('Horizontal bar chart')

      // draw bars
      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.genre))
        .attr('y', d => yScale(d.revenue))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - margin.bottom - yScale(d.revenue))
        // .attr('height', d => yScale(d.revenue))
        .style('fill', function(d, i) {
          return color[i % 4] // use colors in sequence
        })

      // draw axes
      const xAxis = axisBottom(xScale)
      svg
        .append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height - margin.bottom / 2})`)
        .call(xAxis)

      const yAxis = axisLeft(yScale).tickSize(0)
      svg
        .append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${-margin.left / 3},0)`)
        .call(yAxis)
    }
  }, [data])

  return (
    <svg
      className="bar-chart-container"
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      role="img"
      ref={d3svg}
    ></svg>
  )
}

export default BarChart

// style={{ pointerEvents: 'all', width: '100%', height: '100%' }}
