import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Dangki.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

const Dangki = () => {
  const [name, setname] = useState("");
  const [sdt, setsdt] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");
  const [passcomfirm, setpasscomfirm] = useState("");

  const [cname, csetname] = useState("");
  const [csdt, csetsdt] = useState("");
  const [cemail, csetEmail] = useState("");
  const [cpass, csetpass] = useState("");
  const [cpasscomfirm, csetpasscomfirm] = useState("");

  const navigate = useNavigate();

  const HandleOnSubmitTaiKhoan = async () => {
    let data = {
      email: email,
      name: name,
      sdt: sdt,
      Password: pass,
      ConfirmPassword: passcomfirm,
      diemTich: 0,
      trangThai: 0,
    };
    if (name === "") {
      csetname("tên không được bỏ trống");
      return;
    } else {
      csetname("");
    }

    if (!validatesdt(sdt)) {
      csetsdt("số điện thoại phải có 10 chữ số và bắt đầu bắng số 0");
      return;
    } else {
      csetsdt("");
    }

    if (!validateEmail(email)) {
      csetEmail("email khong hop le");
      return;
    } else {
      const response = await axios.get(
        `https://localhost:7095/api/KhachHang/GetKhachHangByEmail?email=${email}`
      );

      if (response.data.email !== null) {
        csetEmail("tài khoản đã tồn tại");
        return;
      } else {
        csetEmail("");
      }
    }

    if (!validatepass(pass)) {
      csetpass("mật khẩu phải có tối thiểu 8 kí tự");
      return;
    } else {
      csetpass("");
    }

    if (pass !== passcomfirm && pass !== "") {
      csetpasscomfirm("chưa trùng khớp với mật khẩu");
      setpasscomfirm("");
      return;
    } else {
      csetpasscomfirm("");
    }

    let URL = "https://localhost:7095/api/KhachHang";
    let res = await axios.post(`${URL}`, data);

    // alert("Đăng kí thành công");
    toast.success("đăng kí thành công");
    navigate("/");
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatesdt = (sdt) => {
    return String(sdt)
      .toLowerCase()
      .match(/^(0)([0-9]){9,9}$/);
  };

  const validatepass = (pass) => {
    return String(pass)
      .toLowerCase()
      .match(/^(.){8,}$/);
  };

  /////////////////////////////////Giao dien//////////////////////////////////////////////////////

  return (
    <div className="container Formdangki">
      <div className="title">
        <h1>Đăng kí</h1>
      </div>
      <div className="content-dangki">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>name</Form.Label>
            <Form.Control
              type="Text"
              value={name}
              onChange={(event) => {
                setname(event.target.value);
              }}
            />
            <Form.Label style={{ color: "red" }}>{cname}</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              value={sdt}
              onChange={(event) => {
                setsdt(event.target.value);
              }}
            />
            <Form.Label style={{ color: "red" }}>{csdt}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <Form.Label style={{ color: "red" }}>{cemail}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={pass}
              onChange={(event) => {
                setpass(event.target.value);
              }}
            />
            <Form.Label style={{ color: "red" }}>{cpass}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Xác nhận lại mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={passcomfirm}
              onChange={(event) => {
                setpasscomfirm(event.target.value);
              }}
            />
            <Form.Label style={{ color: "red" }}>{cpasscomfirm}</Form.Label>
          </Form.Group>
          <Button
            style={{ marginBottom: "10px" }}
            onClick={HandleOnSubmitTaiKhoan}
          >
            Đăng kí
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default Dangki;
