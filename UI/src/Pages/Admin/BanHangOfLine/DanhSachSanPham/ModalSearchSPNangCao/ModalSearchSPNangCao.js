import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./style.scss";
import ModalSearchSPChiTiet from "./ModalSearchSPChiTiet/ModalSearchSPChiTiet";
import ReactPaginate from "react-paginate";
import { Form, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../../../Rudux/Reducer/LoadingSlice";
const ModalSearchSPNangCao = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [dataSP, SetDataSP] = useState([]);
  const [intpage, setintPage] = useState();
  const [page, setPage] = useState(1);
  const [LoaiSP, SetLoaiSP] = useState([]);
  const [ChatLieuSP, SetChatLieuSP] = useState([]);
  const [selectedValue, setSelectedValue] = useState(
    "00000000-0000-0000-0000-000000000000"
  );
  const [selectedValue1, setSelectedValue1] = useState(
    "00000000-0000-0000-0000-000000000000"
  );
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const dispatch = useDispatch();
  const handleClose = () => {
    GetDSSP(1);
    setShow(false);
  };

  useEffect(() => {
    GetDSSP(page);
    GetAllThongTinSP();
  }, []);

  const GetDSSP = async (page) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/getAllSPBanHang?currentPage=${page}&productsPerPage=6`
      );
      const data = res.data;
      SetDataSP(data.sanPham);
      setintPage(res.data.soTrang);
    } catch (error) {
      toast.error("lỗi đường truyền");
    }
  };

  const GetAllThongTinSP = async () => {
    try {
      //https://localhost:7095/api/SanPham/getAllThongTinSPBanHang
      const res = await axios.get(
        "https://localhost:7095/api/SanPham/getAllThongTinSPBanHang"
      );
      SetLoaiSP(res.data.loaiSPs);
      SetChatLieuSP(res.data.chatLieus);
    } catch (error) {}
  };

  const GetDSSPbyName = async (name) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/getSPBanHangbyName?TenSanPham=${name}&currentPage=1&productsPerPage=6`
      );
      const data = res.data;
      SetDataSP(data.sanPham);
      setintPage(res.data.soTrang);
    } catch (error) {}
  };

  const HandleOnchangeSearch = async (event) => {
    const page = 1;
    if (event.target.value === "") {
      setSelectedValue("00000000-0000-0000-0000-000000000000");
      setSelectedValue1("00000000-0000-0000-0000-000000000000");
      setMinValue(0);
      setMaxValue(0);
      return GetDSSP(page);
    }
    setSelectedValue("00000000-0000-0000-0000-000000000000");
    setSelectedValue1("00000000-0000-0000-0000-000000000000");
    setMinValue(0);
    setMaxValue(0);
    GetDSSPbyName(event.target.value);
  };

  const handlePageClick = (event) => {
    GetDSSP(event.selected + 1);
  };

  const HandleOnChangeLoaiSP = (event) => {
    setSelectedValue(event.target.value);
  };

  const HandleOnChangeChatLieuSP = (event) => {
    setSelectedValue1(event.target.value);
  };

  const handleMinChange = (event) => {
    const newMinValue = Number(event.target.value);
    if (newMinValue > maxValue) {
      setMaxValue(newMinValue);
    } else {
      setMinValue(newMinValue);
    }
  };

  const handleMaxChange = (event) => {
    const newMaxValue = Number(event.target.value);
    if (newMaxValue < minValue) {
      setMinValue(newMaxValue);
    } else {
      setMaxValue(newMaxValue);
    }
  };

  const handleOnClickLocSP = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/getSPBanHangbyLoaisp?idloaiSP=${selectedValue}&idchatLieu=${selectedValue1}&giaMin=${
          minValue * 10000
        }&giaMax=${maxValue * 10000}&currentPage=1&productsPerPage=6`
      );
      const data = res.data;
      SetDataSP(data.sanPham);
      setintPage(res.data.soTrang);
    } catch (error) {}
  };
  return (
    <>
      <Button
        style={{ marginLeft: "20px" }}
        variant="primary"
        onClick={handleShow}
      >
        Tìm kiếm nâng cao
      </Button>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "450px" }}>
            Danh sách sản phẩm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dsspnangcao_body">
            <div className="dsspnangcao_boloc">
              <div className="d-flex" style={{ width: "40%" }}>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Tên sản phẩm"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={(event) => HandleOnchangeSearch(event)}
                  />
                </InputGroup>
              </div>
              <hr />
              <div className="d-flex">
                <div className="dsspnangcao_boloc_nangcao">
                  <Form.Select
                    onChange={(event) => HandleOnChangeLoaiSP(event)}
                    value={selectedValue}
                  >
                    <option
                      value="00000000-0000-0000-0000-000000000000"
                      disabled
                      hidden
                    >
                      Chọn loại sản phẩm
                    </option>
                    <option value="00000000-0000-0000-0000-000000000000">
                      TẤT CẢ LOẠI SẢN PHẨM
                    </option>
                    {LoaiSP.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.ten}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div
                  className="dsspnangcao_boloc_nangcao"
                  style={{ marginLeft: "20px" }}
                >
                  <Form.Select
                    onChange={(event) => HandleOnChangeChatLieuSP(event)}
                    value={selectedValue1}
                  >
                    <option
                      value="00000000-0000-0000-0000-000000000000"
                      disabled
                      hidden
                    >
                      chất liệu sản phẩm
                    </option>
                    <option value="00000000-0000-0000-0000-000000000000">
                      TẤT CẢ CHẤT LIỆU
                    </option>
                    {ChatLieuSP.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.ten}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div className="Input_giaTIen">
                  <div className="slider-container">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={minValue}
                      className="slider"
                      onChange={handleMinChange}
                    />
                    <div className="slider-track"> </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={maxValue}
                      className="slider"
                      onChange={handleMaxChange}
                    />

                    <div
                      className="value-display min"
                      style={{
                        left: "80px",
                      }}
                    >
                      <p style={{ fontSize: "15px" }}>{minValue * 10000}</p>
                    </div>
                    <div
                      className="value-display max"
                      style={{
                        left: "250px",
                      }}
                    >
                      <p style={{ fontSize: "15px" }}>{maxValue * 10000}</p>
                    </div>
                  </div>
                </div>
                <Button
                  style={{ marginLeft: "10px" }}
                  variant="primary"
                  onClick={handleOnClickLocSP}
                >
                  Lọc sản phẩm
                </Button>
              </div>
            </div>
            <hr />
            <div className="dsspnangcao_dssp">
              <div className="row">
                {dataSP ? (
                  dataSP.map((item) => (
                    <div className="col-3 dsspnangcao_sp" key={item.id}>
                      <div className="dsspnangcao_spct">
                        <img src={item.anhs[0] ? item.anhs[0].duongDan : ""} />
                        <h5>Giá bán: {item.giaBan}</h5>
                        <h6>{item.ten}</h6>
                        <ModalSearchSPChiTiet item={item} />
                      </div>
                    </div>
                  ))
                ) : (
                  <h1>không tìm thấy sản phẩm</h1>
                )}
              </div>
            </div>
            <div className="dsspnangcao_phantrang">
              <div className="dsspnangcao_phantrangchititet">
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={intpage}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSearchSPNangCao;
