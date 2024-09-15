import "./ThongKe.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  CardBody,
} from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import { toast } from "react-toastify";

const ThongKe = () => {
  const [datangay, setDatangay] = useState();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  ); // Lấy ngày hôm nay
  const [data, setdata] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [datapie, setdatapie] = useState([0, 0, 0]);
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
      let datatam = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      console.log("dang can2", datatam);
      const newData = res.data.map((item) => {
        return (datatam[item.tenThang - 1] = item.tongTien);
      });
      setdata(datatam);
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
      //console.log(newData, monthpie, yearpie);
      console.log(newData);
      if (newData[0] === 0 && newData[1] === 0) return setdatapie([0, 0, 100]);
      setdatapie([...newData, 0]);
    } catch (error) {
      toast.error("Thang nam không hợp lệ");
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
    if (year === "") {
      setYear(new Date().getFullYear());
      GetData(new Date().getFullYear());
    } else {
      GetData(year);
    }
  };
  const barData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
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
        text: "Doanh thu theo tháng",
        align: "start",
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 10,
        },
      },
    },
    layout: {
      padding: {
        left: 50,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1000000, // Điều chỉnh bước nhảy của các giá trị trục y
        },
      },
    },
  };
  const pieData = {
    labels: ["Khách offline", "Khách online", "No data"],
    datasets: [
      {
        label: "Tổng doanh thu",
        // data: [60, 100],
        data: datapie,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "gray",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Chuyển chú thích lên trên
      },
      title: {
        display: true,
        // text: "Distribution of Colors",
        align: "start", // Căn tiêu đề về bên trái
        font: {
          size: 16, // Kích thước font cho tiêu đề
          family: "'Roboto', sans-serif", // Font family cho tiêu đề
          weight: "normal", // Độ đậm của font
        },
        padding: {
          top: 10, // Khoảng cách phía trên tiêu đề
          bottom: 10, // Khoảng cách phía dưới tiêu đề
        },
      },
    },
    layout: {
      padding: {
        left: 50, // Tăng khoảng cách bên trái (nếu cần)
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    fontSize: 14, // Giảm kích thước chữ trong biểu đồ tròn
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7095/api/ThongKe/DoanhThuTheoNgay?date=${selectedDate}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const textData = await response.text();
        setDatangay(textData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // State cho dữ liệu doanh thu theo tháng
  const [revenueData, setRevenueData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0")
  ); // Tháng hiện tại
  const [selectedYear, setSelectedYear] = useState(
    String(new Date().getFullYear())
  );
  const [thang, setThanf] = useState("2024-06");
  useEffect(() => {
    const fetchDataThang = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/ThongKe/DoanhThuTheoThang?month=${selectedMonth}&year=${selectedYear}`
        );
        setRevenueData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchDataThang();
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (event) => {
    let month = event.target.value.slice(5, 7);
    setSelectedMonth(month);
    let year = event.target.value.slice(0, 4); // Ensure you're correctly slicing for year
    setSelectedYear(year);
    setThanf(event.target.value);
  };

  // State cho dữ liệu doanh thu theo năm
  const [revenueData1, setRevenueData1] = useState(null);
  const defaultYear = 2024; // Năm mặc định là 2024
  const [inputYear, setInputYear] = useState(defaultYear.toString());

  const handleYearChange = (event) => {
    setInputYear(event.target.value);
  };

  useEffect(() => {
    const fetchRevenueData1 = async (year) => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/ThongKe/DoanhThuTheoNam?year=${year}`
        );
        setRevenueData1(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRevenueData1(inputYear);
  }, [inputYear]);

  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7095/api/ThongKeSanPham/top10sanphamtrongna222m?year=2024`
        );
        setTopProducts(response.data);
        console.log("top 10 san pham day ne", response.data);
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };

    fetchTopProducts();
  }, [selectedMonth, selectedYear]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="7">
                    <div>
                      <h2>Doanh thu ngày </h2>
                      <label>Select Date:</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                      <br />
                      {datangay !== null ? (
                        <p>Doanh thu ngày {datangay} VNĐ</p>
                      ) : (
                        datangay && <p>Loading...</p>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <div>
                    <h2>Doanh thu theo tháng</h2>
                    <label>Chọn tháng:</label>
                    <input
                      type="month"
                      value={thang}
                      onChange={handleMonthChange}
                    />
                    <div>
                      {revenueData !== null ? (
                        <p>Doanh thu: {revenueData} VNĐ</p>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <div>
                    <h2>Doanh thu theo năm</h2>
                    <form>
                      <label htmlFor="year-input">Nhập năm:</label>
                      <input
                        type="number"
                        id="year-input"
                        value={inputYear}
                        onChange={handleYearChange}
                        placeholder="Nhập năm"
                        required
                      />
                    </form>
                    {revenueData1 !== null ? (
                      <p>
                        Doanh thu năm {inputYear}: {revenueData1} VNĐ
                      </p>
                    ) : (
                      inputYear && <p>Loading...</p>
                    )}
                  </div>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl="8" className="mb-5 mb-xl-0">
            <Card className="shadow">
              <Card.Header className="border-0"></Card.Header>
              <Card.Body>
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
                    <div className="col-12" style={{ height: "400px" }}>
                      <h1 style={{ textAlign: "center" }}>
                        Doanh thu các tháng theo năm
                      </h1>
                      <Bar data={barData} options={barOptions} />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl="4" className="mb-4 mb-xl-0">
            <Card className="shadow">
              <Card.Header className="border-0"></Card.Header>
              <Card.Body>
                <div className="">
                  <div className="row">
                    <div className="col-3">
                      <div className="d-flex custom-input">
                        <input
                          type="month"
                          className="form-control"
                          placeholder="year"
                          style={{ width: "100%" }} // Thay đổi chiều rộng để chiếm hết phần tử cha
                          onChange={(event) => HandleOnchangeMonth(event)}
                        />
                      </div>
                    </div>
                    <div
                      className="col-9"
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                        Doanh thu tháng theo loại Khách hàng
                      </h1>
                      <Pie data={pieData} options={pieOptions} />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row></Row>
        <Row>
          <Card className="shadow">
            <Card.Header className="border-0">
              <Row className="align-items-center">
                <Col>
                  <h4 className="mb-0">Top sản phẩm bán chạy</h4>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <table className="table-custom table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">số lượn đã bán</th>
                      <th scope="col">Doanh thu sản phẩm</th>
                      <th scope="col">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts &&
                      topProducts.map((product, index) => (
                        <tr key={index}>
                          <td>{product.tenSP}</td>
                          <td>{product.soLuong}</td>
                          <td>{product.doanhThu} VND</td>
                          <td>{product.gia}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default ThongKe;
