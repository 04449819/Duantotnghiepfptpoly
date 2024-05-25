import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const ModalDangNhap = (props) => {
  const { show, setShow } = props;

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const HandleDangNhap = () => {
    if (name === "admin" && pass === "123") {
      alert("đăng nhập thành công");
      handleClose();
      setName("");
      setPass("");
    } else {
      alert("chán có cái mk cũng k nhớ");
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
            <div class="mb-3">
              <label class="form-label">Email or Số điện thoại</label>
              <input
                type="email"
                class="form-control"
                aria-describedby="emailHelp"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                class="form-control"
                onChange={(event) => setPass(event.target.value)}
              />
            </div>
            <div class="mb-3 form-check">
              <Link>Quên mật khẩu</Link>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/dangki">
            <button
              onClick={() => {
                // alert("đăng kí");
              }}
              class="btn btn-primary"
            >
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
