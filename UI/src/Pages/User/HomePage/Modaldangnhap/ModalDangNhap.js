import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ModalDangNhap = (props) => {
  const { show, setShow } = props;
  const navigate = useNavigate();

  const [data, setdata] = useState({});
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const HandleDangNhap = async () => {
    if (!name) return;
    let response = await axios.get(
      `https://localhost:7095/api/KhachHang/getBySDT?sdt=${name}`
    );
    if (response.status !== 200) {
      toast.error("Sai tên đăng nhập or mật khẩu");
      return;
    }
    setdata(response.data);
    if (pass === response.data.password) {
      navigate("/admin");
    } else {
      toast.error("Sai tên đăng nhập or mật khẩu");
      setPass("");
      console.log(setPass);
      return;
    }

    console.log(">>>data:", data);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <div>
            <h3 style={{ paddingLeft: "150px" }}> Đăng Nhập</h3>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleClose}>
            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                onChange={(event) => setPass(event.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <Link>Quên mật khẩu</Link>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/dangki">
            <button onClick={handleClose} className="btn btn-primary">
              Đăng kí
            </button>
          </Link>
          {/* <Button onClick={handleClose}>Close</Button> */}
          <Button type="submit" onClick={HandleDangNhap}>
            Đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDangNhap;
