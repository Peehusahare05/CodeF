import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
);

export const DashboardDonutChart = ({ data, options }) => {
    const mergedOptions = {
        ...options,
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="relative h-48 w-full sm:h-56 lg:h-64">
            <Doughnut data={data} options={mergedOptions} />
        </div>
    );
};

export const DashboardLineChart = ({ data, options }) => {
    const mergedOptions = {
        ...options,
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="relative h-48 w-full sm:h-64 lg:h-80">
            <Line data={data} options={mergedOptions} />
        </div>
    );
};

export const ProfileLineChart = ({ data, options }) => {
    const mergedOptions = {
        ...options,
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="relative h-56 w-full sm:h-64">
            <Line data={data} options={mergedOptions} />
        </div>
    );
};
