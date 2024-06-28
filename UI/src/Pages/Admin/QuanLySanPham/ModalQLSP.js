import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import axios from "axios";
import AddLoaiSP from "./QuanLyLoaiSanPham/AddLoaiSp/AddLoaiSp";
import ModalChatLieu from "./QuanLyChatLieu/ModalChatLieu/ModalChatLieu";

const ModalQLSP = (props) => {
  const [validated, setValidated] = useState(false);
  const [dataKT, setdataKT] = useState([]);
  const [dataMS, setdataMS] = useState([]);
  const [dataCL, setdataCL] = useState([]);
  const [dataLSP, setdataLSP] = useState([]);
  const [TTSanPham, setTTSanPham] = useState({
    ten: "",
    ma: "",
    mota: "",
    loaisp: "",
    chatlieu: "",
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
  }, []);

  const getdataKT = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/KichCo/GetAllKichCo"
      );
      console.log(res.data);
      if (res.data.length > 0) {
        const dataa = res.data.map((item) => {
          return { ...item, check: false };
        });
        setdataKT(dataa);
      }
    } catch (error) {}
  };

  const getdataMS = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/MauSac/GetAllMauSac"
      );
      console.log(res.data);
      if (res.data.length > 0) {
        const dataa = res.data.map((item) => {
          return { ...item, check: false };
        });
        setdataMS(dataa);
      }
    } catch (error) {}
  };

  const getdatacl = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/ChatLieu/GetAllChatLieu"
      );
      console.log(res.data);
      if (res.data.length > 0) {
        setdataCL(res.data);
      }
    } catch (error) {}
  };
  const getdatalsp = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/LoaiSP/getAllLSP"
      );
      console.log(res.data);
      if (res.data.length > 0) {
        setdataLSP(res.data);
      }
    } catch (error) {}
  };

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

  const HandleOnchange = (event, item) => {
    const { name, value, type, checked } = event.target;
    console.log(name, value);
    const dataTam = TTCTSP.map((item1) => {
      if (item1.id === item.id) {
        return {
          ...item1,
          [name]:
            type === "checkbox"
              ? checked
              : type === "number" && value > 0
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
              id: Math.floor(Math.random() * 10000) + 1,
              masanpham: TTSanPham.ma,
              mactsp: "",
              soluong: 1,
              giaban: 1000,
              check: true,
              kichthuoc: item.ten,
              mausac: item1.ten,
              img: "", // Added missing property img
            }));
        }
        return [];
      });

      if (TTCTSP.length > 0) {
        const dataFake = dataTam.map((item1) => {
          const existingItem = TTCTSP.find(
            (item) =>
              item.kichthuoc === item1.kichthuoc && item.mausac === item1.mausac
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

  return (
    <div className="w-100 mx-auto">
      <div className="text-center">
        <h2>Thêm sản phẩm</h2>
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
            <div as={Col} className="w-25">
              <Form.Select
                aria-label="Default select example"
                required
                value={TTSanPham.loaisp}
                onChange={(event) =>
                  setTTSanPham({ ...TTSanPham, loaisp: event.target.value })
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
              <Form.Select
                aria-label="Default select example"
                required
                value={TTSanPham.chatlieu}
                onChange={(event) =>
                  setTTSanPham({ ...TTSanPham, chatlieu: event.target.value })
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
          </Row>
          <hr />
          <h4>Thông tin chi tiết sản phẩm</h4>
          <hr />
          {/* <Row className="mb-3">
            <div as={Col} className="w-25">
              <Form.Select aria-label="Default select example" required>
                <option value="">Kích thước</option>
                {dataKT.length > 0 &&
                  dataKT.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.ten}
                    </option>
                  ))}
              </Form.Select>
            </div>
            <div as={Col} className="w-25">
              <Form.Select aria-label="Default select example" required>
                <option value="">Màu sắc</option>
                {dataMS.length > 0 &&
                  dataMS.map((item) => (
                    <option
                      //   style={{ backgroundColor: item.ma }}
                      key={item.id}
                      value={item.id}
                    >
                      {item.ten}
                    </option>
                  ))}
              </Form.Select>
            </div>
          </Row> */}
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
              </div>
            </div>
            <div className="w-25 ms-auto">
              {/* <Button onClick={HandleOnclickChonMSKT} className="mb-3 ">
                Xác nhận
              </Button> */}
            </div>
          </div>
        </div>
        <div className="w-25 ms-auto">
          <Button type="submit">Submit form</Button>
        </div>
      </Form>
      <hr />
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Check</th>
              <th>STT</th>
              <th>Mã sản phẩm</th>
              <th style={{ width: "150px" }}>Mã chi tiết sản phẩm</th>
              <th>Màu sắc</th>
              <th>Kích thước</th>
              <th style={{ width: "130px" }}>Số lượng</th>
              <th style={{ width: "150px" }}>Giá bán</th>
              <th style={{ width: "150px" }}>img</th>
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
                      onChange={(event) => HandleOnchange(event, item)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{item.masanpham}</td>
                  <td>
                    <input
                      className="w-100"
                      type="text"
                      value={item.mactsp}
                      name="mactsp"
                      onChange={(event) => HandleOnchange(event, item)}
                    />
                  </td>
                  <th>{item.mausac}</th>
                  <th>{item.kichthuoc}</th>
                  <td>
                    <input
                      className="w-100"
                      type="number"
                      value={item.soluong}
                      name="soluong"
                      onChange={(event) => HandleOnchange(event, item)}
                    />
                  </td>
                  <td>
                    <input
                      className="w-100"
                      type="number"
                      value={item.giaban}
                      name="giaban"
                      onChange={(event) => HandleOnchange(event, item)}
                    />
                  </td>
                  <td>
                    <div>{item.img}</div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div className="w-25 ms-auto">
        <Button variant="secondary" onClick={HandleOnclickBack}>
          Về trang QLSP
        </Button>
      </div>
    </div>
  );
};

export default ModalQLSP;
