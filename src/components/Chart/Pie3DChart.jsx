

import React from "react";
import { Chart } from "react-google-charts";

export const defaultData = [
    ["Task", "Users Status"],
    ["Activos", 11],
    ["Vencidos", 2]
];

export const options = {
    title: "Usuarios",
    is3D: true,
    backgroundColor: "none",
    colors: ["blue", "red"]
};



export const Pie3DChart = ({ data }) => {

    return (
        <Chart
            chartType="PieChart"
            data={data || defaultData}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    );

}
