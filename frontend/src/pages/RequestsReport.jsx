import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    Typography,
} from "@mui/material";
import api from "../api"; // Assuming the axios interceptor is set up in a file called api.js

const RequestsBarGraph = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [availableYears, setAvailableYears] = useState([]);

    useEffect(() => {
        fetchData();
    }, [year]);

    useEffect(() => {
        fetchAvailableYears();
    }, []);

    const fetchAvailableYears = async () => {
        try {
            const response = await api.get(`/api/reports/requests/`);
            const years = Array.from(
                new Set(response.data.map((item) => item.year))
            );
            setAvailableYears(years.sort((a, b) => b - a));
        } catch (error) {
            console.error("Error fetching available years:", error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/api/reports/requests/`, {
                params: { year },
            });
            const result = response.data.filter((item) => item.year === year);

            const months = Array.from({ length: 12 }, (_, i) => i + 1);
            const totalRequests = months.map(
                (month) =>
                    result.find((item) => item.month === month)?.total_requests || 0
            );
            const receivedRequests = months.map(
                (month) =>
                    result.find((item) => item.month === month)?.received_requests || 0
            );

            setData({
                labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ],
                datasets: [
                    {
                        label: "Total Requests",
                        data: totalRequests,
                        backgroundColor: "rgba(54, 162, 235, 0.6)",
                    },
                    {
                        label: "Received Requests",
                        data: receivedRequests,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <Box sx={{ width: "80%", margin: "auto", textAlign: "center" }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Requests Statistics ({year})
            </Typography>
            <FormControl sx={{ marginBottom: 3, minWidth: 120 }}>
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                    labelId="year-select-label"
                    value={year}
                    onChange={handleYearChange}
                >
                    {availableYears.map((yr) => (
                        <MenuItem key={yr} value={yr}>
                            {yr}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {loading ? (
                <CircularProgress />
            ) : (
                data && (
                    <Bar
                        data={data}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "top",
                                },
                                title: {
                                    display: true,
                                    text: "Requests per Month",
                                },
                            },
                        }}
                    />
                )
            )}
        </Box>
    );
};

export default RequestsBarGraph;
