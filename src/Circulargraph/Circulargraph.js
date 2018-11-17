import React from "react";
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
    { index: 0.7, text: "Dividend", value: data.Dividend[year] / 100, allValues: data.Dividend },
    { index: 0.6, text: "Balans", value: data.Balans[year] / 100, allValues: data.Balans  },
    { index: 0.5, text: "Growth", value: data.Growth[year] / 100, allValues: data.Growth  },
    { index: 0.4, text: "Valuation", value: data.Valuation[year] / 100, allValues: data.Valuation  }
  ];

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

  var arcBody0 = d3
    .arc()
    .startAngle(0)
    .endAngle(0)
    .innerRadius(function(d) {
      return d.index * radius;
    })
    .outerRadius(function(d) {
      return (d.index + spacing) * radius;
    })
    .cornerRadius(2);

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

  //tick();

  //function tick() {
  arcs
    .on("mouseover", function (d) {
      console.log(d)
    })
    // .each(function(d) {
    //   this._value = d.value;
    // })
    // .data(dataUpdated)
    // .each(function(d) {
    //   d.previousValue = this._value;
    // })
    //.attr("d", arcBody0)
    //.each(fieldTransition)
    .transition()
      // .attrTween("d", arcTween(arcBody0))
      // //.delay(1000)
      // .transition()
      .duration(750)
      .attrTween("d", arcTween(arcBody));
  

  // arcs
  //   .transition()
  //   .duration(750)
  //   .attrTween("d", arcTween(arcBody));

  // function fieldTransition() {
  //   var field = d3.select(this).transition();

  //   field.select(".arc-body").attrTween("d", arcTween(arcBody));
  // }

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
