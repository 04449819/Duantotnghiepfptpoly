import "./QuanLySanPham.scss";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ModalQLSP from "./ModalQLSP";
const QuanLySanPham = () => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(10000);

  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [inputsearch, setInputSearch] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    getdata(page, 0);
    console.log(use);
  }, []);
  const getdata = async (page, trangthai) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/getAllQLSP?currentPage=${page}&productsPerPage=6`
      );
      if (res.data.sanPham.length > 0) {
        var datafake = res.data.sanPham.map((item) => {
          switch (item.trangThai) {
            case 0:
              return { ...item, trangThai: "Ngưng bán", color: "red" };
            case 1:
              return { ...item, trangThai: "Đang bán", color: "green" };
            case 2:
              return { ...item, trangThai: "Chưa quét QR", color: "yellow" };
            default:
              return { ...item, trangThai: "Ngưng bán", color: "red" };
          }
        });
        if (trangthai === 0) {
          setdata(datafake);
          setTotalPage(res.data.soTrang);
        }
        if (trangthai === 1) {
          setdata((pri) => [...pri, ...datafake]);
        }
      }
    } catch (error) {}
  };

  const HandleOncroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      if (page < totalPage && inputsearch.trim() === "") {
        getdata(page + 1, 1);
        setPage(page + 1);
      }
    }
  };

  const HandleOnchangSearch = async (event) => {
    setInputSearch(event.target.value);
    setPage(1);
    // console.log(event.target.value);
    if (event.target.value.trim() !== "") {
      try {
        const res = await axios.get(
          `https://localhost:7095/api/SanPham/getSPBanHangbyName?TenSanPham=${event.target.value}&currentPage=1&productsPerPage=6`
        );
        console.log(res.data.sanPham);
        if (res.data.sanPham !== undefined) {
          var datafake = res.data.sanPham.map((item) => {
            switch (item.trangThai) {
              case 0:
                return { ...item, trangThai: "Ngưng bán", color: "red" };
              case 1:
                return { ...item, trangThai: "Đang bán", color: "green" };
              case 2:
                return { ...item, trangThai: "QR", color: "yellow" };
              default:
                return { ...item, trangThai: "Ngưng bán", color: "red" };
            }
          });
          setdata(datafake);
        } else {
          setdata([]);
        }
      } catch (error) {}
    } else {
      getdata(1, 0);
    }
  };

  const use = useSelector((use) => use.user.User);
  if (show === false) {
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
                      <input
                        type="text"
                        className="form-control ps-0"
                        onChange={(event) => HandleOnchangSearch(event)}
                        value={inputsearch}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-4 mt-3 w-25">
                <Form.Select aria-label="Default select example">
                  <option>Trạng thái</option>
                  <option value="0">Ngưng bán </option>
                  <option value="1">Đang bán</option>
                  <option value="2">Chưa quét QR</option>
                </Form.Select>
              </div>
              <div
                style={{ paddingLeft: "150px" }}
                className="col-4 quanlysanpham_boloc_inputloc mt-4 ms-5"
              >
                <input
                  type="range"
                  min="0"
                  max="10000"
                  className="thumb thumb--zindex-3"
                  value={minVal}
                  onChange={(event) => setMinVal(event.target.value)}
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  className="thumb thumb--zindex-4"
                  value={maxVal}
                  onChange={(event) => setMaxVal(event.target.value)}
                />
                <div className="slider">
                  <div className="slider__track" />
                  <div className="slider__range" />
                  <label
                    style={{
                      position: "absolute",
                      top: "-10px",
                      left: "-130px",
                    }}
                    className="form-label"
                  >
                    Số lượng tồn:
                  </label>
                  <p style={{ position: "absolute", top: "15px" }}>
                    {minVal > maxVal ? maxVal : minVal}
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "15px",
                      left: "185px",
                    }}
                  >
                    {maxVal < minVal ? minVal : maxVal}
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
            <Button
              disabled={use.ten === "admin" ? false : true}
              variant="primary"
              onClick={() => setShow(true)}
            >
              Thêm sản phẩm
            </Button>
          </div>
          <div
            style={{ height: "400px", overflowY: "auto" }}
            onScroll={HandleOncroll}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã sản phấm</th>
                  <th>Tên sản pẩm</th>
                  <th>Loại sản phẩm</th>
                  <th>Chất liệu</th>
                  <th>Mô tả</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.ma}</td>
                      <td>{item.ten}</td>
                      <td>{item.loaiSanPham}</td>
                      <td>{item.chatLieu}</td>
                      <td>{item.moTa}</td>
                      <td style={{ color: item.color }}>{item.trangThai}</td>
                      <td>
                        <Button variant="primary">Thông tin</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <ModalQLSP setShow={setShow} />
      </div>
    );
  }
};

export default QuanLySanPham;
