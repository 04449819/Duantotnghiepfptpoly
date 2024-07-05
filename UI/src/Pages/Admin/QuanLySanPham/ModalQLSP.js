import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import axios from "axios";
import AddLoaiSP from "./QuanLyLoaiSanPham/AddLoaiSp/AddLoaiSp";
import ModalChatLieu from "./QuanLyChatLieu/ModalChatLieu/ModalChatLieu";
import Modalkichthuoc from "./KichThuoc/ModalKichThuoc/ModalKichThuoc";
import ModalMauSac from "./MauSac/ModalMauSac/ModalMauSac";
import PreviewIMG from "./PreviewIMG/PreviewIMG";
import { toast } from "react-toastify";

const ModalQLSP = (props) => {
  const [loaduseE, setloaduseE] = useState(false);
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [dataKT, setdataKT] = useState([]);
  const [dataMS, setdataMS] = useState([]);
  const [dataCL, setdataCL] = useState([]);
  const [dataLSP, setdataLSP] = useState([]);
  const [dataCoAo, setdataCoAo] = useState([]);
  const [TTSanPham, setTTSanPham] = useState({
    ten: "",
    ma: "",
    mota: "",
    loaisp: "",
    tenloaisp: "",
    chatlieu: "",
    tenchatlieu: "",
    coao: "",
    tencoao: "",
  });
  const [TTCTSP, setTTCTSP] = useState([]);
  //   const [loaduseE, setloaduseE] = useState(false);

  const HandleOnclickBack = () => {
    props.setShow(false);
  };

  useEffect(() => {
    getdataKT();
    getdataMS();
    getdatacl();
    getdatalsp();
    GetALLCoAo();
  }, [loaduseE]);

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

  const getdatacl = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/ChatLieu/GetAllChatLieu"
      );
      if (res.data.length > 0) {
        setdataCL(res.data.filter((p) => p.trangThai !== 0));
        // setdataCL(res.data);
      }
    } catch (error) {}
  };
  const getdatalsp = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/LoaiSP/getAllLSP"
      );
      if (res.data.length > 0) {
        setdataLSP(res.data.filter((p) => p.trangThai !== 0));
        // setdataLSP(res.data);
      }
    } catch (error) {}
  };
  const GetALLCoAo = async () => {
    try {
      var res = await axios.get(
        "https://localhost:7095/api/CoAo/getAllCoAoThem"
      );
      if (res.data.length > 0) {
        setdataCoAo(res.data);
        // setdataLSP(res.data);
      }
    } catch (error) {}
  };
  // https://localhost:7095/api/CoAo/getAllCoAoThem

  const HandleOnclickKT = (item) => {
    const updatedData = dataKT.map((item1) => {
      if (item1.id === item.id) {
        return { ...item1, check: !item1.check };
      }
      return item1;
    });
    setdataKT(updatedData);
  };

  const HandleOnclickMS = (item) => {
    const updatedData = dataMS.map((item1) => {
      if (item1.id === item.id) {
        return { ...item1, check: !item1.check };
      }
      return item1;
    });
    setdataMS(updatedData);
  };

  const handleOnChange = (event, item) => {
    const { name, value, type, checked } = event.target;
    const dataTam = TTCTSP.map((item1) => {
      if (item1.id === item.id) {
        return {
          ...item1,
          [name]:
            type === "checkbox"
              ? checked
              : type === "number" && value > 0 && value <= 1000000000
              ? value
              : type === "text"
              ? value
              : 0,
        };
      }
      return item1;
    });
    setTTCTSP(dataTam);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation(); // Stop further event propagation if form is invalid
    } else {
      const dataTam = dataKT.flatMap((item) => {
        if (item.check) {
          return dataMS
            .filter((item1) => item1.check)
            .map((item1) => ({
              id: Math.floor(Math.random() * 100000) + 1,
              masanpham: TTSanPham.ma,
              mactsp: `${TTSanPham.ma}-${Math.floor(Math.random() * 10000)}`,
              soluong: 1,
              giaban: 1000,
              check: true,
              kichthuoc: item.ten,
              mausac: item1.ten,
              idkichthuoc: item.id,
              idmausac: item1.id,
              mota: TTSanPham.mota,
              loaisp: TTSanPham.loaisp,
              chatlieu: TTSanPham.chatlieu,
              img: [], // Added missing property img
            }));
        }
        return [];
      });

      if (TTCTSP.length > 0) {
        const dataFake = dataTam.map((item1) => {
          const existingItem = TTCTSP.find(
            (item) =>
              item.kichthuoc === item1.kichthuoc &&
              item.mausac === item1.mausac &&
              item.masanpham === item1.masanpham &&
              item.mota === item1.mota &&
              item.loaisp === item1.loaisp &&
              item.chatlieu === item1.chatlieu
          );
          return existingItem ? existingItem : item1;
        });
        setTTCTSP(dataFake);
      } else {
        setTTCTSP(dataTam);
      }
    }

    setValidated(true); // Set form validated state to true
  };

  const handleOnClickPriview = (p) => {
    setPreview(p.preview);
    setShow(true);
  };

  const handleDivClick = (item) => {
    document.getElementById(item.id).click();
  };

  const [preview, setPreview] = useState("");
  const [listanh, setlistanh] = useState([]);
  const handleFileChange = (event, item) => {
    const file = event.target.files[0];
    setlistanh([...listanh, file]);
    try {
      const diemchung = Math.floor(Math.random() * 100000) + 1;
      const dataTam = TTCTSP.map((p) => {
        if (p.mausac === item.mausac) {
          // Nếu img là mảng, ta thêm một đối tượng mới vào mảng này
          const updatedImg = [
            ...(p.img || []),
            {
              file: file,
              preview: URL.createObjectURL(file),
              id: Math.floor(Math.random() * 100000) + 1,
              mactsp: p.mactsp,
              DuongDan: file.name,
              diemchung: diemchung,
            },
          ];
          return {
            ...p,
            img: updatedImg,
          };
        }
        return p;
      });
      setTTCTSP(dataTam);
    } catch (error) {
      toast.error("Độ phân giải quá lớn... Tải lên thất bại!");
    }
  };

  const handleDelete = (image, item) => {
    const datatam = TTCTSP.map((p) => {
      if (p.mausac === item.mausac) {
        console.log(p);
        const updatedImages = p.img.filter(
          (img) => img.diemchung !== image.diemchung
        );
        return { ...p, img: updatedImages };
      }
      return p;
    });
    setTTCTSP(datatam);
  };
  const HandleOnclickLuuThayDoi = async () => {
    if (TTCTSP.filter((p) => p.check !== false).length > 0) {
      console.log(TTCTSP);
      const listctsp = TTCTSP.map((p) => {
        if (p.check === true) {
          return {
            ma: p.mactsp,
            soluong: p.soluong,
            giaban: p.giaban,
            trangthai: 2,
            idmausac: p.idmausac,
            idkichthuoc: p.idkichthuoc,
            img: p.img.map((x) => {
              return {
                DuongDan: `https://localhost:7095/images/${x.DuongDan}`,
                TrangThai: 1,
              };
            }),
          };
        }
        return undefined; // Đảm bảo luôn có giá trị trả về
      }).filter((p) => p !== undefined);

      const DataThem = {
        tenSanpham: TTSanPham.ten,
        ma: TTSanPham.ma,
        mota: TTSanPham.mota,
        trangThai: 2,
        idloaisp: TTSanPham.loaisp,
        idchatlieu: TTSanPham.chatlieu,
        idCoAo: TTSanPham.coao,
        listctsp: listctsp,
      };

      const formData = new FormData();
      listanh.forEach((file, index) => {
        formData.append("images", file);
      });
      console.log(listanh);
      console.log(">>>>>datathem", DataThem);
      console.log(">>>>>list", formData);
      console.log(
        DataThem.listctsp.map((x) => {
          return x.img.length;
        })
      );
      let a = true;
      DataThem.listctsp.map((x) => {
        if (x.img.length <= 0) return (a = false);
      });
      if (a === true) {
        try {
          try {
            const response = await axios.post(
              "https://localhost:7095/api/SanPham/images",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } catch (error) {
            toast.error(`gặp lỗi: ${error.response.data}`);
            console.log("gặp lỗi:", error.response.data);
            return;
          }
          try {
            const response1 = await axios.post(
              "https://localhost:7095/api/SanPham/addSanPhamQLSP",
              DataThem
            );
          } catch (error) {
            toast.error(`gặp lỗi: ${error.response.data}`);
            return;
          }

          toast.success("thêm thành công !");
        } catch (error) {
          toast.error("gặp lỗi:", error);
        }
      } else {
        toast.error("Hãy chọn ít nhất một ảnh cho từng sản phẩm");
      }
    } else {
      toast.error("Hãy chọn ít nhất một sản phẩm!");
    }
  };
  const HandleOnLoading = () => {
    setloaduseE(!loaduseE);
  };
  return (
    <div className="w-100 mx-auto">
      <div className="text-center">
        <h2>Thêm sản phẩm</h2>
      </div>
      <div className="w-25 ms-5">
        <Button variant="secondary" onClick={HandleOnclickBack}>
          Về trang QLSP
        </Button>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="w-50 mx-auto">
          <h4>Thông tin sản phẩm</h4>
          <hr />
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên sản phẩm"
                maxLength="100"
                required
                value={TTSanPham.ten}
                onChange={(event) =>
                  setTTSanPham({ ...TTSanPham, ten: event.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Tên sản phẩm không được để trống
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Mã sản phẩm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mã sản phẩm"
                required
                value={TTSanPham.ma}
                maxLength="15"
                onChange={(event) =>
                  setTTSanPham({ ...TTSanPham, ma: event.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Mã sản phẩm không được để trống
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Mô tả</Form.Label>

              <Form.Control
                type="text"
                placeholder="Mô tả"
                required
                value={TTSanPham.mota}
                maxLength="200"
                onChange={(event) =>
                  setTTSanPham({ ...TTSanPham, mota: event.target.value })
                }
              />
              <Form.Control.Feedback type="invalid">
                Mô tả sản phẩm không được để trống
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <div as={Col} className="w-25 mb-4">
              <Form.Select
                aria-label="Default select example"
                required
                value={TTSanPham.loaisp}
                onChange={(event) =>
                  setTTSanPham({
                    ...TTSanPham,
                    loaisp: event.target.value,
                    tenloaisp: event.target.selectedOptions[0].text,
                  })
                }
              >
                <option value="">Loại sản phẩm</option>
                {dataLSP.length > 0 &&
                  dataLSP.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.ten}
                    </option>
                  ))}
              </Form.Select>
            </div>
            <div as={Col} className="w-25">
              <AddLoaiSP HandleOnLoading={HandleOnLoading} />
            </div>
            <div as={Col} className="w-25">
              <Form.Select
                aria-label="Default select example"
                required
                value={TTSanPham.chatlieu}
                onChange={(event) =>
                  setTTSanPham({
                    ...TTSanPham,
                    chatlieu: event.target.value,
                    tenchatlieu: event.target.selectedOptions[0].text,
                  })
                }
              >
                <option value="">Chất liệu</option>
                {dataCL.length > 0 &&
                  dataCL.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.ten}
                    </option>
                  ))}
              </Form.Select>
            </div>
            <div as={Col} className="w-25">
              <ModalChatLieu loaduseE={loaduseE} setloaduseE={setloaduseE} />
            </div>
            <div as={Col} className="w-25">
              <Form.Select
                aria-label="Default select example"
                required
                value={TTSanPham.coao}
                onChange={(event) =>
                  setTTSanPham({
                    ...TTSanPham,
                    coao: event.target.value,
                    tencoao: event.target.selectedOptions[0].text,
                  })
                }
              >
                <option value="">Cổ áo</option>
                {dataCoAo.length > 0 &&
                  dataCoAo.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.ten}
                    </option>
                  ))}
              </Form.Select>
            </div>
            <div as={Col} className="w-25">
              <AddLoaiSP HandleOnLoading={HandleOnLoading} />
            </div>
          </Row>
          <hr />
          <h4>Thông tin chi tiết sản phẩm</h4>
          <hr />
          <div
            style={{
              width: "700px",
              minHeight: "200px",
              border: "1px solid black",
            }}
            className="mb-4"
          >
            <div className="w-75 mx-auto mt-3">
              <h4>Kích thước</h4>
              <hr />
              <div className="row">
                {dataKT.length > 0 &&
                  dataKT.map((item) => (
                    <div className="col-2" key={item.id}>
                      <div
                        style={{
                          border:
                            item.check === false
                              ? "1px solid black"
                              : "3px solid blue",
                          borderRadius: "5px",
                          marginBottom: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => HandleOnclickKT(item)}
                      >
                        <div className="w-50 mx-auto">{item.ten}</div>
                      </div>
                    </div>
                  ))}
                <div className="col-2">
                  <div>
                    <div className="w-50 ">
                      <Modalkichthuoc
                        loaduseE={loaduseE}
                        setloaduseE={setloaduseE}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-75 mx-auto">
              <h4>Màu sắc</h4>
              <hr />
              <div className="row">
                {dataMS.length > 0 &&
                  dataMS.map((item) => (
                    <div className="col-2" key={item.id}>
                      <div
                        style={{
                          border:
                            item.check === false
                              ? "1px solid black"
                              : "3px solid blue",
                          borderRadius: "5px",
                          marginBottom: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => HandleOnclickMS(item)}
                      >
                        <div style={{ backgroundColor: item.ma }}>
                          {item.ma}
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="col-2 mb-3">
                  <div>
                    <div className="w-50 ">
                      <ModalMauSac
                        loaduseE={loaduseE}
                        setloaduseE={setloaduseE}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-25 ms-auto">
              {/* <Button onClick={HandleOnclickChonMSKT} className="mb-3 ">
                Xác nhận
              </Button> */}
            </div>
          </div>
        </div>
        <div className="w-25 ms-auto my-4">
          <Button type="submit">Xác nhận</Button>
        </div>
      </Form>
      <hr />
      <div className="d-flex">
        <div className="w-25">Tên sản phẩm: {TTSanPham.ten}</div>
        <div className="w-25">Mã sản phẩm: {TTSanPham.ma}</div>
        <div className="w-25">Loại sản phẩm: {TTSanPham.tenloaisp}</div>
        <div className="w-25">Chất liệu sản phẩm: {TTSanPham.tenchatlieu}</div>
      </div>
      <hr />
      <h3 className="text-center my-4">Danh sách sản phẩm</h3>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "100px" }}>Check</th>
              <th style={{ width: "100px" }}>STT</th>
              <th style={{ width: "150px" }}>Mã chi tiết sản phẩm</th>
              <th style={{ width: "130px" }}>Màu sắc</th>
              <th style={{ width: "130px" }}>Kích thước</th>
              <th style={{ width: "130px" }}>Số lượng</th>
              <th style={{ width: "150px" }}>Giá bán</th>
              <th style={{ width: "200px" }}>img</th>
            </tr>
          </thead>
          <tbody>
            {TTCTSP.length > 0 &&
              TTCTSP.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.check}
                      name="check"
                      onChange={(event) => handleOnChange(event, item)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      className="w-100 mt-3"
                      type="text"
                      value={item.mactsp}
                      maxLength="15"
                      name="mactsp"
                      onChange={(event) => handleOnChange(event, item)}
                    />
                  </td>
                  <th>{item.mausac}</th>
                  <th>{item.kichthuoc}</th>
                  <td>
                    <input
                      className="w-100 mt-3"
                      type="number"
                      value={item.soluong}
                      name="soluong"
                      onChange={(event) => handleOnChange(event, item)}
                    />
                  </td>
                  <td>
                    <input
                      className="w-100 mt-3"
                      type="number"
                      value={item.giaban}
                      name="giaban"
                      onChange={(event) => handleOnChange(event, item)}
                    />
                  </td>
                  <td>
                    <div className="row">
                      {item.img.length > 0 &&
                        item.img.map((p, index) => (
                          <div
                            className="ms-2 col-6 mb-2 px-0 hover-container"
                            style={{
                              width: "55px",
                              height: "55px",
                            }}
                            // onClick={() => handleOnClickPriview(p)}
                            key={`${p.preview} + ${index}`}
                          >
                            {p.preview && (
                              <img
                                src={p.preview}
                                alt="Preview"
                                style={{ width: "100%", height: "100%" }}
                              />
                            )}
                            <button
                              className="delete-button"
                              onClick={() => handleDelete(p, item)}
                            >
                              X
                            </button>
                            <button
                              className="info-button"
                              onClick={() => handleOnClickPriview(p)}
                            >
                              i
                            </button>
                          </div>
                        ))}
                      <div
                        className="col-6 ms-2 mb-2"
                        hidden={item.img.length > 5}
                        style={{
                          width: "55px",
                          height: "55px",
                          // border: "1px solid black",
                          backgroundImage: `url("https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg")`,
                          backgroundSize: "cover", // This ensures the background image covers the entire div
                          backgroundPosition: "center", // This centers the background image within the div
                        }}
                        onClick={() => handleDivClick(item)}
                      >
                        <input
                          id={item.id}
                          style={{
                            display: "none",
                          }}
                          type="file"
                          accept="image/jpeg, image/png, image/gif"
                          onChange={(event) => handleFileChange(event, item)}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div className="w-25 ms-auto">
        <Button onClick={HandleOnclickLuuThayDoi}>Lưu thay đổi</Button>
      </div>
      <PreviewIMG show={show} setShow={setShow} preview={preview} />
    </div>
  );
};

export default ModalQLSP;
