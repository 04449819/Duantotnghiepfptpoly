import { useEffect, useState } from "react";
import "./QuanLyNhanVienPage.scss";
import MyModalAdd from "./FormThemNhanVien";
import MyModalEdit from "./FromEditNv";
import axios from "axios";
import { toast } from "react-toastify";
import { Table, Toast } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
const QuanLyNhanVienPage = () => {
  const dispath = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sdt: "",
    password: "",
    diaChi: "",
    trangThai: "",
    vaitro: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleShowEdit = () => setShowModalEdit(true);
  const handleCloseEdit = () => setShowModalEdit(false);
  const [inputValue, setInputValue] = useState("");

  // Step 3: Handle input change
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const [data, setdata] = useState([]);
  const [SoTrang, SetSotrang] = useState(1);
  const laydata = async (SoTrang) => {
    try {
      let res = await axios.get(
        `https://localhost:7095/api/NhanVien/GetAll?pageIndex=${SoTrang}&pageSize=10`
      );
      if (SoTrang == 1) {
        console.log("sotrang:", SoTrang);
        setdata(res.data.item1);
        console.log("data",res.data);
      } else {
        setdata((prevData) => [...prevData, ...res.data.item1]);
      }
    } catch (error) {}
  };
  const handleReload = () => {
    SetSotrang(1);
    laydata(1);
  };
  // const delayCallData = () =>{
  //   const timer = setTimeout(() => {
  //     handleReload()
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }
  const handleClickEdit = async (idNhanVien) => {
    const res = await axios.get(
      `https://localhost:7095/api/NhanVien/GetById?Id=${idNhanVien}`
    );
    if (res.status == 200) {
      setFormData({
        id: res.data.id,
        name: res.data.ten,
        email: res.data.email,
        sdt: res.data.sdt,
        password: res.data.passWord,
        diaChi: res.data.diaChi,
        vaitro: res.data.vaitro == null ? "" : res.data.vaitro,
        trangThai: res.data.trangThai == null ? "" : res.data.trangThai,
      });
    
      console.log("data form", formData);
      handleShowEdit();
    }
  };

  const handleClickSearch = async (event) =>{
    event.preventDefault();
   
    if (inputValue == "") {
      handleReload();
    } else {
      dispath(SetLoading(true));
      setTimeout(async () => {
        try {
         let res = await axios.get(`https://localhost:7095/api/NhanVien/TimKiemNhanVien?name=${inputValue}`);
                console.error('success', res.data);
                if(res.data.length < 1){
                 toast.error("Không tìm thấy nhân viên ")
                 dispath(SetLoading(false));
                  return;              
                }
                setdata(res.data);
                dispath(SetLoading(false));
        } catch (error) {
          dispath(SetLoading(false));
          console.error("Error fetching promotions:", error);
        }
      }, 3000);
    }
  };
  useEffect(() => {
    laydata(SoTrang);
  }, []);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (clientHeight + scrollTop >= scrollHeight - 10) {
      laydata(SoTrang + 1);
      SetSotrang(SoTrang + 1);
    }
  };

  if (data.length > 0) {
    return (
      <div className="qlnhanvien">
        <div className="DanhMucHienThi">Trang Nhân Viên</div>
        <form onSubmit={handleClickSearch} className=" search">
          <input type="text" value={inputValue} onChange={handleChange} />
          <button type="submit">Tìm kiếm</button>
        </form>
        <div className="TNhanVien">
          <button onClick={handleShow}> + Thêm nhân viên</button>
        </div>
        <div className="table-container" onScroll={handleScroll}>
          <Table className="table"  striped bordered hover>
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên nhân viên</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Vai trò</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index + 1}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.ten}</td>
                    <td>{item.email}</td>
                    <td>{item.sdt}</td>
                    <td>{item.diaChi}</td>
                    <td>Nhân Viên</td>
                     <td   style={{ color: item.trangThai === 1 ? "green" : "red" }}>{ item.trangThai == 0 ? "Đã nghỉ việc" : "Đang làm việc"}</td>
                    {
                      <td>
                        <button onClick={() => handleClickEdit(item.id)} className="edit">sửa</button>
                      </td>
                    }
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <MyModalAdd show={showModal} handleSuccess={handleReload} handleClose={handleClose}/>
        <MyModalEdit show={showModalEdit}handleSuccess={handleReload}handleClose={handleCloseEdit}initialFormData={formData}/>
      </div>
    );
  } else {
    return (
      <div>
        <h1>loading.....</h1>
      </div>
    );
  }
};

export default QuanLyNhanVienPage;
