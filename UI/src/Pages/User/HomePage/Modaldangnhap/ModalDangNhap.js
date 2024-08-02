import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FetchData } from "../../../../Rudux/Reducer/taiKhoanSlice";
import { SetLoading } from "../../../../Rudux/Reducer/LoadingSlice";

const ModalDangNhap = (props) => {
  const { show, setShow } = props;
  const navigate = useNavigate();
  // const [data, setdata] = useState({});
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  const HandleDangNhap = async () => {
    dispatch(FetchData({ name, pass }));
    try {
      dispatch(SetLoading(true));
      const res = await axios.get(
        `https://localhost:7095/api/QuanLyNguoiDung/DangNhap?lg=${name}&password=${pass}`
      );
      if (res.data.vaiTro === 1) {
        setTimeout(() => {
          navigate("/");
          setShow(false);
          dispatch(SetLoading(false));
        }, 2000);
      }
      if (res.data.vaiTro === 0) {
        setTimeout(() => {
          navigate("/admin");
          setShow(false);
          dispatch(SetLoading(false));
        }, 3000);
      }
    } catch (error) {
      dispatch(SetLoading(false));
    }
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
              <Link
                style={{ color: "blue" }}
                onClick={handleClose}
                to={"/quenmatkhau"}
              >
                Quên mật khẩu
              </Link>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/dangki">
            <button
              style={{ marginRight: "230px" }}
              onClick={handleClose}
              className="btn btn-primary"
            >
              Đăng kí
            </button>
          </Link>
          {/* <Button onClick={handleClose}>Close</Button> */}
          <Button
            style={{ marginRight: "10px" }}
            type="submit"
            onClick={HandleDangNhap}
          >
            Đăng nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDangNhap;
