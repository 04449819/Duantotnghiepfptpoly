import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalMauSac from "./MauSac/ModalMauSac/ModalMauSac";
import axios from "axios";
import ModalKichThuoc from "./KichThuoc/ModalKichThuoc/ModalKichThuoc";
import { Table } from "react-bootstrap";
import PreviewIMG from "./PreviewIMG/PreviewIMG";
import { toast } from "react-toastify";

function ModalThemSanPhamChiTiet(props) {
  const handleClose = () => {
    props.setShow(false);
    props.setloaduseE(!props.loaduseE);
    setloaduseE(!loaduseE);
    setSanphamthem([]);
  };
  const [dataKT, setdataKT] = useState([]);
  const [dataMS, setdataMS] = useState([]);
  const [loaduseE, setloaduseE] = useState(false);
  const [sanphamthem, setSanphamthem] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    getdataKT();
    getdataMS();
  }, [loaduseE]);

  const getdataKT = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/KichCo/GetAllKichCo"
      );
      if (res.data.length > 0) {
        const dataa = res.data.map((item) => {
          return { ...item, check: false, checkhiden: false };
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
    // Update the check state of dataMS items
    const updatedData = dataMS.map((item1) => ({
      ...item1,
      check: item1.id === item.id ? !item1.check : false,
    }));

    // Map TTCTSP items to get makichthuoc values where mausac matches
    const check = props.TTCTSP.filter((item1) => item1.mausac === item.ma).map(
      (item1) => ({ makichthuoc: item1.idkichthuoc })
    );

    const updatedData1 = dataKT.map((item1) => ({
      ...item1,
      check: false,
    }));

    // Update checkhiden state of dataKT items based on makichthuoc values
    const dataupdatekt = updatedData1.map((item3) => ({
      ...item3,
      checkhiden: check.some((item2) => item2.makichthuoc === item3.ten),
    }));

    // Update the state with the new data
    setdataMS(updatedData);
    setdataKT(dataupdatekt); // Assuming setDataKT is your state updater for dataKT
  };

  const HandleOnclickChonMSKT = () => {
    const datasp = dataKT.map((item) => {
      if (item.check === true) {
        return {
          id: Math.floor(Math.random() * 100000) + 1,
          check: true,
          mactsp: `${props.TTSanPham.ma}-${Math.floor(Math.random() * 10000)}`,
          mausac: dataMS.find((item2) => item2.check === true).ten,
          idms: dataMS.find((item2) => item2.check === true).id,
          idkt: dataKT.find((item2) => item2.ten === item.ten).id,
          kichthuoc: item.ten,
          soluong: 1,
          giaban: 1000,
          img: [],
        };
      }
    });

    const datasp1 = datasp.filter((item) => item !== undefined);
    setSanphamthem(datasp1);
  };

  const handleOnChange = (event, item) => {
    const { name, value, type, checked } = event.target;

    const dataTam = sanphamthem.map((item1) => {
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
    setSanphamthem(dataTam);
  };

  const handleDelete = (image, item) => {
    const datatam = sanphamthem.map((p) => {
      if (p.mausac === item.mausac) {
        const updatedImages = p.img.filter(
          (img) => img.diemchung !== image.diemchung
        );
        return { ...p, img: updatedImages };
      }
      return p;
    });
    setSanphamthem(datatam);
  };
  const [preview, setPreview] = useState("");
  const handleOnClickPriview = (p) => {
    setPreview(p.preview);
    setShow(true);
  };

  const handleDivClick = (item) => {
    document.getElementById(item.id).click();
  };
  const [listanh, setlistanh] = useState([]);
  const handleFileChange = (event, item) => {
    const file = event.target.files[0];
    setlistanh([...listanh, file]);
    try {
      const diemchung = Math.floor(Math.random() * 100000) + 1;
      const dataTam = sanphamthem.map((p) => {
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
      setSanphamthem(dataTam);
    } catch (error) {
      toast.error("Độ phân giải quá lớn... Tải lên thất bại!");
    }
  };

  const handleSaveChange = async () => {
    let datathem1 = sanphamthem.map((item) => {
      if (item.check === true)
        return {
          idsp: props.TTSanPham.id,
          ma: item.mactsp,
          soluong: item.soluong,
          giaban: item.giaban,
          trangthai: 2,
          idmausac: item.idms,
          idkichthuoc: item.idkt,
          img: item.img.map(
            (p) => `https://localhost:7095/images/${p.DuongDan}`
          ), // Chỉ giữ lại đường dẫn ảnh dưới dạng chuỗi
        };
    });
    let datathem = datathem1.filter((p) => p !== undefined);
    const formData = new FormData();
    listanh.forEach((file, index) => {
      formData.append("images", file);
    });
    if (datathem.length < 1) {
      toast.error("Bạn chưa chọn sản phẩm");
      return;
    }

    if (datathem[0].img.length <= 0) {
      toast.error("Bạn chưa chọn ảnh cho sản phẩm");
      return;
    }
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
        return;
      }

      try {
        const response1 = await axios.post(
          "https://localhost:7095/api/SanPham/AddChitietSanPhamQLSP", // Đảm bảo URL đúng chính xác
          datathem, // Gửi đúng dữ liệu 'datathem' thay vì 'sanphamthem'
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        toast.error(`gặp lỗi: ${error.response.data}`);
        return;
      }

      toast.success("thêm thành công !");
    } catch (error) {
      toast.error("gặp lỗi:", error);
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chi tiết sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div
              style={{
                width: "700px",
                minHeight: "200px",
                border: "1px solid black",
                margin: "auto",
              }}
              className="mb-4"
            >
              <div className="w-75 mx-auto mt-3">
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
                                : "2px solid blue",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            cursor: "pointer",
                            boxShadow:
                              item.check === false
                                ? "none"
                                : "0 0 10px #007bff",
                          }}
                          onClick={() => HandleOnclickMS(item)}
                        >
                          <div
                            style={{
                              backgroundColor: item.ma,
                              height: "25px",
                              textAlign: "center",
                              fontSize: "12px",
                              paddingTop: "5px",
                              overflow: "hidden",
                            }}
                          >
                            {item.ten}
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
              <div className="w-75 mx-auto mb-3">
                <h4>Kích thước</h4>
                <hr />
                <div className="row">
                  {dataKT.length > 0 &&
                    dataKT.map((item) => (
                      <div
                        className="col-2"
                        key={item.id}
                        hidden={item.checkhiden}
                      >
                        <div
                          style={{
                            border:
                              item.check === false
                                ? "1px solid black"
                                : "2px solid blue",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            cursor: "pointer",
                            boxShadow:
                              item.check === false
                                ? "none"
                                : "0 0 10px #007bff",
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
                        <ModalKichThuoc
                          loaduseE={loaduseE}
                          setloaduseE={setloaduseE}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-25 ms-auto">
                <Button onClick={HandleOnclickChonMSKT} className="mb-3 ">
                  Xác nhận
                </Button>
              </div>
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
                  {sanphamthem.length > 0 &&
                    sanphamthem.map((item, index) => (
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
                        <td>{item.mactsp}</td>
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
                        <td
                          rowSpan={sanphamthem.length}
                          hidden={index === 0 ? false : true}
                        >
                          <div className="row">
                            {item.img.length > 0 &&
                              item.img.map((p, index) => (
                                <div
                                  className="ms-3 col-6 mb-2 px-0 hover-container"
                                  style={{
                                    width: "65px",
                                    height: "65px",
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
                                onChange={(event) =>
                                  handleFileChange(event, item)
                                }
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <PreviewIMG show={show} setShow={setShow} preview={preview} />
    </>
  );
}

export default ModalThemSanPhamChiTiet;
