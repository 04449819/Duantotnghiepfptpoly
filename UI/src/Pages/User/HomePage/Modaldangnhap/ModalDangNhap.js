import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FetchData } from "../../../../Rudux/Reducer/taiKhoanSlice";
// import { SetLoading } from "../../../../Rudux/Reducer/LoadingSlice";
import { toast } from "react-toastify";

const ModalDangNhap = (props) => {
  const { show, setShow } = props;
  const navigate = useNavigate();
  // const [data, setdata] = useState({});
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((p) => p.user.User);
  const HandleDangNhap = async () => {
    dispatch(FetchData({ name, pass, dssp }));
  };
  const dssp = useSelector((p) => p.user.giohangonl);
  // const AddProductsInCart = async () => {
  //   console.log("Add Products In Cart", dssp);
  // };

  useEffect(() => {
    if (user && user.vaiTro === 1) {
      // AddProductsInCart();
      setShow(false);
    }
    if (user && user.vaiTro === 0) {
      navigate("/admin");
      setShow(false);
    }
    if (user && user.vaiTro === null) {
      toast.error("Tên đăng nhập hoặc mật khẩu không chính xác");
    }
  }, [user]);

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
