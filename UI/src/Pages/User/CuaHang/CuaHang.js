import { Link, useNavigate } from "react-router-dom";
import "./cuahang.scss";
import { useEffect, useState } from "react";
import { MdApps, MdViewComfy } from "react-icons/md";
// import { useScroll } from "react-use";
import axios from "axios";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import {
  DeleteLoaisp,
  setidloaisp,
} from "../../../Rudux/Reducer/IDLoaiSPSlice";
import { setchitietsp } from "../../../Rudux/Reducer/chitietsanphamonl";
import { toast } from "react-toastify";
const CuaHang = () => {
  const [showProductGroup, setShowProductGroup] = useState(false);
  const [showProductGroup1, setShowProductGroup1] = useState(false);
  const [showProductGroup2, setShowProductGroup2] = useState(false);
  const [showProductGroup3, setShowProductGroup3] = useState(false);
  const [kichthuoc, setkichthuoc] = useState({ ktanh: "250px", kt: "col-4" });
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(10000);
  const [view, setView] = useState("list");
  const [data, setdata] = useState([]);
  const [dataLSP, setdataLSP] = useState([]);
  const [page, setpage] = useState(1);
  const [sotrang, setsotrang] = useState(0);
  const [ten, setten] = useState("Tất cả sản phẩm");
  const loaisp = useSelector((p) => p.setidloaisp.loaisp);
  const [sapxep, setSapxep] = useState("");
  const [dataKT, setdataKT] = useState([]);
  const [dataMS, setdataMS] = useState([]);
  const [ms, setms] = useState("");
  const [kt, setkt] = useState("");
  const [mausac, setmausac] = useState("");
  const [kichthuocc, setkichthuocc] = useState("");
  const navigate = useNavigate();
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
    setkichthuoc({ ktanh: "150px", kt: "col-3" });
  };
  const HandleOclicksetkt1 = () => {
    setView("list");
    setkichthuoc({ ktanh: "250px", kt: "col-4" });
  };

  const Handleonclickchuyentrang = (product) => {
    // console.log(product);
    dispath(setchitietsp(product));
    navigate("/chitietsanpham");
  };

  // const { scrollY } = useScroll();

  // const handleScroll = () => {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //     toast.success("ok");
  //     // if (page < sotrang) {
  //     setpage(page + 1);
  //     // }
  //   }
  // };

  const scrollToTop = (event) => {
    setpage(event.selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // console.log(loaisp);\
    // toast.info("hahahahaha");
    if (loaisp.title !== undefined) {
      setten(loaisp.title);
    } else {
      setten("Tất cả sản phẩm");
    }

    const fetchData = async () => {
      if (page === 1) {
        await getSanPhamBanHang(page, loaisp.id);
        await getLoaiSanPhamBanHang();
        await getdataKT();
        await getdataMS();
      } else {
        await getSanPhamBanHang(page, loaisp.id);
      }
    };
    fetchData();
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, [page, loaisp, sapxep, ms, kt, minVal, maxVal]);

  const getSanPhamBanHang = async (page, idloaisp) => {
    try {
      const url = idloaisp
        ? `https://localhost:7095/api/SanPham/getSPbanhangonl?loaiSanPham=${idloaisp}&sapxep=${sapxep}&idkt=${kt}&idms=${ms}&giaMin=${
            minVal * 1000
          }&GiaMax=${maxVal * 1000}&currentPage=${page}&productsPerPage=24`
        : `https://localhost:7095/api/SanPham/getSPbanhangonl?sapxep=${sapxep}&idkt=${kt}&idms=${ms}&giaMin=${
            minVal * 1000
          }&GiaMax=${maxVal * 1000}&currentPage=${page}&productsPerPage=24`;
      const res = await axios.get(url);
      setdata(res.data.sp);
      console.log(res.data.sp);
      setsotrang(res.data.sotrang);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., show a toast notification)
    }
  };

  const getLoaiSanPhamBanHang = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/SanPham/getLoaiSPbanhangonl"
      );
      // console.log(res.data.sanPham);
      const dslsp = res.data.map((p) => {
        return { ...p, check: false };
      });
      setdataLSP(dslsp);
    } catch (error) {}
  };

  const getdataKT = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/KichCo/GetAllKichCo"
      );
      if (res.data.length > 0) {
        const dataa = res.data.map((item) => {
          return { ...item, check: false };
        });
        setdataKT(dataa.filter((p) => p.trangThai !== 0));
        // setdataKT(dataa);
      }
    } catch (error) {}
  };

  const getdataMS = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/MauSac/GetAllMauSac"
      );
      if (res.data.length > 0) {
        const dataa = res.data.map((item) => {
          return { ...item, check: false };
        });
        setdataMS(dataa.filter((p) => p.trangThai !== 0));
      }
    } catch (error) {}
  };
  const dispath = useDispatch();
  const handleOnclickLoaisp = (product) => {
    dispath(setidloaisp(product));
    setpage(1);
  };

  const HandleoclickTitledelete = () => {
    dispath(DeleteLoaisp());
    setpage(1);
  };

  const HandleOnchangeCheck = (data) => {
    console.log(data);
    dispath(setidloaisp(data));
    const ds = dataLSP.map((p) => {
      if (p.id === data.id) {
        return { ...p, check: !p.check };
      }
      return { ...p, check: false };
    });

    setdataLSP(ds);
  };

  const HandleOnclickChonKT = (data) => {
    const ds = dataKT.map((p) => {
      if (p.id === data.id) {
        return { ...p, check: !p.check };
      }
      return { ...p, check: false };
    });

    setdataKT(ds);
    setkt(data.id);
    setkichthuocc(data.ten);
  };
  const HandleOnclickChonMS = (data) => {
    const ds = dataMS.map((p) => {
      if (p.id === data.id) {
        return { ...p, check: !p.check };
      }
      return { ...p, check: false };
    });

    setdataMS(ds);
    setms(data.id);
    setmausac(data.ten);
  };
  const HandleOnclickDeleteKT = () => {
    setkichthuocc("");
    setkt("");
  };

  const HandleOnclickDeleteMS = () => {
    setmausac("");
    setms("");
  };

  return (
    <div>
      <div className="w-75 mx-auto" style={{ backgroundColor: "white" }}>
        {/* <div className="pt-3">
          <h3 className="text-center mb-4">TẤT CẢ SẢN PHẨM</h3>
        </div> */}
        {/* <hr /> */}
        <div className=" mx-auto" style={{ width: "85%" }}>
          <div className="product-list">
            {dataLSP &&
              dataLSP.map((product, index) => (
                <div className="product-card" key={index}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleOnclickLoaisp(product)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="product-image"
                    />
                  </div>

                  {/* <p className="product-title">{product.title}</p> */}
                  <div className="mt-3">
                    <Link
                      onClick={() => handleOnclickLoaisp(product)}
                      className="product-title hover-underline-animation"
                    >
                      {product.title}
                    </Link>
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
              src="https://oldsailor.com.vn/vnt_upload/product/z5205980409883_ed99f7bfb2684432b2b4c6f194c28af0.jpg"
              alt="haha"
            />
          </div>
        </div>
        <div>
          <div className="row mt-4 ">
            <div className="col-9">
              <div className="w-50 ms-auto">
                <div className="d-flex">
                  <h3 className="mt-2 me-1">{ten}</h3>
                  <div
                    onClick={HandleoclickTitledelete}
                    className=" tilte-delete"
                    hidden={loaisp.title === undefined ? true : false}
                  >
                    <p>x</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sort-options col-3">
              <div className="view-icons">
                <span
                  className={`icon ${view === "list" ? "active" : ""}`}
                  onClick={HandleOclicksetkt1}
                >
                  <MdViewComfy />
                </span>
                <span
                  className={`icon ${view === "grid" ? "active" : ""}`}
                  onClick={HandleOclicksetkt}
                >
                  <MdApps />
                </span>
              </div>
              <div className="sort-by">
                <select onChange={(event) => setSapxep(event.target.value)}>
                  <option value="">Sắp xếp theo</option>
                  <option value="1">Giá cao nhất</option>
                  <option value="2">Giá rẻ nhất</option>
                  <option value="3">Mới nhất</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <div className="row mt-3">
            <div className="col-3">
              <div className="filter-panel">
                <div className="filter-group">
                  <div>
                    <div
                      className="row w-75 mx-auto"
                      hidden={mausac === "" ? true : false}
                      style={{
                        border: "1px solid black",
                        padding: "3px",
                        fontSize: "12px",
                      }}
                    >
                      <div className="col-10 my-0">{mausac}</div>
                      <div
                        onClick={HandleOnclickDeleteMS}
                        style={{ cursor: "pointer" }}
                        className="col-2 my-0"
                      >
                        x
                      </div>
                    </div>
                    <div
                      className="row w-75 mx-auto"
                      hidden={kichthuocc === "" ? true : false}
                      style={{
                        border: "1px solid black",
                        marginLeft: "10px",
                        padding: "3px",
                        fontSize: "12px",
                      }}
                    >
                      <div className="col-10 my-0">{kichthuocc}</div>
                      <div
                        onClick={HandleOnclickDeleteKT}
                        style={{ cursor: "pointer" }}
                        className="col-2 my-0 "
                      >
                        x
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  hidden={loaisp.title !== undefined ? true : false}
                  className="filter-group"
                >
                  <h4 onClick={toggleProductGroup}>
                    NHÓM SẢN PHẨM
                    <span className="toggle-icon">
                      {showProductGroup ? "▲" : "▼"}
                    </span>
                  </h4>
                  {showProductGroup && (
                    <div className="filter-options">
                      {dataLSP &&
                        dataLSP.map((data) => (
                          <div key={data.id}>
                            <label
                              style={{ cursor: "pointer" }}
                              onClick={() => HandleOnchangeCheck(data)}
                              htmlFor="hoodie"
                            >
                              {data.title}
                            </label>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div className="filter-group">
                  <h4 onClick={toggleProductGroup1}>
                    SIZE
                    <span className="toggle-icon">
                      {showProductGroup1 ? "▲" : "▼"}
                    </span>
                  </h4>
                  {showProductGroup1 && (
                    <div className="size-grid">
                      {dataKT &&
                        dataKT.map((kt) => (
                          <div key={kt.id} className="row">
                            <div
                              style={{
                                border: "1px solid black",
                                width: "40px",
                                padding: "0px",
                                textAlign: "center",
                                margin: "0px",
                                cursor: "pointer",
                                color: kt.check === true ? "white" : "black",
                                backgroundColor:
                                  kt.check === true ? "black" : "white",
                              }}
                              className="col-2"
                              onClick={() => HandleOnclickChonKT(kt)}
                            >
                              {kt.ten}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div className="filter-group">
                  <h4 onClick={toggleProductGroup2}>
                    MÀU SẮC
                    <span className="toggle-icon">
                      {showProductGroup2 ? "▲" : "▼"}
                    </span>
                  </h4>
                  {showProductGroup2 && (
                    <div className="color-list">
                      {dataMS.map((ms) => (
                        <div
                          key={ms.id}
                          className="color-item"
                          style={{
                            color: ms.check === true ? "white" : "black",
                            cursor: "pointer",
                            backgroundColor:
                              ms.check === true ? "gray" : "white",
                            margin: "0px",
                          }}
                          onClick={() => HandleOnclickChonMS(ms)}
                        >
                          <span
                            className="color-box"
                            style={{ backgroundColor: ms.ma }}
                          ></span>
                          {ms.ten}
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
                {data &&
                  data.map((product, index) => (
                    <div key={index} className={`${kichthuoc.kt} mt-1`}>
                      <div className="product-listt mx-auto product-card1">
                        <button
                          onClick={() => Handleonclickchuyentrang(product)}
                          style={{ border: "none", backgroundColor: "#e1e1e1" }}
                        >
                          <img
                            style={{ height: kichthuoc.ktanh }}
                            src={product.ctsp[0].anh}
                            alt={product.ctsp[0].anh}
                          />
                        </button>
                        <button
                          onClick={() => Handleonclickchuyentrang(product)}
                          style={{ border: "none", backgroundColor: "#e1e1e1" }}
                        >
                          <div className="product-info">
                            <h3>{product.ctsp[0].tensp}</h3>
                            <p>{product.ctsp[0].ma}</p>
                            <p>
                              {product.ctsp[0].giaban.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                <div className="w-50 mx-auto mt-5">
                  <div className="w-75 mx-auto">
                    <ReactPaginate
                      nextLabel="Trang kế >"
                      onPageChange={scrollToTop}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={2}
                      pageCount={sotrang}
                      previousLabel="< Trang trước"
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      renderOnZeroPageCount={null}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuaHang;
