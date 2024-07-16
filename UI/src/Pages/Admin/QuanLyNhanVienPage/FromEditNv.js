import { Modal, Button } from "react-bootstrap";
import "./QuanLyNhanVienPage.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
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
    diachi: "",
    trangThai: "",
    idvaitro: "952c1a5d-74ff-4daf-ba88-135c5440809c",
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
  const [message, setMessage] = useState("");
  const [messageName, setMessageName] = useState("");
  const [messagePhone, setMessagePhone] = useState("");
  const [messageEmail, setMessageEmail] = useState("");
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
    const nameRegex = /^[\p{L}\s]+$/u;
    if (formData.name.length < 2) {
      setMessageName("Tên quá ngắn. Vui lòng nhập ít nhất 2 ký tự.");
      return;
    } else if (formData.name.length > 50) {
      setMessageName("Tên quá dài. Vui lòng nhập không quá 50 ký tự.");
      return;
    } else if (!nameRegex.test(formData.name)) {
      setMessageName("Tên không hợp lệ. Vui lòng chỉ nhập các chữ cái.");
      return;
    }
    //  Validate Số emai
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setMessageEmail(
        "Địa chỉ email không hợp lệ. Vui lòng nhập đúng định dạng."
      );
      return;
    }
    // Validate Số Điện thoại
    ///  /^[0-9]{10}$/
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(formData.sdt)) {
      setMessagePhone(
        "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng ."
      );
      return;
    }
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
          diaChi:
        </label>
        <input
          className="text_input"
          type="text"
          id="diachi"
          name="diachi"
          value={formData.diaChi}
          onChange={handleChange}
         
        />
      </div>

      <div className="form-group">
        <label className="label" htmlFor="trangthai">
          {" "}
          Trạng thái:
        </label>
        <select
          className="text_input"
          id="trangthai"
          name="trangthai"
          value={formData.trangthai}
          onChange={handleChange}
          required
        >
          <option value="">Chọn Trạng thái</option>
          <option value="0">Đang hoạt động</option>
          <option value="1">Không hoạt động</option>
        </select>
      </div>
      <div className="button-container">
        <button type="submit" className="submit-button">
          Submit
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
