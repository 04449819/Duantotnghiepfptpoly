import { useEffect, useState } from "react";
import "./BanHangOfline.scss";
import axios from "axios";
import { toast } from "react-toastify";
import DanhSachSanPham from "./DanhSachSanPham/DanhSachSanPham";
import HoaDon from "./HoaDon/HoaDon";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
import MyModalAdd from "../QuanLyKhachHang/FormThem";
import {
  AddHoaDon,
  ChonHoaDon,
  DeleteHoaDons,
  SetDiaChiKhachHang,
  SetGiamKhuyeMai,
  SetTongTien,
  SetVoucher,
} from "../../../Rudux/Reducer/GetSanPhamGioHangSlice";
// import Select from "react-select";
import { Form } from "react-bootstrap";
const BanHangOfline2 = () => {
  const [search, setSearch] = useState("");
  //   const [name, setName] = useState("");
  //   const [phone, setPhone] = useState("");
  //   const [email, SetEmail] = useState("");
  //   const [address, setAddress] = useState("");
  const [inputreadOnly, setinputreadOnly] = useState(true);
  const [soSP, setSoSP] = useState(0);
  const [TongGia, setTongGia] = useState(0);
  const [giabandau, setGiaBandau] = useState(0);
  // const [datasp, setData] = useState([]);
  const [themnhanh, setThemnhanh] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [giamkhuyemai, setGiamkhuyemai] = useState(0);
  const [availableVouchers, setAvailableVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [tongTien, setTongTien] = useState(0);
  const dispath = useDispatch();
  const [voucherchuan, setvoucherchuan] = useState("");

  const HandleOnclickSearchKH = async () => {
    dispath(SetLoading(true));
    setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://localhost:7095/api/KhachHang/getBySDT?sdt=${search}`
        );
        if (res.status === 200) {
          dispath(SetDiaChiKhachHang(res.data));
          //   setName(res.data.khachhang.ten);
          //   setPhone(res.data.khachhang.sdt);
          //   setAddress(res.data.diaChi);
          //   SetEmail(res.data.khachhang.email);
          dispath(SetLoading(false));
        } else {
          toast.error("Số điện thoại hoặc email chưa được đăng kí");
          //   setName("");
          //   setPhone("");
          //   setAddress("");
          //   SetEmail("");
          dispath(SetLoading(false));
        }
      } catch (error) {
        // setName("");
        // setPhone("");
        // setAddress("");
        // SetEmail("");
        toast.error("Số điện thoại hoặc email chưa được đăng kí");
        dispath(SetLoading(false));
      }
    }, 3000);
  };

  const data = useSelector((item) => item.sanPhamGioHang.SanPhamGioHang);
  const dshd = useSelector((item) => item.sanPhamGioHang.HoaDons);
  useEffect(() => {
    dispath(SetGiamKhuyeMai(giamkhuyemai));
  }, [giamkhuyemai]);
  useEffect(() => {
    dispath(SetTongTien(tongTien));
  }, [tongTien]);
  // useEffect(() => {
  //   // alert("da thay doi voucher", voucherchuan);
  // }, [voucherchuan]);
  useEffect(() => {
    console.log("danh sách hóa đơn:", dshd);
    if (dshd.find((a) => a.check === true)?.SanPhamGioHang?.length > 0) {
      const totalSoSP = dshd
        .find((a) => a.check === true)
        ?.SanPhamGioHang?.reduce((acc, item) => acc + item.soLuongmua, 0);
      const TongGiaSP = dshd
        .find((a) => a.check === true)
        ?.SanPhamGioHang?.reduce((acc, item) => {
          return acc + item.soLuongmua * item.giaBan;
        }, 0);
      setSoSP(totalSoSP);
      setTongGia(TongGiaSP);

      const tonggiakm = dshd
        .find((a) => a.check === true)
        ?.SanPhamGioHang?.reduce((acc, item) => {
          if (item.trangthaikm === 0) {
            return acc + item.giaTriKhuyenMai * item.soLuongmua;
          } else if (item.trangthaikm === 1) {
            return (
              acc +
              ((item.giaBan * item.giaTriKhuyenMai) / 100) * item.soLuongmua
            );
          } else if (item.trangthaikm === 2) {
            return acc + (item.giaBan - item.giaTriKhuyenMai) * item.soLuongmua;
          } else if (item.trangthaikm === 3) {
            return (
              acc +
              (item.giaBan - (item.giaBan * item.giaTriKhuyenMai) / 100) *
                item.soLuongmua
            );
          }
          return acc;
        }, 0);

      // tonggiakm = tonggiakm;
      fetchAvailableVouchers(TongGiaSP, tonggiakm);
      setGiamkhuyemai(tonggiakm);
      // dispath(SetGiamKhuyeMai(tonggiakm));
      setTongTien(TongGiaSP - tonggiakm);
      // console.log("Tổng giá khuyến mãi:", tonggiakm);

      const voucherstam = availableVouchers.map((voucher) => {
        if (TongGiaSP - tonggiakm >= voucher.soTienCan) {
          return { ...voucher, check: false };
        }
        return { ...voucher, check: true };
      });
      const checkvouchertrue = voucherstam.find((p) => p.check === false);
      setAvailableVouchers(voucherstam);
      if (!checkvouchertrue) return setvoucherchuan("");
    } else {
      setSoSP(0);
      setGiamkhuyemai(0);
      setTongTien(0);
    }
    setSearch("");
  }, [dshd]);

  // useEffect(() => {});

  const HandleOnclickTaoHoaDon = () => {
    dispath(AddHoaDon());
  };
  const HandleOnclickChonHoaDon = (hoadon) => {
    dispath(ChonHoaDon(hoadon.ma));
  };
  const HandleOnclickDeleteHoaDon = (hoadon) => {
    // alert(`Are you sure you want to delete ${hoadon.ma}`);
    dispath(DeleteHoaDons(hoadon));
  };

  const fetchAvailableVouchers = async (TongGia1, giamkhuyemai1) => {
    try {
      const response = await axios.get(
        `https://localhost:7095/api/Voucher/GetAllAvaiableVoucher`
      );
      const voucherstam = response.data.vouchers.map((voucher) => {
        if (TongGia1 - giamkhuyemai1 >= voucher.soTienCan) {
          return { ...voucher, check: false };
        }
        return { ...voucher, check: true };
      });
      setAvailableVouchers(voucherstam);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      toast.error("Không thể tải danh sách voucher");
    }
  };
  const handleVoucherChange = (selectedOption) => {
    setSelectedVoucher(selectedOption);
    // calculateTotalPrice();
  };
  const HandleOngchangeStVoucher = (e) => {
    setvoucherchuan(e.target.value);
    console.log(e.target.value);
    dispath(SetVoucher(e.target.value));
  };
  return (
    <div className="banhangofline">
      <div className="row">
        <div className=" banhangof_content">
          <div className="mb-3">
            <h3 className="text-center">Bán hàng OffLine</h3>
          </div>
          <div className="mb-5">
            <button
              onClick={HandleOnclickTaoHoaDon}
              type="button"
              className="btn btn-primary"
              tabIndex="-1"
            >
              Tạo hóa đơn
            </button>
          </div>
          <div className="d-flex">
            {dshd &&
              dshd.map((p, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    marginRight: "10px",
                    padding: "5px",
                    opacity: p.check ? "1" : "0.7",
                    position: "relative",
                  }}
                >
                  <p
                    className="mb-0"
                    onClick={() => HandleOnclickChonHoaDon(p)}
                    style={{ cursor: "pointer" }}
                  >
                    {p.ma}
                  </p>
                  <p
                    style={{
                      position: "absolute",
                      top: "-14px",
                      left: "75px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => HandleOnclickDeleteHoaDon(p)}
                  >
                    x
                  </p>
                </div>
              ))}
          </div>
          <div
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              height: "1200px",
            }}
          >
            <div
              className="BanHangof_khachhang mb-3"
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                margin: "5px",
              }}
            >
              <form className="form_khachhang_banhangofline">
                <div className="banhangofline_title mt-3 mb-3">
                  <h3 className="text-center">Thông tin khách hàng</h3>
                </div>
                <div className="mb-3 d-flex">
                  <input
                    type="text"
                    className="form-control ms-2"
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
                </div>
                <div className="ThemKhachHang mb-3">
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
                <div>
                  <div className="row">
                    <div className="col-5">
                      <input
                        style={{ width: "99.5%" }}
                        type="text"
                        className="form-control ms-2"
                        placeholder="Họ và tên"
                        value={dshd?.find((p) => p.check === true)?.ten || ""}
                        // onChange={(event) => setName(event.target.value)}
                        readOnly={inputreadOnly}
                      />
                    </div>
                    <div className="col-6">
                      <input
                        style={{ width: "91.5%" }}
                        type="text"
                        className="form-control ms-2"
                        placeholder="Địa chỉ"
                        value={
                          dshd?.find((p) => p.check === true)?.diachi || ""
                        }
                        // onChange={(event) => setAddress(event.target.value)}
                        readOnly={inputreadOnly}
                      />
                    </div>
                  </div>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control ms-2 mb-2 w-50"
                      placeholder="Số điện thoại"
                      value={dshd?.find((p) => p.check === true)?.sdt || ""}
                      //   onChange={(event) => setPhone(event.target.value)}
                      readOnly={inputreadOnly}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control ms-2 mb-2 w-50"
                      placeholder="Email"
                      value={dshd?.find((p) => p.check === true)?.email || ""}
                      //   onChange={(event) => SetEmail(event.target.value)}
                      readOnly={inputreadOnly}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="BanHangof_giohang" style={{ margin: "5px" }}>
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
                      {dshd.find((a) => a.check === true)?.SanPhamGioHang
                        ?.length > 0
                        ? TongGia.toLocaleString("vi-VN") + " VNĐ"
                        : giabandau.toLocaleString("vi-VN") + " VNĐ"}
                      &nbsp;&nbsp;&nbsp; Giảm khuyến mãi:{" "}
                      {dshd
                        .find((a) => a.check === true)
                        ?.giamkm.toLocaleString("vi-VN") + " VNĐ"}
                    </h6>
                    <div className="voucher-selection d-flex">
                      <label className="mt-2">Chọn Voucher:</label>
                      <Form.Select
                        className="w-25 ms-2"
                        aria-label="Default select example"
                        value={voucherchuan}
                        onChange={(e) => HandleOngchangeStVoucher(e)}
                      >
                        <option value="">Chọn voucher</option>
                        {availableVouchers &&
                          availableVouchers.map((voucher) => (
                            <option
                              disabled={voucher.check}
                              key={voucher.id}
                              value={voucher.id}
                            >
                              {`${voucher.ten}-${voucher.soTienCan}`}
                            </option>
                          ))}
                      </Form.Select>
                    </div>
                    <h5>
                      Tổng tiền:{" "}
                      {dshd
                        .find((a) => a.check === true)
                        ?.tongtienn.toLocaleString("vi-VN") + " VNĐ"}
                    </h5>
                  </div>
                </div>
              </div>
              <div className="BanHangof_giohang_sanphamdamua">
                <DanhSachSanPham setGiamkhuyemai={setGiamkhuyemai} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-3 banhangof_hoadon">
          <HoaDon />
        </div> */}
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

export default BanHangOfline2;
