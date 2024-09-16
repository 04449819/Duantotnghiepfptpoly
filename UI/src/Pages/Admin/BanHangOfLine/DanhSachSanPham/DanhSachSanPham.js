import { useEffect, useState } from "react";
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
import { SetLoading } from "../../../../Rudux/Reducer/LoadingSlice";
const DanhSachSanPham = (props) => {
  const [inputsearch, setinputsearch] = useState("");
  const dispatch = useDispatch();
  const dataSanPhamGioHang = useSelector(
    (a) => a.sanPhamGioHang.SanPhamGioHang
  );
  const dataSanPhamGioHang1 = useSelector((a) => a.sanPhamGioHang.HoaDons);
  // useEffect(() => {
  //   // let dataSanPhamGioHang2 = dataSanPhamGioHang1.find((a) => a.check === true);
  //   // console.log(dataSanPhamGioHang1);
  //   // let tonggiakm = 0;
  //   // dataSanPhamGioHang1
  //   //   .find((a) => a.check === true)
  //   //   ?.SanPhamGioHang?.forEach((item) => {
  //   //     console.log("đây là sp trong giỏ hàng", item);

  //   //     if (item.trangthaikm === 0) {
  //   //       tonggiakm += item.giaTriKhuyenMai * item.soLuongmua;
  //   //     } else if (item.trangthaikm === 1) {
  //   //       tonggiakm +=
  //   //         ((item.giaBan * item.giaTriKhuyenMai) / 100) * item.soLuongmua;
  //   //     } else if (item.trangthaikm === 2) {
  //   //       tonggiakm += (item.giaBan - item.giaTriKhuyenMai) * item.soLuongmua;
  //   //     } else if (item.trangthaikm === 3) {
  //   //       tonggiakm +=
  //   //         (item.giaBan - (item.giaBan * item.giaTriKhuyenMai) / 100) *
  //   //         item.soLuongmua;
  //   //     }
  //   //   });

  //   // tonggiakm = tonggiakm;

  //   // console.log("Tổng giá khuyến mãi:", tonggiakm);

  //   // props.setGiamkhuyemai(tonggiakm);
  // }, [dataSanPhamGioHang1]);
  const HandleOnclickGetData = () => {
    // props.Getdata(inputsearch);
    dispatch(SetLoading(true));
    setTimeout(() => {
      dispatch(FetchDataSanPhamGioHang(inputsearch));
      setinputsearch("");
      dispatch(SetLoading(false));
    }, 3000);
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
    if (newSoLuong >= 1) {
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
          style={{ width: "25%", marginRight: "10px" }}
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
              <th>Khuyến mãi</th>
              <th>Tổng giá</th>
              <th>Img</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {dataSanPhamGioHang1
              .find((a) => a.check === true)
              ?.SanPhamGioHang?.map((item, index) => {
                if (!item) return null;
                return (
                  <tr key={item.idCTSP}>
                    <td>{index + 1}</td>
                    <td>
                      {item.tenSanPham + "-" + item.tenMau + "-" + item.kichCo}
                    </td>
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
                    <td>
                      {item.giaBan.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>

                    <td>
                      {item.trangthaikm === 0
                        ? (
                            item.giaTriKhuyenMai * item.soLuongmua
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : item.trangthaikm === 1
                        ? (
                            ((item.giaBan * item.giaTriKhuyenMai) / 100) *
                            item.soLuongmua
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : item.trangthaikm === 2
                        ? (
                            (item.giaBan - item.giaTriKhuyenMai) *
                            item.soLuongmua
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : item.trangthaikm === 3
                        ? (
                            (item.giaBan -
                              (item.giaBan * item.giaTriKhuyenMai) / 100) *
                            item.soLuongmua
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : 0}
                    </td>
                    <td>
                      {(
                        item.giaBan * item.soLuongmua -
                        (item.trangthaikm === 0
                          ? item.giaTriKhuyenMai * item.soLuongmua
                          : item.trangthaikm === 1
                          ? ((item.giaBan * item.giaTriKhuyenMai) / 100) *
                            item.soLuongmua
                          : item.trangthaikm === 2
                          ? (item.giaBan - item.giaTriKhuyenMai) *
                            item.soLuongmua
                          : item.trangthaikm === 3
                          ? (item.giaBan -
                              (item.giaBan * item.giaTriKhuyenMai) / 100) *
                            item.soLuongmua
                          : 0)
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>
                      <img
                        src={item.duongDanAnh}
                        alt={item.tenSanPham}
                        style={{ width: "100px" }}
                      />
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
