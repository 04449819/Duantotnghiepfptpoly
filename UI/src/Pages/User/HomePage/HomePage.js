import "./HomePage.scss";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
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
