import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody,
  MDBCardImage, MDBIcon, MDBListGroup, MDBListGroupItem
} from 'mdb-react-ui-kit';
import ModalXemhoso from './modalhoso/ModalXemhoso';

const XemhoXo = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [load, setload] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://localhost:7095/api/NhanVien/GetById?id=${userId}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu nhân viên:', error);
        setError('Không thể lấy dữ liệu nhân viên.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [userId, load ]);

  const handleEmployeeUpdate = (updatedEmployee) => {
    setEmployee(updatedEmployee);
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
                  src={employee.profilePicture || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p className="text-muted mb-1">{employee.ten || 'Vị trí'}</p>
                <p className="text-muted mb-4">{employee.trangThai === 1 ?" đang hoạt động":"không hoạt đông" || 'Địa chỉ'}</p>
                <div className="d-flex justify-content-center mb-2">
                  <ModalXemhoso employee={employee} onEmployeeUpdate={handleEmployeeUpdate} setload = {setload} load = {load} />
                </div>
              </MDBCardBody>
            </MDBCard>

           
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Họ và tên</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{employee.ten || 'N/A'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{employee.email || 'N/A'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Số điện thoại</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{employee.sdt || 'N/A'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Trạng thái</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{employee.trangThai === 1 ?" đang hoạt động":"không hoạt đông" || 'N/A'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Địa chỉ</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{employee.diaChi  || 'N/A'}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default XemhoXo;
