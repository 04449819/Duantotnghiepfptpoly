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
import { SetLoading } from "../../../../../../Rudux/Reducer/LoadingSlice";
const ModalSearchSPChiTiet = (props) => {
  const [show, setShow] = useState(false);
  const [data, setdata] = useState([]);
  const [img, setimg] = useState("");
  const [giaBan, setGiaban] = useState();
  const [khuyenmai, setKhuyenMai] = useState("");
  const [soLuongsp, setSoluongsp] = useState();
  const [tensp, setTensp] = useState("");
  const [MauSac, setMauSac] = useState([]);
  const [kichthuoc, setKichthuoc] = useState([]);
  const [idmuaHang, setIDmua] = useState("");
  const [imgSmall, setImgSmall] = useState([]);
  const handleClose = () => {
    setShow(false);
    setMauSac([]);
    setKichthuoc([]);
  };
  const handleShow = () => {
    setShow(true);
    if (props && props.item.id) {
      getSanPhamSearch(props.item.id);
      setTensp(props.item.ten);
    }
  };

  const getSanPhamSearch = async (IDSanPham) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/getChiTietSPBanHangbyIDsp?idsp=${IDSanPham}`
      );
      console.log("đây là dssp cần tìm", res.data);
      setdata(res.data);
      setimg(res.data[0].img[0]);
      setGiaban(res.data[0].giaBan);
      let a = "";
      const khuyenMai = res.data[0]?.khuyenMai;
      if (khuyenMai) {
        switch (khuyenMai.trangThai) {
          case 0:
            a = khuyenMai.giaTri.toLocaleString("vi-VN") + " VNĐ";
            break;
          case 1:
            a = `${khuyenMai.giaTri}%`;
            break;
          case 2:
            a = `Đồng giá ${khuyenMai.toLocaleString("vi-VN") + " VNĐ"}`;
            break;
          case 3:
            a = `Đồng giá ${khuyenMai.giaTri}%`;
            break;
          default:
            a = "0";
        }
      } else {
        a = "Không có khuyến mãi";
      }
      setKhuyenMai(a);
      setIDmua(res.data[0].id);
      setSoluongsp(res.data[0].soLuong);

      const ImgTam = [];
      res.data.forEach((item) => {
        if (!ImgTam.find((p) => p.img === item.img[0])) {
          ImgTam.push({
            id: item.id,
            img: item.img[0],
          });
        }
      });
      console.log(res.data[0].img);
      // setImgSmall(ImgTam);
      setImgSmall(res.data[0].img);

      const MauSactam = [];
      res.data.forEach((item) => {
        if (!MauSactam.some((p) => p.mauSac === item.mauSac)) {
          MauSactam.push({
            id: item.id,
            mauSac: item.mauSac,
            trangthai: item.trangthai,
            img: item.duongDanAnh,
          });
        }
      });

      setMauSac(MauSactam);
    } catch (error) {
      console.error("gặp lỗi", error);
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

    const datatam = data.find((a) => a.id === item.id);
    if (datatam) {
      setimg(datatam.img[0]);
      setImgSmall(datatam.img);
    }
  };

  const HandleOnclickChonKichCo = (item) => {
    const updateKT = kichthuoc.map((a) =>
      a.id === item.id ? { ...a, trangthai: false } : { ...a, trangthai: true }
    );
    setKichthuoc(updateKT);

    const datatam = data.find((a) => a.id === item.id);
    if (datatam) {
      // setimg(datatam.img[0]);
      console.log("đây là datasp", datatam);
      setGiaban(datatam.giaBan);
      setSoluongsp(datatam.soLuong);
      let a = "";
      const khuyenMai = datatam?.khuyenMai;
      if (khuyenMai) {
        switch (khuyenMai.trangThai) {
          case 0:
            a = khuyenMai.giaTri.toLocaleString("vi-VN") + " VNĐ";
            break;
          case 1:
            a = `${khuyenMai.giaTri}%`;
            break;
          case 2:
            a = `Đồng giá ${khuyenMai.toLocaleString("vi-VN") + " VNĐ"}`;
            break;
          case 3:
            a = `Đồng giá ${khuyenMai.giaTri}%`;
            break;
          default:
            a = "0";
        }
      } else {
        a = "Không có khuyến mãi";
      }
      setKhuyenMai(a);

      console.log(a);
      setKhuyenMai(a);
      setIDmua(datatam.id);
    }
  };
  const dispatch = useDispatch();
  const handleOclickMuaHang = () => {
    console.log(MauSac);
    console.log(kichthuoc);
    const checkms = MauSac.find((p) => p.trangthai === false);
    if (checkms === undefined) return toast.error("Vui lòng chọn màu sắc");
    const checkkt = kichthuoc.find((p) => p.trangthai === false);
    if (checkkt === undefined) return toast.error("Vui lòng chọn kích thước");
    dispatch(SetLoading(true));
    setTimeout(() => {
      const checkMuaHang = kichthuoc.find((a) => a.trangthai === false);
      if (checkMuaHang && checkMuaHang.soluong > 0) {
        dispatch(FetchDataSanPhamGioHang(idmuaHang));
        dispatch(SetLoading(false));
      } else {
        toast.error("Thêm sản phẩm thất bại");
        dispatch(SetLoading(false));
      }
    }, 3000);
  };

  const HandleOnclickCHonAnh = (item) => {
    setimg(item);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Mua ngay
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {data.length > 0 ? (
            <div className="SPduocchon_body">
              <div className="row">
                <div className="SPduocchon_body_img col-6">
                  <div className="SPduocchon_body_imgbig">
                    <img src={img} alt="Product" />
                  </div>
                  <div className="SPduocchon_body_imgsmall d-flex">
                    {imgSmall.map((item, index) => (
                      <div key={index} style={{ cursor: "pointer" }}>
                        <img
                          onClick={() => HandleOnclickCHonAnh(item)}
                          src={item}
                          alt="Product"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="SPduocchon_body_contentt col-6">
                  <h4 className="SPduocchon_body_content">{tensp}</h4>
                  <h5 className="SPduocchon_body_content">
                    Chất liệu: {data[0].tenchatlieu}
                  </h5>
                  <h5 className="SPduocchon_body_content">
                    Cổ áo: {data[0].tencoao}
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
                    khuyến mãi: {khuyenmai}
                  </h6>
                  <h5 className="SPduocchon_body_content">
                    giá bán:{" "}
                    {giaBan.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
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
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSearchSPChiTiet;
