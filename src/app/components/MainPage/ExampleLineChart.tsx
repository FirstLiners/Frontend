'use client'
import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend
} from "recharts";

const data = [
    {
        name: "Sun",
        value: 10
    },
    {
        name: "Mon",
        value: 30
    },
    {
        name: "Tue",
        value: 100
    },
    {
        name: "Wed",
        value: 30
    },
    {
        name: "Thu",
        value: 23
    },
    {
        name: "Fri",
        value: 34
    },
    {
        name: "Sat",
        value: 11
    }
];

const SimpleLineChart = () => {
    const [tooltip, setTooltip] = useState(null);
    const [point, setPoints] = useState(null);
    // @ts-ignore
    const CustomTooltip = ({ payload }) => {
        if (payload) {
            return (
                <div className="flex justify-center items-center bg-secondary-800 text-white w-40 h-32">
                    <p>{payload[0]?.value}</p>
                </div>
            );
        }
        return null;
    };
    // @ts-ignore
    const updateTooltip = (e) => {
        let x = Math.round(e.cx);
        let y = Math.round(e.cy);
        // @ts-ignore
        tooltip.style.opacity = "1";
        // @ts-ignore
        tooltip.style.transform = `translate(${x}px, ${y}px)`;
        // @ts-ignore
        tooltip.childNodes[0].innerHTML = e.value;
    };
    // @ts-ignore
    const onChartMouseMove = (chart) => {
        if (chart.isTooltipActive) {
            if (point) {
                setPoints(point);
                updateTooltip(chart);
            }
        }
    };
    // @ts-ignore
    const onChartMouseLeave = (e) => {
        setPoints(null);
        updateTooltip(e);
    };

    return (
        <div className="flex caption2 flex-col ui-chart rounded-2xl outline outline-1 outline-gray-300">
            <div className="flex justify-center flex-col items-center w-56 ml-11 mt-10 mb-20">
                <p className="caption2 font-bold">Прогноз спроса за 14 дней</p>
                
            </div>
            <LineChart width={1560} height={454} data={data}>
                <CartesianGrid vertical={false} opacity="0.2" />
                <Legend />
                <XAxis
                    tick={{ fill: "black" }}
                    axisLine={false}
                    tickLine={false}
                    dataKey="name"
                />
                <YAxis
                    tickCount={7}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "black" }}
                    type="number"
                    domain={[0, 100]}
                />
                <Tooltip
                    // @ts-ignore
                    content={<CustomTooltip />}
                    viewBox={{ x: 0, y: 0, width: 20, height: 20 }}
                    cursor={false}
                    // @ts-ignore
                    position="top"
                    wrapperStyle={{ display: "hidden" }}
                />
                <Line
                    fill="#40C0C0"
                    stroke="#40C0C0"
                    dot={true}
                    type="monotone"
                    dataKey="value"
                    // @ts-ignore
                    activeDot={(e) => {
                        onChartMouseMove(e);
                        onChartMouseLeave(e);
                    }}
                />
            </LineChart>
            <div
                className="ui-chart-tooltip text-white flex items-center justify-center"
                // @ts-ignore
                ref={(ref) => setTooltip(ref)}
            >
                <div className="ui-chart-tooltip-content"></div>
            </div>
        </div>
    );
};

export default SimpleLineChart;