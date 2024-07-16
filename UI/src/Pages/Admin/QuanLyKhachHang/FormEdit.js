
import { Modal, Button } from 'react-bootstrap';
import "./QuanlyKhachHang.scss";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { templateSettings } from 'lodash';
import { useDispatch} from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
const EditQuanLyKH = ({handleSuccess, handleClose , initialFormData}) => {
  const dispath = useDispatch();
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sdt : '', 
    password: '',
    gioiTinh:'',
    ngaySinh:'',   
    sdiaChidt:''

  });
  useEffect(() => {
    console.log('Form submitted:', initialFormData);
    // Set initial form data when initialFormData prop changes
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);


  //////////////////////////////////////////
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
    dispath(SetLoading(true));
     // Validate tên
     if ( formData.name.length < 2) {
      setMessageName('Tên quá ngắn. Vui lòng nhập ít nhất 2 ký tự.');
      return;
    } else if ( formData.name.length > 50) {
      setMessageName('Tên quá dài. Vui lòng nhập không quá 50 ký tự.');
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
    // Perform form validation or submission logic here
    console.log('Form submitted:', formData);
    setTimeout( async () => {
      try {
        const response = await axios.put(`https://localhost:7095/api/KhachHang/updatekhachhang?id=${formData.id }`, {
          ten: formData.name,
          email: formData.email,
          sdt: formData.sdt,
          gioiTinh:formData.gioiTinh,
          ngaySinh:formData.ngaySinh,
          diaChi:formData.sdiaChidt,
      });
      if (response.status === 200) {
        handleClose()
        handleSuccess()
      } else {
        
      }
      console.log('Response:', response.data);
      // Xử lý dữ liệu phản hồi tại đây
        dispath(SetLoading(false));
      } catch (error) {
         dispath(SetLoading(false));
      }
    
    }, 3000);

  
  };

  return (
    <form onSubmit={handleSubmit}  className="TextThem">
      <div>
        <label  className='label_name' htmlFor="name">Tên:</label>
        <input className='text_input'
          type="name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          
        />
      </div>
      <p style={{color : "red"}}>{messageName}</p>
      <div>
        <label  className='label_name' htmlFor="ngaySinh">Ngày sinh:</label>
        <input className='text_input'
          type="ngaySinh"
          id="ngaySinh"
          name="ngaySinh"
          value={formData.ngaySinh}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label   className='label_name' htmlFor="gioiTinh">Giới tính:</label>
        <input className='text_input'
          type="gioiTinh"
          id="gioiTinh"
          name="gioiTinh"
          value={formData.gioiTinh}
          onChange={handleChange}
          required
        />
      </div>
  
      <div>
        <label className='label_name' htmlFor="Email">Email:</label>
        <input className='text_input'
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <p style={{color : "red"}}>{messageEmail}</p>

      <div>
        <label  className='label_name' htmlFor="sdt">Số điện thoại:</label>
        <input  className='text_input'
          type="sdt"
          id="sdt"
          name="sdt"
          value={formData.sdt}
          onChange={handleChange}
         
        />
      </div>
      <p style={{color : "red"}}>{messagePhone}</p>
      <div>
        <label  className='label_name' htmlFor="sdiaChidt">Địa chỉ :</label>
        <input  className='text_input'
          type="sdiaChidt"
          id="sdiaChidt"
          name="sdiaChidt"
          value={formData.sdiaChidt}
          onChange={handleChange}
          
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
