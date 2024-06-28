import "./QuanLySanPham.scss";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useState } from "react";
const QuanLySanPham = () => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100);
  return (
    <div className="quanlysanpham">
      <div>
        <h3>Quản lý sản phẩm</h3>
      </div>
      <div className="quanlysanpham_boloc mx-auto mb-4">
        <div>
          <h4>Bộ lọc</h4>
        </div>
        <hr></hr>
        <div>
          <div className="row">
            <div className="col-4">
              <form>
                <div className="w-100 p-3 row">
                  <div className="col-4 ps-3 pe-0 mt-1">
                    <label className="form-label">Tìm kiếm:</label>
                  </div>
                  <div className="col-8 p-0">
                    <input type="text" className="form-control ps-0" />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-4 mt-3 w-25">
              <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
            <div
              style={{ paddingLeft: "150px" }}
              className="col-4 quanlysanpham_boloc_inputloc mt-4 ms-5"
            >
              <input
                type="range"
                min="0"
                max="1000"
                className="thumb thumb--zindex-3"
              />
              <input
                type="range"
                min="0"
                max="1000"
                className="thumb thumb--zindex-4"
              />
              <div className="slider">
                <div className="slider__track" />
                <div className="slider__range" />
                <label
                  style={{ position: "absolute", top: "-10px", left: "-130px" }}
                  className="form-label"
                >
                  Số lượng tồn:
                </label>
                <p style={{ position: "absolute", top: "15px" }}>0</p>
                <p
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "185px",
                  }}
                >
                  100
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="mx-auto quanlysanpham_boloc_button d-flex">
              <div className="mb-4 mt-4 ms-5">
                <Button className="me-2 ms-3" variant="primary">
                  tìm kiếm
                </Button>
              </div>
              <div className="mb-4 mt-4">
                <Button variant="danger">Làm mới bộ lọc</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="quanlysanpham_table_dssp mx-auto">
        <div>
          <h3>Danh sách sản phẩm</h3>
        </div>
        <div className="mb-3 ms-2">
          <Button variant="primary">Thêm sản phẩm</Button>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default QuanLySanPham;
