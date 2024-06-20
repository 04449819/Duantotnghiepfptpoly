
import { Modal, Button } from 'react-bootstrap';
import "./QuanLyNhanVienPage.scss";
import axios from "axios";
import React, { useState, useEffect } from 'react';
const EditQuanLyNV = ({handleSuccess, handleClose , initialFormData}) => {
  // State to hold form data
  const [id,setId] = useState('')
  const [formData, setFormData] = useState({
    id:'',
    name: '',
    email: '',
    sdt : '', 
    password: '',
    diachi: '',
    trangthai: '',
    idvaitro : '952c1a5d-74ff-4daf-ba88-135c5440809c'
    
  });
  useEffect(() => {
    console.log('Form submitted:', initialFormData);
    // Set initial form data when initialFormData prop changes
    if (initialFormData) {
      setId(initialFormData.id)
      setFormData(initialFormData);
    }
  }, [initialFormData]);
  ////////////////////
  const [message, setMessage] = useState('');
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
      // Validate tên
      const nameRegex = /^[A-Za-z\s]+$/;
      if (formData.name.length < 2) {
        setMessage('Tên quá ngắn. Vui lòng nhập ít nhất 2 ký tự.');
        return;
      } else if (formData.name.length > 50) {
        setMessage('Tên quá dài. Vui lòng nhập không quá 50 ký tự.');
        return;
      } else if (!nameRegex.test(formData.name)) {
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
      const formData = new FormData(e.target);
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        console.log(key, value);
        if(key == "name"){
          params.append("ten", value);
        }else{
          params.append(key, value);
        }
      });
      const queryString = params.toString();
      
      const response = await axios.put(`https://localhost:7095/api/NhanVien/${id}?${queryString}`);
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
        <label className='label' htmlFor="name">Name:</label>
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
        <label className='label' htmlFor="password">password:</label>
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
        <label className='label' htmlFor="Email">Email:</label>
        <input className='text_input'
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className='label' htmlFor="sdt">sdt:</label>
        <input className='text_input'
          type="text"
          id="sdt"
          name="sdt"
          value={formData.sdt}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className='label' htmlFor="diachi">diaChi:</label>
        <input className='text_input'
          type="text"
          id="diachi"
          name="diachi"
          value={formData.diaChi}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className='label' htmlFor="trangthai">trangThai:</label>
        <input className='text_input'
          type="text"
          id="trangthai"
          name="trangthai"
          value={formData.trangthai}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className='label' htmlFor="idvaitro">vaitro:</label>
        <input className='text_input'
          type="text"
          id="idvaitro"
          name="idvaitro"
          value={formData.idvaitro}
          onChange={handleChange}
          required
        />
      </div>
      <div className="button-container">
      <button type="submit" className="submit-button">Submit</button>
      {message && <p>{message}</p>}
      </div>
    </form>
  );
};
/////////////////////////////////////////////////////////////////////
const MyModalEdit = ({ show, handleClose, handleSuccess, initialFormData }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa Thông tin Nhân Viên</Modal.Title>
        </Modal.Header>
        <Modal.Body><EditQuanLyNV handleSuccess = {handleSuccess} handleClose = {handleClose} initialFormData = {initialFormData}></EditQuanLyNV></Modal.Body>
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
