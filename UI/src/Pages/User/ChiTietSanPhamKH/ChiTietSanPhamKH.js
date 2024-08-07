import React from "react";
// import "./ProductPage.css";
import "./style.scss";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
const ChiTietSanPhamKH = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
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

  const Handleonclickchuyentrang1 = () => {
    navigate("/cuahang");
  };
  const products = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZX2-naUl3LtHD7jRXWXnF-_ek5uep8R2YA&s",
      title: "Áo",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjkPIlhIdx6LHsQkLpAGRi5K10fgE0hUL8Rw&s",
      title: "Hoodie - Sweater",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6fGWWwfxh8YFRD_nFsE1yl30fMiTe7oPaHA&s",
      title: "Áo Khoác",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX-_h3lQV0U6fhZdBo3MYcK5lTupdqQoN6vg&s",
      title: "Áo Sơ mi",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm7FDjsHKFiOsje28d5xHFtGk9zbkA4iV4Yw&s",
      title: "Áo Thun",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhdWrvgaByHH59L4NJHL3zf8NihxADPl14Q&s",
      title: "Áo Polos",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX-_h3lQV0U6fhZdBo3MYcK5lTupdqQoN6vg&s",
      title: "Áo Sơ mi",
    },
  ];
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
              <div className="product-page__thumbnails col-2">
                {/* Danh sách hình ảnh nhỏ */}
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
                />
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZX2-naUl3LtHD7jRXWXnF-_ek5uep8R2YA&s"
                  alt="thumbnail"
                />
              </div>
              <div className="product-page__image col-9">
                {/* Hình ảnh chính */}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZX2-naUl3LtHD7jRXWXnF-_ek5uep8R2YA&s"
                  alt="product"
                />
              </div>
            </div>
            <div className="product-page__details">
              <h3>
                Áo Thun Họa Tiết Catus Long Tee Old Sailor - ATDE88593 - Big
                Size upto 5XL
              </h3>
              <p>Mã sản phẩm - ATDE88593</p>
              <p>Giá: 315.000 ₫</p>
              <div className="product-page__sizes">
                <label htmlFor="size">Kích thước size:</label>
                <select id="size">
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                  <option value="3XL">3XL</option>
                  <option value="4XL">4XL</option>
                  <option value="5XL">5XL</option>
                </select>
              </div>
              <div className="">
                <button
                  style={{ fontSize: "14px", borderRadius: "5px" }}
                  className="product-page__buy-btn"
                >
                  ĐẶT MUA NGAY
                </button>
              </div>

              <button
                className="product-page__buy-btn"
                style={{ fontSize: "14px", borderRadius: "5px" }}
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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEZX2-naUl3LtHD7jRXWXnF-_ek5uep8R2YA&s"
                alt="ATDE88593"
                className="size-chart__product-image"
              />
              <p>ATDE88593</p>
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
          {products.map((product, index) => (
            <div key={index}>
              <button
                onClick={Handleonclickchuyentrang1}
                style={{ border: "none", backgroundColor: "#e1e1e1" }}
              >
                <div
                  style={{ width: "200px", height: "200px" }}
                  className="homepage-top-khung"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "150px", height: "200px" }}
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
