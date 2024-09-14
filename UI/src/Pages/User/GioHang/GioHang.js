import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import Select from "react-select";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  checkspchitietspgiohang,
  Deletechitietspgiohang,
  LogOutTaiKhoan,
  SetDiachiChinhNhanHang,
  Updatespchitietspgiohang,
} from "../../../Rudux/Reducer/taiKhoanSlice";
import axios from "axios";
import { toast } from "react-toastify";
import ModalThemDiaChiMoi from "./ModalThemDiaChiMoi";
import { TiDelete } from "react-icons/ti";
import ConfirmationModal from "./ModalXacNhanGioHang/ModalXacNhanGioHang";
import { Modal, Button } from 'react-bootstrap';

// import { IoSettings } from "react-icons/io5";
 // Điều chỉnh đường dẫn nếu cần


const GioHang = () => {
  const [shows, setShows] = useState(false);
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const dsspgiohang = useSelector((p) => p.user.giohangonl);
  const user = useSelector((p) => p.user.User);
  const dispath = useDispatch();
  const [dsspgiohangs, setdsspgiohangs] = useState([]);
  const [provinces, setprovinces] = useState([]);
  const [districts, setdistricts] = useState([]); 
  const [dckh, setdckh] = useState([]);
  const [tongTien, setTongTien] = useState(0);
  const [tongTienBanDau, setTongTienBanDau] = useState(0);
  const [load, setload] = useState(false);
  const [hoaDonOnline, setHoaDonOnline] = useState({
    TenKhachHang: '',
    SDT: '',
    Email: '',
    DiaChi: '',
    SanPhams: [],
    IdVoucher: '',
    GhiChu: '',
    TrangThaiGiaoHang: 2,
    TienShip: 30000, 
    IdPhuongThucThanhToan: 'f1fb9f0b-5db2-4e04-8ba3-84e96f0d820c',
    // IdNhanVien: '',

    IdKhachHang :'',

    SoDiemSuDung: 0,
    TongTienHoaDon: 0
  });
  const [voucher, setVoucher] = useState();
  const [soDiemSuDung, setSoDiemSuDung] = useState(0);
  const [isDiemTichLuy, setIsDiemTichLuy] = useState(false);
  const [tienGiamVoucher, setTienGiamVoucher] = useState(0);
  const [tienGiamDiem, setTienGiamDiem] = useState(0);

  const [detailAddress, setDetailAddress] = useState(hoaDonOnline.DiaChi.split(',')[0] || '');
  const dispatch = useDispatch();
  //const [errors, setErrors] = useState({}); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [errors, setErrors] = useState({
    TenKhachHang: '',
    SDT: '',
    Email: '',
    DiaChi: '',
    IdPhuongThucThanhToan:'',
    selectedProvince: '',
    selectedDistrict: ''
  });
  const [availableVouchers, setAvailableVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [shippingCost, setShippingCost] = useState(30000); // Default to 30000
  
  useEffect(() => {
    console.log("DSSPGIOHANG: ",dsspgiohangs);
    
    const chiTietSanPhamGioHangs = dsspgiohangs.map(spgh => ({
      IDCTSP: spgh.id,
      SoLuongMua: spgh.soluongmua,
      GiaBan: spgh.giaban,
      Anh: spgh.anh,
      TenSanPham: spgh.tensp,
      TenMauSac: spgh.tenms,
      TenKichKo: spgh.tenkc,
      //giaTriKhuyenMai: spgh.giatrikhuyenmai ?? 0,  
  }));
  setHoaDonOnline(prevState => ({
    ...prevState,
    SanPhams: chiTietSanPhamGioHangs,
    SoDiemSuDung: soDiemSuDung
}));
  },[dsspgiohangs, soDiemSuDung])
 
useEffect(() => {
  fetchAvailableVouchers();
}, []);

const fetchAvailableVouchers = async () => {
  try {
    const response = await axios.get(`https://localhost:7095/api/Voucher/GetAllAvaiableVoucher`);
    console.log(response);
    
    const voucherOptions = response.data.vouchers.map(voucher => ({
      value: voucher.id,
      label: `${voucher.ten} - Với đơn ${voucher.soTienCan.toLocaleString()}`,
      isDisabled: voucher.soTienCan > tongTien,
      ...voucher
    }));
    setAvailableVouchers(voucherOptions);
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    toast.error('Không thể tải danh sách voucher');
  }
};

useEffect(() => {
  const updatedVouchers = availableVouchers.map(voucher => ({
    ...voucher,
    isDisabled: voucher.soTienCan > tongTien
  }));
  setAvailableVouchers(updatedVouchers);
}, [tongTien]);
const handleVoucherChange = (selectedOption) => {
  setSelectedVoucher(selectedOption);
  calculateTotalPrice();
};
const handleClickDiemTichLuy = () => {
  setIsDiemTichLuy(!isDiemTichLuy);
  calculateTotalPrice();
};
useEffect(() => {
  calculateTotalPrice();
}, [isDiemTichLuy, selectedVoucher, shippingCost]);
const calculateTotalPrice = (currentShippingCost = shippingCost) => {
  let total = tongTienBanDau;
  total += currentShippingCost;

  // Rest of the calculation logic remains the same
  if (selectedVoucher) {
    const tienGiamVoucher = selectedVoucher.hinhThucGiamGia === 0
      ? selectedVoucher.giaTri
      : total * (selectedVoucher.giaTri / 100);
    total -= tienGiamVoucher;
    setTienGiamVoucher(tienGiamVoucher);
  } else {
    setTienGiamVoucher(0);
  }

  if (isDiemTichLuy && user.diemTich) {
    const maxDiemSuDung = Math.min(user.diemTich, Math.floor(total / 100));
    const tienGiamDiem = maxDiemSuDung * 100;
    total -= tienGiamDiem;
    setTienGiamDiem(tienGiamDiem);
    setSoDiemSuDung(maxDiemSuDung);
  } else {
    setTienGiamDiem(0);
    setSoDiemSuDung(0);
  }

  setTongTien(total);
};
const validateInput = (id, value) => {
  let error = "";
  switch (id) {
    case "TenKhachHang":
      if (!value.trim()) {
        error = "Tên khách hàng không được để trống";
      }
      break;
    case "SDT":
      if (value === "") {
        error = "Số điện thoại không được để trống";
      }
      break;
    case "Email":
      if (value === "") {
        error = "Email phải điền đầy đủ";
      }
      break;
    case "DiaChi":
      if(value === "") {
        error = "Địa chỉ phải điền đầy đủ";
      }
      break;
    case "selectedProvince":
      const Province = 'pleaseSelect'; // Ví dụ giá trị mặc định
      if (value === null || value === undefined) {
          error = "Vui lòng chọn quận/huyện";
      }
      break;
    case "selectedDistrict":
      const defaultDistrict = 'pleaseSelect'; // Ví dụ giá trị mặc định
      if (value === null || value === undefined) {
          error = "Vui lòng chọn quận/huyện";
      }
      break;
      default:
      break;
  }
  return error;
};
  useEffect(() => {
    const sortedProducts = [...dsspgiohang].sort((a, b) => {
      if (a.check === b.check) return 0;
      return a.check ? -1 : 1;
    });
    setdsspgiohangs(sortedProducts);
    getLoaiSanPhamBanHang1();
    const total = dsspgiohang
      .filter((product) => product.check === true) // Lọc các sản phẩm có check = true
      .reduce((sum, product) => sum + product.giaban * product.soluongmua, 0);
    setTongTien(total);
    setTongTienBanDau(total);
    // getLoaiSanPhamBanHang2();
    if (user.id !== undefined) {
      getDiaChiKhachHang();
    }
  }, [dsspgiohang, load]);

  useEffect(() => {
    
  },[]);

 
  const applyVoucher = (totalPrice, voucher) => {
    if (!voucher || totalPrice < voucher.soTienCan) {
      setTienGiamVoucher(0);
      setTongTien(totalPrice);
      return;
    }
    const tienGiam = voucher.hinhThucGiamGia === 0
      ? voucher.giaTri
      : totalPrice * (voucher.giaTri / 100);
    setTienGiamVoucher(tienGiam);
    setTongTien(totalPrice - tienGiam);
  };
  
  const resetForm = () => {
    setHoaDonOnline({
      TenKhachHang: '',
      SDT: '',
      Email: '',
      DiaChi: '',
      SanPhams: [],
      IdVoucher: '',
      GhiChu: '',
      TrangThaiGiaoHang: 2,
      TienShip: 30000, 
      IdPhuongThucThanhToan: 'f1fb9f0b-5db2-4e04-8ba3-84e96f0d820c',
      IdKhachHang: '',
      SoDiemSuDung: 0,
      TongTienHoaDon: 0
    });
    setModalData(null);
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setDetailAddress('');
    setVoucher(null);
    setSoDiemSuDung(0);
    setIsDiemTichLuy(false);
    setTienGiamVoucher(0);
    setTienGiamDiem(0);
    setTongTien(0);
    setTongTienBanDau(0);
    setSelectedVoucher(null);
  }
  const combineAddress = (detailAddress, province, district) => {
    // Loại bỏ các giá trị null, undefined hoặc chuỗi rỗng và ghép chúng lại bằng dấu phẩy
    return [detailAddress, district?.label, province?.label]
      .filter(Boolean) // Chỉ giữ các giá trị có thật
      .join(', ');     // Ghép các giá trị với dấu phẩy
  };
  
  const getDiaChiKhachHang = async () => {
    try {
      var res = await axios.get(
        `https://localhost:7095/api/DiaChiKhachHang/getalldiachikh?id=${user.id}`
      );
      setdckh(res.data);
    } catch (error) {}
  };

  const getLoaiSanPhamBanHang1 = async () => {
    try {
      const res = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
      const datatam = res.data.data.map((p) => {
        return { value: p.id, label: p.name };
      });
      setprovinces(datatam);
    } catch (error) {}
  };
  const getLoaiSanPhamBanHang2 = async (selectedOption) => {
    try {
      const res = await axios.get(
        `https://esgoo.net/api-tinhthanh/2/${selectedOption}.htm`
      );
      const datatam = res.data.data.map((p) => {
        return { value: p.id, label: p.name };
      });
      setdistricts(datatam);
    } catch (error) {}
  };
  
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
     // Nếu đang thay đổi địa chỉ chi tiết
     if (id === 'DiaChi') {
      setDetailAddress(value); // Cập nhật địa chỉ chi tiết trong state
      setHoaDonOnline((prevHoaDonOnline) => ({
          ...prevHoaDonOnline,
          DiaChi: combineAddress(value, selectedProvince, selectedDistrict),
      }));
  } else {
      setHoaDonOnline((prevHoaDonOnline) => ({
          ...prevHoaDonOnline,
          [id]: value
      }));
    const error = validateInput(id, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));
  }
  };
  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    // const newShippingCost = selectedOption.label === "Hà Nội" ? 30000 : 100000;
    // setShippingCost(newShippingCost);
    setHoaDonOnline((prevHoaDonOnline) => ({
      ...prevHoaDonOnline,
      DiaChi: combineAddress(detailAddress, selectedOption, selectedDistrict), // Không giữ lại địa chỉ cũ
      //TienShip: newShippingCost
    }));
    const newShippingCost = selectedOption.label === "Hà Nội" ? 30000 : 100000;
    setShippingCost(newShippingCost);
    setHoaDonOnline((prevHoaDonOnline) => ({
      ...prevHoaDonOnline,
      TienShip: newShippingCost
    }));
    // const error = validateInput('selectedProvince', selectedOption);
    // setErrors((prevErrors) => ({
    //   ...prevErrors,
    //   selectedProvince: error,
    // }));
    getLoaiSanPhamBanHang2(selectedOption.value);
    setSelectedDistrict(null); // Reset district khi thay đổi tỉnh/thành phố
    calculateTotalPrice(newShippingCost);
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setHoaDonOnline((prevHoaDonOnline) => ({
      ...prevHoaDonOnline,
      DiaChi: combineAddress(detailAddress, selectedProvince, selectedOption) // Không giữ lại địa chỉ cũ
  }));

  // const error = validateInput('selectedDistrict', selectedOption);
  // setErrors((prevErrors) => ({
  //   ...prevErrors,
  //   selectedDistrict: error,
  // }));
  
  };
  const Hanleonclickthemspkhac = () => {
    navigate("/cuahang");
  };
  const HandleOnclickDeletesp = async (sp) => {
    if (user && user.sdt !== "" && user.vaiTro === 1) {
      try {
        const res = await axios.delete(
          `https://localhost:7095/api/GioHang/deleteSaningiohangct?idnguoidung=${user.id}&idsp=${sp.id}`
        );
        dispath(Deletechitietspgiohang(sp));
        toast.success(res.data);
      } catch (error) {
        toast.error(error.reponse.data);
      }
    } else {
      dispath(Deletechitietspgiohang(sp));
    }
  };
  const Handleonchangesp = (event, sp) => {
    // const thutruyen = { id: sp.id, soluonmua: event.target.value };
    const newSoLuong = parseInt(event.target.value);
    if (newSoLuong >= 1) {
      dispath(Updatespchitietspgiohang({ id: sp.id, soluongmua: newSoLuong }));
    }
  };
  const HandleOchangeChecked = (item) => {
    dispath(checkspchitietspgiohang(item));
  };

  const HandleOnchangeCheckbox = async (item) => {
    try {
      const res = await axios.put(
        `https://localhost:7095/api/DiaChiKhachHang/updatedckh?id=${item.id}`
      );
      if (res.data !== "") {
        toast.success(`${res.data}`);
        setload(!load);
      }
    } catch (error) {
      toast.error(`Gặp lỗi: ${error.response.data}`);
    }
    // dispath(SetDiachiChinhNhanHang(item));
  };

  const HandleOnclickDeleteDC = async (item) => {
    try {
      const res = await axios.delete(
        `https://localhost:7095/api/DiaChiKhachHang/xoadckh?id=${item.id}`
      );
      toast.success(`${res.data}`);
      setload(!load);
    } catch (error) {
      toast.error(`Gặp lỗi: ${error.response.data}`);
    }
  };
  

 
 
  const openConfirmationModal = () => {
    const selectedProducts = dsspgiohangs.filter(sp => sp.check);
    if (selectedProducts.length === 0) {
      toast.error("Vui lòng chọn ít nhất một sản phẩm để đặt hàng");
      return;
    } 
    // if (hoaDonOnline.TenKhachHang === '' || hoaDonOnline.SDT === '' || hoaDonOnline.Email === '' || hoaDonOnline.DiaChi === '') {
    //   toast.error("Vui lòng chọn đẩy đủ thông tin");
    //   return;
    // }
    
  
    const hoaDonOnlineSubmit = {
      ...hoaDonOnline,
      TenKhachHang: user.ten || hoaDonOnline.TenKhachHang,
      SDT: user.sdt || hoaDonOnline.SDT,
      Email: user.email || hoaDonOnline.Email,
      DiaChi: dckh.find(dc => dc.trangThai === 1)?.diaChi || hoaDonOnline.DiaChi,
      IdVoucher: selectedVoucher ? selectedVoucher.value : null,//voucher?.id || null,
      SoDiemSuDung: isDiemTichLuy ? soDiemSuDung : 0,
      TienShip: shippingCost || 0,
      TongTienHoaDon: tongTien,
      SanPhams: selectedProducts.map(sp => ({
        IDCTSP: sp.id,
        SoLuongMua: sp.soluongmua,
        GiaBan: sp.giaban,
        Anh: sp.anh,
        TenSanPham: sp.tensp,
        TenKichCo: sp.tenkc,
        TenMauSac: sp.tenms
      })),
      IdKhachHang: user.id,
    };
    const newErrors = {
      TenKhachHang: validateInput('TenKhachHang', hoaDonOnlineSubmit.TenKhachHang),
      SDT: validateInput( 'SDT',hoaDonOnlineSubmit.SDT),
      Email: validateInput('Email', hoaDonOnlineSubmit.Email ),
      DiaChi: validateInput('DiaChi', hoaDonOnlineSubmit.DiaChi),
      IdPhuongThucThanhToan: validateInput('IdPhuongThucThanhToan', hoaDonOnlineSubmit.IdPhuongThucThanhToan),
      // selectedDistrict: validateInput('selectedDistrict', hoaDonOnlineSubmit.selectedDistrict),
      // selectedProvince: validateInput('selectedProvince', hoaDonOnlineSubmit.selectedProvince),
    };
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some(error => error !== "");
    if (hasError) {
      return; 
    }
    const additionalInfo = {
      tongTienBanDau: tongTienBanDau,
      tienGiamVoucher: tienGiamVoucher,
      tienGiamDiem: tienGiamDiem,
      soDiemSuDung: soDiemSuDung,
    };
    setModalData({ ...hoaDonOnlineSubmit, ...additionalInfo });
    setIsModalOpen(true);
    console.log("isModalOpen:", isModalOpen);
  };
  const HandleDatHang = async () => {
    try {
      
      const selectedProducts = dsspgiohangs.filter(sp => sp.check);
      const apiUrl = modalData.IdPhuongThucThanhToan === 'f1fb9f0b-5db2-4e04-8ba3-84e96f0d820c'
        ? "https://localhost:7095/api/HoaDon/CreateHoaDonOnline"
        : "https://localhost:7095/api/HoaDon/create-order";
  
      const res = await axios.post(apiUrl, modalData);
  
      if (res.data?.payUrl) {
        window.open(res.data.payUrl, '_blank');
      }
  
      if (res.data) {
        toast.success("Đặt hàng thành công");
        //modalData.SanPhams.forEach(sp => dispatch(Deletechitietspgiohang(sp)));
        selectedProducts.forEach(sp => dispatch(Deletechitietspgiohang(sp)));
        setload(!load);
       
        
        
      } else {
        toast.error(res.data.message || "Đặt hàng thất bại");
      }
  
      resetForm();
      setIsModalOpen(false);
  
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error(`Gặp lỗi khi đặt hàng: ${error.response?.data || error.message}`);
    }
  };
  
  const handlePaymentMethodChange = (event) => {
    setHoaDonOnline((prevState) => ({
      ...prevState,
      IdPhuongThucThanhToan: event.target.value,
   
    }));
  };

  return (
    <div className="GioHang pb-4">
      <div className="cart-container">
        <h2>GIỎ HÀNG</h2>
        <div className="cart-content">
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {dsspgiohangs &&
                  dsspgiohangs.map((sp) => (
                    <tr key={sp.id}>
                      <td>
                        <input
                          onChange={() => HandleOchangeChecked(sp)}
                          type="checkbox"
                          checked={sp.check}
                        ></input>
                      </td>
                      <td>
                        <div className="product-info">
                          <img className="mt-3" src={sp.anh} alt="Áo sơ mi" />
                          <div>
                            <p>
                              {sp.tensp}-{sp.tenms}
                            </p>
                            <p>{sp.ma}</p>
                            <p>Size: {sp.tenkt}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        {sp.giaban.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>
                        <input
                          onChange={(event) => Handleonchangesp(event, sp)}
                          type="number"
                          value={sp.soluongmua}
                        />
                      </td>
                      <td>{(sp.giaban * sp.soluongmua).toLocaleString()} VND</td>
                      <td>
                        <BiX
                          onClick={() => HandleOnclickDeletesp(sp)}
                          size="2em"
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <hr />
            <button
              style={{ fontSize: "14px", borderRadius: "5px" }}
              onClick={Hanleonclickthemspkhac}
              className="add-more-button"
            >
              CHỌN THÊM SẢN PHẨM KHÁC
            </button>
          </div>
          <div className="cart-summary">
            <h5>THÔNG TIN CHUNG</h5>
            <p>
              Tổng giỏ hàng:{" "}
              {tongTienBanDau.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <div className="mb-3">
              {user && user.diemTich > 0 && (
                        <div className="d-flex align-items-center">
                          <span className="me-3">Điểm hiện tại: { user.diemTich } </span>
                            <input 
                              type="checkbox"
                              id="diem-tich-luy-switch"
                              checked={isDiemTichLuy}
                              onChange={handleClickDiemTichLuy}
                            />
                        </div>
                      )
              }

            </div>
            <div className="voucher-selection">
          <label>Chọn Voucher:</label>
          <Select
            value={selectedVoucher}
            onChange={handleVoucherChange}
            options={availableVouchers}
            placeholder="Chọn voucher"
            isClearable
            isOptionDisabled={(option) => option.isDisabled}
          />
      

        </div>
           
          {/* <p>
            Voucher sử dụng: {voucher ? `${voucher.ten} - ${voucher.giaTri}` : 'Không có voucher'}
          </p> */}

           
            <p>Giảm giá: -{(tienGiamVoucher + tienGiamDiem).toLocaleString()} VND</p>
            <p>Phí vận chuyển: {shippingCost.toLocaleString()} VND</p>
            {/* <div className="discount-code">
              <input type="text" placeholder="Nhập mã khuyến mãi nếu có" />
              <button>SỬ DỤNG</button>
            </div> */}
            <hr className="my-3" />
            <h5>Tổng cộng: {(tongTien).toLocaleString() } VND</h5>
            <hr className="my-3" />
          </div>
        </div>
      </div>
      <div className="checkout-container mt-5">
        <div className="customer-info">
          <h3>THÔNG TIN KHÁCH HÀNG</h3>
          {user && user.vaiTro === 1 ? (
            <div className="mt-4">
              {dckh &&
                dckh.map((p) => (
                  <div key={p.id}>
                    <div className="d-flex">
                      <div style={{ width: "10%" }}>
                        <input
                          className="mt-4"
                          style={{ width: "15px", height: "15px" }}
                          type="checkbox"
                          onChange={() => HandleOnchangeCheckbox(p)}
                          checked={p.trangThai === 1 ? true : false}
                        />
                      </div>
                      <div className="w-75">
                        <div className="d-flex">
                          <h6>{p.tenKhachHang}|</h6>
                          <h6 className=" opacity-75 ms-2">{p.sdt}</h6>
                        </div>
                        <div>
                          <p>{p.diaChi}</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        {/* <div className="btn_sua">
                          <IoSettings />
                        </div>
                        <div className="mx-3 mt-2">|</div> */}
                        <div className="btn_xoa">
                          <TiDelete onClick={() => HandleOnclickDeleteDC(p)} />
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />
                  </div>
                ))}
              <div>
                <div
                  onClick={() => setShows(true)}
                  className="w-25 mx-auto d-flex"
                  style={{ cursor: "pointer" }}
                > 
                  <div>+</div>
                  <div>Thêm mới địa chỉ</div>
                </div>
              </div>
            </div>
          ) : (
            <form>
              <div
                className="mb-4 curtordangnhap"
                onClick={() => setShows(true)}
              >
                <AiOutlineUser /> Đăng nhập nếu đã là thành viên
              </div>
              <label>Họ và tên (*)</label>
              <input
                id="TenKhachHang"
                type="text"
                value={ hoaDonOnline.TenKhachHang || ''}
                onChange={handleInputChange}
                placeholder="Họ và tên"
                required
                isInvalid={!!errors.TenKhachHang}
              />
                {errors.TenKhachHang && <div className="text-danger">{errors.TenKhachHang}</div>}
              <label>Email</label>
              <input
                id="Email"
                type="email"
                value={ hoaDonOnline.Email || ''}
                onChange={handleInputChange}
                placeholder="Email"
                required
                isInvalid={!!errors.Email}
              />
              {errors.Email && <div className="text-danger">{errors.Email}</div>}
              <label>Điện thoại (*)</label>
              <input
                id="SDT"
                type="text"
                value={ hoaDonOnline.SDT || ''}
                onChange={handleInputChange}
                placeholder="Điện thoại"
                required
                isInvalid={!!errors.SDT}
              />
             {errors.SDT && <div className="text-danger">{errors.SDT}</div>}
              <label>Địa chỉ (*)</label>
              <input
                id="DiaChi" 
                type="text" 
                value={ hoaDonOnline.DiaChi.split(',')[0] || ''} 
                onChange={handleInputChange} 
                placeholder="Địa chỉ" 
                required 
                isInvalid={!!errors.DiaChi}
                />
               {errors.DiaChi && <div className="text-danger">{errors.DiaChi}</div>}

              <label>Tỉnh/ Thành phố</label>
              <Select
                value={selectedProvince}
                onChange={handleProvinceChange}
                options={provinces}
                placeholder="Chọn Tỉnh/ Thành phố"
                isInvalid={!!errors.selectedProvince}
              />
              {errors.selectedProvince && <div className="text-danger">{errors.selectedProvince}</div>}
              <label>Quận Huyện</label>
              <Select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                options={districts}
                placeholder="Chọn Quận Huyện"
                isDisabled={!selectedProvince}
                isInvalid={!!errors.selectedDistrict}
              />
              {errors.selectedDistrict && <div className="text-danger">{errors.selectedDistrict}</div>}
              <label>Ghi chú cho hóa đơn</label>
              <textarea id="GhiChu" value={ hoaDonOnline.GhiChu || ''} onChange={handleInputChange} placeholder="Ghi chú cho hóa đơn"></textarea>
              {/* <div className="checkbox-group">
              <label>
                <input type="checkbox" /> Giao hàng tại địa chỉ khác
              </label>
              <label>
                <input type="checkbox" /> Xuất hóa đơn công ty
              </label>
            </div> */}
            </form>
          )}
        </div>
        <div className="payment-method">
          <h5>PHƯƠNG THỨC THANH TOÁN</h5>
          <div className="payment-options">
          <label>
          <input 
          id="payment-method"
          type="radio" 
          name="payment-method"
          value="f1fb9f0b-5db2-4e04-8ba3-84e96f0d820c"
          onChange={(e) => handlePaymentMethodChange(e)}
          defaultChecked 
           /> 
          Thanh toán khi nhận hàng (COD)
        </label>
        <p>
          Cảm ơn quý khách đã mua sắm tại SHOP MAN
          <br />
          **Lưu ý: Mã giảm giá không áp dụng cho các sản phẩm đang khuyến mãi
          <br />
          Để ship nhanh trong ngày, vui lòng gọi (028) 36 222 000 để được hướng dẫn
        </p>
        <label>
          <input 
           id="payment-method"
           type="radio" 
           name="payment-method"
          value="fab870b4-7a7d-403a-a855-b7431a3c9252" 
          onChange={(e) => handlePaymentMethodChange(e)}
          /> 
          Thanh toán qua TÀI KHOẢN NGÂN HÀNG
        </label>

            <p>
              Khi chuyển khoản, quý khách vui lòng nhập nội dung chuyển khoản:
              <br />
              Mua [Tên loại sản phẩm hoặc mã số đơn hàng] - [Tên khách hàng] -
              [Số điện thoại]
              <br />
              Tên tài khoản: Nguyễn Văn Kiên
              <br />
              Số tài khoản: 04449819001
              <br />
              Ngân Hàng Ngân hàng Thương mại Cổ phần Tiên Phong (TPBANK) - CN.
              Tân Định - Tp. Hồ Chí Minh
            </p>
            <p>
              **Lưu ý: Mã giảm giá không áp dụng cho các sản phẩm đang khuyến
              mãi
              <br />
              Để ship nhanh trong ngày, vui lòng gọi (028) 36 222 000 để được
              hướng dẫn
            </p>
            <p>Cảm ơn quý khách đã mua sắm tại Oldsailor.com.vn</p>
          </div>
          {errors.IdPhuongThucThanhToan && <div className="text-danger">{errors.IdPhuongThucThanhToan}</div>}
          <button
            className="complete-order-button"
            style={{ borderRadius: "5px" }}
            onClick={openConfirmationModal}
          >
            ĐẶT HÀNG
          </button>
        
           {isModalOpen && (
            <ConfirmationModal
              show={isModalOpen}
              onHide={() => setIsModalOpen(false)}
              data={modalData}
              onConfirm={HandleDatHang}
            />
          )}
        </div>
      </div>
     
      {/* <ModalDangNhap show={shows} setShow={setShows} /> */}
      <ModalThemDiaChiMoi
        show={shows}
        setShow={setShows}
        setload={setload}
        load={load}
      />
    </div>
  );
};

export default GioHang;
