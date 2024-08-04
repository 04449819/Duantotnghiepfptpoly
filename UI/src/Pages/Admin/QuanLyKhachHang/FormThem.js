import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./QuanlyKhachHang.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";

const AddQuanLyKH = ({ handleSuccess, handleClose, themnhanh }) => {
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
    //confirmPassword: "",
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

  const [messageDiaChi, setMessageDiaChi] = useState('');
  const [messagePassword, setMessagePassword] = useState('');

  const [themnhanhh, setThemnhanhh] = useState(true);
  // const [messageAddress, setMessageAddress] = useState('');

  // Handle input change

  useEffect(() => {
    if (themnhanh !== undefined) {
      setThemnhanhh(false);
    } else {
      setThemnhanhh(true);
    }
  }, []);
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
            //confirmPassword: formData.confirmPassword,
            gioiTinh: formData.gioiTinh,
            ngaySinh: formData.ngaySinh,
            diaChi: formData.diaChi,
            diemTich: formData.diemTich,
            trangThai: formData.trangThai,
          }
        );
        if (response.status === 200) {
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
          Mật khẩu:
        </label>
        <input
          className="text_input"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={themnhanhh}
        />
      </div>
      <p style={{color : "red"}}>
        { messagePassword}</p>
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
      <p style={{color : "red"}}>
        {messageEmail}</p>

      <div className="form-group">

       <label className='label' htmlFor="gioiTinh"> Giới Tính:</label>
        <select className='text_input'
        id="gioiTinh"
        name="gioiTinh"
        value={formData.gioiTinh}
        onChange={handleChange}
        required
         >
        <option value="">Chọn Giới Tính</option>
        <option value="0">Nam</option>
        <option value="1">Nữ</option>
       </select>
     </div>
      <p>{messageEmail}</p>
      <div className="form-group">
        <label  className="label" htmlFor="ngaySinh">
          Ngày sinh:
        </label>
        <input
          className="text_input"
          type="date"
          id="ngaySinh"
          name="ngaySinh"
          value={formData.ngaySinh}
          onChange={handleChange}
          required={themnhanhh}
        />
      </div>
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
          required
        />
      </div>
       <p>{messageDiaChi}</p> 
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
      <p style={{color : "red"}}>
        {messagePhone}</p>
      <div className="form-group">
        <label className="label" htmlFor="diemTich">
          Điểm tích:
        </label>
        <input
          className="text_input"
          type="text"
          id="diemTich"
          name="diemTich"
          value={formData.diemTich}
          onChange={handleChange}
          required={themnhanhh}
        />
      </div>
      <div className="form-group">

       <label className='label' htmlFor="trangThai"> Trạng thái:</label>
        <select className='text_input'
        id="trangThai"
        name="trangThai"
        value={formData.trangThai}
        onChange={handleChange}
        required
         >
        <option value="">Chọn Trang thái</option>
        <option value="0">Đang hoạt động</option>
        <option value="1">Không hoạt động</option>
       </select>
     </div>



      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};
/////////////////////////////////////////////////////////////////////
const MyModalAdd = ({ show, handleClose, handleSuccess, themnhanh }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Khách hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddQuanLyKH
          handleSuccess={handleSuccess}
          handleClose={handleClose}
          themnhanh={themnhanh}
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
