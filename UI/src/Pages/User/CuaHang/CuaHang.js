import { Link } from "react-router-dom";
import "./cuahang.scss";
import { useState } from "react";
import { MdApps, MdViewComfy } from "react-icons/md";
const CuaHang = () => {
  const [showProductGroup, setShowProductGroup] = useState(false);
  const [showProductGroup1, setShowProductGroup1] = useState(false);
  const [showProductGroup2, setShowProductGroup2] = useState(false);
  const [showProductGroup3, setShowProductGroup3] = useState(false);
  const [kichthuoc, setkichthuoc] = useState({ ktanh: "300px", kt: "col-4" });
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(10000);
  const [view, setView] = useState("list");
  const toggleProductGroup = () => {
    setShowProductGroup(!showProductGroup);
  };
  const toggleProductGroup1 = () => {
    setShowProductGroup1(!showProductGroup1);
  };
  const toggleProductGroup2 = () => {
    setShowProductGroup2(!showProductGroup2);
  };
  const toggleProductGroup3 = () => {
    setShowProductGroup3(!showProductGroup3);
  };

  const HandleOclicksetkt = () => {
    setView("grid");
    setkichthuoc({ ktanh: "200px", kt: "col-3" });
  };
  const HandleOclicksetkt1 = () => {
    setView("list");
    setkichthuoc({ ktanh: "300px", kt: "col-4" });
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
  ];
  const products1 = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-8nz-A_F5dqMvpmlTYLhkwI3Gmv7AkbVIYQ&s",
      name: "Áo Thun Họa Tiết Catus Long Tee Old Sailor",
      code: "ATDE88593",
      price: "315.000",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhdWrvgaByHH59L4NJHL3zf8NihxADPl14Q&s",
      name: "Áo Thun Họa Tiết Catus Long Tee Old Sailor",
      code: "ATGA88593",
      price: "315.000",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNMw0HUO-cZNVW_hHp2LyzQN1IkBKEJIV7cw&s",
      name: "Áo Sơ Mi Kẻ Sọc Vải Sợi Tre Old Sailor",
      code: "SMXD88598",
      price: "400.000",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqP5KATE4sVMZbzQa8Zqat-1E5SptjXNWv3Q&s",
      name: "Áo Sơ Mi Kẻ Sọc Vải Sợi Tre Old Sailor",
      code: "SMXD88598",
      price: "400.000",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmDoF-gZPGl2KpHeDWjt4hMjjIx5EIv7cOFw&s",
      name: "Áo Sơ Mi Kẻ Sọc Vải Sợi Tre Old Sailor",
      code: "SMXD88598",
      price: "400.000",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ0QMfTniq-qX4IYLIHY-99tLdnPd979ARkA&s",
      name: "Áo Sơ Mi Kẻ Sọc Vải Sợi Tre Old Sailor",
      code: "SMXD88598",
      price: "400.000",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH33noIuAii9spah65aLVu4-rlFaDdruD4AA&s",
      name: "Áo Sơ Mi Kẻ Sọc Vải Sợi Tre Old Sailor",
      code: "SMXD88598",
      price: "400.000",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Gzdy3TtJt8p1Scz9nO4aXOE1j4Rk7GtRGw&s",
      name: "Áo Sơ Mi Kẻ Sọc Vải Sợi Tre Old Sailor",
      code: "SMXD88598",
      price: "400.000",
    },
  ];

  const sizes = [["S", "m", "l", "xl", "2xl"]];

  const colors = [
    { name: "Ruốc", color: "#D8A8B6" },
    { name: "Be", color: "#D1B689" },
    { name: "Rêu", color: "#8A9A5B" },
    { name: "Xanh lá", color: "#4CAF50" },
  ];
  return (
    <div>
      <div className="w-75 mx-auto" style={{ backgroundColor: "white" }}>
        <div className="pt-3">
          <h3 className="text-center mb-4">TẤT CẢ SẢN PHẨM</h3>
        </div>
        <div>
          <div className="product-list">
            {products.map((product, index) => (
              <div className="product-card" key={index}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />

                {/* <p className="product-title">{product.title}</p> */}
                <div className="mt-5">
                  <Link
                    to="/cuahang"
                    className="product-title hover-underline-animation"
                  >
                    {product.title}
                  </Link>{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <div
            style={{ width: "100%", height: "300px" }}
            className="homepage-top-khung mx-auto"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbAcgP6GOzAFZ8JRHQr7o_CzwlYiBpGNyHWQ&s"
              alt="haha"
            />
          </div>
        </div>
        <div>
          <div className="sort-options ms-auto mt-3 me-2">
            <div className="view-icons">
              <span
                className={`icon ${view === "grid" ? "active" : ""}`}
                onClick={HandleOclicksetkt}
              >
                <MdApps />
              </span>
              <span
                className={`icon ${view === "list" ? "active" : ""}`}
                onClick={HandleOclicksetkt1}
              >
                <MdViewComfy />
              </span>
            </div>
            <div className="sort-by">
              <select>
                <option value="price">Sắp xếp theo</option>
                <option value="price">Giá cao nhất</option>
                <option value="popularity">Giá rẻ nhất</option>
                <option value="rating">Bán chạy nhất</option>
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className="row mt-3">
            <div className="col-3">
              <div className="filter-panel">
                <div className="filter-group">
                  <h4 onClick={toggleProductGroup}>
                    NHÓM SẢN PHẨM
                    <span className="toggle-icon">
                      {showProductGroup ? "▲" : "▼"}
                    </span>
                  </h4>
                  {showProductGroup && (
                    <div className="filter-options">
                      <div>
                        <input type="checkbox" id="hoodie" />
                        <label htmlFor="hoodie">Hoodie - Sweater</label>
                      </div>
                      <div>
                        <input type="checkbox" id="aokhoac" />
                        <label htmlFor="aokhoac">Áo Khoác</label>
                      </div>
                      <div>
                        <input type="checkbox" id="aosomi" />
                        <label htmlFor="aosomi">Áo Sơ mi</label>
                      </div>
                      <div>
                        <input type="checkbox" id="aothun" />
                        <label htmlFor="aothun">Áo Thun</label>
                      </div>
                      <div>
                        <input type="checkbox" id="aopolos" />
                        <label htmlFor="aopolos">Áo Polos</label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="filter-group">
                  <h4 onClick={toggleProductGroup1}>
                    SIZE
                    <span className="toggle-icon">
                      {showProductGroup ? "▲" : "▼"}
                    </span>
                  </h4>
                  {showProductGroup1 && (
                    <div className="size-grid">
                      {sizes.map((row, rowIndex) => (
                        <div key={rowIndex} className="size-row">
                          {row.map((size, colIndex) => (
                            <div key={colIndex} className="size-item">
                              {size}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="filter-group">
                  <h4 onClick={toggleProductGroup2}>
                    MÀU SẮC
                    <span className="toggle-icon">
                      {showProductGroup ? "▲" : "▼"}
                    </span>
                  </h4>
                  {showProductGroup2 && (
                    <div className="color-list">
                      {colors.map((color, index) => (
                        <div key={index} className="color-item">
                          <span
                            className="color-box"
                            style={{ backgroundColor: color.color }}
                          ></span>
                          {color.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="filter-group">
                  <h4 onClick={toggleProductGroup3}>
                    KHOẢNG GIÁ
                    <span className="toggle-icon">
                      {showProductGroup3 ? "▲" : "▼"}
                    </span>
                  </h4>
                  {showProductGroup3 && (
                    <div className="col-4 quanlysanpham_boloc_inputloc mt-4 ms-4">
                      <input
                        type="range"
                        min="0"
                        max="9999"
                        className="thumb thumb--zindex-3"
                        value={minVal}
                        onChange={(event) => setMinVal(event.target.value)}
                      />
                      <input
                        type="range"
                        min="0"
                        max="9999"
                        className="thumb thumb--zindex-4"
                        value={maxVal}
                        onChange={(event) => setMaxVal(event.target.value)}
                      />
                      <div className="slider">
                        <div className="slider__track" />
                        <div className="slider__range" />
                        <p
                          style={{
                            position: "absolute",
                            top: "25px",
                            fontSize: "12px",
                          }}
                        >
                          {minVal > maxVal
                            ? (maxVal * 1000).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })
                            : (minVal * 1000).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                        </p>
                        <p
                          style={{
                            position: "absolute",
                            top: "25px",
                            left: "155px",
                            fontSize: "12px",
                          }}
                        >
                          {maxVal < minVal
                            ? (minVal * 1000).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })
                            : (maxVal * 1000).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row">
                {products1.map((product, index) => (
                  <div key={index} className={`${kichthuoc.kt} mt-1`}>
                    <div className="product-listt mx-auto product-card1">
                      <img
                        style={{ height: kichthuoc.ktanh }}
                        src={product.image}
                        alt={product.image}
                      />
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>{product.code}</p>
                        <p>{product.price} đ</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuaHang;
