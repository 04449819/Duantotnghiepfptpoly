import { useState } from "react";
import "./BanHangOfline.scss";
import axios from "axios";
import { toast } from "react-toastify";
// import axios from "axios";
// import { toast } from "react-toastify";
import DanhSachSanPham from "./DanhSachSanPham/DanhSachSanPham";
import HoaDon from "./HoaDon/HoaDon";
const BanHangOfline = () => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, SetEmail] = useState("");
  const [address, setAddress] = useState("");
  const [inputreadOnly, setinputreadOnly] = useState(true);
  const [coler, setcoler] = useState("white");
  const [btnSearch, setbtnSearch] = useState(false);
  const [datasp, setData] = useState([]);
  let inputtrue = !inputreadOnly;

  const HandleOnclickSearchKH = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/KhachHang/getBySDT?sdt=${search}`
      );
      if (res.status === 200) {
        setName(res.data.ten);
        setPhone(res.data.sdt);
        setAddress(res.data.diaChi);
        SetEmail(res.data.email);
      } else {
        toast.error("Số điện thoại or email chưa được đăng kí");
        setName("");
        setPhone("");
        setAddress("");
        SetEmail("");
      }
    } catch (error) {
      setName("");
      setPhone("");
      setAddress("");
      SetEmail("");
      toast.error("Số điện thoại or email chưa được đăng kí");
    }
  };
  const HandleOnclickAdd = async () => {
    if (inputreadOnly === true) {
      setcoler("rgb(107, 101, 101)");
      setinputreadOnly(inputtrue);
      setName("");
      setPhone("");
      setAddress("");
      SetEmail("");
      setbtnSearch(true);
    } else {
      const pass = Math.floor(Math.random(100) * 1000000000).toString();
      const KhachHang = {
        idKhachHang: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        email: email,
        ten: name,
        sdt: phone,
        password: pass,
        confirmPassword: pass,
        diemTich: 0,
        trangThai: 0,
        gioiTinh: 0,
        ngaySinh: "",
        diaChi: "",
      };
      if (name === "") {
        toast.error("tên không hợp lệ");
        setName("");
        return;
      }
      if (!validatesdt(phone)) {
        toast.error("Số điện thoại không hợp lệ");
        setPhone("");
        return;
      }
      if (!validateEmail(email)) {
        toast.error("email không hợp lệ");
        SetEmail("");
        return;
      }
      try {
        const res = await axios.post(
          "https://localhost:7095/api/KhachHang/PostKHView1",
          KhachHang
        );
        console.log(res);
        if (res.data === true) {
          toast.success("thêm khách hàng thành công");
        }
        if (res.data === false) {
          toast.error("khach hang da ton tai");
          return;
        }
      } catch (error) {
        toast.error("lỗi hệ thống");
      }
      setName("");
      setPhone("");
      setAddress("");
      SetEmail("");
      setinputreadOnly(inputtrue);
      setcoler("white");
    }
  };

  const HandleOnclickclose = () => {
    setName("");
    setPhone("");
    setAddress("");
    SetEmail("");
    setinputreadOnly(true);
    setcoler("white");
    setbtnSearch(false);
  };

  const validatesdt = (sdt) => {
    return String(sdt)
      .toLowerCase()
      .match(/^(0)([0-9]){9,9}$/);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const Getdata = async (inputsearch) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/GetChiTietSanPhamByIDChiTietSanPham?id=${inputsearch}`
      );
      const existingItem = datasp.find(
        (item) => item.idCTSP === res.data.idCTSP
      );
      if (existingItem) {
        const sanpham = datasp.map((item) => {
          if (item.idCTSP === res.data.idCTSP)
            return {
              ...item,
              soLuongmua: item.soLuongmua + res.data.soLuongmua,
            };
          return item;
        });
        setData(sanpham);
      } else {
        setData([...datasp, res.data]);
      }
    } catch (error) {
      toast.error("Thông tin sản phẩm không chính xác");
    }
  };

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
                  placeholder="email or sdt"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={HandleOnclickSearchKH}
                  disabled={btnSearch}
                  tabIndex="-1"
                >
                  Tìm kiếm
                </button>
                <div className="banhangofline_title">
                  <h3>Thông tin khách hàng</h3>
                </div>
              </div>
              <div style={{ backgroundColor: coler }}>
                <div className="row">
                  <div className="col-5">
                    <input
                      style={{ width: "99.5%" }}
                      type="text"
                      className="form-control"
                      placeholder="họ và tên"
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
                    placeholder="số điện thoại"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    readOnly={inputreadOnly}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={HandleOnclickAdd}
                    tabIndex="-1"
                  >
                    Thêm tài khoản mới
                  </button>
                  <button
                    style={{ marginLeft: "20px" }}
                    type="button"
                    className="btn btn-danger"
                    onClick={HandleOnclickclose}
                    tabIndex="-1"
                  >
                    Hủy đăng kí
                  </button>
                </div>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="email"
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
                  <h6>Sản phẩm: 1</h6>
                  <h6>Giá: xxxx &nbsp;&nbsp;&nbsp; Giảm: xxxx</h6>
                  <h5>Tổng tiền: xxxx</h5>
                </div>
              </div>
            </div>
            <div className="BanHangof_giohang_sanphamdamua">
              <DanhSachSanPham
                datasp={datasp}
                Getdata={Getdata}
                setData={setData}
              />
            </div>
          </div>
        </div>
        <div className="col-3 banhangof_hoadon">
          <HoaDon />
        </div>
      </div>
    </div>
  );
};

export default BanHangOfline;
