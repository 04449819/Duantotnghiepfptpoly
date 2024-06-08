import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "./style.scss";
import { MdMargin } from "react-icons/md";
import ModalSearchSP from "../ModalSearchSP/ModalSearchSP";
const ModalSearchSPNangCao = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loaiSPGroup, SetloaiSPGroup] = useState({});

  useEffect(() => {
    GetDSSP();
  }, []);

  const GetDSSP = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7095/api/SanPham/getAllSPBanHang"
      );
      const data = res.data;
      const list = _.groupBy(data, "idSP");
      SetloaiSPGroup(list);
    } catch (error) {
      toast.error("lỗi đường truyền");
    }
  };

  console.log(loaiSPGroup);
  return (
    <>
      <Button
        style={{ marginLeft: "20px" }}
        variant="primary"
        onClick={handleShow}
      >
        Tìm kiếm nâng cao
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "450px" }}>
            Danh sách sản phẩm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dsspnangcao_body">
            <div className="dsspnangcao_boloc">
              <h3>bộ lọc</h3>
            </div>
            <div className="dsspnangcao_dssp">
              <div className="row">
                {Object.keys(loaiSPGroup).map((idSP) => (
                  <div className="col-3 dsspnangcao_sp" key={idSP}>
                    <div className="dsspnangcao_spct">
                      <img src={loaiSPGroup[idSP][0].duongDanAnh} />
                      <h5>{`Giá bán: ${loaiSPGroup[idSP][0].giaBan} đ`}</h5>
                      <h6>{loaiSPGroup[idSP][0].tenSanPham}</h6>
                      <Button variant="primary">Mua ngay</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSearchSPNangCao;
