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
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false); // State cho modal đổi mật khẩu

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
  }, [userId]);

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
      setload(!load);
    } catch (error) {
      toast.error(`Gặp lỗi: ${error.response.data}`);
    }
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

  const handleOpenChangePasswordModal = () => {
    setChangePasswordModalOpen(true);
  };

  const handleCloseChangePasswordModal = () => {
    setChangePasswordModalOpen(false);
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
                      <span>{addr.diaChi || 'N/A'}</span>
                      <div>
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
            <strong>{order.maHD}</strong> - {order.ngayTao}
          </div>
          <div className="order-details">
            {order.chiTietHoaDons.length > 0 && (
              <div key={order.chiTietHoaDons[0].id} className="order-item">
                <img
                  src={order.chiTietHoaDons[0].chiTietSanPham.anhs[0]?.duongDan || 'https://via.placeholder.com/100'}
                  alt={order.chiTietHoaDons[0].chiTietSanPham.sanPham.ten}
                  style={{ width: '100px', height: 'auto', marginRight: '1rem' }}
                />
                <div className="order-item-details">
                  <p>
                    <strong>{order.chiTietHoaDons[0].chiTietSanPham.sanPham.ten}</strong>
                  </p>
                  <p>
                    Phân loại hàng: {order.chiTietHoaDons[0].chiTietSanPham.idMauSac} | Size: {order.chiTietHoaDons[0].chiTietSanPham.idKichCo}
                  </p>
                  <p className="price">{order.chiTietHoaDons[0].donGia.toLocaleString()} đ</p>
                </div>
              </div>
            )}
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
