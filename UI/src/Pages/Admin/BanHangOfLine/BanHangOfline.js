import { useEffect, useState } from "react";
import "./BanHangOfline.scss";
import axios from "axios";
import { toast } from "react-toastify";
import DanhSachSanPham from "./DanhSachSanPham/DanhSachSanPham";
import HoaDon from "./HoaDon/HoaDon";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
import MyModalAdd from "../QuanLyKhachHang/FormThem";
const BanHangOfline = () => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, SetEmail] = useState("");
  const [address, setAddress] = useState("");
  const [inputreadOnly, setinputreadOnly] = useState(true);
  const [soSP, setSoSP] = useState(0);
  const [TongGia, setTongGia] = useState(0);
  const [giabandau, setGiaBandau] = useState(0);
  // const [datasp, setData] = useState([]);
  const [themnhanh, setThemnhanh] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const dispath = useDispatch();

  const HandleOnclickSearchKH = async () => {
    dispath(SetLoading(true));
    setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://localhost:7095/api/KhachHang/getBySDT?sdt=${search}`
        );
        if (res.status === 200) {
          setName(res.data.khachhang.ten);
          setPhone(res.data.khachhang.sdt);
          setAddress(res.data.diaChi);
          SetEmail(res.data.khachhang.email);
          dispath(SetLoading(false));
        } else {
          toast.error("Số điện thoại or email chưa được đăng kí");
          setName("");
          setPhone("");
          setAddress("");
          SetEmail("");
          dispath(SetLoading(false));
        }
      } catch (error) {
        setName("");
        setPhone("");
        setAddress("");
        SetEmail("");
        toast.error("Số điện thoại or email chưa được đăng kí");
        dispath(SetLoading(false));
      }
    }, 3000);
  };

  const data = useSelector((item) => item.sanPhamGioHang.SanPhamGioHang);
  useEffect(() => {
    if (data.length > 0) {
      const totalSoSP = data.reduce((acc, item) => acc + item.soLuongmua, 0);
      const TongGiaSP = data.reduce((acc, item) => {
        return acc + item.soLuongmua * item.giaBan;
      }, 0);
      setSoSP(totalSoSP);
      setTongGia(TongGiaSP);
    } else {
      setSoSP(0);
    }
  }, [data]);
  //   try {
  //     const res = await axios.get(
  //       `https://localhost:7095/api/SanPham/GetChiTietSanPhamByIDChiTietSanPham?id=${inputsearch}`
  //     );
  //     const existingItem = datasp.find(
  //       (item) => item.idCTSP === res.data.idCTSP
  //     );
  //     if (existingItem) {
  //       const sanpham = datasp.map((item) => {
  //         if (item.idCTSP === res.data.idCTSP)
  //           return {
  //             ...item,
  //             soLuongmua: item.soLuongmua + res.data.soLuongmua,
  //           };
  //         return item;
  //       });
  //       setData(sanpham);
  //     } else {
  //       setData([...datasp, res.data]);
  //     }
  //   } catch (error) {
  //     toast.error("Thông tin sản phẩm không chính xác");
  //   }
  // };

  return (
    <div className="banhangofline">
      <div className="row">
        <div className="col-9 banhangof_content">
          <div className="BanHangof_khachhang">
            <form className="form_khachhang_banhangofline">
              <div className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email or SĐT"
                  value={search}
                  style={{ width: "36%" }}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={HandleOnclickSearchKH}
                  tabIndex="-1"
                >
                  Tìm kiếm
                </button>
                <div className="banhangofline_title">
                  <h3>Thông tin khách hàng</h3>
                </div>
              </div>
              <div>
                <div className="row">
                  <div className="col-5">
                    <input
                      style={{ width: "99.5%" }}
                      type="text"
                      className="form-control"
                      placeholder="Họ và tên"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      readOnly={inputreadOnly}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      style={{ width: "91.5%" }}
                      type="text"
                      className="form-control"
                      placeholder="Địa chỉ"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      readOnly={inputreadOnly}
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    readOnly={inputreadOnly}
                  />
                  <div className="ThemKhachHang">
                    <button
                      className="btn btn-primary"
                      onClick={(event) => {
                        event.preventDefault();
                        handleShow();
                      }}
                    >
                      + Thêm khách hàng
                    </button>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => SetEmail(event.target.value)}
                    readOnly={inputreadOnly}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="BanHangof_giohang">
            <div className="BanHangof_giohang_thongtin">
              <div
                style={{
                  margin: "10px 20px",
                  border: "1px solid rgb(209, 203, 203)",
                  borderRadius: "5px",
                }}
              >
                <div style={{ margin: "0px 20px" }}>
                  <h3>Giỏ hàng</h3>
                  <h6>Sản phẩm: {soSP} </h6>
                  <h6>
                    Giá:&nbsp;
                    {data.length > 0
                      ? TongGia.toLocaleString("vi-VN") + " VNĐ"
                      : giabandau.toLocaleString("vi-VN") + " VNĐ"}
                    &nbsp;&nbsp;&nbsp; Giảm: xxxx
                  </h6>

                  <h5>Tổng tiền: xxxx</h5>
                </div>
              </div>
            </div>
            <div className="BanHangof_giohang_sanphamdamua">
              <DanhSachSanPham />
            </div>
          </div>
        </div>
        <div className="col-3 banhangof_hoadon">
          <HoaDon />
        </div>
      </div>
      <MyModalAdd
        show={showModal}
        // handleSuccess={handleReload}
        handleClose={handleClose}
        themnhanh={"hahahaa"}
      />
    </div>
  );
};

export default BanHangOfline;
