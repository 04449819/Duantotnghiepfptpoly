import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Dangki.scss";
import { useEffect, useState } from "react";
import axios from "axios";
const Dangki = () => {
  const [name, setname] = useState("");
  const [sdt, setsdt] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");
  const [passcomfirm, setpasscomfirm] = useState("");

  //   const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const HandleOnSubmitTaiKhoan = async () => {
    let dataq = {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa4",
      name: "nguyen van kiennnnnnnnn",
      description: "0339179526",
      age: 50,
      imgUrl: "12345678",
    };
    console.log(dataq);
    let URL = "https://localhost:7253/api/GiangVien";
    let res = await axios.post(`${URL}`, dataq, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.dataq);

    const { data: response } = await axios.get(
      "https://localhost:7253/api/GiangVien"
    );
    setData(response);
  };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setLoading(true);
  //       try {
  //         const { data: response } = await axios.get("/stuff/to/fetch");
  //         setData(response);
  //       } catch (error) {
  //         console.error(error.message);
  //       }
  //       setLoading(false);
  //     };

  //     fetchData();
  //   }, []);

  return (
    <div className="container">
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
          </Form.Group>
          <Button onClick={HandleOnSubmitTaiKhoan}>Đăng kí</Button>
        </Form>
      </div>
    </div>
  );
};
export default Dangki;
