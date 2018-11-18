//import React from "react";
import D3blackbox from "./D3blackbox";
import * as d3 from "d3";

const Circulargraph = D3blackbox(function(anchor, props, state) {
  const { year, data, width, height } = props;

  console.log(year);

  var colors = {
    red: "#f45b63",
    orange: "#f49d73",
    green: "#72c14a"
  };

  const setColor = total => {
    return total <= 50
      ? colors.red
      : total >= 80
      ? colors.green
      : colors.orange;
  };

  var radius = Math.min(width, height) / 1.9,
    spacing = 0.09;

  var dataUpdated = [
    {
      index: 0.7,
      text: "Dividend",
      value: data.Dividend[year] / 100,
      allValues: data.Dividend
    },
    {
      index: 0.6,
      text: "Balans",
      value: data.Balans[year] / 100,
      allValues: data.Balans
    },
    {
      index: 0.5,
      text: "Growth",
      value: data.Growth[year] / 100,
      allValues: data.Growth
    },
    {
      index: 0.4,
      text: "Valuation",
      value: data.Valuation[year] / 100,
      allValues: data.Valuation
    }
  ];

  var tooltip = d3.select(".tooltip");

  d3.select(anchor.current)
    .select("g")
    .remove();

  var arcBody = d3
    .arc()
    .startAngle(0)
    .endAngle(function(d) {
      return d.value * 2 * Math.PI;
    })
    .innerRadius(function(d) {
      return d.index * radius;
    })
    .outerRadius(function(d) {
      return (d.index + spacing) * radius;
    })
    .cornerRadius(2);

    /** sparkline */

  function sparkline(elemId, data) {

    console.log(elemId, data)


    var width = 150
    var height = 30
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    x.domain([0,4]);
    y.domain([0,100]);

    var line = d3.line()
      .x(function(d, i) {
        return x(i);
      })
      .y(function(d, i) {
        return y(d);
      });

    var sparklineSvg = d3
      .select(elemId)
      .append("svg")
      .attr("width", width)
      .attr("class", "sparkline-wrapper-svg")
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(0, 2)");

      sparklineSvg
      .append("path")
      .datum(data)
      .attr("class", "sparkline")
      .attr("id", "current-path-" + elemId.replace("#", ""))
      .attr("d", line);





  }

  /** sparkline */

  var svg = d3
    .select(anchor.current)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  svg
    .append("text")
    .style("font-weight", "bold")
    .style("alignment-baseline", "middle")
    .style("text-anchor", "middle")
    .style("font-size", 20)
    .style("fill", setColor(data.TotalScore[year]))
    .text(data.TotalScore[year] + "%");

  var field = svg
    .selectAll("g")
    .data(dataUpdated, function(d) {
      return d.value;
    })
    .enter()
    .append("g");

  var arcs = field
    .append("path")
    .attr("class", "arc-body")
    .style("fill", function(d) {
      return setColor(data.TotalScore[year]);
    });

  field
    .append("text")
    .attr("dy", "-.15em")
    .attr("dx", "-0.75em")
    .style("text-anchor", "middle")
    .attr("transform", function(d) {
      return "translate(" + [0, -d.index * radius] + ")";
    })
    .style("font-size", 11)
    .style("font-weight", "bold")
    .style("fill", setColor(data.TotalScore[year]))
    .text(function(d) {
      return d.text.split("")[0];
    });

  arcs
    .style("stroke", "#fff")
    .style("stroke-width", 2)
    .on("mouseover", function(d) {
      console.log(d);
      d3.select(this).style("stroke-width", 0);
      
      tooltip
        .html(
          `<b>${d.text}</b><br/>
          <div class="sparkGraph"></div>
          ${d.allValues.join(" - ")}
          `
        )
        .style("left", `${d3.event.pageX - 160}px`)
        .style("top", `${d3.event.pageY - 80}px`)
        .transition()
        .duration(200)
        .style("opacity", 0.9);

        sparkline(".sparkGraph", d.allValues)
    })
    .on("mouseout", function(d) {
      tooltip
        .transition()
        .duration(500)
        .style("opacity", 0);
      d3.select(this).style("stroke-width", 2);
    })
    .transition()
    .duration(750)
    .attrTween("d", arcTween(arcBody));

  function arcTween(arc) {
    return function(d) {
      var i = d3.interpolateNumber(0, d.value);
      return function(t) {
        d.value = i(t);
        return arc(d);
      };
    };
  }
});

export default Circulargraph;
