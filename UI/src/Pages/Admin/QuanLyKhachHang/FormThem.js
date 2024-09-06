import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./QuanlyKhachHang.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
import { toast } from "react-toastify";

const AddQuanLyKH = ({ handleSuccess, handleClose }) => {
  const dispath = useDispatch();
  // State to hold form data
  // const [formData, setFormData] = useState({
  //   ten: "",
  //   email: "",
  // });
  const [formData, setFormData] = useState({
    ten: "",
    email: "",
    password: "",
    gioiTinh: "",
    ngaySinh: "",
    diaChi: "",
    sdt: "",
    diemTich: "",
    trangThai: "",
  });
  /////////////////////////////////
  const [messageName, setMessageName] = useState("");
  const [messagePhone, setMessagePhone] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
  const [messageAddress, setMessageAddress] = useState('');
  const [messagePassword, setMessagePassword] = useState('');
  const [messageSex, setMessageSex] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const [messagePoint, setMessagePoint] = useState('');
  
  
  const [messageNgaySinh, setMessageNgaySinh] = useState('');
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Perform form validation or submission logic here
    console.log("Form submitted:", formData);
// Validate tên
const trimmedName = formData.ten.trim();

if (formData.ten !== trimmedName) {
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
 // Validate password
 const passwordMinLength = 8;
 const trimmedPassword = formData.password ? formData.password.trim() : '';
 
 if (trimmedPassword === '') {
   setMessagePassword("Mật khẩu không được để trống.");
   return;
 } else if (trimmedPassword.length <= passwordMinLength) {
   setMessagePassword(`Mật khẩu phải chứa nhiều hơn ${passwordMinLength} ký tự.`);
   return;
 } else if (formData.password !== trimmedPassword) {
   setMessagePassword("Mật khẩu không được chứa khoảng trắng ở đầu hoặc cuối.");
   return;
 } else {
   setMessagePassword(""); // Clear the validation message if the password is valid
 }

    //  Validate Số email
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

    if (formData.email.trim() === '') {
        setMessageEmail("Địa chỉ email không được để trống.");
        return;
    } else if (!emailRegex.test(formData.email)) {
        setMessageEmail("Địa chỉ email không hợp lệ. Vui lòng nhập đúng định dạng.");
        return;
    } else {
        setMessageEmail(""); // Clear the validation message if the email is valid and no error found
    }
    // Giới Tính 
    if (!formData.gioiTinh) {
      setMessageSex("Vui lòng chọn giới tính.");
      return;
  } else {
    setMessageSex(""); // Clear the validation message if a gender is selected
  } 

  ///validate ngày sinh
  if (!formData.ngaySinh) {
    setMessageNgaySinh("Vui lòng chọn ngày sinh. Ngày sinh không được để trống.");
    return;
} else {
    setMessageNgaySinh(""); // Clear the validation message if a date is selected
}
  // Validate địa chỉ
const trimmedAddress = formData.diaChi.trim();
if (formData.diaChi !== trimmedAddress) {
  setMessageAddress('Địa chỉ không được chứa khoảng trắng ở đầu hoặc cuối.');
  return;
} else if (trimmedAddress === '') {
  setMessageAddress('Địa chỉ không được để trống.');
  return;
} else {
  setMessageAddress(''); // Clear the validation message if the address is valid
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
    //Validate điểm tích 
    // Validate điểm tích
const diemTich = Number(formData.diemTich);

if (isNaN(diemTich)) {
  setMessagePoint("Điểm tích phải là một số.");
  return;
} else if (diemTich < 0) {
  setMessagePoint("Điểm tích không được là số âm.");
  return;
} else {
  setMessagePoint(""); // Clear the validation message if the điểm tích is valid
}
    //validate trạng thais
    if (!formData.trangThai) {
      setMessageStatus("Vui lòng chọn Trạng thái.");
      return;
  } else {
    setMessageStatus(""); // Clear the validation message if a gender is selected
  } 

    dispath(SetLoading(true));
    setTimeout(async () => {
      try {
        const response = await axios.post(
          "https://localhost:7095/api/KhachHang/PostKHView1",
          {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa9",
            ten: formData.ten,
            email: formData.email,
            sdt: formData.sdt,
            password: formData.password,  
            gioiTinh: formData.gioiTinh,
            ngaySinh: formData.ngaySinh,
            diaChi: formData.diaChi,
            diemTich: formData.diemTich,
            trangThai: formData.trangThai,
          }
        );
        if (response.status === 200) {
          if(response.data === true){
            toast.success("Thêm thành công")
          }else if(response.data === false){
            toast.error("Số điện thoại hoặc email đã tồn tại")
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="label" htmlFor="ten">
          Tên:
        </label>
        <input
          className="text_input"
          type="text"
          id="ten"
          name="ten"
          value={formData.ten}
          onChange={handleChange}
        />
      </div>
      <p style={{color : "red"}}>{messageName}</p>
      <div className="form-group">
        <label className="label" htmlFor="password">
          Password:
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
      <div className="form-group">
        <label className="label" htmlFor="email">
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
      <div className="form-group">
       <label className='label' htmlFor="gioiTinh"> Giới tính:</label>
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
      <div className="form-group">
        <label className="label" htmlFor="ngaySinh">
          Ngay sinh:
        </label>
        <input
          className="text_input"
          type="date"
          id="ngaySinh"
          name="ngaySinh"
          value={formData.ngaySinh}
          onChange={handleChange}
        />
      </div>
      <p style={{color : "red"}}>{messageNgaySinh}</p> 
      <div className="form-group">
        <label className="label" htmlFor="diaChi">
          Địa chỉ:
        </label>
        <input
          className="text_input"
          type="text"
          id="diaChi"
          name="diaChi"
          value={formData.diaChi}
          onChange={handleChange}
        />
      </div>
      <p style={{color : "red"}}>{messageAddress}</p>
      <div className="form-group">
        <label className="label" htmlFor="sdt">
          Số Điện Thoại:
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

      <div className="form-group">
        <label className="label" htmlFor="diemTich">
          Diem Tich:
        </label>
        <input
          className="text_input"
          type="number"
          id="diemTich"
          name="diemTich"
          value={formData.diemTich}
          onChange={handleChange}
        />
      </div>
      <p style={{color : "red"}}>{messagePoint}</p>
      <div className="form-group">
       <label className='label' htmlFor="trangThai"> Trạng thái:</label>
        <select className='text_input'
        id="trangThai"
        name="trangThai"
        value={formData.trangThai}
        onChange={handleChange}
         >
        <option value="">Chọn Trang thái</option>
        <option value="0">Đang hoạt động</option>
        <option value="1">Không hoạt động</option>
       </select>
        <p style={{color : "red"}}>{messageStatus}</p> 
     </div>
      <button type="submit" className="submit-button">
        Thêm
      </button>
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
      <Modal.Body>
        <AddQuanLyKH
          handleSuccess={handleSuccess}
          handleClose={handleClose}
        ></AddQuanLyKH>
      </Modal.Body>
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