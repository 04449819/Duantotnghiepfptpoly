import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";

const QuenMK = () => {
  const [email, setemail] = useState("");
  const [maxacnhan, setmaxacnhan] = useState("");
  const [pass, setpass] = useState("");
  const [passconfirm, setpassconfirm] = useState("");
  const [checkmaxacnhan, checksetmaxacnhan] = useState("");

  const [checkma, setcheckma] = useState(false);
  const [checkmaxn, setchecmaxn] = useState(false);
  const [checktaik, setchecktaik] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandlerOnclick = () => {
    let data = {
      emailToId: email,
      emailToName: "shop Man",
      emailSubject: "Mã xác nhận",
      emailBody: Math.floor(Math.random(100) * 1000000).toString(),
    };
    CheckEmail(email);
    SendMail(data);
    console.log(data.emailBody);
    setmaxacnhan(data.emailBody);
  };

  const HandlerOnclickMaXacNhan = () => {
    if (maxacnhan === checkmaxacnhan) {
      setchecmaxn(true);
    } else {
      setchecmaxn(false);
      toast.error("Mã xác nhận không chính xác");
    }
  };

  const HandlerOnclickEditTK = () => {
    ChangPassword();
  };

  const SendMail = async (data) => {
    try {
      // dispatch(SetLoading(true));
      const res1 = await axios.post(
        "https://localhost:7095/api/Mail/SendMail",
        data
      );
    } catch (error) {
      // dispatch(SetLoading(false));
    }
  };

  const CheckEmail = async (email) => {
    // dispatch(SetLoading(true));
    setchecktaik(true);
    setTimeout(async () => {
      try {
        // setchecktaik(true);
        await axios.post(
          `https://localhost:7095/api/QuanLyNguoiDung/ForgotPassword?request=${email}`
        );
        setcheckma(true);
        dispatch(SetLoading(false));
        // SendMail(data);
      } catch (error) {
        toast.error("Email chưa được đăng kí");
        setchecktaik(false);
        setcheckma(false);
        dispatch(SetLoading(false));
      }
    }, 4000);
  };

  const ChangPassword = async () => {
    const data = {
      email: email,
      password: pass,
      confirmPassword: passconfirm,
    };
    dispatch(SetLoading(true));
    setTimeout(async () => {
      try {
        var res = await axios.post(
          "https://localhost:7095/api/QuanLyNguoiDung/ResetPassword",
          data
        );
        navigate("/");
        dispatch(SetLoading(false));
      } catch (error) {
        toast.error("mật khẩu chưa khớp or không đủ kí tự");
        dispatch(SetLoading(false));
      }
    }, 3000);
  };
  return (
    <>
      {checkma === false ? (
        <div
          className="container"
          style={{
            textAlign: "center",
            margin: "80px auto",
            width: "40%",
          }}
        >
          <p>
            Quên mật khẩu? Vui lòng nhập địa chỉ email dùng để đăng kí tài
            khoản.
            <br /> Bạn sẽ nhận được một mã xác nhận tạo mật khẩu mới qua email.
          </p>
          <hr />
          <div>
            <p>Email đăng kí</p>
            <input
              style={{
                width: "100%",
                border: "1px solid ",
                borderRadius: "15px",
                fontSize: "16px",
                marginBottom: "20px",
                padding: "10px 15px",
              }}
              type="text"
              value={email}
              onChange={(event) => {
                setemail(event.target.value);
              }}
            />
            <br />
            <button
              style={{ width: "100%" }}
              type="button"
              className="btn btn-primary"
              onClick={HandlerOnclick}
              disabled={checktaik}
            >
              Đặt lại mật khẩu
            </button>
          </div>
        </div>
      ) : checkmaxn === false ? (
        <>
          <div
            className="container"
            style={{
              textAlign: "center",
              margin: "80px auto",
              width: "40%",
            }}
          >
            <p>Lưu ý: không chia sẽ mã xác nhận vơí bất cứ ai!</p>
            <hr />
            <div>
              <p>Nhập mã được gửi đến trong email</p>
              <input
                style={{
                  width: "100%",
                  border: "1px solid ",
                  borderRadius: "15px",
                  fontSize: "16px",
                  marginBottom: "20px",
                  padding: "10px 15px",
                }}
                type="text"
                value={checkmaxacnhan}
                onChange={(event) => {
                  checksetmaxacnhan(event.target.value);
                }}
              />
              <br />
              <button
                style={{ width: "100%" }}
                type="button"
                className="btn btn-primary"
                onClick={HandlerOnclickMaXacNhan}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="container"
            style={{
              textAlign: "center",
              margin: "80px auto",
              width: "40%",
            }}
          >
            <h4>Cập nhật mật khẩu mới</h4>
            <hr />
            <div>
              <p>Mật khẩu</p>
              <input
                style={{
                  width: "100%",
                  border: "1px solid ",
                  borderRadius: "15px",
                  fontSize: "16px",
                  marginBottom: "20px",
                  padding: "10px 15px",
                }}
                type="password"
                value={pass}
                onChange={(event) => {
                  setpass(event.target.value);
                }}
              />
              <p>Xác nhận mật khẩu</p>
              <input
                style={{
                  width: "100%",
                  border: "1px solid ",
                  borderRadius: "15px",
                  fontSize: "16px",
                  marginBottom: "20px",
                  padding: "10px 15px",
                }}
                type="password"
                value={passconfirm}
                onChange={(event) => {
                  setpassconfirm(event.target.value);
                }}
              />
              <br />
              <button
                style={{ width: "100%" }}
                type="button"
                className="btn btn-primary"
                onClick={HandlerOnclickEditTK}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default QuenMK;
