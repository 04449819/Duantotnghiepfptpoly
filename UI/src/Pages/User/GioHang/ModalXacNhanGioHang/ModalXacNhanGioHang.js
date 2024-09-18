import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Table } from "react-bootstrap";

const ConfirmationModal = ({ show, onHide, data, onConfirm }) => {
  console.log("Xác nhận", data);
  
  const [voucherName, setVoucherName] = useState('');

    useEffect(() => {
      const fetchVoucherName = async () => {
        if (data?.IdVoucher) {
          try {
            const response = await axios.get(`https://localhost:7095/api/Voucher/${data?.IdVoucher}`);
            setVoucherName(response.data.ten);
          } catch (error) {
            console.error('Error fetching voucher name:', error);
            setVoucherName('Không thể tải tên voucher');
          }
        }
      };
  
      fetchVoucherName();
    }, [data?.IdVoucher]);
  if (!show) return null;
  if (!data) return null;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận đặt hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Thông tin khách hàng */}
        <div className="mb-3">
          <h5>Thông tin khách hàng</h5>
          <p><strong>Tên khách hàng:</strong> {data?.TenKhachHang || 'Chưa cung cấp'}</p>
          <p><strong>Số điện thoại:</strong> {data?.SDT || 'Chưa cung cấp'}</p>
          <p><strong>Email:</strong> {data?.Email || 'Chưa cung cấp'}</p>
          <p><strong>Địa chỉ:</strong> {data?.DiaChi || 'Chưa cung cấp'}</p>
          <p><strong>Ghi chú:</strong> {data?.GhiChu || 'Không có'}</p>
        </div>

        {/* Thông tin thanh toán và vận chuyển */}
        <div className="mb-3">
          <h5>Thông tin thanh toán và vận chuyển</h5>
          <p><strong>Phương thức thanh toán:</strong> {data?.IdPhuongThucThanhToan === "f1fb9f0b-5db2-4e04-8ba3-84e96f0d820c" ? 'COD' : 'CK'}</p>
          {/* <p><strong>Mã voucher:</strong> {data?.IdVoucher || 'Không áp dụng'}</p> */}
          <p><strong>Voucher:</strong> {voucherName || 'Không áp dụng'}</p>
          <p><strong>Tiền ship:</strong> {data?.TienShip?.toLocaleString()} VND</p>
          {/* <p><strong>Trạng thái giao hàng:</strong> {data?.TrangThaiGiaoHang === 2 ? 'Đang giao' : 'Chưa xác định'}</p> */}
        </div>

        {/* Bảng sản phẩm */}
        <h5>Sản phẩm trong giỏ hàng</h5>
        <Table bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá bán</th>
              <th>Thành tiền</th>
              <th>Hình ảnh</th>
            </tr>
          </thead>
          <tbody>
            {data.SanPhams?.length > 0 ? (
              data.SanPhams.map((sp, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{sp.TenSanPham}</td>
                  <td>{sp.SoLuongMua}</td>

                  {/* <td>{sp.GiaBan.toLocaleString()} VND</td> */}
                  <td>
                  {sp.GiaTriSauKhuyenMai === sp.GiaBan ? (
                          // Nếu giatrithuc = GiaBan thì chỉ hiển thị GiaBan
                          <span>{sp?.GiaBan?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}</span>
                        ) : (
                          // Nếu giatrithuc < giaban thì dùng thẻ del cho giaban và hiển thị giatrithuc
                          <div>
                            <del>{sp?.GiaBan?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}</del>
                            <br />
                            <span>{sp?.GiaTriSauKhuyenMai?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}</span>
                          </div>
                        )}
                  </td>
                  {/* <td>
                  {sp.GiaTriSauKhuyenMai === sp.GiaBan ? (
                          // Nếu giatrithuc = GiaBan thì chỉ hiển thị GiaBan
                          <span>{sp?.GiaBan?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}</span>
                        ) : (
                          // Nếu giatrithuc < GiaBan thì dùng thẻ del cho GiaBan và hiển thị giatrithuc
                          <div>
                            <del>{sp?.GiaBan?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}</del>
                            <br />
                            <span>{sp?.GiaTriSauKhuyenMai?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}</span>
                          </div>
                        )}
                  </td> */}
                  <td>{(sp.GiaTriSauKhuyenMai * sp.SoLuongMua).toLocaleString()} VND</td>
                  {/* <td>    {(sp.GiaTriSauKhuyenMai * sp.SoLuongMua).toLocaleString()} VND</td> */}
                  <td><img src={sp.Anh} alt={sp.TenSanPham} style={{ width: '50px' }} /></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Không có sản phẩm</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Bảng tổng kết đơn hàng */}
        <h5>Tóm tắt đơn hàng</h5>
        <Table bordered>
          <tbody>
            <tr>
              <td>Tổng tiền ban đầu:</td>
              <td>{data?.tongTienBanDau?.toLocaleString()} VND</td>
            </tr>

            <tr>
              <td>Tiền giảm từ điểm:</td>
              <td>{data?.tienGiamDiem?.toLocaleString()} VND</td>
            </tr>

            <tr>
              <td>Tiền giảm từ voucher:</td>
              <td>{data?.tienGiamVoucher?.toLocaleString()} VND</td>
            </tr>

            <tr>
              <td>Tiền ship:</td>
              <td>{data?.TienShip?.toLocaleString()} VND</td>
            </tr>

          
           
            <tr>
              <td><strong>Tổng tiền thanh toán:</strong></td>
              <td><strong>{data?.TongTienHoaDon?.toLocaleString()} VND</strong></td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Xác nhận đặt hàng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
