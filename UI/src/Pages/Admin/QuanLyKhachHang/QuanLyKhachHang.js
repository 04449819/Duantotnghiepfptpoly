import React, { useEffect, useState } from "react";
import "./QuanlyKhachHang.scss";
import "./FormThem";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import MyModalAdd from "./FormThem";
import MyModalEdit from "./FormEdit";
const QuanLyKhachHang = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sdt : '', 
    password: '',
    ngaySinh:'',
    gioiTinh:'',
    confirmPassword: '',
    diemTich : '',
    trangThai: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const[SoTrang , SetSotrang] = useState(1);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleShowEdit = () => setShowModalEdit(true);
  const handleCloseEdit = () => setShowModalEdit(false);
  /////////////////////////////////////////

  ////////////////////////////////////////
  const [inputValue, setInputValue] = useState('');

  // Step 3: Handle input change
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const [data,setdata] = useState([]);
  const laydata = async(sotrang)=>{
    try {
      console.log('sotrang1:', sotrang);
      let res = await axios.get(`https://localhost:7095/api/KhachHang?pageIndex=${sotrang}&pageSize=10`);
      
      if (sotrang ==1){
        console.log('sotrang:', sotrang);
        setdata(res.data.data);
      }else{
        setdata((prevData) => [...prevData, ...res.data.data]);
      }
     
    } catch (error) {
     
      console.error('Error fetching promotions:', error);
    }
   
    // setdata(res.data.data);
   
  };

 const handleClickEdit = async (idKhachHang) =>{
  const res = await axios.get(`https://localhost:7095/api/KhachHang/GetById?Id=${idKhachHang}`)
  if (res.status == 200){
    
    setFormData({
      id: res.data.id,
      name: res.data.ten,
      email: res.data.email,
      ngaySinh:res.data.ngaySinh,
      gioiTinh:res.data.gioiTinh,
      sdt: res.data.sdt, 
      password: res.data.password,
      confirmPassword: res.data.password,
      diemTich : res.data.diemTich == null ? "" : res.data.diemTich,
      trangThai: res.data.trangThai == null ? "" : res.data.trangThai
    })

    console.log('data form', formData);
    handleShowEdit()
  }
 
 
};

 const handleClickSearch = async (event) =>{
  event.preventDefault();
  if (inputValue == ""){
    handleReload()
  }else{
    try {
      let res = await axios.get(`https://localhost:7095/api/KhachHang/TimKiemKH?Ten=${inputValue}`);
      console.error('success', res.data);
      setdata(res.data);
     
    } catch (error) {
     
      console.error('Error fetching promotions:', error);
    }
  }
  
};
 useEffect(() => {
   laydata(SoTrang);
  
 }, []);
 const handleReload = () => {
  SetSotrang(1);
  laydata(1);
};
 //sự kện scroll in table
 const handleScroll = (e) => {
   const { scrollTop, scrollHeight, clientHeight } = e.target;
   if (clientHeight + scrollTop >= scrollHeight - 10) {
  
    laydata(SoTrang +1);
   SetSotrang (SoTrang +1);
    console.log(data);
  }

  //  if (position === 99) {
  //     setSoLan(solan + 66);
  //     laydata(SoTrang+1);
  //     SetSotrang(SoTrang + 1)   
  //  }
 };
 

 if(data.length > 0){
  return (
    <div className="QlKhachHang">
      <div className="DanhMucHienThi">Trang Khách Hàng</div>
      <form onSubmit={handleClickSearch} className=" search">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit">Tìm kiếm</button>
      </form>
      <div className="ThemKhachHang">
        <button onClick={handleShow}> + Thêm khách hàng</button>
      </div>
      <div className="table-container"  
            onScroll={handleScroll}>
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
          <tbody >

          {data.map((item,index) =>{
               return (
                <tr key={index + 1}>
                <th scope="row">{index+1}</th>
                <td>{item.ten}</td>
                <td>{item.gioiTinh == 0  ? "nam" : "nữ"}</td>
                <td>{item.ngaySinh == null ? "-" : item.ngaySinh}</td>
                <td>{item.email}</td>
                <td>{item.sdt}</td>
                <td>{item.diaChi}</td>               
                <td>{item.diemTich == null ? "0" : item.diemTich}</td>
                <td>{item.trangThai == null || item.trangThai == 0 ? "không hoạt đông" : "đang hoạt động"}</td>
               
               { <td><button onClick={()=> handleClickEdit(item.idKhachHang)} className="edit">Edit</button></td>}
                </tr>
               )
            })}
          </tbody>
        </table>
      </div>
      <MyModalAdd show={showModal} handleSuccess={handleReload} handleClose={handleClose}  />
      <MyModalEdit show={showModalEdit} handleSuccess={handleReload} handleClose={handleCloseEdit} initialFormData={formData}  />
    </div>
  );
 }else{
  return <div><h1>Loading...</h1></div>
 }
};

export default QuanLyKhachHang;
