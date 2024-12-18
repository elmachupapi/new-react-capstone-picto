import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Box, CircularProgress, Typography, Select, MenuItem } from "@mui/material";
import api from "../api"; // Import your existing Axios interceptor
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale, // Required for 'category' scale
  LinearScale,   // Required for numeric scaling
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ItemsReport = () => {
  const [chartData, setChartData] = useState(null); // State for graph data
  const [loading, setLoading] = useState(false); // State for loading
  const [model, setModel] = useState("electronics"); // Default model selection

  // Fetch data from API
  const fetchItemData = async (model) => {
    const endpoints = {
      electronics: "/api/electronics-by-year-quarter/",
      itsupplies: "/api/itsupplies-by-year-quarter/",
      office: "/api/office-by-year-quarter/",
      janitorial: "/api/janitorial-by-year-quarter/",
    };

    if (!endpoints[model]) {
      throw new Error("Invalid model specified");
    }

    const response = await api.get(endpoints[model]); // Use your interceptor-enabled `api` instance
    return response.data;
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Set loading state
      try {
        const data = await fetchItemData(model); // Fetch data based on selected model

        // Prepare chart data
        const labels = data.map((item) => `Year ${item.year} Q${item.quarter}`);
        const quantities = data.map((item) => item.total_items);

        setChartData({
          labels,
          datasets: [
            {
              label: `Number of Items (${model})`,
              data: quantities,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
      setLoading(false); // Clear loading state
    };

    getData();
  }, [model]); // Re-fetch data whenever `model` changes

  // Display loading spinner
  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h5" textAlign="center" marginBottom={2}>
        Inventory by Year and Quarter
      </Typography>

      {/* Dropdown to select model */}
      <Select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        sx={{ marginBottom: 2, width: "100%", maxWidth: "200px" }}
      >
        <MenuItem value="electronics">Electronics</MenuItem>
        <MenuItem value="itsupplies">IT Supplies</MenuItem>
        <MenuItem value="office">Office</MenuItem>
        <MenuItem value="janitorial">Janitorial</MenuItem>
      </Select>

      {/* Render the bar chart if data exists */}
      {chartData && <Bar data={chartData} />}
    </Box>
  );
};

export default ItemsReport;
