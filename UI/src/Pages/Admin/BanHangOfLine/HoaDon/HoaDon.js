import React from 'react';
import QRCode from 'qrcode.react';
import { useSelector } from 'react-redux';
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import {
  ResetSP
} from "../../../../Rudux/Reducer/GetSanPhamGioHangSlice";
  const HoaDon = ({name, phone, email, address  }) => {
    const dataSanPhamGioHang = useSelector((state) => state.sanPhamGioHang.SanPhamGioHang);
    return(
      <>
        <h1>Hóa đơn</h1>
<div className="row banhangol_danhsachsanpham">
  <div className="table-wrapper">
    <Table
      striped
      bordered
      hover
      className="banhangol_danhsachsanpham_table table table-striped table-bordered"
    >
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên sản phẩm</th>
          <th>Số lượng</th> 
          <th>Giá bán</th>
          <th>Tổng giá</th>
        </tr>
      </thead>
      <tbody>
        {dataSanPhamGioHang.map((item, index) => {
          if (!item) return null;
          return (
            <tr key={item.idCTSP}>
              <td>{index + 1}</td>
              <td>{item.tenSanPham}</td>
              <td>{item.soLuongmua}</td>
              <td>{item.giaBan - item.giaTriKhuyenMai}</td>
              <td>{(item.giaBan - item.giaTriKhuyenMai) * item.soLuongmua}</td>
            </tr>
          );
        })}
      </tbody>      
    </Table>
  </div>
</div>

      </>
    );
  };

  export default HoaDon;