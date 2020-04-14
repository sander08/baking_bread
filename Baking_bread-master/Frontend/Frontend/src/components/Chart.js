import React from "react";
import {
    FlexibleXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries
} from 'react-vis';

import "./Chart.scss";


const Chart = (props) => {
    return (
        <FlexibleXYPlot >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries
                style={{
                    stroke: 'red',
                    strokeWidth: '3px'
                }}
                data={props.data ? props.data : []}
            />
        </FlexibleXYPlot>
    )
}

export default Chart;