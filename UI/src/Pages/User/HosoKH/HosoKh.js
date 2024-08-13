import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody,
  MDBCardImage, MDBListGroup, MDBListGroupItem, MDBBtn
} from 'mdb-react-ui-kit';
import EditAddressModal from './ModalSuaHoso/EditAddressModal';
import "./hoso.scss";

const HosoKh = () => {
  const { userId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`https://localhost:7095/api/KhachHang/GetById?id=${userId}`);
      setCustomer(response.data);
    } catch (error) {
      console.error('Error fetching customer data:', error.response || error.message);
      setError('Cannot fetch customer data.');
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`https://localhost:7095/api/DiaChiKhachHang/getByIdkh/${userId}`);
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error.response || error.message);
      setError('Cannot fetch addresses.');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`https://localhost:7095/api/HoaDon/khachhana/${userId}`);
      // Ensure response.data is an array, even if empty
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      // Handle error if fetching orders fails, but do not break the component
      console.error('Error fetching orders:', error.response || error.message);
      setOrders([]); // Set orders to an empty array on error
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
        console.error('Error in fetching data:', fetchError.response || fetchError.message);
        setError('Error fetching data.');
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

  const handleSave = async () => {
    try {
      await fetchAddresses();
    } catch (error) {
      console.error('Error updating addresses:', error.response || error.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
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
                <p className="text-muted mb-1">{customer?.ten || 'Position'}</p>
                <p className="text-muted mb-4">
                  {customer?.trangThai === 1 ? "Active" : "Inactive" || 'N/A'}
                </p>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{customer?.ten || 'N/A'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{customer?.email || 'N/A'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone Number</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{customer?.sdt || 'N/A'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Status</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {customer?.trangThai === 1 ? "Active" : "Inactive" || 'N/A'}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Addresses</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBListGroup>
                      {addresses.length > 0 ? addresses.map((addr) => (
                        <MDBListGroupItem key={addr.id}>
                          {addr.diaChiKhachHang.diaChi || 'N/A'}
                          <MDBBtn
                            className="float-end"
                            size="sm"
                            onClick={() => handleEditClick(addr)}
                          >
                            Edit
                          </MDBBtn>
                        </MDBListGroupItem>
                      )) : (
                        <MDBCardText className="text-muted">No addresses available.</MDBCardText>
                      )}
                    </MDBListGroup>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        {/* Orders Section */}
        <MDBRow className="mt-4">
          <MDBCol lg="12">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Đơn hàng đã mau </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <MDBListGroup>
  {orders.length > 0 ? orders.map((order) => (
    <MDBListGroupItem key={order.id}>
      <MDBCardText><strong>Ngày mua hàng:</strong> {new Date(order.ngayThanhToan).toLocaleDateString()}</MDBCardText>
      <MDBCardText><strong>Ngày nhận hàng:</strong> {new Date(order.ngayNhanHang).toLocaleDateString()}</MDBCardText>
      <MDBCardText><strong>Tổng tiền:</strong> {order.tongTien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</MDBCardText>

      {order.chiTietHoaDons && order.chiTietHoaDons.length > 0 ? (
        <div className="order-items">
          {order.chiTietHoaDons.map((item) => (
            <div className="order-item" key={item.id}>
              {/* Assuming `anhs` is an array and you are taking the first image */}
              <img src={item.chiTietSanPham.anhs[0]?.duongDan || 'default-image-url.jpg'} alt={item.chiTietSanPham.sanPham.ten} style={{ width: '100px', height: 'auto' }} />
              <div className="order-item-details">
                <p><strong>{item.chiTietSanPham.sanPham.ten}</strong></p>
                <p>Phân loại hàng: {item.chiTietSanPham.mauSac?.ten || 'Không có màu sắc'} | Size: {item.chiTietSanPham.kichCo?.ten || 'Không có kích cỡ'}</p>
                <p className="price">{(item.donGia * item.soLuong).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <MDBCardText className="text-muted">No details available.</MDBCardText>
      )}
    </MDBListGroupItem>
  )) : (
    <MDBCardText className="text-muted">No orders available.</MDBCardText>
  )}
</MDBListGroup>


                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Integrate the EditAddressModal component */}
      {selectedAddress && (
        <EditAddressModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          address={selectedAddress}
          onSave={handleSave}
        />
      )}
    </section>
  );
};

export default HosoKh;
