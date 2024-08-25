import { useEffect, useRef, useState } from "react";
import "./BanHangOfline.scss";
import axios from "axios";
import { toast } from "react-toastify";
import DanhSachSanPham from "./DanhSachSanPham/DanhSachSanPham";
import HoaDon from "./HoaDon/HoaDon";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../Rudux/Reducer/LoadingSlice";
import MyModalAdd from "../QuanLyKhachHang/FormThem";
import ThongTinThanhToan from "./ThongTinThanhToan/ThongTinThanhToan";
import { Table, Button } from "react-bootstrap";
import { useReactToPrint } from 'react-to-print';
import { GetChiTietHoaDonByIdHoaDon, resetSanPhamGioHang } from "../../../Rudux/Reducer/GetSanPhamGioHangSlice";
const BanHangOfline = () => {
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, SetEmail] = useState("");
  const [address, setAddress] = useState("");
  const [inputreadOnly, setinputreadOnly] = useState(true);
  const [soSP, setSoSP] = useState(0);
  const [TongGia, setTongGia] = useState(0);
  const [giabandau, setGiaBandau] = useState(0);
  // const [datasp, setData] = useState([]);
  const [themnhanh, setThemnhanh] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [hoaDonChos, setHoaDonChos] = useState([]);
  const [hoaDon, setHoaDon] = useState({
    IdNhanVien: '',
  });
  const [hoaDonChoSelected, setHoaDonChoSelected] = useState([]);
  const componentRef = useRef();
  const dispath = useDispatch();
  const nv = useSelector((nv) => nv.user.User);
  const HandleOnclickSearchKH = async () => {
    dispath(SetLoading(true));
    setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://localhost:7095/api/KhachHang/getBySDT?sdt=${search}`
        );
        if (res.status === 200) {
          setName(res.data.khachhang.ten);
          setPhone(res.data.khachhang.sdt);
          setAddress(res.data.diaChi);
          SetEmail(res.data.khachhang.email);
          dispath(SetLoading(false));
        } else {
          toast.error("Số điện thoại or email chưa được đăng kí");
          setName("");
          setPhone("");
          setAddress("");
          SetEmail("");
          dispath(SetLoading(false));
        }
      } catch (error) {
        setName("");
        setPhone("");
        setAddress("");
        SetEmail("");
        toast.error("Số điện thoại or email chưa được đăng kí");
        dispath(SetLoading(false));
      }
    }, 3000);
  };

  const data = useSelector((item) => item.sanPhamGioHang.SanPhamGioHang);
  

 

  useEffect(() => {
    getHoaDonChos();
  }, [data]);
  useEffect(() => {
    console.log("data:", hoaDonChos);
    
  }, [hoaDonChos]);

