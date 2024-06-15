import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./style.scss";
import { GiCheckMark } from "react-icons/gi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { GetIDCTSP } from "../../../../../../Rudux/Reducer/IDchitietsanphamSlice";
import { FetchDataSanPhamGioHang } from "../../../../../../Rudux/Reducer/GetSanPhamGioHangSlice";
const ModalSearchSPChiTiet = (props) => {
  const [show, setShow] = useState(false);
  const [data, setdata] = useState([]);
  const [img, setimg] = useState("");
  const [giaBan, setGiaban] = useState();
  const [khuyenmai, setKhuyenMai] = useState();
  const [soLuongsp, setSoluongsp] = useState();
  const [tensp, setTensp] = useState("");
  const [MauSac, setMauSac] = useState([]);
  const [kichthuoc, setKichthuoc] = useState([]);
  const [idmuaHang, setIDmua] = useState("");
  const handleClose = () => {
    setShow(false);
    setMauSac([]);
    setKichthuoc([]);
  };
  const handleShow = () => {
    setShow(true);
    getSanPhamSearch(props.item.id);
    setTensp(props.item.ten);
  };

  const getSanPhamSearch = async (IDSanPham) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/getChiTietSPBanHangbyIDsp?idsp=${IDSanPham}`
      );
      setdata(res.data);
      setimg(res.data[0].img[0]);
      setGiaban(res.data[0].giaBan);
      setKhuyenMai(res.data[0].khuyenMai);
      setIDmua(res.data[0].id);
      setSoluongsp(res.data[0].soLuong);

      const MauSactam = [];
      res.data.forEach((item) => {
        if (!MauSactam.some((p) => p.mauSac === item.mauSac)) {
          MauSactam.push({
            id: item.id,
            mauSac: item.mauSac,
            trangthai: item.trangthai,
          });
        }
      });

      setMauSac(MauSactam);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const HandleOnclickChonMauSac = (item) => {
    const updatedMauSac = MauSac.map((p) =>
      p.id === item.id ? { ...p, trangthai: false } : { ...p, trangthai: true }
    );
    setMauSac(updatedMauSac);
    const kichThuocTam = [];
    data.map((a) =>
      a.mauSac === item.mauSac
        ? kichThuocTam.push({
            id: a.id,
            kichco: a.kichco,
            trangthai: true,
            soluong: a.soLuong,
          })
        : kichThuocTam
    );
    setKichthuoc(kichThuocTam);
  };

  const HandleOnclickChonKichCo = (item) => {
    const updateKT = kichthuoc.map((a) =>
      a.id === item.id ? { ...a, trangthai: false } : { ...a, trangthai: true }
    );
    setKichthuoc(updateKT);

    const datatam = data.find((a) => a.id === item.id);
    if (datatam) {
      setimg(datatam.img[0]);
      setGiaban(datatam.giaBan);
      setKhuyenMai(datatam.khuyenMai);
      setIDmua(datatam.id);
    }
  };
  const dispatch = useDispatch();
  const handleOclickMuaHang = () => {
    const checkMuaHang = kichthuoc.find((a) => a.trangthai === false);
    if (checkMuaHang && checkMuaHang.soluong > 0) {
      dispatch(FetchDataSanPhamGioHang(idmuaHang));
      toast.success("Sản phẩm đã được thêm vào giỏ hàng");
    } else {
      toast.error("bạn chưa chọn màu sắc và kích thước");
    }
  };
  return (
    
    <>
      <Button variant="primary" onClick={ handleShow }>
        Mua ngay
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          {/* <Modal.Title>{props.item.ten}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          {data.length > 0 ? (
            <div className="SPduocchon_body">
              <div className="row">
                <div className="SPduocchon_body_img col-6">
                  <div className="SPduocchon_body_imgbig">
                    <img src={img} alt="Product" />
                  </div>
                  <div className="SPduocchon_body_imgsmall">
                    {data.map((item) => (
                      <img key={item.id} src={item.img[0]} alt="Product" />
                    ))}
                  </div>
                </div>

                <div className="SPduocchon_body_contentt col-6">
                  <h4 className="SPduocchon_body_content">{tensp}</h4>
                  <h5 className="SPduocchon_body_content">
                    Chất liệu: {data[0].tenchatlieu}
                  </h5>
                  <div className="d-flex SPduocchon_body_content">
                    <h5>Màu sắc:</h5>
                    {MauSac.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          margin: "5px",
                          width: "15px",
                          height: "15px",
                          border: "1px solid black",
                          backgroundColor: item.mauSac,
                          position: "relative",
                          cursor: "pointer",
                        }}
                        onClick={() => HandleOnclickChonMauSac(item)}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "-3px",
                            left: "5px",
                          }}
                          hidden={item.trangthai}
                        >
                          <GiCheckMark />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex SPduocchon_body_content">
                    <h5>Kích thước:</h5>
                    {kichthuoc.map((a, index) => (
                      <div
                        key={index}
                        style={{
                          margin: "5px",
                          width: "25px",
                          height: "15px",
                          border: "1px solid black",
                          position: "relative",
                          cursor: "pointer",
                        }}
                        onClick={() => HandleOnclickChonKichCo(a)}
                      >
                        <p style={{ fontSize: "10px" }}>{a.kichco}</p>
                        <div
                          style={{
                            position: "absolute",
                            top: "-3px",
                            left: "12px",
                          }}
                          hidden={a.trangthai}
                        >
                          <GiCheckMark />
                        </div>
                      </div>
                    ))}
                  </div>
                  <h6 className="SPduocchon_body_content">
                    Số lượng: {soLuongsp} SP
                  </h6>
                  <h6 className="SPduocchon_body_content">
                    khuyến mãi: {khuyenmai.toLocaleString("vi-VN") + " VNĐ"}
                  </h6>
                  <h5 className="SPduocchon_body_content">
                    giá bán: {giaBan.toLocaleString("vi-VN") + " VNĐ"}
                  </h5>
                  <Button
                    style={{ marginTop: "50px" }}
                    variant="primary"
                    onClick={handleOclickMuaHang}
                  >
                    Mua ngay
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSearchSPChiTiet;
