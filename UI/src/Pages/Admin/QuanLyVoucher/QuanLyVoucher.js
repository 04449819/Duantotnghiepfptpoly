import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import "./QuanLyVoucher.scss";
import { toast } from "react-toastify";
const QuanLyVoucher = () => {
  const [ vouchers, setVouchers ] = useState([]);
  const [ newVoucher, setNewVoucher ] = useState({
    ten: '',
    hinhThucGiamGia: 0, 
    soTienCan: 0,
    giaTri: 0,
    ngayApDung: '',
    ngayKetThuc: '',
    soLuong: 0,
    moTa: '',
    trangThai: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const tableRef = useRef(null);
  const ROWS_PER_PAGE = 2;
  const [total, setTotal] = useState();

  useEffect(() => {
    fetchVouchers(page);
  }, []);
 

  const fetchVouchers = async (page1) => {
    try {
      const res = await axios.get(`https://localhost:7095/api/Voucher?pageIndex=${page1}&pageSize=${ROWS_PER_PAGE}`);
      const data = res.data;
      setVouchers(prev => [...prev, ...data.data]);
      setTotal(data.total);
    } catch (error) {
      
    }

  };
 
    const handleScroll = async (e) => {
       const { scrollTop, scrollHeight, clientHeight } = e.target;
       const isBottom = scrollTop + clientHeight >= scrollHeight - 5;
       if (isBottom) {
        if(page < total){
          fetchVouchers(page + 1);
          setPage(page + 1);
        }
       }
     
    };

  const handleDelete = async (voucherId) => {
    try {
      await axios.delete(`https://localhost:7095/api/Voucher/${voucherId}`);
      fetchVouchers(1);
    } catch (error) {
      console.error('Error deleting voucher:', error);
    }
  };            
  const handleShowModal = () => {
    setShowModal(true); 
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const handleInputChange = (e) => {
    setNewVoucher({ ...newVoucher, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        try {
          await axios.put(`https://localhost:7095/api/Voucher/${newVoucher.id}`, newVoucher);
          toast.success("Cập nhật voucher thành công");
        } catch (error) {
          toast.error("Cập nhật voucher thất bại");
        }
      } else {
        try {
          await axios.post('https://localhost:7095/api/Voucher', newVoucher);
          toast.success("Thêm voucher thành công");
        } catch (error) {
          toast.error("Thêm voucher thất bại");
        }
      }
      setNewVoucher({
        ten: '',
        hinhThucGiamGia: 0, 
        soTienCan: 0,
        giaTri: 0,
        ngayApDung: '',
        ngayKetThuc: '',
        soLuong: 0,
        moTa: '',
        trangThai: 0,
      });
      setIsEditing(false);
      setNewVoucher({
        ten: '',
        hinhThucGiamGia: 0, 
        soTienCan: 0,
        giaTri: 0,
        ngayApDung: '',
        ngayKetThuc: '',
        soLuong: 0,
        moTa: '',
        trangThai: 0,
      });
      fetchVouchers(1);       
    } catch (error) {
      console.error('Error creating/updating voucher:', error);
    }
  };

  const handleEdit = (voucher) => {
    setNewVoucher(voucher);
    setIsEditing(true);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredVouchers = vouchers.filter((voucher) =>
    voucher.ten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
    <div className="container my-4">
  <div className="row">
    <div className="col text-center mb-4">
      <h1>Quản lý voucher</h1>
      <hr></hr>
    </div>
  </div>
      <Button variant="primary" onClick={handleShowModal}>
        Tạo Voucher
      </Button>
      <Modal show={showModal} onHide={handleCloseModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Thông Tin Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
  <div className="row">
    <div className="col-md-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label htmlFor="ten" className="form-label">Tên</label>
        <input
          className="form-control mb-4"
          placeholder="Tên voucher"
          type="text"
          id="ten"
          name="ten"
          value={newVoucher.ten}
          onChange={handleInputChange}
        />
        </div>

        <div className="mb-3">
          <label htmlFor="hinhThucGiamGia" className="form-label">Hình thức giảm giá</label>
          <select
            className="form-select"
            id="hinhThucGiamGia"
            name="hinhThucGiamGia"
            value={newVoucher.hinhThucGiamGia}
            onChange={handleInputChange}
          >
            <option value={0}>Giảm tiền</option>
            <option value={1}>Giảm theo %</option>
          </select>
        </div>

        <div className="mb-3">
        <label htmlFor="soTienCan" className="form-label">Số tiền cần</label>
        <input
          className="form-control mb-4"
          placeholder="Số tiền cần"
          type="number"
          id="soTienCan"
          name="soTienCan"
          value={newVoucher.soTienCan}
          onChange={handleInputChange}
        />
        </div>

        <div className="mb-3">
        <label htmlFor="giaTri" className="form-label">Giá trị</label>
        <input
          className="form-control mb-4"
          placeholder="Giá trị"
          type="number"
          id="giaTri"
          name="giaTri"
          value={newVoucher.giaTri}
          onChange={handleInputChange}
        />
        </div>

        <div>
        <label htmlFor="ngayApDung" className="form-label">Ngày áp dụng</label>
        <input
          className="form-control mb-4"
          placeholder="Ngày áp dụng"
          type="date"
          id="ngayApDung"
          name="ngayApDung"
          value={newVoucher.ngayApDung}
          onChange={handleInputChange}
        />
        </div>

        <div>
        <label htmlFor="ngayKetThuc" className="form-label">Ngày kết thúc</label>
        <input
          className="form-control mb-4"
          placeholder="Ngày kết thúc"
          type="date"
          id="ngayKetThuc"
          name="ngayKetThuc"
          value={newVoucher.ngayKetThuc}
          onChange={handleInputChange}
        />
        </div>

        <div>
        <label htmlFor="soLuong" className="form-label">Số lượng</label>
        <input
          className="form-control mb-4"
          placeholder="Số lượng"
          type="number"
          id="soLuong"
          name="soLuong"
          value={newVoucher.soLuong}
          onChange={handleInputChange}
        />
        </div>

        <div>
        <label htmlFor="moTa" className="form-label">Mô tả</label>
        <textarea
          className="form-control mb-4"
          placeholder="Mô tả"
          id="moTa"
          name="moTa"
          value={newVoucher.moTa}
          onChange={handleInputChange}
        ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="trangThai" className="form-label">Trạng thái</label>
          <select
            className="form-select"
            id="trangThai"
            name="trangThai"
            value={newVoucher.trangThai}
            onChange={handleInputChange}
          >
            <option value={0}>Hết</option>
            <option value={1}>Còn</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Cập nhật' : 'Tạo'}
        </button>
      </form>
    </div>
  </div>
        </Modal.Body>
      </Modal>
  




  <div className="row">
    <div className="col-md-12">
    <div style={{width: '30%'}}>
    <input
        className="form-control mb-4 mt-4"
        placeholder="Tìm kiếm theo tên voucher"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
    <h2 style={{textAlign: 'center'}}>Danh sách voucher</h2>
    <hr></hr>
    <div className="table-container" ref={tableRef} style={{ height: '200px', overflowY: 'scroll' }}
    onScroll={handleScroll} >
    
        <table className="table">
      
          <thead>
            <tr>
              <th>Tên</th>
              <th>Hình thức giảm giá</th>
              <th>Số tiền cần</th>
              <th>Giá trị</th>
              <th>Ngày áp dụng</th>
              <th>Ngày kết thúc</th>
              <th>Số lượng</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
              <th >Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredVouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td>{voucher.ten}</td>
                <td>{voucher.hinhThucGiamGia === 0 ? 'Giảm tiền' : 'Giảm theo %'}</td>
                <td>{voucher.soTienCan}</td>
                <td>{voucher.giaTri}</td>
                <td>{voucher.ngayApDung}</td>
                <td>{voucher.ngayKetThuc}</td>
                <td>{voucher.soLuong}</td>
                <td>{voucher.moTa}</td>
                <td>{voucher.trangThai === 0 ? 'Hết' : 'Còn'}</td>
                <td>
                  <button className="btn btn-primary me-2" onClick={() => { handleEdit(voucher); handleShowModal();} }>
                    Sửa
                  </button>

                </td>
                <td> <button className="btn btn-danger" onClick={() => handleDelete(voucher.id)}>
                  Xóa
                </button>
                {/* <button className="btn btn-primary me-2" onClick={() => { handleEdit(voucher); handleCloseModal() }}>
                  Sửa
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(voucher.id)}>
                  Xóa
                </button> */}
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>    
      </div>
    </div>
  </div>
</div>
  );
};


export default QuanLyVoucher;
