import { useState } from "react";
import "./DanhSachSanPham.scss";
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import ModalSearchSP from "./ModalSearchSP/ModalSearchSP";
import ModalSearchSPNangCao from "./ModalSearchSPNangCao/ModalSearchSPNangCao";
const DanhSachSanPham = (props) => {
  const [inputsearch, setinputsearch] = useState("");
  const HandleOnclickGetData = () => {
    props.Getdata(inputsearch);
    setinputsearch("");
  };

  const HandleOnclicnkDelete = (item) => {
    props.setData((p) => p.filter((sp) => sp.idCTSP !== item.idCTSP));
  };

  const HandleOnclickGetDatainQR = (QRSearch) => {
    props.Getdata(QRSearch);
  };

  return (
    <>
      <div className="d-flex" style={{ margin: "10px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Mã sản phấm"
          style={{ width: "35%", marginRight: "10px" }}
          value={inputsearch}
          onChange={(event) => setinputsearch(event.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary"
          tabIndex="-1"
          onClick={HandleOnclickGetData}
        >
          Tìm kiếm
        </button>
        <ModalSearchSP HandleOnclickGetDatainQR={HandleOnclickGetDatainQR} />
        <ModalSearchSPNangCao />
      </div>
      <div className="row banhangol_danhsachsanpham">
        <Table
          striped
          bordered
          hover
          className="banhangol_danhsachsanpham_table table table-striped table-bordered"
          variant="dark"
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Tên màu</th>
              <th>Kích cỡ</th>
              <th>Gía bán</th>
              <th>Khuyến mãi</th>
              <th>Img</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.datasp.map((item, index) => {
              return (
                <tr key={item.idCTSP}>
                  <td>{index + 1}</td>
                  <td>{item.tenSanPham}</td>
                  <td>
                    <input
                      style={{ width: "80px" }}
                      value={item.soLuongmua}
                      type="number"
                    />
                  </td>
                  <td>{item.tenMau}</td>
                  <td>{item.kichCo}</td>
                  <td>{item.giaBan * item.soLuongmua}</td>
                  <td>{item.giaTriKhuyenMai}</td>
                  <td>
                    <img src={item.duongDanAnh} />
                  </td>
                  <td>
                    <button onClick={() => HandleOnclicnkDelete(item)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default DanhSachSanPham;
