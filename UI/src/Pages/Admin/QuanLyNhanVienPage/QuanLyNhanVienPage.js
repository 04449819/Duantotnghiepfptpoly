import { useEffect, useState } from "react";
import "./QuanLyNhanVienPage.scss";
import axios from "axios";
const QuanLyNhanVienPage = () => {
  const [data,setdata] = useState([])
 const laydata = async()=>{
  let res = await axios.get("https://localhost:7095/api/NhanVien/GetAll");
  setdata(res.data);
}
useEffect(() => {
  laydata();
 
}, []);

  return (
    <div className="qlnhanvien">
     
      <form className="search" action="action_page.php">
        <input type="text" placeholder="Search.." name="search" />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
      <div className="DanhMucHienThi">Trang Nhân Viên</div>
      <div className="TNhanVien">
        <button> + Thêm nhân viên</button>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên nhân viên</th>
              <th scope="col">Email</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Vai trò</th>
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
                <td>{item.email}</td>
                <td>{item.sdt}</td>
                <td>{item.diaChi}</td>
                <td>{item.trangThai}</td>
                <td>Nhanvien</td>
               <td><button className="Sua">sửa</button></td> 
                </tr>
               )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuanLyNhanVienPage;
