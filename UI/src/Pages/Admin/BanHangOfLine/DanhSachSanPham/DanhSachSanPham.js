import { useState } from "react";
import "./DanhSachSanPham.scss";
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import ModalSearchSP from "./ModalSearchSP/ModalSearchSP";
import ModalSearchSPNangCao from "./ModalSearchSPNangCao/ModalSearchSPNangCao";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteCTSP,
  FetchDataSanPhamGioHang,
  UpdateSoLuong,
} from "../../../../Rudux/Reducer/GetSanPhamGioHangSlice";
const DanhSachSanPham = () => {
  const [inputsearch, setinputsearch] = useState("");
  const dispatch = useDispatch();
  const dataSanPhamGioHang = useSelector(
    (a) => a.sanPhamGioHang.SanPhamGioHang
  );
  const HandleOnclickGetData = () => {
    // props.Getdata(inputsearch);
    dispatch(FetchDataSanPhamGioHang(inputsearch));
    setinputsearch("");
  };

  const HandleOnclicnkDelete = (item) => {
    dispatch(DeleteCTSP(item.idCTSP));
  };

  const HandleOnclickGetDatainQR = (QRSearch) => {
    // props.Getdata(QRSearch);
    dispatch(FetchDataSanPhamGioHang(QRSearch));
  };
  const handleOnChangeSoLuong = (e, item) => {
    const newSoLuong = parseInt(e.target.value);
    if (newSoLuong > 0) {
      dispatch(UpdateSoLuong({ soluong: newSoLuong, idctsp: item.idCTSP }));
      // Gửi cập nhật số lượng lên store Redux
      // Bạn có thể gửi action để cập nhật số lượng cho sản phẩm cụ thể
      // ở đây tôi sẽ sử dụng Redux Toolkit và action được tạo sẵn là UpdateSoLuong
      // dispatch(UpdateSoLuong({ idCTSP: item.idCTSP, soLuong: newSoLuong }));
    }
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
          // variant="dark"
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Tên màu</th>
              <th>Kích cỡ</th>
              <th>Giá bán</th>
              <th>Tổng giá</th>
              <th>Khuyến mãi</th>
              <th>Img</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataSanPhamGioHang.map((item, index) => {
              if (!item) return null;
              return (
                <tr key={item.idCTSP}>
                  <td>{index + 1}</td>
                  <td>{item.tenSanPham}</td>
                  <td>
                    <input
                      style={{ width: "80px" }}
                      value={item.soLuongmua}
                      type="number"
                      onChange={(event) => handleOnChangeSoLuong(event, item)}
                    />
                  </td>
                  <td>{item.tenMau}</td>
                  <td>{item.kichCo}</td>
                  <td>{item.giaBan}</td>
                  <td>{item.giaBan * item.soLuongmua}</td>
                  <td>{item.giaTriKhuyenMai}</td>
                  <td>
                    <img src={item.duongDanAnh} />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => HandleOnclicnkDelete(item)}
                    >
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
