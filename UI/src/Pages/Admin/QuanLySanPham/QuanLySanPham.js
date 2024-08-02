import "./QuanLySanPham.scss";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ModalQLSP from "./ModalQLSP";
import UpdateSanPham from "./UpdateSanPham";
import ModalSuaSanPham from "./ModalSuaSanPham";
const QuanLySanPham = () => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(10000);
  const [idchatlieu, setidchatlieu] = useState(
    "00000000-0000-0000-0000-000000000000"
  );
  const [idcoao, setidcoao] = useState("00000000-0000-0000-0000-000000000000");
  const [idloaisp, setidlsp] = useState("00000000-0000-0000-0000-000000000000");
  const [trangThai, settrangthai] = useState("");
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [inputsearch, setInputSearch] = useState("");
  const [show, setShow] = useState(0);
  const [dataupdate, setdataupdate] = useState({});
  const [dataCL, setdataCL] = useState([]);
  const [dataLSP, setdataLSP] = useState([]);
  const [dataCoAo, setdataCoAo] = useState([]);

  const [load, setload] = useState(false);
  useEffect(() => {
    getdata(page, 0);
    GetALLCoAo();
    getdatalsp();
    getdatacl();
  }, [load]);
  const getdatacl = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/ChatLieu/GetAllChatLieu"
      );
      if (res.data.length > 0) {
        setdataCL(res.data.filter((p) => p.trangThai !== 0));
        // setdataCL(res.data);
      }
    } catch (error) {}
  };
  const getdatalsp = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/LoaiSP/getAllLSP"
      );
      if (res.data.length > 0) {
        setdataLSP(res.data.filter((p) => p.trangThai !== 0));
        // setdataLSP(res.data);
      }
    } catch (error) {}
  };
  const GetALLCoAo = async () => {
    try {
      var res = await axios.get(
        "https://localhost:7095/api/CoAo/getAllCoAoThem"
      );
      if (res.data.length > 0) {
        setdataCoAo(res.data);
        // setdataLSP(res.data);
      }
    } catch (error) {}
  };

  const getdata = async (page, trangthai) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/getAllQLSP?currentPage=${page}&productsPerPage=10000000`
      );
      if (res.data.sanPham.length > 0) {
        var datafake = res.data.sanPham.map((item) => {
          switch (item.trangThai) {
            case 0:
              return { ...item, trangThai: "Ngưng bán", color: "red" };
            case 1:
              return { ...item, trangThai: "Đang bán", color: "green" };
            case 2:
              return {
                ...item,
                trangThai: "Chưa quét QR",
                color: "rgb(234, 184, 120)",
              };
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
          `https://localhost:7095/api/SanPham/getSPBanHangbyName?TenSanPham=${event.target.value}&currentPage=1&productsPerPage=6000000`
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
                return {
                  ...item,
                  trangThai: "Chưa quét QR",
                  color: "rgb(234, 184, 120)",
                };
              case 3:
                return { ...item, trangThai: "!", color: "antiquewhite" };
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

  const HandleOnclickUpdateSp = (item) => {
    console.log(item);
    setdataupdate(item);
    setShow(2);
  };

  const HandleOnclickDeleteSP = async (item) => {
    try {
      var res = await axios.delete(
        `https://localhost:7095/api/SanPham/deleteSanPham?id=${item.id}`
      );

      toast.success(res.data);
      setload(!load);
    } catch (error) {
      toast.error(`Gặp lỗi: ${error.response.data}`);
    }
  };

  const HandleOnclickTimKiem = async () => {
    try {
      var res = await axios.get(
        `https://localhost:7095/api/SanPham/getSPBanHangbyLocQLSP?idloaiSP=${idloaisp}&idchatLieu=${idchatlieu}&idcoAo=${idcoao}&giaMin=${minVal}&giaMax=${maxVal}&trangthai=${trangThai}&currentPage=1&productsPerPage=20000000`
      );
      console.log(res.data);
      if (res.data.sanPham !== undefined) {
        var datafake = res.data.sanPham.map((item) => {
          switch (item.trangThai) {
            case 0:
              return { ...item, trangThai: "Ngưng bán", color: "red" };
            case 1:
              return { ...item, trangThai: "Đang bán", color: "green" };
            case 2:
              return {
                ...item,
                trangThai: "Chưa quét QR",
                color: "rgb(234, 184, 120)",
              };
            case 3:
              return { ...item, trangThai: "!", color: "antiquewhite" };
            default:
              return { ...item, trangThai: "Ngưng bán", color: "red" };
          }
        });
        setdata(datafake);
      } else {
        setdata([]);
      }
    } catch (error) {
      toast.error(`Gặp lỗi: ${error.response.data}`);
    }
  };

  const HandleOnclickLamMoiBoLoc = () => {
    setMinVal(0);
    setMaxVal(10000);
    setidchatlieu("00000000-0000-0000-0000-000000000000");
    setidcoao("00000000-0000-0000-0000-000000000000");
    setidlsp("00000000-0000-0000-0000-000000000000");
    settrangthai("");
    getdata(1, 0);
  };
  const use = useSelector((use) => use.user.User);
  if (show === 0) {
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
          <div className="w-100 p-3 row">
            <div className="col-1 ps-3 pe-0 mt-1">
              <label className="form-label">Tìm kiếm:</label>
            </div>
            <div className="col-4 p-0">
              <input
                type="text"
                className="form-control ps-3"
                onChange={(event) => HandleOnchangSearch(event)}
                value={inputsearch}
              />
            </div>
          </div>
          <div>
            <div>
              <div className="w-75 mx-auto row my-3">
                <div className="col-4">
                  <Form.Select
                    aria-label="Default select example"
                    required
                    value={idloaisp}
                    onChange={(event) => setidlsp(event.target.value)}
                  >
                    <option value="00000000-0000-0000-0000-000000000000">
                      Loại sản phẩm
                    </option>
                    {dataLSP.length > 0 &&
                      dataLSP.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.ten}
                        </option>
                      ))}
                  </Form.Select>
                </div>
                <div className="col-4">
                  <Form.Select
                    aria-label="Default select example"
                    required
                    value={idchatlieu}
                    onChange={(event) => setidchatlieu(event.target.value)}
                  >
                    <option value="00000000-0000-0000-0000-000000000000">
                      Chất liệu
                    </option>
                    {dataCL.length > 0 &&
                      dataCL.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.ten}
                        </option>
                      ))}
                  </Form.Select>
                </div>
                <div className="col-4">
                  <Form.Select
                    aria-label="Default select example"
                    required
                    value={idcoao}
                    onChange={(event) => setidcoao(event.target.value)}
                  >
                    <option value="00000000-0000-0000-0000-000000000000">
                      Cổ áo
                    </option>
                    {dataCoAo.length > 0 &&
                      dataCoAo.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.ten}
                        </option>
                      ))}
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <form></form>
              </div>
              <div className="col-4 mt-3 w-25">
                <Form.Select
                  value={trangThai}
                  onChange={(event) => settrangthai(event.target.value)}
                  aria-label="Default select example"
                >
                  <option value="">Trạng thái</option>
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
                  max="9999"
                  className="thumb thumb--zindex-3"
                  value={minVal}
                  onChange={(event) => setMinVal(event.target.value)}
                />
                <input
                  type="range"
                  min="0"
                  max="9999"
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
                  <Button
                    onClick={HandleOnclickTimKiem}
                    className="me-2 ms-3"
                    variant="primary"
                  >
                    tìm kiếm
                  </Button>
                </div>
                <div className="mb-4 mt-4">
                  <Button onClick={HandleOnclickLamMoiBoLoc} variant="danger">
                    Làm mới bộ lọc
                  </Button>
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
              disabled={use.chucNang === "Admin" ? false : true}
              variant="primary"
              onClick={() => setShow(1)}
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
                  <th>Mã</th>
                  <th>Tên sản pẩm</th>
                  <th style={{ width: "50px" }}>Loại sp</th>
                  <th style={{ width: "70px" }}>Chất liệu</th>
                  <th style={{ width: "70px" }}>Mô tả</th>
                  <th>Trạng thái</th>
                  <th style={{ width: "340px" }}>Hành động</th>
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
                        <Button
                          // disabled={use.ten === "admin" ? false : true}
                          variant="info"
                          onClick={() => HandleOnclickUpdateSp(item)}
                        >
                          Thông tin
                        </Button>
                        <ModalSuaSanPham
                          load={load}
                          setload={setload}
                          item={item}
                        />
                        <Button
                          onClick={() => HandleOnclickDeleteSP(item)}
                          variant="danger"
                          className="ms-2"
                        >
                          Xóa
                        </Button>
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
  } else if (show === 1) {
    return (
      <div>
        <ModalQLSP setload={setload} load={load} setShow={setShow} />
      </div>
    );
  } else {
    return (
      <div>
        <UpdateSanPham
          dataupdate={dataupdate}
          setShow={setShow}
          setload={setload}
          load={load}
        />
      </div>
    );
  }
};

export default QuanLySanPham;
