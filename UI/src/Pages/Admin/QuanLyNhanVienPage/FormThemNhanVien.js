import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import "./QuanLyNhanVienPage.scss";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch} from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
import { Form, Button } from 'react-bootstrap';

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
  const [messagePassword, setMessagePassword] = useState('');
  const [messageDiaChi, setMessageDiaChi] = useState('');
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
    // const nameRegex = /^[\p{L}\s]+$/u;
     if ( formData.ten === undefined ) {
       setMessageName('Tên không được để trống. Vui lòng nhập  ký tự.');
       return;
     } else if (formData.ten.length > 50) {
       setMessageName('Tên quá dài. Vui lòng nhập không quá 50 ký tự.');
       return;
     }else if (formData.ten.length < 2) {
      setMessageName('Tên quá ngắn. Vui lòng nhập trên 2 ký tự.');
      return;
     }
    //   else if (!nameRegex.test(formData.ten)) {
    //    setMessageName('Tên không hợp lệ. Vui lòng chỉ nhập các chữ cái.');
    //    return;
    //  }
    ////////////////////////////////////////////
     //  Validate Số emai
     const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     if (!emailRegex.test(formData.email)) {
       setMessageEmail('Địa chỉ email không hợp lệ. Vui lòng nhập đúng định dạng.');
       return;
     }
     // Validate Số Điện thoại
     ///  /^[0-9]{10}$/
     const phoneRegex = /^0\d{9}$/;
     if (!formData.sdt || !phoneRegex.test(formData.sdt)) {
         setMessagePhone(formData.sdt.length === 0 ? 
             'Số điện thoại không được để trống.' : 
             'Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.');
         return;
     }
     // validate password
     const passwordMinLength = 8;
     if (!formData.password || formData.password.length < passwordMinLength) {
         setMessagePassword(formData.password.length === 0 ? 
             "Mật khẩu không được để trống." : 
             `Mật khẩu quá ngắn. Vui lòng nhập ít nhất ${passwordMinLength} ký tự.`);
         return;
     }
     // địa chỉ
     if (!formData.address || formData.address.length === 0) {
      setMessageDiaChi("Địa chỉ không được để trống.");
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
    <Form onSubmit={handleSubmit} className="TextThem">
    <Form.Group className="mb-3" >
      <Form.Label className='label ' htmlFor="ten">Tên :</Form.Label>
      <Form.Control
        type="text"
        id="ten"
        name="ten"
        value={formData.ten}
        onChange={handleChange}
        
    
      />
    </Form.Group>
    <p style={{color : "red"}}>{messageName}</p>
    
    <Form.Group className="mb-3">
      <Form.Label className='label '  htmlFor="password">Mật khẩu:</Form.Label>
      <Form.Control
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        
      />
    </Form.Group>
    <p style={{color : "red"}}>{messagePassword}</p>
    
    <Form.Group className="mb-3">
      <Form.Label  className='label '  htmlFor="email">Email:</Form.Label>
      <Form.Control
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        
      />
    </Form.Group>
    <p style={{color : "red"}}>{messageEmail}</p>
    
    <Form.Group className="mb-3">
      <Form.Label className='label '  htmlFor="sdt">Số điện thoại:</Form.Label>
      <Form.Control
        type="text"
        id="sdt"
        name="sdt"
        value={formData.sdt}
        onChange={handleChange}
       
      />
    </Form.Group>
    <p style={{color : "red"}}>{messagePhone}</p>
    
    <Form.Group className="mb-3">
      <Form.Label className='label '  htmlFor="diachi">Địa chỉ:</Form.Label>
      <Form.Control
        type="text"
        id="diachi"
        name="diaChi"
        value={formData.diaChi}
        onChange={handleChange}
      />
    </Form.Group>
    <p style={{color : "red"}}>{messageDiaChi}</p>

    <Form.Group className="mb-3">
      <Form.Label className='label '  htmlFor="trangthai">Trạng thái:</Form.Label>
      <Form.Control
        as="select"
        id="trangthai"
        name="trangthai"
        value={formData.trangthai}
        onChange={handleChange}
        
      >
        <option value="">Chọn Trạng thái</option>
        <option value="0">Đã nghỉ việc</option>
        <option value="1">Đang làm việc</option>
      </Form.Control>
    </Form.Group>


    <Button variant="primary" type="submit" className="submit-button">
      Submit
    </Button>
    
    <ToastContainer position="top-right" />
  </Form>
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
        
      </Modal>
    );
  };
export default MyModalAdd;
