import React from "react";
import { Chart } from "react-google-charts";

export const defaultData = [
    ["Element", "Ventas", { role: "style" }],
    ["Copper", 8.94, "#b87333"], // RGB value
    ["Silver", 10.49, "silver"], // English color name
    ["Gold", 19.3, "gold"],
    ["Gold", 19.3, "gold"],
    ["Gold", 19.3, "gold"],
    ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
];

export function ChartVentas({ data }) {
    const colors = (value) => {
        if (value < 50) return "red"
        if (value > 50 && value < 100) return "orange";
        if (value > 100 && value < 200) return "";
        if (value > 200) return "green";

    }
    const dataFormat = [
        ["Element", "Ventas", { role: "style" }],
    ]
    data.map((data) => {
        dataFormat.push([
            `${data._id.month}-${data._id.year}`,
            data.totalAmount,
            colors(data.totalAmount)
        ])
    })


    return (
        <Chart chartType="ColumnChart" width="100%" height="400px" data={dataFormat} />
    );
}
