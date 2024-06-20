
import { Modal, Button } from 'react-bootstrap';
import "./QuanlyKhachHang.scss";
import axios from "axios";
import React, { useState, useEffect } from 'react';
const EditQuanLyKH = ({handleSuccess, handleClose , initialFormData}) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sdt : '', 
    password: '',
    confirmPassword: '',
    diemTich : '',
    trangThai: ''
  });
  useEffect(() => {
    console.log('Form submitted:', initialFormData);
    // Set initial form data when initialFormData prop changes
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation or submission logic here
    console.log('Form submitted:', formData);
    try {
      const response = await axios.post('https://localhost:7095/api/KhachHang/Update', {
        id : formData.id,
          name: formData.name,
          email: formData.email,
          sdt: formData.sdt,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
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
    <form onSubmit={handleSubmit}  className="TextThem">
      <div>
        <label  className='label_name' htmlFor="name">Name:</label>
        <input className='text_input'
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label  className='label_name' htmlFor="password">password:</label>
        <input className='text_input'
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label   className='label_name' htmlFor="password">Confirm Password:</label>
        <input className='text_input'
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
  
      <div>
        <label   className='label_name' htmlFor="Email">Email:</label>
        <input className='text_input'
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label  className='label_name' htmlFor="sdt">sdt:</label>
        <input  className='text_input'
          type="sdt"
          id="sdt"
          name="sdt"
          value={formData.sdt}
          onChange={handleChange}
          required
        />
      </div>
      <div>  
        <label   className='label_name' htmlFor="diemtich">diemTich:</label>
        <input className='text_input'
          type="diemTich"
          id="diemTich"
          name="diemTich"
          value={formData.diemTich}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className='label_name'  htmlFor="trangthai">trangThai:</label>
        <input  className='text_input'
          type="trangThai"
          id="trangThai"
          name="trangThai"
          value={formData.trangThai}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};
/////////////////////////////////////////////////////////////////////
const MyModalEdit = ({ show, handleClose, handleSuccess, initialFormData }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa Thông tin Khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body><EditQuanLyKH handleSuccess = {handleSuccess} handleClose = {handleClose} initialFormData = {initialFormData}></EditQuanLyKH></Modal.Body>
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
export default MyModalEdit;
