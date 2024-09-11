import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from "react-redux";
import "./ThongTinThanhToan.scss";
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, Button, Modal, ListGroup, Select } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import HoaDon from '../HoaDon/HoaDon';
const ThongTinThanhToan = ({idHoaDon, name, phone,email, address} ) => {
  const [hoaDon, setHoaDon] = useState({
    TenKhachHang: '',
    SDT: '',
    Email: '',
    DiaChi: '',
    SanPhams: [],
    IdVoucher: '',
    GhiChu: '',
    TrangThaiGiaoHang: 1,
    isGiaoHang: false,
    TienShip: 0, 
    //IdPhuongThucThanhToan: '',
    SoDiemSuDung: 0,
    TongTienHoaDon: 0
  });
  const [errors, setErrors] = useState({
    TenKhachHang: '',
    SDT: '',
    Email: '',
    DiaChi: '',
    TienShip: '',
  });

  const [voucher, setVoucher] = useState([]);
  const [pttts, setPttts] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [TongGia, setTongGia] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalPttt, setShowModalPttt] = useState(false);
  const data = useSelector((state) => state.sanPhamGioHang.SanPhamGioHang);
  const [diemTichLuy, setDiemTichLuy] = useState(0);
  const [soDiemSuDung, setSoDiemSuDung] = useState(0);
  const [isGiaoHang, setIsGiaoHang] = useState(false);
  const [isDiemTichLuy, setIsDiemTichLuy] = useState(false);
  const [tienGiamVoucher, setTienGiamVoucher] = useState(0);
  const [tienGiamDiem, setTienGiamDiem] = useState(0);
  const componentRef = useRef();
  const [reloadHoaDon, setReloadHoaDon] = useState(false);

 
const calculateTotalPrice = (products) => {
  return products.reduce((acc, item) => {
    const giaBan = Number(item.GiaBan) || 0;
    const soLuongMua = Number(item.SoLuongMua) || 0;
    const giaTriKhuyenMai = Number(item.giaTriKhuyenMai) || 0;
    const adjustedPrice = (giaBan - giaTriKhuyenMai) * soLuongMua;
    return acc + adjustedPrice;
  }, 0);
};

const applyVoucher = (totalPrice, voucher) => {
  if (!voucher || totalPrice < voucher.soTienCan) return { tienGiamVoucher: 0, newTotal: totalPrice };
  const tienGiamVoucher = voucher.hinhThucGiamGia === 0
    ? voucher.giaTri
    : totalPrice * (voucher.giaTri / 100);
  return { tienGiamVoucher, newTotal: totalPrice - tienGiamVoucher };
};

const applyLoyaltyPoints = (totalPrice, isDiemTichLuy, diemTichLuy) => {
  if (!isDiemTichLuy) return { tienGiamDiem: 0, soDiemDung: 0, newTotal: totalPrice };
  const tienGiamDiem = Math.min(diemTichLuy * 100, totalPrice);
  const soDiemDung = Math.ceil(tienGiamDiem / 100);
  const newTotal = Math.max(0, totalPrice - tienGiamDiem);
  return { tienGiamDiem, soDiemDung, newTotal };
};

const getVoucherAndCalculateTotal = async () => {
  try {
    // Tính tổng giá ban đầu
    let totalPrice = calculateTotalPrice(hoaDon.SanPhams);
    
    // Thêm tiền ship nếu có
    if (hoaDon.TienShip) {
      totalPrice += Number(hoaDon.TienShip) ;  
    }

    // Lấy voucher dựa trên tổng giá ban đầu
    const voucherRes = await axios.get(`https://localhost:7095/api/Voucher/fillvoucher/${totalPrice}`);
    const voucher = voucherRes.data.voucher;
    setVoucher(voucher);

    // Áp dụng voucher
    const { tienGiamVoucher, newTotal: totalAfterVoucher } = applyVoucher(totalPrice, voucher);
    setTienGiamVoucher(tienGiamVoucher);

    // Áp dụng điểm tích lũy
    const { tienGiamDiem, soDiemDung, newTotal: finalTotal } = applyLoyaltyPoints(totalAfterVoucher, isDiemTichLuy, diemTichLuy);
    
    // Cập nhật state
    setTienGiamDiem(tienGiamDiem);
    setSoDiemSuDung(soDiemDung);
    setTongGia(finalTotal);

    return finalTotal;
  } catch (error) {
    console.error("Error in getVoucherAndCalculateTotal:", error);
    return null;
  }
};

