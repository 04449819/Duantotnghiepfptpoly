import { Modal, Button } from "react-bootstrap";
import "./QuanLyNhanVienPage.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
import { toast } from "react-toastify";
const EditQuanLyNV = ({ handleSuccess, handleClose, initialFormData }) => {
  const dispath = useDispatch();
  // State to hold form data
  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    sdt: "",
    password: "",
    diaChi: "",
    trangThai: "",
  
  });
  
  useEffect(() => {

    console.log("Form submitted:", initialFormData);
    // Set initial form data when initialFormData prop changes
    if (initialFormData) {
      setId(initialFormData.id);
      setFormData(initialFormData);
    }
  }, [initialFormData]);
  ////////////////////
  // const [message, setMessage] = useState("");
  const [messageName, setMessageName] = useState("");
  const [messagePhone, setMessagePhone] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messageDiaChi, setMessageDiaChi] = useState('');
  const [messagePassword, setMessagePassword] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation or submission logic here
    console.log("Form submitted:", formData);
    // Validate tên
    if (formData.name.trim().length < 2) {
      setMessageName("Tên quá ngắn. Vui lòng nhập ít nhất 2 ký tự.");
      return;
    } else if (formData.name.trim().length > 50) {
      setMessageName("Tên quá dài. Vui lòng nhập không quá 50 ký tự.");
      return;
    } else {
      setMessageName(""); // Clear the validation message if the name is valid
  }
   // Validate password
  
   if (formData.password.trim() === '') {
    
    setMessagePassword("Mật khẩu không được để trống.");
    return;
  } else if (formData.password.trim().length <= 8) {
    setMessagePassword("Mật khẩu phải chứa nhiều hơn 8 ký tự.");
    return;
  } else {
    setMessagePassword(""); // Clear the validation message if the password is valid
  }
    //  Validate Số emai
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email) {
        setMessageEmail("Địa chỉ email không được để trống.");
        return;
    } else if (!emailRegex.test(formData.email)) {
        setMessageEmail("Địa chỉ email không hợp lệ. Vui lòng nhập đúng định dạng.");
        return;
    } else {
        setMessageEmail(""); // Clear the validation message if the email is valid
    }
    // Validate Số Điện thoại
    ///  /^[0-9]{10}$/
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
    // validate địa chỉ 
    if (!formData.diaChi || formData.diaChi.length === 0) {
      setMessageDiaChi("Địa chỉ không được để trống.");
      return;
    } else {
      setMessageDiaChi('');
    }
       //validate trạng thái
       if (!formData.trangThai) {
        setMessageStatus("Vui lòng chọn Trạng thái.");
        return;
    } else {
      setMessageStatus(""); // Clear the validation message if a gender is selected
    } 
    /////////////////////////
    try {
      dispath(SetLoading(true));
      const formData = new FormData(e.target);
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        console.log(key, value);
        if (key == "name") {
          params.append("ten", value);
        } else {
          params.append(key, value);
        }
      });
      const queryString = params.toString();
      setTimeout(async () => {
        try {
          const response = await axios.put(
            `https://localhost:7095/api/NhanVien/${id}?${queryString}`
          );
          if (response.status === 200) {
            if(response.data ===1){
              toast.error("Email đã tồn tại")
            }else if(response.data ===2){
              toast.error("Số điện thoại đã tồn tại")
            }else if(response.data ===0){
              toast.success("sửa thành công")
            }
           handleClose();
           handleSuccess();
          } else {
          }
          console.log("Response:", response.data);
          dispath(SetLoading(false));
        } catch (error) {
          dispath(SetLoading(false));
        }
      }, 3000);

      // Xử lý dữ liệu phản hồi tại đây
    } catch (error) {
      console.error("There was an error posting the data!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TextThem">
      <div>
        <label className="label" htmlFor="name">
          Tên:
        </label>
        <input
          className="text_input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <p style={{color : "red"}}>{messageName}</p>
      <div>
        <label className="label" htmlFor="password">
          Mật khẩu:
        </label>
        <input
          className="text_input"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <p style={{color : "red"}}>{messagePassword}</p>
      <div>
        <label className="label" htmlFor="Email">
          Email:
        </label>
        <input
          className="text_input"
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <p style={{color : "red"}}>{messageEmail}</p>
      <div>
        <label className="label" htmlFor="sdt">
          sdt:
        </label>
        <input
          className="text_input"
          type="text"
          id="sdt"
          name="sdt"
          value={formData.sdt}
          onChange={handleChange}
         
        />
      </div>
      <p style={{color : "red"}}>{messagePhone}</p>
      <div>
        <label className="label" htmlFor="diachi">
          Địa chỉ:
        </label>
        <input
          className="text_input"
          type="text"
          id="diachi"
          name="diaChi"
          value={formData.diaChi}
          onChange={handleChange}
        />
      </div>
      <p style={{color : "red"}}>{messageDiaChi}</p>
      <div className="form-group">
       <label className='label' htmlFor="trangthai"> Trạng thái:</label>
        <select className='text_input'
        id="trangThai"
        name="trangThai"
        value={formData.trangthai}
        onChange={handleChange}
         >
        <option value="">Chọn Trang thái</option>
        <option value="0">Đã nghỉ việc</option>
        <option value="1">Đang làm việc</option>
       </select>
        <p style={{color : "red"}}>{messageStatus}</p> 
     </div>
      <div className="button-container">
        <button type="submit" className="submit-button">
          Sửa
        </button>
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
      <Modal.Body>
        <EditQuanLyNV
          handleSuccess={handleSuccess}
          handleClose={handleClose}
          initialFormData={initialFormData}
        ></EditQuanLyNV>
      </Modal.Body>
    </Modal>
  );
};
export default MyModalEdit;
