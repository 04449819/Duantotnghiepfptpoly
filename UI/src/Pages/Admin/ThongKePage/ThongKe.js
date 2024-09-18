import "./ThongKe.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import { toast } from "react-toastify";

const ThongKe = () => {
  const [datangay, setDatangay] = useState();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [data, setdata] = useState(Array(12).fill(0));
  const [datapie, setdatapie] = useState([0, 0, 0]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthpie, setmonthpie] = useState(new Date().getMonth() + 1);
  const [yearpie, setYearpie] = useState(new Date().getFullYear());
  const [topProducts, setTopProducts] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(String(new Date().getMonth() + 1).padStart(2, "0"));
  const [selectedYear, setSelectedYear] = useState(String(new Date().getFullYear()));

  useEffect(() => {
    GetData(year);
    GetDatapie(monthpie, yearpie);
  }, [year, monthpie, yearpie]);

  const GetData = async (year) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/HoaDon/getdarhboardHoaDon?year=${year}`
      );
      const datatam = Array(12).fill(0);
      res.data.forEach((item) => {
        datatam[item.tenThang - 1] = item.tongTien;
      });
      setdata(datatam);
    } catch (error) {
      toast.error("Năm không hợp lệ");
    }
  };

  const GetDatapie = async (month, yearpie) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/HoaDon/getdarhboardHoaDonbyMonth?month=${month}&year=${yearpie}`
      );
      const newData = res.data.map((item) => item.tongTien);
      setdatapie([...newData, 0]);
    } catch (error) {
      toast.error("Tháng năm không hợp lệ");
    }
  };

  const fetchTopProducts = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7095/api/ThongKeSanPham/top10sanphamtrongna222m?year=${selectedYear}&month=${selectedMonth}`
      );
      setTopProducts(response.data);
    } catch (error) {
      console.error("Error fetching top products:", error);
    }
  };

  useEffect(() => {
    fetchTopProducts();
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (event) => {
    const value = event.target.value;
    setSelectedMonth(value.slice(5, 7));
    setSelectedYear(value.slice(0, 4));
  };

  return (
    <Container fluid>
      <Row>
        <Col lg="4" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <h2>Doanh thu ngày</h2>
              <label>Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              {datangay !== null ? (
                <p>Doanh thu ngày: {datangay} VNĐ</p>
              ) : (
                <p>Loading...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg="4" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <h2>Doanh thu theo tháng</h2>
              <input
                type="month"
                value={`${selectedYear}-${selectedMonth}`}
                onChange={handleMonthChange}
              />
              <p>Doanh thu: {datapie.reduce((a, b) => a + b, 0)} VNĐ</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg="4" sm="6">
          <Card className="card-stats">
            <Card.Body>
              <h2>Doanh thu theo năm</h2>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="Nhập năm"
              />
              <p>Doanh thu năm {year}: {data.reduce((a, b) => a + b, 0)} VNĐ</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl="8" className="mb-5 mb-xl-0">
          <Card className="shadow">
            <Card.Body>
              <h1 style={{ textAlign: "center" }}>Doanh thu các tháng theo năm</h1>
              <Bar data={{ labels: [...Array(12).keys()].map(i => `Tháng ${i + 1}`), datasets: [{ label: "Doanh thu", data, backgroundColor: "rgba(75, 192, 192, 0.6)" }] }} />
            </Card.Body>
          </Card>
        </Col>
        <Col xl="4" className="mb-4 mb-xl-0">
          <Card className="shadow">
            <Card.Body>
              <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Doanh thu tháng theo loại Khách hàng</h1>
              <Pie data={{ labels: ["Khách offline", "Khách online", "No data"], datasets: [{ data: datapie, backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "gray"] }] }} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Card className="shadow">
          <Card.Header className="border-0">
            <Row className="align-items-center">
              <Col>
                <h4 className="mb-0">Top sản phẩm bán chạy</h4>
              </Col>
              <Col>
                <input
                  type="month"
                  value={`${selectedYear}-${selectedMonth}`}
                  onChange={handleMonthChange}
                  style={{ marginLeft: '20px' }}
                />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <table className="table-custom table align-items-center table-flush">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Số lượng đã bán</th>
                    <th scope="col">Doanh thu sản phẩm</th>
                    <th scope="col">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.length > 0 ? (
                    topProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.tenSP}</td>
                        <td>{product.soLuong}</td>
                        <td>{product.doanhThu} VND</td>
                        <td>{product.gia}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">Không có dữ liệu</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default ThongKe;
