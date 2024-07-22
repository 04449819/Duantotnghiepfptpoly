import { useEffect, useState } from "react";
import "./HomePage.scss";
import Carousel1 from "react-bootstrap/Carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../CuaHang/cuahang.scss";
const HomePage = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    // toast.dismiss();
    getSanPhamBanHang();
  }, []);

  const getSanPhamBanHang = async () => {
    const res = await axios.get(
      "https://localhost:7095/api/SanPham/getAllSPBanHang?currentPage=1&productsPerPage=10"
    );
    // console.log(res.data.sanPham);
    setdata(res.data.sanPham);
  };

  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
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

  const Handleonclickchuyentrang = () => {
    navigate("/cuahang");
  };

  const Handleonclickchuyentrang1 = () => {
    navigate("/chitietsanpham");
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
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmDoF-gZPGl2KpHeDWjt4hMjjIx5EIv7cOFw&s",
      title: "Áo Polos",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw7HM7t_dAWuriht_wWGSCM0ipRg7wk8_xfw&s",
      title: "Áo Polos",
    },
  ];

  return (
    <>
      <div className="content1">
        <Carousel1 interval={3000}>
          <Carousel1.Item>
            <Link style={{ padding: "10px" }} to="/cuahang" className="btn">
              <img
                style={{ width: "1500px", height: "600px" }}
                src="https://media-fmplus.cdn.vccloud.vn/uploads/news/7742e2dd-1dd7-4459-a17e-b532079d7bc0.png"
                alt="haha"
              />
            </Link>
            <Carousel1.Caption className="mb-4">
              <Link to="/cuahang" className="btn">
                <span style={{ fontSize: "32px" }} className="btn-inner">
                  Mua sắm ngay
                </span>
              </Link>
            </Carousel1.Caption>
          </Carousel1.Item>
          <Carousel1.Item>
            <Link style={{ padding: "10px" }} to="/cuahang" className="btn">
              <img
                style={{ width: "1500px", height: "600px" }}
                src="https://media-fmplus.cdn.vccloud.vn/uploads/news/3eba0a63-ec4a-4195-994a-fede3d7b1d25.jpeg"
                alt="haha"
              />
            </Link>
            <Carousel1.Caption className="mb-4">
              <Link to="/cuahang" className="btn">
                <span style={{ fontSize: "32px" }} className="btn-inner">
                  Mua sắm ngay
                </span>
              </Link>
            </Carousel1.Caption>
          </Carousel1.Item>
          <Carousel1.Item>
            <Link style={{ padding: "10px" }} to="/cuahang" className="btn">
              <img
                style={{ width: "1500px", height: "600px" }}
                src="https://img.pikbest.com/origin/06/43/50/933pIkbEsT7AG.jpg!w700wp"
                alt="haha"
              />
            </Link>
            <Carousel1.Caption className="mb-4">
              <Link to="/cuahang" className="btn">
                <span style={{ fontSize: "32px" }} className="btn-inner">
                  Mua sắm ngay
                </span>
              </Link>
            </Carousel1.Caption>
          </Carousel1.Item>
        </Carousel1>
      </div>
      <div className="homepage-top row mx-auto mt-4">
        <div className="col-6">
          <div className=" ms-5 homepage-top-lay1">
            <button
              onClick={Handleonclickchuyentrang}
              style={{ border: "none", backgroundColor: "#e1e1e1" }}
            >
              <div className="homepage-top-khung">
                <img
                  // style={{ width: "530px", height: "595px" }}
                  src="https://bizweb.dktcdn.net/100/399/392/articles/cach-phoi-do-voi-ao-thun-nam-co-co.png?v=1672334905150"
                  alt="haha"
                />
              </div>
            </button>
            <Link to="/cuahang" className="btn">
              <span className="btn-inner">Mua sắm ngay</span>
            </Link>
          </div>
        </div>
        <div className="col-6">
          <div className=" ms-3 homepage-top-lay1">
            <button
              onClick={Handleonclickchuyentrang}
              style={{ border: "none", backgroundColor: "#e1e1e1" }}
            >
              <div className="homepage-top-khung">
                <img
                  src="https://bizweb.dktcdn.net/100/399/392/articles/phoi-quan-tay-voi-ao-thun-nam.png?v=1672675889337"
                  alt="aaa"
                />
              </div>
            </button>
            <Link to="/cuahang" className="btn">
              <span className="btn-inner">Mua sắm ngay</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="homepage-content">
        <div className="sanphammoi mt-4">
          <div className="sanphammoi-content">
            <div className="w-25 mb-3">
              <p style={{ fontSize: "20px" }}>SẢN PHẨM BÁN CHẠY</p>
            </div>
          </div>
          <div>
            <Slider {...settings}>
              {data.map((product, index) => (
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
                        src={product.anhs[0].duongDan}
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
        <div className="mt-4">
          <div style={{ backgroundColor: "white" }} className="w-75 mx-auto">
            <div className="row">
              {products.map((product, index) => (
                <div key={index} className="col-3 my-3">
                  <div style={{ width: "80%" }} className="mx-auto">
                    <div
                      style={{ width: "100%", height: "250px" }}
                      className="homepage-top-khung"
                    >
                      <img src={product.image} alt={product.image} />
                    </div>
                    <div className="mt-2">
                      <Link
                        to={"/cuahang"}
                        style={{ opacity: "1" }}
                        className="product-title hover-underline-animation"
                      >
                        {product.title}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="homepage-top row mx-auto my-4">
          <div className="col-6">
            <div className=" ms-5 homepage-top-lay1">
              <button
                onClick={Handleonclickchuyentrang}
                style={{ border: "none", backgroundColor: "#e1e1e1" }}
              >
                <div className="homepage-top-khung">
                  <img
                    src="https://bizweb.dktcdn.net/100/399/392/files/phoi-quan-tay-voi-ao-thun-nam-mix-ao-khoac-blazer.jpg?v=1672675766402"
                    alt="haha"
                  />
                </div>
                <Link to="/cuahang" className="btn">
                  <span className="btn-inner">Mua sắm ngay</span>
                </Link>
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className=" ms-3 homepage-top-lay1">
              <button
                onClick={Handleonclickchuyentrang}
                style={{ border: "none", backgroundColor: "#e1e1e1" }}
              >
                <div className="homepage-top-khung">
                  <img
                    src="https://bizweb.dktcdn.net/100/399/392/files/style-quan-tay-ao-thun-nam-voi-ao-vest.jpg?v=1672675814495"
                    alt="haha"
                  />
                </div>
                <Link to="/cuahang" className="btn">
                  <span className="btn-inner">Mua sắm ngay</span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
