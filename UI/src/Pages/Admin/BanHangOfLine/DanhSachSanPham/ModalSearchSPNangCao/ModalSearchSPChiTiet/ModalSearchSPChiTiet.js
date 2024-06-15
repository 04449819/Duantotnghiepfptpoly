import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalSearchSPChiTiet = ({item}) => {
  const [ctbt, setCTBT] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {  
    getCTBT();
  }, []);
  const getCTBT = async () => {
    try {
      const res = await axios.get(`https://localhost:7095/api/SanPham/GetAllChiTietSanPhamAdmin?idSanPham=${item.idSanPham}` );
      setCTBT(res.data);
    } catch (error) {
      console.log(error);
    }
  }



  return (
    
    <>
      <Button variant="primary" onClick={ handleShow }>
        Mua ngay
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết biến thể</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table className="table">
                <thead>
                    <tr>
                        <th>Ảnh</th>
                        <th>Màu Sắc</th>
                        <th>Mã Màu </th>
                        <th>Kích Cỡ</th>
                        <th>Giá Gốc</th>
                        <th>Giá Bán</th>
                        <th>Trạng Thái</th>
                    </tr>
                </thead>
                <tbody>
                    {ctbt.map(sp => (
                        <tr key={sp.id}>
                            <td>
                            <img style={{width: "100px", height: "100px"}} src={item.anhs[3] ? item.anhs[0].duongDan : ""} />
                            </td>
                            <td>{sp.tenMauSac}</td>
                            <td>{sp.maMauSac}</td>
                            <td>{sp.tenKichCo}</td>             
                            <td>{sp.giaGoc}</td>
                            <td>{sp.giaBan}</td>    
                            <td>{sp.trangThai ? "Còn hàng" : "Hết hàng"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Modal.Body>
        
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ModalSearchSPChiTiet;
