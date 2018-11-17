import React, { Component } from "react";
import Circulargraph from "./Circulargraph";
import ResponsiveWrapper from "./ResponsiveWrapper";

class Graph extends Component {
  state = {
    svgDimensions: null,
    width: null,
    height: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    let { parentWidth, parentHeight } = nextProps;

    const svgDimensions = {
      width: Math.max(parentWidth, 200),
      height: Math.max(parentHeight, 200)
    };

    let width = svgDimensions.width;
    let height = svgDimensions.height;

    prevState = { ...prevState, svgDimensions, width, height };
    return prevState;
  }

  render() {
    console.log(this.props);

    const {
      svgDimensions,
    } = this.state;

    return (
      <svg width={svgDimensions.width} height={svgDimensions.height}>
        <Circulargraph
          x={0}
          y={0}
          width={svgDimensions.width}
          height={svgDimensions.height}
          data={this.props.data}
          year={this.props.year}
        />
        {/* <Demo /> */}
      </svg>
    );
  }
}

export default ResponsiveWrapper(Graph);
