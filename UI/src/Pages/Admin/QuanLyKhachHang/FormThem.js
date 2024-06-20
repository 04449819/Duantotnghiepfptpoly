import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./QuanlyKhachHang.scss";
import axios from "axios";

const AddQuanLyKH = ({handleSuccess, handleClose}) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    ten: '',
    email: ''
  });
  /////////////////////////////////
  const [message, setMessage] = useState('');
  // Handle input change
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation or submission logic here
    console.log('Form submitted:', formData);
    // Validate tên
    const nameRegex = /^[A-Za-z\s]+$/;
    if (formData.ten.length < 2) {
      setMessage('Tên quá ngắn. Vui lòng nhập ít nhất 2 ký tự.');
      return;
    } else if (formData.ten.length > 50) {
      setMessage('Tên quá dài. Vui lòng nhập không quá 50 ký tự.');
      return;
    } else if (!nameRegex.test(formData.ten)) {
      setMessage('Tên không hợp lệ. Vui lòng chỉ nhập các chữ cái.');
      return;
    }
    //  Validate Số emai
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setMessage('Địa chỉ email không hợp lệ. Vui lòng nhập đúng định dạng.');
      return;
    }
    // Validate Số Điện thoại
    ///  /^[0-9]{10}$/
    const phoneRegex = /^0\d{9}$/ ;
    if (!phoneRegex.test(formData.sdt)) {
      setMessage('Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng .');
      return;
    }

    try {

      const response = await axios.post('https://localhost:7095/api/KhachHang/PostKHView1', {
        id : "3fa85f64-5717-4562-b3fc-2c963f66afa9",
          ten: formData.ten,
          email: formData.email,
          sdt: formData.sdt,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          gioiTinh: formData.gioiTinh,
          ngaySinh:formData.ngaySinh,
          diaChi:formData.diaChi,
          diemTich: formData.diemTich,
          trangThai: formData.trangThai
      });
      if (response.status === 200) {
        handleClose()
        handleSuccess()
      } else {
        
      }
      console.log('Response:', response.data);
      // Xử lý dữ liệu phản hồi tại đây
  } catch (error) {
      console.error('There was an error posting the data!', error);
  }
  
  };

  return (
    <form onSubmit={handleSubmit}>
      
        <div className="form-group">
        <label className='label_name' htmlFor="ten">Tên:</label>
        <input className='text_input'
          type="text"
          id="ten"
          name="ten"
          value={formData.ten}
          onChange={handleChange}
        />
      </div>
        <div className="form-group">
            <label className='label_name' htmlFor="password">Password:</label>
            <input className='text_input'
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
        </div>
        <div className="form-group">
            <label className='label_name' htmlFor="confirmPassword">Confirm Password:</label>
            <input className='text_input'
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
        </div>
        <div className="form-group">
            <label className='label_name' htmlFor="email">Email:</label>
            <input className='text_input'
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
        </div>
        <div className="form-group">
            <label className='label_name' htmlFor="gioiTinh">Gioi tinh:</label>
            <input className='text_input'
                type="text"
                id="gioiTinh"
                name="gioiTinh"
                value={formData.gioiTinh}
                onChange={handleChange}
                required
            />
        </div>
        <div  className="form-group">
            <label className='label_name' htmlFor="ngaySinh">Ngay sinh:</label>
            <input  className='text_input'
                type="date"
                id="ngaySinh"
                name="ngaySinh"
                value={formData.ngaySinh}
                onChange={handleChange}
                required
            />
        </div>
        <div className="form-group">
            <label className='label_name' htmlFor="diaChi">Địa chỉ:</label>
            <input  className='text_input'
                type="text"
                id="diaChi"
                name="diaChi"
                value={formData.diaChi}
                onChange={handleChange}
                required
            />
        </div>
        <div  className="form-group">
        <label className='label_name' htmlFor="sdt">Số Điện Thoại:</label>
        <input className='text_input'
          type="text"
          id="sdt"
          name="sdt"
          value={formData.sdt}
          onChange={handleChange}
        />
      </div>
        
        <div className="form-group">
            <label className='label_name' htmlFor="diemTich">Diem Tich:</label>
            <input  className='text_input'
                type="text"
                id="diemTich"
                name="diemTich"
                value={formData.diemTich}
                onChange={handleChange}
                required
            />
        </div>
        <div className="form-group">
            <label className='label_name' htmlFor="trangThai">Trang Thai:</label>
            <input  className='text_input'
                type="text"
                id="trangThai"
                name="trangThai"
                value={formData.trangThai}
                onChange={handleChange}
                required
            />
        </div>
        <button type="submit" className="submit-button"> Submit </button>
        {message && <p>{message}</p>}
    </form>
  );
};
/////////////////////////////////////////////////////////////////////
const MyModalAdd = ({ show, handleClose, handleSuccess }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body><AddQuanLyKH handleSuccess = {handleSuccess} handleClose = {handleClose}></AddQuanLyKH></Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    );
  };
export default MyModalAdd;
