import React, { useEffect, useState } from "react";
import "./QuanlyKhachHang.scss";

import axios from "axios";
const QuanLyKhachHang = () => {

  const [data,setdata] = useState([]);
  const laydata = async()=>{
   let res = await axios.get("https://localhost:7095/api/KhachHang");
   setdata(res.data);
  };
  const xoa = async (idKhachHang) =>{
    const res = await axios.delete('https://localhost:7095/api/KhachHang/${idKhachHang}')
  };
 useEffect(() => {
   laydata();
  
 }, []);
 
  return (
    <div className="QlKhachHang">
      <div className="DanhMucHienThi">Trang Khách Hàng</div>
      <form className="search" action="action_page.php">
        <input type="text" placeholder="Search.." name="search" />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
      <div className="ThemKhachHang">
        <button> + Thêm khách hàng</button>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Ngày sinh</th>
              <th scope="col">Email</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Điểm tích</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
          {data.map((item,index) =>{
               console.log(item)
               return (
                <tr>
                <th scope="row">{index+1}</th>
                <td>{item.ten}</td>
                <td>{item.gioiTinh}</td>
                <td>{item.ngaySinh}</td>
                <td>{item.email}</td>
                <td>{item.sdt}</td>
                <td>{item.diaChi}</td>               
                <td>{item.diemTich}</td>
                <td>{item.trangThai}</td>
               <td><button onClick={xoa(item.idKhachHang)} className="delete">xóa</button></td> 
                </tr>
               )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default QuanLyKhachHang;
