//ModalApplyKM
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoNewspaper } from "react-icons/io5";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { IoIosAdd } from "react-icons/io";
function ModalApplyKM(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const [page, setpage] = useState(1);
  const [data, setdata] = useState([]);
  const [tongtrang, setTongTrang] = useState();
  const [dataCTSP, setdataCTSP] = useState([]);

  const getDataSP = async (page) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/getAllSPBanHang?currentPage=${page}&productsPerPage=6`
      );
      if (res.data.sanPham.length > 0) {
        const dataTam = res.data.sanPham.map((item) => {
          return { ...item, check: false };
        });
        setdata((prive) => [...prive, ...dataTam]);
        setTongTrang(res.data.soTrang);
      }
    } catch (error) {}
  };

  // const getDataCTSP = async (idsp, tenSP) => {
  //   try {
  //     const res = await axios.get(
  //       `https://localhost:7095/api/SanPham/getChiTietSPBanHangbyIDsp?idsp=${idsp}`
  //     );
  //     if (res.data && res.data.length > 0) {
  //       const dataTam = res.data
  //         .map((item) => {
  //           const dt = dataCTSP.find((p) => p.id === item.id);
  //           if (!dt) return { ...item, check: true, tenSanPham: tenSP };
  //           return null;
  //         })
  //         .filter((item) => item !== null);

  //       setdataCTSP((prive) => [...dataTam, ...prive]);
  //     }
  //   } catch (error) {}
  // };

  const getDataCTSP = async (idsp, tenSP) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/getChiTietSPBanHangbyIDsp?idsp=${idsp}`
      );

      if (res.data && res.data.length > 0) {
        const updatedData = res.data.map((item) => {
          const existingItem = dataCTSP.find((p) => p.id === item.id);
          return existingItem
            ? { ...existingItem, ...item, check: true, tenSanPham: tenSP }
            : { ...item, check: true, tenSanPham: tenSP };
        });

        // Loại bỏ các phần tử trùng lặp từ dataCTSP
        const uniqueDataCTSP = dataCTSP.filter(
          (item) => !updatedData.find((p) => p.id === item.id)
        );

        // Kết hợp dữ liệu mới và dữ liệu cũ đã lọc trùng lặp
        const mergedData = [...uniqueDataCTSP, ...updatedData];

        setdataCTSP(mergedData);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

    // const getDataCTSPXoa = async (idsp) => {
    //   try {
    //     const res = await axios.get(
    //       `https://localhost:7095/api/SanPham/getChiTietSPBanHangbyIDsp?idsp=${idsp}`
    //     );
    //     if (res.data && res.data.length > 0) {
    //       res.data.map((item) => {
    //         const CTSP = dataCTSP.find((p) => p.id === item.id);
    //         if (CTSP) {
    //           setdataCTSP((prevDataCTSP) =>
    //             prevDataCTSP.filter((item) => item.id !== CTSP.id)
    //           );
    //         }
    //       });
    //     }
    //   } catch (error) {}
    // };

  const GetDataChitietSanPhamDaAD = async (idsp) => {
    //https://localhost:7095/api/SanPham/GetChiTietSanPhamByIDKM?id=e107cc6d-5a68-4d5b-836e-4d70b088dd1f
    const res = await axios.get(
      `https://localhost:7095/api/SanPham/GetChiTietSanPhamByIDKM?id=${props.item.id}`
    );
    if (res.data && res.data.length >= 0) {
      const dataTam = res.data.map((item) => {
        return { ...item, check: true };
      });
      setdataCTSP(dataTam);
    }
  };

  useEffect(() => {
    setdata([]);
    setdataCTSP([]);
    console.log(dataCTSP);
    getDataSP(page);
    GetDataChitietSanPhamDaAD(props.item.id);
  }, [show]);

  const HandleOncroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop + scrollHeight > clientHeight) {
      if (page < tongtrang) {
        getDataSP(page + 1);
        setpage(page + 1);
      }
    }
  };

  const handleCheckboxChange = (event, item1) => {
    const dataTam = data.map((item) => {
      if (item.id === item1.id) {
        if (event.target.checked === true) {
          getDataCTSP(item1.id, item1.ten);
        } else {
          // Sửa
          const dataTamCTSP = dataCTSP.filter((p) => p.idsp !== item1.id);
          setdataCTSP(dataTamCTSP);
          
          //  getDataCTSPXoa(item1.id);
          // const dataTamm = dataCTSP.map((p) => {
            // if (p.idsp === item1.id) {
            //   return { ...p, check: false };
            // }
            //return p;
          //});
          //setdataCTSP(dataTamm);
        }
        return { ...item, check: event.target.checked };
      } else {
        return item;
      }
    });
    setdata(dataTam);
  };

  const handleCheckboxChangeCTSP = (event, item1) => {
    const dataTam = dataCTSP.map((item) => {
      if (item.id === item1.id) {
        return { ...item, check: event.target.checked };
      } else {
        return item;
      }
    });
    if (!event.target.checked) {
      const dataTamCTSP = dataCTSP.filter((p) => p.id !== item1.id);
      setdataCTSP(dataTamCTSP);
    }
    setdataCTSP(dataTam);
  };

  const HandleOnclick = async (item1) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/getChiTietSPBanHangbyIDsp?idsp=${item1.id}`
      );
      if (res.data && res.data.length > 0) {
        const dataTam = res.data
          .map((item) => {
            const dt = dataCTSP.find((p) => p.id === item.id);
            if (!dt) return { ...item, check: false, tenSanPham: item1.ten };
            return null;
          })
          .filter((item) => item !== null);

        setdataCTSP((prive) => [...dataTam, ...prive]);
      }
    } catch (error) {}
  };

  const handleSaveChange = async () => {
    const listIDCTSP = dataCTSP
      //   .filter((item) => item.check === true)
      .map((item) => {
        return { id: item.id, trangthai: item.check };
      });
    try {
      var res = await axios.put(
        `https://localhost:7095/api/KhuyenMai/addkhuyenmaitoCTSP?idkhuyenmai=${props.item.id}`,
        listIDCTSP
      );
      toast.success(res.data);
      setdata([]);
      getDataSP(1);
      setpage(1);
      GetDataChitietSanPhamDaAD(props.item.id);
    } catch (error) {}
  };
  return (
    <>
      <Button className="me-2" variant="info" onClick={handleShow}>
        <IoNewspaper />
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Danh sách sản phẩm</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: "500px", position: "relative" }}>
          <div
            style={{
              width: "70%",
              margin: "auto",
              height: "400px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            onScroll={(event) => HandleOncroll(event)}
          >
            <Table striped bordered hover style={{ marginTop: "40px" }}>
              <thead
                style={{
                  position: "absolute",
                  top: "0px",
                  backgroundColor: "gray",
                }}
              >
                <tr>
                  <th style={{ width: "89px", color: "white" }}>Check</th>
                  <th style={{ width: "74px", color: "white" }}> STT</th>
                  <th style={{ width: "332px", color: "white" }}>
                    Tên sản phẩm
                  </th>
                  <th style={{ width: "137px", color: "white" }}>Trạng thái</th>
                  <th style={{ width: "126px", color: "white" }}>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((item, index) => (
                    <tr key={item.id}>
                      <td style={{ width: "94px" }}>
                        <input
                          style={{ marginLeft: "15px" }}
                          type="checkbox"
                          checked={item.check}
                          onChange={(event) =>
                            handleCheckboxChange(event, item)
                          }
                        />
                      </td>
                      <td style={{ width: "77px" }}>{index + 1}</td>
                      <td style={{ width: "400px" }}>{item.ten}</td>
                      {item.trangThai === 1 || item.trangThai === 2 ? (
                        <td style={{ width: "150px", color: "green" }}>
                          Đang bán
                        </td>
                      ) : (
                        <td style={{ width: "150px", color: "red" }}>
                          Ngừng bán
                        </td>
                      )}
                      <td style={{ width: "50px" }}>
                        <button
                          className="btn btn-primary"
                          style={{ marginLeft: "20px" }}
                          onClick={() => HandleOnclick(item)}
                        >
                          <IoIosAdd />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <hr style={{ margin: "40px 0px 20px 0px" }} />
          <div>
            <div>
              <h3>Thông tin chi tiết sản phẩm</h3>
            </div>
            <hr style={{ margin: "20px 0px 40px 0px" }} />
            <div
              style={{
                width: "90%",
                margin: "auto",
                height: "400px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              <Table striped bordered hover style={{ marginTop: "50px" }}>
                <thead
                  style={{
                    position: "absolute",
                    top: "565px",
                    backgroundColor: "gray",
                  }}
                >
                  <tr>
                    <th>Check</th>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá bán</th>
                    <th>Số lượng</th>
                    <th style={{ width: "104px" }}>Màu sắc</th>
                    <th style={{ width: "102px" }}>Kích cỡ</th>
                    <th style={{ width: "125px" }}>img</th>
                    <th style={{ width: "150px" }}>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCTSP.length > 0 &&
                    dataCTSP.map((item, index) => (
                      <tr key={item.id}>
                        <td style={{ width: "87px" }}>
                          <input
                            style={{ marginLeft: "15px" }}
                            type="checkbox"
                            checked={item.check}
                            onChange={(event) =>
                              handleCheckboxChangeCTSP(event, item)
                            }
                          />
                        </td>
                        <td style={{ width: "72px" }}>{index + 1}</td>
                        <td style={{ width: "138px" }}>{item.tenSanPham}</td>
                        <td style={{ width: "96px" }}>{item.giaBan}</td>
                        <td style={{ width: "106px" }}>{item.soLuong}</td>
                        <td style={{ width: "104px" }}> {item.mauSac}</td>
                        <td>{item.kichco}</td>
                        <td>
                          <img style={{ width: "25px" }} src={item.img[0]} />
                        </td>
                        {item.trangthai !== true ? (
                          <td style={{ width: "150px", color: "red" }}>
                            Ngưng bán
                          </td>
                        ) : (
                          <td style={{ width: "150px", color: "green" }}>
                            Đang bán
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ marginTop: "50px" }}>
          <Button
            style={{ marginRight: "850px" }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChange}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalApplyKM;