const getHoaDonChos = async () => {
    try {
      const response = await axios.get('https://localhost:7095/api/HoaDon/GetAll');
      const filteredData = response.data.filter(hoaDon => hoaDon.trangThaiGiaoHang === 1 && hoaDon.loaiHD === 1);
  
      // Sort the filtered data by ngayTao in descending order (newest first)
      const sortedData = filteredData.sort((a, b) => {
        // Convert ngayTao to Date objects
        const dateA = new Date(a.ngayTao);
        const dateB = new Date(b.ngayTao);
        // Compare Dates (consider both date and time)
        return dateB - dateA;
      });
      //console.log('sortedData:', sortedData);
      setHoaDonChos(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const createHoaDonOffline = async () => {
    try {
      const hoaDonCho = {
        ...hoaDon,
        IdNhanVien: nv.id,
      };
      await axios.post('https://localhost:7095/api/HoaDon/CreateHoaDonOffline', hoaDonCho);
      getHoaDonChos();
      toast.success('Tạo mới hóa đơn chờ');

    }
    catch (error) {
      toast.error('Tạo hóa đơn chờ thất bại');
    }
  };
  const handleSelectedHoaDonCho =  async (hoaDonCho) => {
    try {

      setHoaDonChoSelected(hoaDonCho);
      dispath(resetSanPhamGioHang());
      dispath(GetChiTietHoaDonByIdHoaDon(hoaDonCho.id)) ;
    } catch (error) {
      
    }
  };
  const handleDeleteHoaDon = async (idHoaDon) => {
    
    try {
      await axios.delete(`https://localhost:7095/api/HoaDon/deleteHoaDon/${idHoaDon}`);
      toast.success('Xóa hóa đơn chờ thành công');
      getHoaDonChos();
    } catch (error) {
      console.log(error);
      toast.error('Xóa hóa đơn chờ thất bại');
    }
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "HoaDon",
  });
 
  return (
    <div className="banhangofline">
      <div className="row">
        <div className="col-9 banhangof_content">
          <div className="BanHangof_DSHoaDonCho" >
          <h3 className="title">Danh sách hóa đơn chờ</h3>

    <div>
      <Button variant="primary" onClick={createHoaDonOffline}>
        <i className="fas fa-plus"></i> Tạo Hóa Đơn Mới
      </Button>
      <Table striped bordered hover className="HoaDonChoTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Mã Hóa Đơn</th>
            <th>Khách hàng</th>
            {/* <th>Ngày Tạo</th> */}
            
            <th>Loại Hóa Đơn</th>
           
          </tr>
        </thead>
        <tbody>
          {hoaDonChos.map((hoaDon, index) => (
            <tr key={index}
             onClick={() => handleSelectedHoaDonCho(hoaDon)}  
             className={[ 
              hoaDon.chiTietHoaDons && hoaDon.chiTietHoaDons.length > 0 ? 'table-danger' : '',
              hoaDon.id === hoaDonChoSelected?.id ? 'selected-row' : '',
            ].join(' ')}
             >
              <td>{index + 1}</td>
              <td>{hoaDon.maHD}</td>
              <td>{hoaDon.tenNguoiNhan}</td>
              {/* <td>{hoaDon.ngayTao}</td> */}
              <td>{hoaDon.loaiHD ? 'Offline' : 'Online'} </td>
              <td><Button className="btn-danger" onClick={() => handleDeleteHoaDon(hoaDon.id)}> x</Button></td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
 
              
          </div>
          <div className="BanHangof_giohang">
            {/* <div className="BanHangof_giohang_thongtin">
              <div
                style={{
                  margin: "10px 20px",
                  border: "1px solid rgb(209, 203, 203)",
                  borderRadius: "5px",
                }}
              >
                <div style={{ margin: "0px 20px" }}>
                  <h3>Giỏ hàng</h3>
                  <h6>Sản phẩm: {soSP} </h6>
                  <h6>
                    Giá:&nbsp;
                    {data.length > 0
                      ? TongGia.toLocaleString("vi-VN") + " VNĐ"
                      : giabandau.toLocaleString("vi-VN") + " VNĐ"}
                    &nbsp;&nbsp;&nbsp; Giảm: xxxx
                  </h6>

                  <h5>Tổng tiền: xxxx</h5>
                </div>
              </div>
            </div> */}
            <div className="BanHangof_giohang_sanphamdamua">
              <DanhSachSanPham />
            </div>
          </div>
        </div>
        <div className="col-3 banhangof_hoadon">
        <div className="BanHangof_khachhang">
            <form className="form_khachhang_banhangofline">
            <div className="banhangofline_title">
                  <h3 style={{width: "300px"}}>Thông tin khách hàng</h3>
                </div>
              <div className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email or SĐT"
                  value={search}
                  style={{ width: "50%" }}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={HandleOnclickSearchKH}
                  tabIndex="-1"
                >
                  Tìm kiếm
                </button>
                
              </div>
              <div>
                <div className="row">
                  <div className="col-5">
                    <input
                      style={{ width: "250px" }}
                      type="text"
                      className="form-control"
                      placeholder="Họ và tên"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      readOnly={inputreadOnly}
                    />
                  </div>
                  
                </div>
                {/* <div className="col-6">
                    <input
                      style={{ width: "250px" }}
                      type="text"
                      className="form-control"
                      placeholder="Địa chỉ"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      readOnly={inputreadOnly}
                    />
                  </div> */}
                <div className="d-flex">
                  <input style={{ width: "250px" }}
                    type="text"
                    className="form-control"
                    placeholder="Số điện thoại"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    readOnly={inputreadOnly}
                  />
                  
                </div>
                {/* <div>
                  <input style={{ width: "250px" }}
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => SetEmail(event.target.value)}
                    readOnly={inputreadOnly}
                  />
                </div> */}
                <div className="ThemKhachHang">
                    <button
                      className="btn btn-primary"
                      onClick={(event) => {
                        event.preventDefault();
                        handleShow();
                      }}
                    >
                      + Thêm khách hàng
                    </button>
                  </div>
              </div>
            </form>
          </div>
          <hr></hr>
          <ThongTinThanhToan idHoaDon={hoaDonChoSelected.id} name={name} address={address} phone={phone} email={email}/>
        
          {/* <br></br>
          <button onClick={handlePrint} >Xem hóa đơn</button>
          <div style={{
              position: 'absolute',
              top: '-1000px',
              left: '-1000px'
            }}>
              <HoaDon props={setHoaDonChoSelected} ref={componentRef} />
            </div> */}

        </div>
      </div>
      <MyModalAdd
        show={showModal}
        // handleSuccess={handleReload}
        handleClose={handleClose}
        themnhanh={"hahahaa"}
      />
    </div>
  );
};

export default BanHangOfline;
