import React, { useEffect, useState } from "react";
// import "./ProductPage.css";
import "./style.scss";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setchitietspgiohang } from "../../../Rudux/Reducer/taiKhoanSlice";
import axios from "axios";
import { setchitietsp } from "../../../Rudux/Reducer/chitietsanphamonl";
const ChiTietSanPhamKH = () => {
  const [chonsize, setchonsize] = useState("");
  const [soluong, setsoluong] = useState(0);
  const [giaban, setgiaban] = useState(0);
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [kt, setkt] = useState({});
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true, // Thêm thuộc tính autoplay
    autoplaySpeed: 3000, // Thay đổi thời gian chuyển slide (3000ms = 3 giây)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const user = useSelector((p) => p.user.User);
  const Handleonclickchuyentrang1 = (product) => {
    dispath(setchitietsp(product));
    // const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // thêm hiệu ứng cuộn mượt mà
    });
    // };
  };
  const chitietsanpham = useSelector((p) => p.setchitietsp.chitietsp);
  useEffect(() => {
    console.log(chitietsanpham);
    const groupedBySize = chitietsanpham.ctsp.reduce((acc, product) => {
      const size = product.idKichCo;

      if (!acc[size]) {
        acc[size] = [];
      }

      acc[size].push(product);
      return acc;
    }, {});
    // console.log(groupedBySize);
    setkt(groupedBySize);

    getSanPhamBanHang();
    if (chitietsanpham && chitietsanpham.ctsp) {
      const sanphamcantim = chitietsanpham.ctsp.find(
        (p) => p.idKichCo === chonsize
      );
      if (sanphamcantim !== undefined) {
        setsoluong(sanphamcantim.soluong);
        setgiaban(sanphamcantim.giaban);
      } else {
        chitietsanpham.ctsp[0] && setsoluong(chitietsanpham.ctsp[0].soluong);
        chitietsanpham.ctsp[0] && setgiaban(chitietsanpham.ctsp[0].giaban);
      }
    }
  }, [chonsize]);
  const dispath = useDispatch();
  const HandleOnclickDatMuaNgay = async () => {
    if (chonsize === "") return toast.error("Bạn chưa chọn size cho sản phẩm");
    const sanphamcantim = chitietsanpham.ctsp.find(
      (p) => p.idKichCo === chonsize
    );
    console.log("spcantim", sanphamcantim);
    const sanphamcanmua = { ...sanphamcantim, soluongmua: 1 }; //
    if (user && user.sdt !== "" && user.vaiTro === 1) {
      try {
        const res = await axios.post(
          `https://localhost:7095/api/GioHang/Addchitietgiohang?idnguoidung=${user.id}&idctsp=${sanphamcanmua.id}&soluong=1`
        );
        toast.success(`${res.data}`);
        const sp = { ...sanphamcanmua, check: true };
        dispath(setchitietspgiohang(sp));
        navigate("/giohang");
      } catch (error) {
        toast.error(`Gặp lỗi: ${error.response?.data || error.message}`);
      }
    } else {
      const sp = { ...sanphamcanmua, check: true };
      dispath(setchitietspgiohang(sp));
      navigate("/giohang");
    }
  };

  const HandleOnclickThemVaoGioHang = async () => {
    if (chonsize === "") return toast.error("Bạn chưa chọn size cho sản phẩm");

    const sanphamcantim = chitietsanpham.ctsp.find(
      (p) => p.idKichCo === chonsize
    );

    if (!sanphamcantim)
      return toast.error("Không tìm thấy sản phẩm phù hợp với size đã chọn");

    const sanphamcanmua = { ...sanphamcantim, soluongmua: 1 };

    if (user && user.sdt !== "" && user.vaiTro === 1) {
      try {
        const res = await axios.post(
          `https://localhost:7095/api/GioHang/Addchitietgiohang?idnguoidung=${user.id}&idctsp=${sanphamcanmua.id}&soluong=1`
        );
        toast.success(`${res.data}`);
        const sp = { ...sanphamcanmua, check: false };
        dispath(setchitietspgiohang(sp));
      } catch (error) {
        toast.error(`Gặp lỗi: ${error.response?.data || error.message}`);
      }
    } else {
      const sp = { ...sanphamcanmua, check: false };
      dispath(setchitietspgiohang(sp));
      toast.success("Đã thêm!");
    }
  };

  const getSanPhamBanHang = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/getSPbanhangonl?currentPage=1&productsPerPage=20`
      );
      // console.log(res.data.sp);
      setdata(res.data.sp);
    } catch (error) {}
  };

  return (
    <div>
      <div className="ChiTietSanPhamKH">
        <div className="product-page">
          <div className="product-page__header">
            <Link
              className="text-black product-title hover-underline-animation"
              to="/cuahang"
            >
              Quay lại
            </Link>
            <div className="mx-2 pt-2">|</div>

            <Link
              to="/"
              className="text-black product-title hover-underline-animation"
            >
              Trang chủ
            </Link>
            <div className="mx-2 pt-2">
              <BiChevronRight />
            </div>
            <Link
              to="/cuahang"
              className="text-black product-title hover-underline-animation"
            >
              Sản phẩm
            </Link>
            <div className="mx-2 pt-2">
              <BiChevronRight />
            </div>
            <div className="mt-2">Chi tiết sản phẩm</div>
          </div>
          <hr />
          <div className="product-page__main">
            <div className="product-page__gallery row">
              <div className="product-page__thumbnails">
                {/* Danh sách hình ảnh nhỏ */}
                {/* <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZX2-naUl3LtHD7jRXWXnF-_ek5uep8R2YA&s"
                  alt="thumbnail"
                />
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZX2-naUl3LtHD7jRXWXnF-_ek5uep8R2YA&s"
                  alt="thumbnail"
                />
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZX2-naUl3LtHD7jRXWXnF-_ek5uep8R2YA&s"
                  alt="thumbnail"
                />
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZX2-naUl3LtHD7jRXWXnF-_ek5uep8R2YA&s"
                  alt="thumbnail"
                /> */}
              </div>
              <div className="product-page__image col-9 ms-5">
                {/* Hình ảnh chính */}
                {chitietsanpham.ctsp && chitietsanpham.ctsp[0] && (
                  <img
                    src={
                      chitietsanpham.ctsp &&
                      chitietsanpham.ctsp[0] &&
                      chitietsanpham.ctsp[0].anh
                    }
                    alt="product"
                  />
                )}
              </div>
            </div>
            <div className="product-page__details">
              <h3>
                {chitietsanpham.ctsp &&
                  chitietsanpham.ctsp[0] &&
                  `${chitietsanpham.ctsp[0].tensp} - ${chitietsanpham.ctsp[0].ma} - ${chitietsanpham.ctsp[0].tenms}`}
              </h3>
              <p className="mt-3">Hiện có: {soluong} sản phẩm</p>
              <h5>
                Giá bán: &nbsp;
                {giaban.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </h5>
              <div className="product-page__sizes">
                {/* <label htmlFor="size">Kích thước size:</label> */}

                <select
                  onChange={(event) => setchonsize(event.target.value)}
                  id="size"
                >
                  <option value="">Chọn size</option>
                  {Object.keys(kt).map((size) => (
                    <option className="select-option" key={size} value={size}>
                      {kt[size][0].tenkt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <button
                  style={{ fontSize: "14px", borderRadius: "5px" }}
                  className="product-page__buy-btn"
                  onClick={() => HandleOnclickDatMuaNgay()}
                >
                  ĐẶT MUA NGAY
                </button>
              </div>

              <button
                className="product-page__buy-btn"
                style={{ fontSize: "14px", borderRadius: "5px" }}
                onClick={() => HandleOnclickThemVaoGioHang()}
              >
                THÊM VÀO GIỎ HÀNG
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="ChiTietSanPhamKH1 mt-3">
        <div className="w-25">
          <hr />
        </div>
        <h2>Chi tiết sản phẩm</h2>
      </div>
      <div className="ChiTietSanPhamKH">
        <div className="size-chart">
          <div className="row">
            <div className="col-7">
              <div className="size-chart__header">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZX2-naUl3LtHD7jRXWXnF-_ek5uep8R2YA&s"
                  alt="Old Sailor"
                  className="size-chart__logo"
                />
                <h1>BẢNG SIZE SHIRT - TEE</h1>
                <p>
                  FORM: <strong>BASIC</strong>
                </p>
              </div>
              <div className="size-chart__table">
                <table>
                  <thead>
                    <tr>
                      <th>SIZE</th>
                      <th>M</th>
                      <th>L</th>
                      <th>XL</th>
                      <th>2XL</th>
                      <th>3XL</th>
                      <th>4XL</th>
                      <th>5XL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>CHIỀU CAO (CM)</td>
                      <td>160 - 165</td>
                      <td>160 - 170</td>
                      <td>165 - 173</td>
                      <td>165 - 180</td>
                      <td>170 - 185</td>
                      <td>170 - 190</td>
                      <td>175 - 195</td>
                    </tr>
                    <tr>
                      <td>CÂN NẶNG (KG)</td>
                      <td>55 - 65</td>
                      <td>65 - 75</td>
                      <td>75 - 85</td>
                      <td>85 - 95</td>
                      <td>95 - 105</td>
                      <td>105 - 110</td>
                      <td>110 - 120</td>
                    </tr>
                    <tr>
                      <td>DÀI ÁO (CM)</td>
                      <td>69.5</td>
                      <td>71</td>
                      <td>72.5</td>
                      <td>75</td>
                      <td>78</td>
                      <td>81</td>
                      <td>83</td>
                    </tr>
                    <tr>
                      <td>NGỰC ÁO (CM)</td>
                      <td>52</td>
                      <td>54</td>
                      <td>56</td>
                      <td>60</td>
                      <td>64</td>
                      <td>68</td>
                      <td>72</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="size-chart__footer">
                <p>Kiểu form: Basic</p>
                <p>Chất liệu áo thun: Cotton 2 chiều</p>
                <p>Size: M - 5XL</p>
              </div>
              <div className="size-chart__footer1">
                <h5>Hướng dẫn sử dụng và bảo quản Áo thun của Old Sailor</h5>
                <p className="mt-4">
                  + Khi mới mua về nên giặt lần đầu tiên, nhiệt độ thì bình
                  thường.
                </p>
                <p>
                  + Không nên dùng chất hóa chất để tẩy quá nhiều ( trừ áo trắng
                  trơn ).
                </p>
                <p>
                  + Khi phơi nên chọn mặt ngược lại để phơi, tránh trường hợp
                  phai màu.
                </p>
                <p className="mt-4">
                  Áo thun nam, áo thun nam Old Sailor, áo thun nam the big size,
                  áo thun cổ tròn, áo thun cá tính, áo thun năng động, áo thun
                  thiết kế phù hợp xu hướng hiện nay, Áo thun nam the Big size,
                  áo thun nam Old Sailor- the Big size , áo thun nam the big
                  size, áo thun cổ tròn the Big size, áo thun cá tính the Big
                  size, áo thun năng động the Big size, áo thun thiết kế phù hợp
                  xu
                </p>
              </div>
            </div>
            <div className="size-chart__product col-5">
              <img
                src={
                  chitietsanpham.ctsp &&
                  chitietsanpham.ctsp[0] &&
                  chitietsanpham.ctsp[0].anh
                }
                alt="ATDE88593"
                className="size-chart__product-image"
              />
              <p>
                {chitietsanpham.ctsp &&
                  chitietsanpham.ctsp[0] &&
                  chitietsanpham.ctsp[0].ma}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="ChiTietSanPhamKH1 mt-3">
        <div className="w-25">
          <hr />
        </div>
        <h2>Sản phẩm nam khác</h2>
      </div>
      <div className="ChiTietSanPhamKH mt-3">
        <Slider {...settings}>
          {data.map((product, index) => (
            <div key={index}>
              <button
                onClick={() => Handleonclickchuyentrang1(product)}
                style={{ border: "none", backgroundColor: "#e1e1e1" }}
              >
                <div
                  style={{ width: "200px", height: "200px" }}
                  className="homepage-top-khung"
                >
                  <img
                    src={product.ctsp && product.ctsp[0] && product.ctsp[0].anh}
                    alt={product.ctsp && product.ctsp[0] && product.ctsp[0].anh}
                    style={{ width: "170px", height: "200px" }}
                  />
                </div>
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ChiTietSanPhamKH;
