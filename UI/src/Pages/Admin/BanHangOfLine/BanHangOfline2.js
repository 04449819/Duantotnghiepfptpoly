import { useEffect, useRef, useState } from "react";
import "./BanHangOfline.scss";
import axios from "axios";
import { toast } from "react-toastify";
import DanhSachSanPham from "./DanhSachSanPham/DanhSachSanPham";
import HoaDon from "./HoaDon/HoaDon";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
import MyModalAdd from "../QuanLyKhachHang/FormThem";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  AddHoaDon,
  ChonHoaDon,
  DeleteHoaDons,
  SetCheckGiaoHang,
  SetCheckDungDiem,
  SetDiaChiKhachHang,
  SetDiaChiKhachHangg,
  SetEmail,
  SetGiamKhuyeMai,
  SetGiChu,
  SetSDT,
  SetTenKhachHang,
  SetTienShip,
  SetTongTien,
  SetVoucher,
  SetSoDiemSuDung,
  TinhTienGiamDiem,
  GetQuyDoiDiem,
  DeleteHoaDonDaThanhToan
} from "../../../Rudux/Reducer/GetSanPhamGioHangSlice";
// import Select from "react-select";
import { Button, Form, Row, Col } from "react-bootstrap";
import ModalXacNhanOffline from "./ModalXacNhanOffline/ModalXacNhanOffline";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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
  const [isGiaoHang, setIsGiaoHang] = useState(false);
  const nv = useSelector((nv) => nv.user.User);
  const [modalData, setModalData] = useState(null);
  const [isModalXacNhanOffline, setIsModalXacNhanOffline] = useState(false);
  const quyDoiDiem = useSelector((state) => state.sanPhamGioHang.quyDoiDiem);
  const [showHoaDon, setShowHoaDon] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const hoaDonRef = useRef(null);

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
  const hoaDonDaChon = dshd.find(a => a.check === true);
  useEffect(() => {
    dispath(GetQuyDoiDiem());
    
  }, [dispath]);
  useEffect(() => {
    dispath(SetGiamKhuyeMai(giamkhuyemai));
  }, [giamkhuyemai]);
  useEffect(() => {
    dispath(SetTongTien(tongTien));
  }, [tongTien]);
  // useEffect(() => {
  //   //("da thay doi voucher", voucherchuan);
  // }, [voucherchuan]);

  const calculateTotal = () => {
    if (!hoaDonDaChon) return 'Không có hóa đơn được chọn';
    
    const total = hoaDonDaChon.checkgiaohang
      ? Number(hoaDonDaChon.tongtienn) + Number(hoaDonDaChon.tienship)
      : Number(hoaDonDaChon.tongtienn);
    
    return total.toLocaleString('vi-VN') + ' VNĐ';
  };
  const handleDungDiemChange = () => {
    dispath(SetCheckDungDiem());
    dispath(TinhTienGiamDiem());
  };
  useEffect(() => {
    console.log(
      "hóa đơn cần thanh toán",
      dshd?.find((p) => p.check === true)
    );
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
  // const handleVoucherChange = (selectedOption) => {
  //   setSelectedVoucher(selectedOption);
  //   // calculateTotalPrice();
  // };
  
  const HandleOngchangeStVoucher = (e) => {
    setvoucherchuan(e.target.value);
    console.log(e.target.value);
    const datacantim = availableVouchers.find((p) => p.id === e.target.value);
    dispath(SetVoucher(datacantim));
  };

  const openModalXacNhanOffline = () => {
    const hoaDon = dshd.find((a) => a.check === true)
    const createHoaDon = {
      Ma: hoaDon.ma,
      TenKhachHang: hoaDon.ten,
      SDT: hoaDon.sdt,
      Email: hoaDon.email,
      DiaChi: hoaDon.diachi,
      TienShip: hoaDon.checkgiaohang ? hoaDon.tienship : 0,
      //IdPhuongThucThanhToan: "00000000-0000-0000-0000-000000000000", 
      GhiChu: hoaDon.ghiChu,
      IdNhanVien: nv.id ? nv.id : "", 
      //IdKhachHang: "00000000-0000-0000-0000-000000000000", 
      IdVoucher: voucherchuan ? voucherchuan : null,
      SoDiemSuDung: 0, // Thay bằng số điểm sử dụng thực tế nếu có
      SanPhams: hoaDon.SanPhamGioHang.map(sp => ({
        IDCTSP: sp.idCTSP,
        SoLuongMua: sp.soLuongmua,
        GiaBan: sp.giaBan,
        Anh: sp.duongDanAnh,
        TenSanPham: sp.tenSanPham,
        TenKichCo: sp.kichCo,
        TenMauSac: sp.maMau,
        GiaTriKhuyenMai: sp.giaTriKhuyenMai,
        TrangThaiKhuyenMai: sp.trangthaikm,


      })),
      TongTienHoaDon: Number(hoaDon.tongtienn) + Number(hoaDon.tienship),
    }
    const additionalInfo = {
      tongTienBanDau: TongGia,
      tienGiamVoucher: hoaDon.giamvoucher,
      tienGiamKhuyenMai: hoaDon.giamkm,
      tongTien : hoaDon.tongtienn,
      isGiaoHang: hoaDon.checkgiaohang,
      checkdungdiem: hoaDon.checkdungdiem,
      soDiemSuDung: hoaDon.soDiemSuDung,
      tienGiamDiem: hoaDon.tienGiamDiem,
      //tenVoucher: getVoucher(voucherchuan),
      // tienGiamDiem: tienGiamDiem,
      // soDiemSuDung: soDiemSuDung,
    };
    setModalData({ ...createHoaDon, ... additionalInfo });
   
   
    
    setIsModalXacNhanOffline(true);
  }
  const handleThanhToan = async () => {
    try {
      //const selectedProducts = dsspgiohangs.filter((sp) => sp.check);
      // const apiUrl =
      //   modalData.IdPhuongThucThanhToan ===
      //   "f1fb9f0b-5db2-4e04-8ba3-84e96f0d820c"
      //     ? "https://localhost:7095/api/HoaDon/CreateHoaDonOnline"
      //     : "https://localhost:7095/api/HoaDon/create-order";
      const apiUrl ="https://localhost:7095/api/HoaDon/CreateHoaDonOffline";
    

      const res = await axios.post(apiUrl, modalData);

      // if (res.data?.payUrl) {
      //   window.open(res.data.payUrl, "_blank");
      // }

      if (res.data) {
        toast.success("Đặt hàng thành công");
          // Xóa hóa đơn đã thanh toán
          const hoaDonDaThanhToan = dshd.find(hd => hd.check === true);
          if (hoaDonDaThanhToan) {
            dispath(DeleteHoaDonDaThanhToan(hoaDonDaThanhToan.ma));
          }
          setIsModalXacNhanOffline(false);
          //setCompletedOrder(res.data); // Save the completed order data
          //setShowHoaDon(true); // Show the HoaDon component
        //modalData.SanPhams.forEach(sp => dispatch(Deletechitietspgiohang(sp)));
        //selectedProducts.forEach((sp) => dispatch(Deletechitietspgiohang(sp)));
       // setload(!load);
      } else {
        toast.error(res.data.message || "Đặt hàng thất bại");
      }


      
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error(
        `Gặp lỗi khi đặt hàng: ${error.response?.data || error.message}`
      );
    }
  }
  const handlePrintPDF = () => {
    if (hoaDonRef.current) {
      html2canvas(hoaDonRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("hoa-don.pdf");
      });
    }
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
              className="BanHangof_khachhang mb-3 d-flex"
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                margin: "5px",
              }}
            >
              <div className="w-50">
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
                          onChange={(event) =>
                            dispath(SetTenKhachHang(event.target.value))
                          }
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
                          onChange={(event) =>
                            dispath(SetDiaChiKhachHangg(event.target.value))
                          }
                          //readOnly={inputreadOnly}

                        />
                      </div>
                    </div>
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control ms-2 mb-2 w-50"
                        placeholder="Số điện thoại"
                        value={dshd?.find((p) => p.check === true)?.sdt || ""}
                        onChange={(event) =>
                          dispath(SetSDT(event.target.value))
                        }
                        readOnly={inputreadOnly}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        className="form-control ms-2 mb-2 w-50"
                        placeholder="Email"
                        value={dshd?.find((p) => p.check === true)?.email || ""}
                        onChange={(event) =>
                          dispath(SetEmail(event.target.value))
                        }
                        readOnly={inputreadOnly}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-5">
                  <Row className="mb-3 ms-2 mt-3">
                    <Col className="d-flex align-items-center">
                      <span className="me-3">Giao hàng</span>
                      <Form.Check
                        type="switch"
                        id="giao-hang-switch"
                        checked={
                          dshd?.find((p) => p.check === true)?.checkgiaohang
                        }
                        onChange={() => dispath(SetCheckGiaoHang())}
                        
                        
                      />
                    </Col>
                  </Row>
                  { dshd?.find((p) => p.check === true)?.sdt &&(
                    <Row className="mb-3 ms-2 mt-3">
                    <Col className="d-flex align-items-center">
                      <span className="me-3">Điểm  tích: {dshd?.find((p) => p.check === true)?.diem || ""}</span>
                      <Form.Check
                        type="switch"
                        id="dung-diem-switch"
                        checked={
                          dshd?.find((p) => p.check === true)?.checkdungdiem
                        }
                        onChange={handleDungDiemChange}
                      />
                    </Col>
                  </Row>
                  )}
                  </div>
                  {/* {dshd?.find((p) => p.check === true)?.checkdungdiem && (
                    <div>
                      <p className="ms-2 mb-2">
                        Số điểm sử dụng: {dshd?.find((p) => p.check === true)?.soDiemSuDung || 0}
                      </p>
                      <p className="ms-2 mb-2">
                        Tiền giảm: {dshd?.find((p) => p.check === true)?.tienGiamDiem?.toLocaleString("vi-VN") || 0} VNĐ
                      </p>
                    </div>
                  )} */}
                  
                  {dshd?.find((p) => p.check === true)?.checkgiaohang && (
                    <div>
                      <input
                        type="number"
                        className="form-control ms-2 mb-2 w-50"
                        placeholder="Tiền ship"
                        value={
                          dshd?.find((p) => p.check === true)?.tienship || ""
                        }
                        onChange={(event) =>
                          dispath(SetTienShip(event.target.value))
                        }
                      />
                      <input
                        type="text"
                        className="form-control ms-2 mb-2 w-50"
                        placeholder="Ghi chú"
                        value={
                          dshd?.find((p) => p.check === true)?.ghiChu || ""
                        }
                        onChange={(event) =>
                          dispath(SetGiChu(event.target.value))
                        }
                      />
                    </div>
                  )}
                </form>
              </div>
              <div className="w-50">
                <div className="BanHangof_giohang_thongtin ">
                  <div
                    style={{
                      margin: "10px 20px",
                      // borderRadius: "5px",
                    }}
                  >
                    <div style={{ margin: "0px 20px" }}>
                      <h3 className="mb-3 text-center">Giỏ hàng</h3>
                      <h6 className="mb-3">Sản phẩm: {soSP} </h6>
                      <h6 className="mb-3">
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
                      <div className="voucher-selection d-flex mb-3 mt-3">
                        <label className="mt-2">Chọn Voucher:</label>
                        <Form.Select
                          className="w-50 ms-2"
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
                                {`${voucher.ten}-${voucher.hinhThucGiamGia ? "%" : "VNĐ"}-${voucher.soTienCan}`}
                              </option>
                              
                            ))}
                        </Form.Select>
                      </div>
                      {/* <h6 className="mt-3 mb-3">
                        Giảm Voucher:{" "}
                        {dshd
                          .find((a) => a.check === true)
                          ?.giamvoucher.toLocaleString("vi-VN") + " VNĐ"}
                      </h6> */}
                       <h6 className="mt-3 mb-3">
                          Giảm Voucher: {
                            dshd
                              .find((a) => a.check === true)
                              ?.giamvoucher && dshd.find((a) => a.check === true).giamvoucher.toLocaleString("vi-VN") + " VNĐ"
                          }
                        </h6>
                      { dshd?.find((p) => p.check === true)?.checkdungdiem && (
                         <h6 className="mt-3 mb-3">
                         Giảm điểm: {dshd.find((a) => a.check === true)?.tienGiamDiem?.toLocaleString("vi-VN") + " VNĐ"}
                       </h6>
                      )}
                        <div className="d-flex justify-content-between align-items-center mt-5">
                        {/* <h5>
    Tổng tiền: {
        
        hoaDonDaChon ? (
          (Number(hoaDonDaChon.tongtienn) + Number(hoaDonDaChon.tienship)).toLocaleString('vi-VN') + ' VNĐ'
      ) : 'Không có hóa đơn được chọn'
    }
</h5> */}
                <h5>Tổng tiền: {calculateTotal()}</h5>
                <Button 
                  onClick={openModalXacNhanOffline}
                  disabled={!dshd.find((a) => a.check === true) || dshd.find((a) => a.check === true)?.SanPhamGioHang?.length === 0}
                >
                  Thanh toán
                </Button>
                {/* {showHoaDon && completedOrder && (
        <div>
          <HoaDon ref={hoaDonRef} hoaDon={completedOrder} />
          <Button onClick={handlePrintPDF}>In hóa đơn PDF</Button>
        </div>
      )} */}

              </div>
              {isModalXacNhanOffline && (
                <ModalXacNhanOffline
                  show={isModalXacNhanOffline}
                  onHide={() => setIsModalXacNhanOffline(false)}
                  data={modalData || {}} 
                  onConfirm={handleThanhToan}
                />
              )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="BanHangof_giohang" style={{ margin: "5px" }}>
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