useEffect(() => {
  getVoucherAndCalculateTotal();
}, [hoaDon.SanPhams, isGiaoHang, hoaDon.TienShip, isDiemTichLuy, diemTichLuy]);

  
  // const fetchPttts = async () => {
  //   try {
  //     const res = await axios.get(`https://localhost:7095/api/HoaDon/pptt`);
  //     if (res.data) {
  //       setPttts(res.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const getDiemTichLuy = async () => {
    try {
      const res = await axios.get(`https://localhost:7095/api/KhachHang/GetDiemKH?input=${phone}`);
      if (res.data) {
        setDiemTichLuy(res.data.diemKH);
      }
    } catch (error) {
      console.log(error);
    }
  };


  // useEffect(() => {
  //   fetchPttts();
  // },[]);
  useEffect(() => {
    const sanPhamsUpdate = data.map(sp => ({
        IDCTSP: sp.idCTSP,
        SoLuongMua: sp.soLuongmua,
        GiaBan: sp.giaBan,
        giaTriKhuyenMai: sp.giaTriKhuyenMai ?? 0,  
    }));
    setHoaDon(prevState => ({
        ...prevState,
        TenKhachHang: name,
        SDT: phone,
        Email: email,
        DiaChi: address,
        SanPhams: sanPhamsUpdate,
    }));
}, [ data, name, phone, email, address]);
useEffect(() => {
  getDiemTichLuy();
}, [isDiemTichLuy, diemTichLuy, phone]);
 

  // useEffect(() => {
  //   setHoaDon(prevState => ({
  //     ...prevState,
  //     SoDiemSuDung: soDiemSuDung
  //   }));
  // }, [soDiemSuDung]);
  
  const handleClickGiaoHang = () => {
    setIsGiaoHang(!isGiaoHang);
  };
  const handleClickDiemTichLuy = () => {
    setIsDiemTichLuy(!isDiemTichLuy);
    //updateTongTien();
  };
  const handleShowModal = () => {
    setShowModal(true); 
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const handleShowModalPttt = () => {
    setShowModalPttt(true); 
  }
  const handleCloseModalPttt = () => {
    setShowModalPttt(false);
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setHoaDon((prevHoaDon) => ({
      ...prevHoaDon,
      [id]: value
    }));

  // Validate input ngay sau khi thay đổi
  const error = validateInput(id, value);
  setErrors((prevErrors) => ({
    ...prevErrors,
    [id]: error,
  }));
  };
  const validateInput = (id, value) => {
    let error = "";
    switch (id) {
      case "TenKhachHang":
        if (!value.trim()) {
          error = "Tên người nhận không được để trống";
        }
        break;
      case "SDT":
        const phoneRegex = /^[0-9]{10}$/; // Giả sử số điện thoại phải có 10 chữ số
        if (!phoneRegex.test(value)) {
          error = "Số điện thoại không hợp lệ";
        }
        break;
      case "DiaChi":
        if (!value.trim()) {
          error = "Địa chỉ không được để trống";
        }
        break;
      case "TienShip":
        if (isNaN(value) || value <= 0) {
          error = "Tiền ship phải là số lớn hơn 0";
        }
        break;
      default:
        break;
    }
    return error;
  };
//   useEffect(() => {
//     setIsGiaoHang(false);
//     setDiemTichLuy(false);
//     setHoaDon(prevState => ({
//         ...prevState,
//         TenKhachHang: '',
//         Email: '',
//         SDT: '',
//         DiaChi: '',
//         TienShip: 0
//     }))
// },[idHoaDon])

const soLuongMuaArray = useMemo(() => {
  return data.map((sp) => sp.soLuongmua);
}, [data]);

useEffect(() => {
  updateHoaDon();  
}, [soLuongMuaArray]);  
 const updateHoaDon = async () => {
  // Kiểm tra tất cả các trường để đảm bảo không có lỗi
  if(isGiaoHang){
    const newErrors = {
      TenKhachHang: validateInput("TenKhachHang", hoaDon.TenKhachHang),
      SDT: validateInput("SDT", hoaDon.SDT),
      Email: validateInput("Email", hoaDon.Email),
      DiaChi: validateInput("DiaChi", hoaDon.DiaChi),
      TienShip: validateInput("TienShip", hoaDon.TienShip),
      // Bạn có thể thêm các trường khác cần kiểm tra ở đây
    };
  
    // Cập nhật state errors với các lỗi mới (nếu có)
    setErrors(newErrors);
  
    // Kiểm tra nếu có lỗi nào trong các trường
    const hasError = Object.values(newErrors).some(error => error !== "");
  
    if (hasError) {
      toast.error('Vui lòng kiểm tra và nhập đầy đủ thông tin.');
      return;
    }
  }

  try {
    // Nếu không có lỗi, tiến hành cập nhật hóa đơn
    getVoucherAndCalculateTotal();
    const hoaDonToSubmit = {
      ...hoaDon,
      TenKhachHang: isGiaoHang ? hoaDon.TenKhachHang : name ,
      SDT: isGiaoHang ? hoaDon.SDT : phone,
      Email: isGiaoHang ? hoaDon.Email : email,
      DiaChi: isGiaoHang ? hoaDon.DiaChi : address,
      IdVoucher: voucher ? voucher.id : null,
      SoDiemSuDung: soDiemSuDung,
      isGiaoHang: isGiaoHang,
      TienShip: hoaDon.TienShip !== null ? hoaDon.TienShip : 0,
      SanPhams: data.map(sp => ({
        IDCTSP: sp.idCTSP,
        SoLuongMua: sp.soLuongmua,
        GiaBan: sp.giaBan,
        giaTriKhuyenMai: sp.giaTriKhuyenMai ?? 0,  
    })),
      TongTienHoaDon: TongGia 
    };
    await axios.put(`https://localhost:7095/api/HoaDon/UpdateHoaDonOffline/${idHoaDon}`, hoaDonToSubmit);
    setReloadHoaDon(!reloadHoaDon);
    console.log('Cập nhật hoa đơn thành công:', hoaDonToSubmit);
    
    //toast.success('Cập nhật thành công');
    
  } catch (error) {
    console.error('Đã xảy ra lỗi khi thanh toán: ', error);
    //toast.error('Cập nhật thất bại!');
  }

  };
  const handlePayment = async () => {
    try {

      const response = await axios.post(`https://localhost:7095/api/HoaDon/ThanhToanVNPay/${idHoaDon}?soDiemSuDung=${soDiemSuDung}&isGiaoHang=${isGiaoHang}`);
      //console.log(response.data);
      if(response.data.paymentUrl){
        window.open(response.data.paymentUrl, '_blank');
      }
      toast.success('Thanh toán thành công!');
    } catch (error) {
      console.error('Đã xảy ra lỗi khi thanh toán: ', error);
      toast.error('Thanh toán thất bại!');
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "HoaDon",
  });
 

  return (
    <>
      <Container className="mt-4">
        <h5 className="mb-4">THÔNG TIN THANH TOÁN</h5>

      <Row className="mb-3">
        <Col>
          <p>Tổng sản phẩm: {hoaDon.SanPhams.length}</p>
        </Col>
      </Row>

      
    <p>Voucher: {voucher ? voucher.ten : 'Không có voucher được sử dụng'}</p>
      
      <Row className="mb-3">
        <Col className="d-flex align-items-center">
          <span className="me-3">Giao hàng</span>
          <Form.Check 
            type="switch"
            id="giao-hang-switch"
            checked={isGiaoHang}
            onChange={handleClickGiaoHang}
          />
        </Col>
      </Row>

      {isGiaoHang && (
        <div className="shipping-info-section mb-3">
        <h5 className="mb-3">THÔNG TIN GIAO HÀNG</h5>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Tên người nhận:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="TenKhachHang"
              value={hoaDon.TenKhachHang}
              onChange={handleInputChange}
              isInvalid={!!errors.TenKhachHang}
            />
            <Form.Control.Feedback type="invalid">
              {errors.TenKhachHang}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Số điện thoại:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="SDT"
              value={hoaDon.SDT}
              onChange={handleInputChange}
              isInvalid={!!errors.SDT}
            />
            <Form.Control.Feedback type="invalid">
              {errors.SDT}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Địa chỉ:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as="textarea"
              rows={3}
              id="DiaChi"
              value={hoaDon.DiaChi}
              onChange={handleInputChange}
              isInvalid={!!errors.DiaChi}
            />
            <Form.Control.Feedback type="invalid">
              {errors.DiaChi}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            Tiền ship:
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="number"
              id="TienShip"
              value={hoaDon.TienShip}
              onChange={handleInputChange}
              isInvalid={!!errors.TienShip}
            />
            <Form.Control.Feedback type="invalid">
              {errors.TienShip}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </div>
      )}

      <Row className="mb-3">
        <Col className="d-flex align-items-center">
          <span className="me-3">Điểm hiện tại: {diemTichLuy}</span>
          <Form.Check 
            type="switch"
            id="diem-tich-luy-switch"
            checked={isDiemTichLuy}
            onChange={handleClickDiemTichLuy}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex align-items-center">
          <span className="me-3">Trạng thái: </span>
          <select id="TrangThaiGiaoHang"  value={hoaDon.TrangThaiGiaoHang} onChange={handleInputChange}>
            {/* <option value="1">Đơn nháp</option> */}
            <option value="2">Chờ xác nhận</option>
            <option value="3">Đang giao hàng</option>
            <option value="4">Đang hoàn hàng</option>
            <option value="5">Hoàn hàng thành công</option>
            <option value="6">Thành công</option>
            <option value="7">Hủy đơn</option>
            <option value="8">Chờ xác nhận</option>
            <option value="9">Chờ xác nhận hoàn hàng</option>
          </select>

        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
        <p>Tiền giảm: {(tienGiamVoucher + tienGiamDiem).toLocaleString()} VND</p>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <p>Tổng tiền: {TongGia.toLocaleString()} VND</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="success" onClick={handlePrint}>Xem hóa đơn</Button>
        
          <div style={{
            position: 'absolute',
            top: '-1000px',
            left: '-1000px'
          }}>
            <HoaDon props={idHoaDon} ref={componentRef}  key={reloadHoaDon} />
          </div>
      
        
          </Col>
          <Col>
            <Button variant="success" onClick={handlePayment}>Thanh toán</Button>
          </Col>
      </Row>

      <Row>
       
        
      </Row>

      
    </Container>
    </>
  );
};

export default ThongTinThanhToan;

