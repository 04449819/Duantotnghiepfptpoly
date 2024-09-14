import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody,
  MDBCardImage, MDBListGroup, MDBListGroupItem, MDBBtn
} from 'mdb-react-ui-kit';
import "./hoso.scss";
import ModalThemDiaChiMoi from '../GioHang/ModalThemDiaChiMoi';
import ModalSuaDiaChi from './ModalSuaHoso/ModalSuaDiaChi';
import Modalsua from './ModalSuaHoso/Modalsua';
import Modalhang from './ModalSuaHoso/Modalhang';
import ChangePasswordModal from './ModalSuaHoso/ChangePasswordModal';
import { TiDelete } from "react-icons/ti";
import { FaClipboard, FaHourglassHalf, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaUndo, FaUndoAlt } from 'react-icons/fa'; // Thêm các biểu tượng ở đây
import { toast } from 'react-toastify';

const HosoKh = () => {
  const { userId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shows, setShows] = useState(false);
  const [editCustomerModalOpen, setEditCustomerModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [load, setload] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`https://localhost:7095/api/KhachHang/GetById?id=${userId}`);
      setCustomer(response.data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu khách hàng:', error.response || error.message);
      setError('Không thể tải thông tin khách hàng.');
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`https://localhost:7095/api/DiaChiKhachHang/getalldiachikh?id=${userId}`);
      setAddresses(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách địa chỉ:', error.response || error.message);
      setError('Không thể tải địa chỉ.');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`https://localhost:7095/api/HoaDon/khachhana/${userId}`);
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Lỗi khi tải danh sách đơn hàng:', error.response || error.message);
      setOrders([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        await Promise.all([
          fetchCustomerData(),
          fetchAddresses(),
          fetchOrders(),
]);
      } catch (fetchError) {
        console.error('Lỗi khi tải dữ liệu:', fetchError.response || fetchError.message);
        setError('Lỗi khi tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, load]); // Thêm `load` vào dependency array để làm mới dữ liệu khi `load` thay đổi

  const handleEditClick = (addr) => {
    setSelectedAddress(addr);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAddress(null);
  };

  const HandleOnclickDeleteDC = async (item) => {
    try {
      const res = await axios.delete(
        `https://localhost:7095/api/DiaChiKhachHang/xoadckh?id=${item.id}`
      );
      toast.success(`${res.data}`);
      setload(!load); // Toggle load to trigger data refresh
    } catch (error) {
      toast.error(`Gặp lỗi: ${error.response.data}`);
    }
  };
  const HandleOnchangeCheckbox = async (item) => {
    try {
      const res = await axios.put(
        `https://localhost:7095/api/DiaChiKhachHang/updatedckh?id=${item.id}`
      );
      if (res.data !== "") {
        toast.success(`${res.data}`);
        setload(!load);
      }
    } catch (error) {
      toast.error(`Gặp lỗi: ${error.response.data}`);
    }
    // dispath(SetDiachiChinhNhanHang(item));
  };

  const handleSave = async () => {
    try {
      await fetchAddresses();
    } catch (error) {
      console.error('Lỗi khi cập nhật địa chỉ:', error.response || error.message);
    }
  };

  const handleEditCustomer = () => {
    setEditCustomerModalOpen(true);
  };

  const handleCloseCustomerModal = () => {
    setEditCustomerModalOpen(false);
  };

  const handleSaveCustomer = async () => {
    try {
      await fetchCustomerData();
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin khách hàng:', error.response || error.message);
    }
    handleCloseCustomerModal();
  };

  const handleShowOrderDetails = (orderId) => {
    setSelectedOrder(orderId);
    setOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setOrderModalOpen(false);
    setSelectedOrder(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handleOpenChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
  };

  const handleCloseChangePasswordModal = () => {
    setChangePasswordModalOpen(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 1:
        return <FaClipboard color="gray" title="Đơn nháp" />;
      case 2:
        return <FaHourglassHalf color="orange" title="Chờ xác nhận" />;
      case 3:
        return <FaUndo color="blue" title="Đang giao hàng" />;
      case 4:
        return <FaUndoAlt color="purple" title="Đang hoàn hàng" />;
      case 5:
        return <FaCheckCircle color="green" title="Hoàn hàng thành công" />;
      case 6:
        return <FaCheckCircle color="green" title="Thành công" />;
      case 7:
        return <FaTimesCircle color="red" title="Đơn hủy" />;
      case 8:
        return <FaExclamationCircle color="red" title="Chờ xác nhận hủy" />;
      case 9:
        return <FaExclamationCircle color="red" title="Chờ xác nhận hoàn hàng" />;
      default:
return <FaExclamationCircle color="gray" title="Không xác định" />;
    }
  };

  const renderTrangThaiGiaoHang = (trangThai) => {
    const trangThaiGiaoHangDict = {
      10: 'chuẩn bị hàng',
      2: 'Chờ xác nhận',
      3: 'Đang giao hàng',
      6: 'Thành công',
      7: 'Đơn hủy',
      8: 'Chờ xác nhận hủy',
      9: 'Chờ xác nhận hoàn hàng',
      4: 'Đang hoàn hàng',
      5: 'Hoàn hàng thành công'
    };
    return (
      <div className="d-flex align-items-center">
        {getStatusIcon(trangThai)}
        <span className="ms-2">{trangThaiGiaoHangDict[trangThai] || 'Không xác định'}</span>
      </div>
    );
  };

  const shouldShowNgayNhanHang = (trangThai) => {
    const hiddenStates = [1, 2, 3];
    return !hiddenStates.includes(trangThai);
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={customer?.profilePicture || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p className="text-muted mb-1 info-value">{customer?.ten || 'Chức vụ'}</p>
                <p className="text-muted mb-4 info-value">
                  {customer?.trangThai === 1 ? "Hoạt Động" : "Ngừng Hoạt Động" || 'N/A'}
                </p>
                <MDBBtn onClick={handleEditCustomer} className="btn">Sửa Thông Tin Khách Hàng</MDBBtn>
                <MDBBtn className="mt-2 btn" onClick={handleOpenChangePasswordModal}>Đổi Mật Khẩu</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody className="customer-info">
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="info-label">Họ và Tên</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="info-value">{customer?.ten || 'N/A'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="info-label">Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="info-value">{customer?.email || 'N/A'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
<MDBCardText className="info-label">Số Điện Thoại</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="info-value">{customer?.sdt || 'N/A'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="info-label">Trạng Thái</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="info-value">
                      {customer?.trangThai === 1 ? "Hoạt Động" : "Ngừng Hoạt Động" || 'N/A'}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="info-label">Địa Chỉ</MDBCardText>
                    <div className="text-center">
                      <MDBBtn
                        onClick={() => setShows(true)}
                        color="primary"
                        className="btn"
                      >
                        Thêm mới địa chỉ
                      </MDBBtn>
                    </div>
                  </MDBCol>

                  <MDBCol sm="9">
                    <MDBListGroup>
                      {addresses.length > 0 ? addresses.map((addr) => (
                        <MDBListGroupItem key={addr.id}>
                          
                          <div className="d-flex justify-content-between align-items-center">
                          <div style={{ width: "10%" }}>
                        <input
                          className="mt-4"
                          style={{ width: "15px", height: "15px" }}
                          type="checkbox"
                          onChange={() => HandleOnchangeCheckbox(addr)}
                          checked={addr.trangThai === 1 ? true : false}
                        />
                      </div>
                            <span>{addr.diaChi || 'N/A'}</span>

                            <div>
                            <div style={{ width: "10%" }}>
                        
                      </div>
                              <MDBBtn
                                className="me-2 btn"
                                size="sm"
                                onClick={() => handleEditClick(addr)}
                              >
                                Sửa
                              </MDBBtn>
                              <MDBBtn
                                color="danger"
                                size="sm"
                                className="btn"
                                onClick={() => HandleOnclickDeleteDC(addr)}
                              >
                                Xóa
                              </MDBBtn>
                            </div>
                          </div>
                        </MDBListGroupItem>
                      )) : (
                        <MDBCardText className="text-muted">Không có địa chỉ.</MDBCardText>
                      )}
                    </MDBListGroup>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        {/* Phần Đơn Hàng */}
        <MDBRow className="mt-4">
          <MDBCol lg="12">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
<MDBCol sm="3">
                    <MDBCardText>Đơn Hàng</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBListGroup>
                      {orders.length > 0 ? orders.map(order => (
                        <MDBListGroupItem key={order.id}>
                          <MDBCardText>
                            <div className="order-header">
                              <h5>Mã hóa đơn: {order.maHD}</h5>
                            </div>
                            <div className="order-details">
                              <p>
                                <div><strong>Ngày tạo đơn:</strong> {formatDate(order.ngayTao)}</div>
                              </p>
                              {shouldShowNgayNhanHang(order.trangThaiGiaoHang) && (
                                <p><strong>Ngày nhận hàng:</strong> {formatDate(order.ngayNhanHang)}</p>
                              )}
                              <p>
                                <strong>Tên Người Nhận:</strong> {order.tenNguoiNhan}
                              </p>
                              <p>
                                <strong>Trạng Thái Giao Hàng:</strong> {renderTrangThaiGiaoHang(order.trangThaiGiaoHang)}
                              </p>
                            </div>

                            <MDBBtn
                              className="float-end mt-2"
                              size="sm"
                              onClick={() => handleShowOrderDetails(order.id)}
                            >
                              Xem Chi Tiết
                            </MDBBtn>
                          </MDBCardText>
                        </MDBListGroupItem>
                      )) : (
                        <MDBCardText className="text-muted">Không có đơn hàng.</MDBCardText>
                      )}
                    </MDBListGroup>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/* Modal Chi Tiết Đơn Hàng */}
        {selectedOrder && (
          <Modalhang
            isOpen={orderModalOpen}
            onClose={handleCloseOrderModal}
            orderId={selectedOrder}
          />
        )}

        {/* Các modal khác */}
        {modalOpen && (
          <ModalSuaDiaChi
            isOpen={modalOpen}
            onClose={handleCloseModal}
            address={selectedAddress}
            onSave={handleSave}
          />
        )}
        {editCustomerModalOpen && (
          <Modalsua
            isOpen={editCustomerModalOpen}
            onClose={handleCloseCustomerModal}
            onSave={handleSaveCustomer}
            customer={customer}
          />
        )}
        {shows && (
          <ModalThemDiaChiMoi
            show={shows}
            setShow={setShows}
            setload={setload}
            load={load}
          />
        )}
{changePasswordModalOpen && (
          <ChangePasswordModal
            show={changePasswordModalOpen}
            handleClose={handleCloseChangePasswordModal}
            userId={userId}
          />
        )}
      </MDBContainer>
    </section>
  );
};

export default HosoKh;