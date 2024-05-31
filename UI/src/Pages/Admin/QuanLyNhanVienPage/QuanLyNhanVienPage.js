import { useState } from "react";
import "./QuanLyNhanVienPage.scss";
import { SiDts } from "react-icons/si";
const QuanLyNhanVienPage = () => {
  const [ten, setten] = useState("");
  const [nhanvien, setnhanvien] = useState([
    {
      id: "01",
      ten: "nguyen van c",
      email: "test@example.com",
      password: "1234",
      sdt: "0123123",
      diachi: "123123",
      trangtha: 0,
      vaitro: "nhanvien",
    },
    {
      id: "02",
      ten: "nguyen van a",
      email: "test@example.com",
      password: "1234",
      sdt: "0123123",
      diachi: "123123",
      trangtha: 1,
      vaitro: "nhanvien",
    },
    {
      id: "03",
      ten: "nguyen van b",
      email: "test@example.com",
      password: "1234",
      sdt: "0123123",
      diachi: "123123",
      trangtha: 1,
      vaitro: "nhanvien",
    },
  ]);

  const checknhanvien = () => {
    console.log("Check", nhanvien);
  };
  return (
    <div className="qlnhanvien">
      <div>
        <button onClick={checknhanvien}>them nhan vien</button>
        <div>
          <input type="text" />
          <button>tim kiem</button>
        </div>
      </div>
      <div>
        <h1>danh sach nhan vien nhan vien</h1>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Ten nhan vien</th>
                <th scope="col">email</th>
                <th scope="col">so dien thoai</th>
                <th scope="col">dia chi</th>
                <th scope="col">trang thai</th>
                <th scope="col">vai tro</th>
                <th scope="col">chuc nang</th>
              </tr>
            </thead>
            <tbody>
              {nhanvien.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th>{index + 1}</th>
                    <td>{item.ten}</td>
                    <td>{item.email}</td>
                    <td>{item.sdt}</td>
                    <td>{item.diachi}</td>
                    <td>
                      {item.trangtha === 1 ? "dang lam viec" : "da nghi viec"}
                    </td>
                    <td>{item.vaitro}</td>
                    <td>
                      <button>Sua</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuanLyNhanVienPage;
