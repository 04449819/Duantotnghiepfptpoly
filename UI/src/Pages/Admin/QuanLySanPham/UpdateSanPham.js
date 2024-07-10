import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";
import axios from "axios";
import { toast } from "react-toastify";
import ModalThemSanPhamChiTiet from "./ModalThemSanPhamChiTiet";

const UpdateSanPham = (props) => {
  const [show, setShow] = useState(false);
  const [loaduseE, setloaduseE] = useState(false);
  const [dataKT, setdataKT] = useState([]);
  const [dataMS, setdataMS] = useState([]);
  const [TTSanPham, setTTSanPham] = useState({
    id: props.dataupdate.id,
    ten: props.dataupdate.ten,
    ma: props.dataupdate.ma,
    mota: props.dataupdate.moTa,
    loaisp: props.dataupdate.idLoaiSP,
    tenloaisp: props.dataupdate.loaiSanPham,
    chatlieu: props.dataupdate.idChatLieu,
    tenchatlieu: props.dataupdate.chatLieu,
    coao: props.dataupdate.idCoAo,
    tencoao: props.dataupdate.coAo,
  });
  const [TTCTSP, setTTCTSP] = useState([]);
  //   const [loaduseE, setloaduseE] = useState(false);

  const HandleOnclickBack = () => {
    props.setShow(0);
  };

  useEffect(() => {
    getdataKT();
    getdataMS();
    getChitietSp(props.dataupdate.id);
  }, [loaduseE]);

  const getChitietSp = async (IDSanPham) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/getChiTietSPBanHangbyIDsp?idsp=${IDSanPham}`
      );

      const datatam = res.data.map((data) => {
        console.log(data);
        return {
          id: data.id,
          masanpham: props.dataupdate.ma,
          mactsp: data.mactsp,
          soluong: data.soLuong,
          giaban: data.giaBan,
          check: true,
          kichthuoc: data.kichco,
          mausac: data.mauSac,
          idkichthuoc: data.kichco,
          idmausac: data.MauSac,
          img: data.img, // Added missing property img
          soluongms: 1,
          checkhiden: false,
          trangthai: data.trangthai,
        };
      });
      setTTCTSP(datatam);
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

  const HandleOnclickDeleteCTSP = async (item) => {
    try {
      var res = await axios.delete(
        `https://localhost:7095/api/SanPham/deleteChitietSanPham?id=${item.id}`
      );
      toast.success(res.data);
      setloaduseE(!loaduseE);
    } catch (error) {
      toast.error(`Gặp lỗi: ${error.response.data}`);
    }
  };
  return (
    <div className="w-100 mx-auto">
      <div className="text-center">
        <h2>Thông tin sản phẩm</h2>
      </div>
      <div className="w-25 ms-5 mb-5">
        <Button variant="secondary" onClick={HandleOnclickBack}>
          Về trang QLSP
        </Button>
      </div>

      <div className="d-flex">
        <div className="w-25">Tên sản phẩm: {TTSanPham.ten}</div>
        <div className="w-25">Mã sản phẩm: {TTSanPham.ma}</div>
        <div className="w-25">Loại sản phẩm: {TTSanPham.tenloaisp}</div>
        <div className="w-25">Chất liệu sản phẩm: {TTSanPham.tenchatlieu}</div>
      </div>
      <hr />
      <h3 className="text-center my-4">Danh sách sản phẩm</h3>
      <div className="w-25 ms-5 mb-5">
        <Button variant="primary" onClick={() => setShow(true)}>
          Thêm sản phẩm chi tiết
        </Button>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "30px" }}>STT</th>
              <th style={{ width: "150px" }}>Mã chi tiết sản phẩm</th>
              <th style={{ width: "130px" }}>Màu sắc</th>
              <th style={{ width: "130px" }}>Kích thước</th>
              <th style={{ width: "130px" }}>Số lượng</th>
              <th style={{ width: "150px" }}>Giá bán</th>
              <th style={{ width: "150px" }}>img</th>
              <th style={{ width: "290px" }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {TTCTSP.length > 0 &&
              TTCTSP.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.mactsp}</td>
                  <th>{item.mausac}</th>
                  <th>{item.kichthuoc}</th>
                  <td>{item.soluong}</td>
                  <td>{item.giaban}</td>
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
                            key={`${index} - ${p}`}
                          >
                            <img style={{ width: "55px" }} src={p} />
                          </div>
                        ))}
                    </div>
                  </td>
                  <td>
                    <Button
                      variant={item.trangthai === 2 ? "warning" : "info"}
                      className="ms-2"
                    >
                      QR
                    </Button>
                    <Button variant="primary" className="ms-2">
                      Sửa
                    </Button>
                    <Button
                      onClick={() => HandleOnclickDeleteCTSP(item)}
                      variant="danger"
                      className="ms-2"
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <ModalThemSanPhamChiTiet show={show} setShow={setShow} />
    </div>
  );
};

export default UpdateSanPham;
