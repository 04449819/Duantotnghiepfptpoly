import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./QuanLyNhanVienPage.scss";
import axios from "axios";

const AddQuanLyNV = ({handleSuccess, handleClose}) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

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
    try {
      const formData = new FormData(e.target);
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        console.log(key, value);
        params.append(key, value);
      });
      
      
    
      const queryString = params.toString();
      const response = await axios.post(`https://localhost:7095/api/NhanVien/DangKyNhanVien?${queryString}`);
    
      if (response.status === 200) {
        handleClose()
        handleSuccess()
        console.log('Response:', response.data);
      } else {
        console.log('Response:', `${response.status} - ${response.error}`);
      }
      
      // Xử lý dữ liệu phản hồi tại đây
  } catch (error) {
      console.error('There was an error posting the data!', error);
  }
  
  };

  return (
    <form onSubmit={handleSubmit}  className="TextThem">
      <div className="form-group">
        <label className='label' htmlFor="ten"> Name :</label>
        <input className='text_input'
          type="text"
          id="ten"
          name="ten"
          value={formData.ten}
          onChange={handleChange}
          required
        />
      </div>
      <div div className="form-group">
        <label className='label' htmlFor="password"> password :</label>
        <input className='text_input'
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div div className="form-group">
        <label className='label' htmlFor="Email"> Email :</label>
        <input className='text_input'
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div div className="form-group">
        <label className='label' htmlFor="sdt"> Số điện thoại :</label>
        <input className='text_input'
          type="sdt"
          id="sdt"
          name="sdt"
          value={formData.sdt}
          onChange={handleChange}
          required
        />
      </div>
      <div div className="form-group">
        <label className='label' htmlFor="diachi"> Địa chỉ:</label>
        <input className='text_input'
          type="diachi"
          id="diachi"
          name="diachi"
          value={formData.diaChi}
          onChange={handleChange}
          required
        />
      </div>
      <div div className="form-group">
        <label className='label' htmlFor="trangthai"> Trạng thái:</label>
        <input className='text_input'
          type="trangThai"
          id="trangThai"
          name="trangThai"
          value={formData.trangThai}
          onChange={handleChange}
          required
        />
      </div>
      <div div className="form-group">
        <label className='label' htmlFor="vaitro"> Vai trò:</label>
        <input className='text_input'
          type="vaitro"
          id="vaitro"
          name="vaitro"
          value={formData.vaitro}
          onChange={handleChange}
          required
        />
      </div>
      <div className="button-container">
      <button type="submit" className="submit-button"> Submit </button>
      </div>
    </form>
  );
};
/////////////////////////////////////////////////////////////////////
const MyModalAdd = ({ show, handleClose, handleSuccess }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Nhân Viên</Modal.Title>
        </Modal.Header>
        <Modal.Body><AddQuanLyNV handleSuccess = {handleSuccess} handleClose = {handleClose}></AddQuanLyNV></Modal.Body>
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
