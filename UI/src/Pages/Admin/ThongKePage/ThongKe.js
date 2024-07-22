import "./ThongKe.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const ThongKe = () => {
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  ); // Lấy ngày hôm nay

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
        setData(textData);
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
    String(new Date().getMonth() + 1).padStart(2, '0')
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
    let month = (event.target.value).slice(5, 7);
    setSelectedMonth(month);
    let year = (event.target.value).slice(0, 4); // Ensure you're correctly slicing for year
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
          `https://localhost:7095/api/ThongKeSanPham/top10sanphamtrongthang?month=${selectedMonth}&year=${selectedYear}`
        );
        setTopProducts(response.data);
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
          <Col lg="3" sm="6">
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
                      {data !== null ? (
                        <p>
                          Doanh thu ngày {data} VNĐ
                        </p>
                      ) : (
                        data && <p>Loading...</p>
                      )}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" sm="6">
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
          <Col lg="3" sm="6">
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
              <Card.Header className="border-0">
                <Row className="align-items-center">
                  <Col>
                    <h3 className="mb-0">Top 10 Sản phẩm trong tháng {selectedMonth}/{selectedYear}</h3>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Doanh thu</th>
                        <th scope="col">Số lượng bán</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((product, index) => (
                        <tr key={index}>
                          <td>{product.ten}</td>
                          <td>{product.revenue} VNĐ</td>
                          <td>{product.quantitySold}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ThongKe;
