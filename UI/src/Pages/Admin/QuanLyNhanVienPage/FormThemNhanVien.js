import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./QuanLyNhanVienPage.scss";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch} from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";

const AddQuanLyNV = ({handleSuccess, handleClose}) => {

  const dispath = useDispatch();

  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [messageName, setMessageName] = useState('');
  const [messagePhone, setMessagePhone] = useState('');
  const [messageEmail, setMessageEmail] = useState('');

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
     if (formData.ten.length < 2) {
       setMessageName('Tên quá ngắn. Vui lòng nhập ít nhất 2 ký tự.');
       return;
     } else if (formData.ten.length > 50) {
       setMessageName('Tên quá dài. Vui lòng nhập không quá 50 ký tự.');
       return;
     } else if (!nameRegex.test(formData.ten)) {
       setMessageName('Tên không hợp lệ. Vui lòng chỉ nhập các chữ cái.');
       return;
     }
     //  Validate Số emai
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     if (!emailRegex.test(formData.email)) {
       setMessageEmail('Địa chỉ email không hợp lệ. Vui lòng nhập đúng định dạng.');
       return;
     }
     // Validate Số Điện thoại
     ///  /^[0-9]{10}$/
     const phoneRegex = /^0\d{9}$/ ;
     if (!phoneRegex.test(formData.sdt)) {
       setMessagePhone('Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng .');
       return;
     }



    /////
    try {
      dispath(SetLoading(true));
      const formData = new FormData(e.target);
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
       // console.log(key, value);
        params.append(key, value);
      });
      const queryString = params.toString();
      setTimeout( async () => {
        try {
          const response = await axios.post(`https://localhost:7095/api/NhanVien/DangKyNhanVien?${queryString}`);
          if (response.status === 200) {

            handleClose()
            handleSuccess()
            console.log('Response:', response.data);
            toast.success("đăng ký thành công");
          } else {
            toast.error("Thoong tin ddawng ky bij trung", {
              autoClose: 5000,
            });
            console.log('Response:', `${response.status} - ${response.error}`);
          }
           dispath(SetLoading(false));
        } catch (error) {

           dispath(SetLoading(false));
        }
      
      }, 3000);
     
    
     
      
      // Xử lý dữ liệu phản hồi tại đây
  } catch (error) {
    dispath(SetLoading(false));
    toast.error("Thoong tin ddawng ky bij trung", {
      autoClose: 5000,
    });

      console.error('There was an error posting the data!', error.error);
  }
  
  };

  return (
    <form onSubmit={handleSubmit}  className="TextThem">
      <div className="form-group">
        <label className='label' htmlFor="ten"> Name :</label>
        <input className='text_input'
          type="ten"
          id="ten"
          name="ten"
          value={formData.ten}
          onChange={handleChange}
          required
        />
      </div>
      <p>{messageName}</p>
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
      <p>{messageEmail}</p>
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
      <p>{messagePhone}</p>
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
      <ToastContainer
      position="top-right"
      />
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
