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
  SetDiachiChinhNhanHang,
  Updatespchitietspgiohang,
} from "../../../Rudux/Reducer/taiKhoanSlice";
import axios from "axios";
import { toast } from "react-toastify";
import ModalThemDiaChiMoi from "./ModalThemDiaChiMoi";
import { TiDelete } from "react-icons/ti";
// import { IoSettings } from "react-icons/io5";
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
  const [load, setload] = useState(false);

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
    // getLoaiSanPhamBanHang2();
    if (user.id !== undefined) {
      getDiaChiKhachHang();
    }
  }, [dsspgiohang, load]);

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

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    getLoaiSanPhamBanHang2(selectedOption.value);
    setSelectedDistrict(null); // Reset district khi thay đổi tỉnh/thành phố
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
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
                      <td>355,000 VND</td>
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
              {tongTien.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p>Giảm giá: -0 VND</p>
            <p>Phí vận chuyển: 30,000 VND</p>
            <div className="discount-code">
              <input type="text" placeholder="Nhập mã khuyến mãi nếu có" />
              <button>SỬ DỤNG</button>
            </div>
            <hr className="my-3" />
            <h5>Tổng cộng: 385,000 VND</h5>
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
                type="text"
                value={user && user.ten}
                placeholder="Họ và tên"
                required
              />
              <label>Email</label>
              <input
                type="email"
                value={user && user.email}
                placeholder="Email"
              />
              <label>Điện thoại (*)</label>
              <input
                type="text"
                value={user && user.sdt}
                placeholder="Điện thoại"
                required
              />
              <label>Địa chỉ (*)</label>
              <input type="text" placeholder="Địa chỉ" required />
              <label>Tỉnh/ Thành phố</label>
              <Select
                value={selectedProvince}
                onChange={handleProvinceChange}
                options={provinces}
                placeholder="Chọn Tỉnh/ Thành phố"
              />
              <label>Quận Huyện</label>
              <Select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                options={districts}
                placeholder="Chọn Quận Huyện"
                isDisabled={!selectedProvince}
              />
              <label>Ghi chú cho hóa đơn</label>
              <textarea placeholder="Ghi chú cho hóa đơn"></textarea>
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
              <input type="radio" name="payment" defaultChecked /> Thanh toán
              khi nhận hàng (COD)
            </label>
            <p>
              Cảm ơn quý khách đã mua sắm tại SHOP MAN
              <br />
              **Lưu ý: Mã giảm giá không áp dụng cho các sản phẩm đang khuyến
              mãi
              <br />
              Để ship nhanh trong ngày, vui lòng gọi (028) 36 222 000 để được
              hướng dẫn
            </p>
            <label>
              <input type="radio" name="payment" /> Thanh toán qua TÀI KHOẢN
              NGÂN HÀNG
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
          <button
            className="complete-order-button"
            style={{ borderRadius: "5px" }}
          >
            ĐẶT HÀNG
          </button>
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
