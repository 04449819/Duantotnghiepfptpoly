import { useEffect } from "react";
import "./HomePage.scss";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const HomePage = () => {
  useEffect(() => {
    return () => {
      toast.dismiss();
    };
  }, []);
  return (
    <>
      <div className="content1">
        <Carousel interval={4000}>
          <Carousel.Item>
            <img src="https://media3.coolmate.me/cdn-cgi/image/width=1000,quality=90,format=auto/uploads/May2024/SOMI_PREMIUM_XAM.png" />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://media3.coolmate.me/cdn-cgi/image/width=1000,quality=90,format=auto/uploads/May2024/SOMI_PREMIUM_XAM.png" />
            <Carousel.Caption>
              {/* <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://media3.coolmate.me/cdn-cgi/image/width=1000,quality=90,format=auto/uploads/May2024/SOMI_PREMIUM_XAM.png" />
            <Carousel.Caption>
              {/* <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className=" homepage-top">
        <div className="hompage-img1">
          <div className="text1">
            <h3>
              Phân loại đa <br />{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              dạng
            </h3>
            <Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MUA SẮM NGAY</Link>
          </div>
          <img src="https://bizweb.dktcdn.net/100/287/440/products/ao-thun-local-brand-nam-mau-den-dep-gia-re-2.jpg?v=1637146834377" />
        </div>
        <div className="hompage-img2">
          <div className="text2">
            <h3>Trẻ trung</h3>
            <Link>MUA SẮM NGAY</Link>
          </div>
          <img src="https://bizweb.dktcdn.net/100/287/440/products/ao-thun-local-brand-nam-mau-den-dep-gia-re-2.jpg?v=1637146834377" />
        </div>
        <div className="hompage-img3">
          <div className="text3">
            <h3>Thiết kế hiện đại</h3>
            <Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; MUA
              SẮM NGAY
            </Link>
          </div>
          <img src="https://bizweb.dktcdn.net/100/287/440/products/ao-thun-local-brand-nam-mau-den-dep-gia-re-2.jpg?v=1637146834377" />
        </div>
      </div>
      <div className="homepage-content">
        <div className="sanphammoi">
          <h3>sanphammoi</h3>
        </div>
        <div className="sanphamhot">
          <h3>sanphamhot</h3>
        </div>
      </div>
    </>
  );
};
export default HomePage;
