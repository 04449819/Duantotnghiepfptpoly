import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
const DashBoard = () => {
  const [data, setdata] = useState([]);
  const [datapie, setdatapie] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthpie, setmonthpie] = useState(new Date().getMonth() + 1);
  const [yearpie, setYearpie] = useState(new Date().getFullYear());

  useEffect(() => {
    GetData(year);
    GetDatapie(monthpie, yearpie);
  }, []);

  const GetData = async (year) => {
    try {
      var res = await axios.get(
        `https://localhost:7095/api/HoaDon/getdarhboardHoaDon?year=${year}`
      );

      const newData = res.data.map((item) => item.tongTien);
      setdata(newData);
    } catch (error) {
      toast.error("năm không hợp lệ");
    }
  };
  const GetDatapie = async (month, yearpie) => {
    try {
      var res = await axios.get(
        `https://localhost:7095/api/HoaDon/getdarhboardHoaDonbyMonth?month=${month}&year=${yearpie}`
      );

      const newData = res.data.map((item) => item.tongTien);
      console.log(newData, monthpie, yearpie);
      setdatapie(newData);
    } catch (error) {
      toast.error("năm không hợp lệ");
    }
  };

  const HandleOnchangeYear = (event) => {
    setYear(event.target.value);
  };

  const HandleOnchangeMonth = (event) => {
    const value = event.target.value;
    setYearpie(value.substring(0, 4));
    setmonthpie(value.substring(6, 8));
    GetDatapie(value.substring(6, 8), value.substring(0, 4));
  };
  const HandleOnclickSearch = () => {
    GetData(year);
  };

  const barData = {
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
        label: "Doanh thu",
        // data: [12, 20000000, 19000000, 5, 2, 3, 15, 10, 8, 9, 6, 11],
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        // text: "Monthly Data for the Year",
      },
    },
  };

  const pieData = {
    labels: ["Khách ofline", "khách online"],
    datasets: [
      {
        label: "My First Dataset",
        // data: [60, 100],
        data: datapie,
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribution of Colors",
      },
    },
  };

  return (
    <div className="">
      <div className="row">
        <div className="col-3">
          <div className="d-flex">
            <input
              type="year"
              className="form-control"
              placeholder="year"
              value={year}
              style={{ width: "38%" }}
              onChange={(event) => HandleOnchangeYear(event)}
            />
            <button
              onClick={HandleOnclickSearch}
              type="button"
              className="btn btn-primary"
              tabIndex="-1"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="col-9" style={{ width: "600px" }}>
          <h1 style={{ textAlign: "center" }}>Doanh thu theo năm</h1>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <hr></hr>
      <div className="row">
        <div className="col-3">
          <div className="d-flex">
            <input
              type="month"
              className="form-control"
              placeholder="year"
              style={{ width: "38%" }}
              onChange={(event) => HandleOnchangeMonth(event)}
            />
          </div>
        </div>
        <div className="col-9" style={{ width: "400px" }}>
          <h1 style={{ textAlign: "center" }}>Khách hàng</h1>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
