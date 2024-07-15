import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import AddLoaiSP from "./QuanLyLoaiSanPham/AddLoaiSp/AddLoaiSp";
import ModalChatLieu from "./QuanLyChatLieu/ModalChatLieu/ModalChatLieu";
import { toast } from "react-toastify";
function ModalSuaSanPham(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    props.setload(!props.load);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [loaduseE, setloaduseE] = useState(false);
  const [validated, setValidated] = useState(false);
  const [dataCL, setdataCL] = useState([]);
  const [dataLSP, setdataLSP] = useState([]);
  const [dataCoAo, setdataCoAo] = useState([]);
  const [TTSanPham, setTTSanPham] = useState({
    id: props.item.id,
    ten: props.item.ten,
    ma: props.item.ma,
    mota: props.item.moTa,
    loaisp: props.item.idLoaiSP,
    chatlieu: props.item.idChatLieu,
    coao: props.item.idCoAo,
    trangthai: props.item.trangThai,
  });

  useEffect(() => {
    getdatacl();
    getdatalsp();
    GetALLCoAo();
  }, [loaduseE]);

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

  const [maSanPhamValid, setMaSanPhamValid] = useState(true);
  const handleOnChangecheck = (event) => {
    if (!validatemasp(event.target.value)) {
      setMaSanPhamValid(false);
    } else {
      setMaSanPhamValid(true);
    }
    setTTSanPham({ ...TTSanPham, ma: event.target.value });
  };

  const validatemasp = (masp) => {
    return String(masp)
      .toLowerCase()
      .match(/^[a-zA-Z0-9-_]{0,15}$/);
  };

  const HandleOnLoading = () => {
    setloaduseE(!loaduseE);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation(); // Stop further event propagation if form is invalid
    } else {
      try {
        var res = await axios.put(
          `https://localhost:7095/api/SanPham/UpdateSanPhamQLSP?id=${TTSanPham.id}&ten=${TTSanPham.ten}&ma=${TTSanPham.ma}&mota=${TTSanPham.mota}&loaisp=${TTSanPham.loaisp}&chatlieu=${TTSanPham.chatlieu}&coao=${TTSanPham.coao}`
        );

        toast.success(res.data);
      } catch (error) {
        toast.error(`Gặp lỗi: ${error.response.data}`);
      }
    }

    setValidated(true); // Set form validated state to true
  };

  return (
    <>
      <Button className="ms-2" variant="primary" onClick={handleShow}>
        Sửa
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              {/* <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>Mã sản phẩm</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Mã sản phẩm"
                    required
                    value={TTSanPham.ma}
                    maxLength="15"
                    onChange={(event) => handleOnChangecheck(event)}
                    isInvalid={!maSanPhamValid}
                  />
                  <Form.Control.Feedback type="invalid">
                    {maSanPhamValid
                      ? "Mã sản phẩm không được để trống"
                      : `Mã sản phẩm chưa đúng định dạng số, chữ, "-", "_"`}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row> */}
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>Mô tả</Form.Label>
                  <Form.Control
                    as="textarea"
                    // type="number"
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
                  <ModalChatLieu
                    loaduseE={loaduseE}
                    setloaduseE={setloaduseE}
                  />
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
            </div>
            <div className="w-25 ms-auto my-4">
              <Button type="submit">Lưu thay đổi</Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSuaSanPham;
