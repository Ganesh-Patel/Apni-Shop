// components/SalesChart.jsx
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import {getAllOrders} from '../../../Utils/ordersApi.js'

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
const SalesDashBoard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserOrders = async () => {
    try {
      const response = await getAllOrders();
      console.log("response", response);
      setOrders(response);
    } catch (error) {
      console.error("Error fetching user orders:", error);
      alert("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (loading) return <p>Loading sales data...</p>;
  if (orders.length === 0) return <p>No orders found to generate charts.</p>;

  // **1. Pie Chart Data - Sales by Category**
  const categorySales = {};
  orders.forEach(order => {
    order.products.forEach(item => {
      const category = item.productId.category;
      categorySales[category] = (categorySales[category] || 0) + item.quantity;
    });
  });

  const categoryLabels = Object.keys(categorySales);
  const categoryData = Object.values(categorySales);

  const pieChartData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryData,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };

  // **2. Bar Chart Data - Monthly Sales in 2024**
  const monthlySales = Array(12).fill(0); // Initialize with 12 months (0 to 11)

  orders.forEach(order => {
    const month = new Date(order.orderDate).getMonth(); // Get month index (0-11)
    console.log('created mont ',month)
    monthlySales[month] += order.totalPrice;
  });

  const barChartData = {
    labels: [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Sales Amount (₹)",
        data: monthlySales,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4 mt-16 mb-4">
      <h1 className="text-2xl font-semibold mb-6">Sales Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart - Sales by Category */}
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-medium mb-4">Sales by Category (Pie Chart)</h2>
          <div className="h-64 w-full">
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Bar Chart - Monthly Sales */}
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-medium mb-4">Monthly Sales in 2024 (Bar Chart)</h2>
          <div className="h-64 w-full">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default SalesDashBoard;