
import { Modal, Button } from 'react-bootstrap';
import "./QuanlyKhachHang.scss";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { templateSettings } from 'lodash';
import { useDispatch} from "react-redux";
import { toast } from "react-toastify";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
const EditQuanLyKH = ({handleSuccess, handleClose , initialFormData}) => {
  const dispath = useDispatch();
  // State to hold form data
  const [formData, setFormData] = useState({
    id:'df3a70fd-71e8-4b5c-9d46-03c1d56f2cb4',
    ten: '',
    email: '',
    sdt : '', 
    gioiTinh:'',
    ngaySinh:'',   
    sdiaChidt:''

  });
  useEffect(() => {
    console.log('Form submitted:', initialFormData);
    
    // Set initial form data when initialFormData prop changes
    if (initialFormData) {
      setFormData({name: initialFormData.name !==null ? initialFormData.name:"" ,
        id: initialFormData.id !==null ? initialFormData.id:"" ,
        email: initialFormData.email !==null ? initialFormData.email:"" ,
        sdt: initialFormData.sdt !==null ? initialFormData.sdt:"" ,
        password: initialFormData.password !==null ? initialFormData.password:"" ,
        gioiTinh: initialFormData.gioiTinh !==null ? initialFormData.gioiTinh:"" ,
        ngaySinh: initialFormData.ngaySinh !==null ? initialFormData.ngaySinh:"" ,
        sdiaChidt: initialFormData.sdiaChidt !==null ? initialFormData.sdiaChidt:"" ,
       });
    }
  }, [initialFormData]);


  //////////////////////////////////////////
  const [messageName, setMessageName] = useState('');
  const [messagePhone, setMessagePhone] = useState('');
  const [messageEmail, setMessageEmail] = useState('');
  const [messageAddress, setMessageAddress] = useState('');
  const [messageSex, setMessageSex] = useState('');
  const [messageNgaySinh, setMessageNgaySinh] = useState('');
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
   // dispath(SetLoading(true));
// Validate tên

const trimmedName = formData.name.trim();

if (formData.name !== trimmedName) {
  setMessageName("Tên không được chứa khoảng trắng ở đầu hoặc cuối.");
 
  return;
} else if (trimmedName.length < 2) {
  setMessageName("Tên quá ngắn. Vui lòng nhập ít nhất 2 ký tự.");

  return;
} else if (trimmedName.length > 50) {
  setMessageName("Tên quá dài. Vui lòng nhập không quá 50 ký tự.");
  return;
} else {
  setMessageName(""); // Clear the validation message if the name is valid
  
}
    ///validate ngày sinh
  if (!formData.ngaySinh) {
    setMessageNgaySinh("Vui lòng chọn ngày sinh. Ngày sinh không được để trống.");
    return;
} else {
    setMessageNgaySinh(""); // Clear the validation message if a date is selected
}
  // validate giới tính
//   if (!formData.gioiTinh) {
//     setMessageSex("Vui lòng chọn giới tính.");
//     return;
// } else {
//   setMessageSex(""); // Clear the validation message if a gender is selected
// } 
//  Validate Số emai
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (formData.email.trim() === '') {
    setMessageEmail("Địa chỉ email không được để trống.");
    return;
} else if (!emailRegex.test(formData.email)) {
    setMessageEmail("Địa chỉ email không hợp lệ. Vui lòng nhập đúng định dạng.");
    return;
} else {
    setMessageEmail(""); // Clear the validation message if the email is valid and not empty
 
}
    // Validate Số Điện thoại
    const phoneRegex = /^0\d{9}$/;

    if (!formData.sdt) {
        setMessagePhone("Số điện thoại không được để trống.");
       
        return;
    } else if (!phoneRegex.test(formData.sdt)) {
        setMessagePhone("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.");
        
        return;
    } else {
        setMessagePhone(""); // Clear the validation message if the phone number is valid
        
    }
 // Validate địa chỉ
const trimmedAddress = formData.sdiaChidt.trim();
if (formData.sdiaChidt !== trimmedAddress) {
  setMessageAddress('Địa chỉ không được chứa khoảng trắng ở đầu hoặc cuối.');
 
  return;
} else if (trimmedAddress === '') {
  setMessageAddress('Địa chỉ không được để trống.');
  
  return;
} else {
  setMessageAddress(''); // Clear the validation message if the address is valid

}

    // Perform form validation or submission logic here
    console.log('Form submitted:', formData);
    dispath(SetLoading(true));
  
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
        if(response.data ===1){
          toast.error("Email đã tồn tại vui lòng sửa lại")
        }else if(response.data ===2){
          toast.error("Số điện thoại đã tồn tại vui lòng sửa lại")
        }else if(response.data ===0){
          toast.success("sửa thành công")
        }
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
        <label  className='label' htmlFor="name">Tên:</label>
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
        <label  className='label' htmlFor="ngaySinh">Ngày sinh:</label>
        <input className='text_input'
          type="date"
          id="ngaySinh"
          name="ngaySinh"
          value={formData.ngaySinh}
          onChange={handleChange}  
        />
      </div>
      <p style={{color : "red"}}>{messageNgaySinh}</p>
      <div>
        <label className='label' htmlFor="gioiTinh">Giới tính:</label>
        <select className='text_input'
        id="gioiTinh"
        name="gioiTinh"
        value={formData.gioiTinh}
        onChange={handleChange}
         >
        <option value="">Chọn Giới Tính</option>
        <option value="0">Nam</option>
        <option value="1">Nữ</option>
       </select>
      </div>
      <p style={{color : "red"}}>{messageSex}</p>
      <div>
        <label className='label' htmlFor="Email">Email:</label>
        <input className='text_input'
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        
        />
      </div>
      <p style={{color : "red"}}>{messageEmail}</p>

      <div>
        <label  className='label' htmlFor="sdt">Số điện thoại:</label>
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
        <label  className='label' htmlFor="sdiaChidt">Địa chỉ :</label>
        <input  className='text_input'
          type="sdiaChidt"
          id="sdiaChidt"
          name="sdiaChidt"
          value={formData.sdiaChidt}
          onChange={handleChange}
        />
      </div>
      <p style={{color : "red"}}>{messageAddress}</p>
      <button type="submit" className="submit-button">Sửa</button>
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
