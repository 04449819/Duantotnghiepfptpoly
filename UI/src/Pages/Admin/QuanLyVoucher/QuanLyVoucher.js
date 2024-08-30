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
  const [errors, setErrors] = useState({
    ten: '',
    hinhThucGiamGia: '',
    soTienCan: '',
    giaTri: '',
    ngayApDung: '',
    ngayKetThuc: '',
    soLuong: '',
    moTa: '',
    trangThai: '',
  });
  useEffect(() => {
    fetchVouchers(page,false);
  }, []);

  const fetchVouchers = async (page, refresh = false) => {
    try {
      const res = await axios.get(` `);
      const data = res.data;
  
      // Nếu refresh là true, thay thế dữ liệu hiện tại. Nếu không, thêm vào cuối.
      refresh ? setVouchers(data.data) : setVouchers(prev => [...prev, ...data.data]);
      
      setTotal(data.total);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  };
    const handleScroll = async (e) => {
       const { scrollTop, scrollHeight, clientHeight } = e.target;
       const isBottom = scrollTop + clientHeight >= scrollHeight - 5;
       if (isBottom) {
        if(page < total){
          fetchVouchers(page + 1,false);
          setPage(page + 1);
        }
       }
     
    };
    
  const handleDelete = async (voucherId) => {
    try {
      await axios.delete(`https://localhost:7095/api/Voucher/${voucherId}`);
      // Gọi với refresh để làm mới dữ liệu
      fetchVouchers(1, true);
      setPage(1); 
    } catch (error) {
      console.error('Lỗi khi xóa voucher:', error);
    }
  };
  const handleShowModal = () => {
    setShowModal(true); 
  }
  const handleCloseModal = () => {
    setShowModal(false);
  }
  const validateInput = (id, value) => {
    let error = "";
    switch (id) {
      case "ten":
        if (!value.trim()) {
          error = "Tên không được để trống";
        }
        break;
      case "hinhThucGiamGia":
        if (value === "") {
          error = "Hình thức giảm giá không được để trống";
        }
        break;
      case "soTienCan":
        if (isNaN(value) || value <= 0) {
          error = "Số tiền cần phải là số lớn hơn 0";
        }
        break;
      case "giaTri":
        if (isNaN(value) || value <= 0) {
          error = "Giá trị phải là số lớn hơn 0";
        }
        break;
      case "ngayApDung":
        if (!value) {
          error = "Ngày áp dụng không được để trống";
        }
        break;
      case "ngayKetThuc":
        if (!value) {
          error = "Ngày kết thúc không được để trống";
        } else if (newVoucher.ngayApDung && new Date(value) < new Date(newVoucher.ngayApDung)) {
          error = "Ngày kết thúc phải sau ngày áp dụng";
        }
        break;
      case "soLuong":
        if (isNaN(value) || value <= 0) {
          error = "Số lượng phải là số lớn hơn 0";
        }
        break;
      case "moTa":
        if (!value.trim()) {
          error = "Mô tả không được để trống";
        }
        break;
      case "trangThai":
        if (value === "") {
          error = "Trạng thái không được để trống";
        }
        break;
      default:
        break;
    }
    return error;
  };
  const handleInputChange = (e) => {
    //setNewVoucher({ ...newVoucher, [e.target.name]: e.target.value });
    const { id, value } = e.target;
    setNewVoucher((prev) => ({
      ...prev,
      [id]: value,
    }));

    const error = validateInput(id, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      ten: validateInput("ten", newVoucher.ten),
      hinhThucGiamGia: validateInput("hinhThucGiamGia", newVoucher.hinhThucGiamGia),
      soTienCan: validateInput("soTienCan", newVoucher.soTienCan),
      giaTri: validateInput("giaTri", newVoucher.giaTri),
      ngayApDung: validateInput("ngayApDung", newVoucher.ngayApDung),
      ngayKetThuc: validateInput("ngayKetThuc", newVoucher.ngayKetThuc),
      soLuong: validateInput("soLuong", newVoucher.soLuong),
      moTa: validateInput("moTa", newVoucher.moTa),
      trangThai: validateInput("trangThai", newVoucher.trangThai),
    };

    setErrors(newErrors);

    // Kiểm tra nếu có lỗi
    const hasError = Object.values(newErrors).some(error => error !== "");
    if (hasError) {
      return; 
    }
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
      fetchVouchers(1, true);
      setPage(1); 
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
              isInvalid={!!errors.ten}
            />
            {errors.ten && <div className="text-danger">{errors.ten}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="hinhThucGiamGia" className="form-label">Hình thức giảm giá</label>
            <select
              className="form-select"
              id="hinhThucGiamGia"
              name="hinhThucGiamGia"
              value={newVoucher.hinhThucGiamGia}
              onChange={handleInputChange}
              isInvalid={!!errors.hinhThucGiamGia}
            >
              <option value={0}>Giảm tiền</option>
              <option value={1}>Giảm theo %</option>
            </select>
            {errors.hinhThucGiamGia && <div className="text-danger">{errors.hinhThucGiamGia}</div>}
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
              isInvalid={!!errors.soTienCan}
            />
            {errors.soTienCan && <div className="text-danger">{errors.soTienCan}</div>}
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
              isInvalid={!!errors.giaTri}
            />
            {errors.giaTri && <div className="text-danger">{errors.giaTri}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="ngayApDung" className="form-label">Ngày áp dụng</label>
            <input
              className="form-control mb-4"
              placeholder="Ngày áp dụng"
              type="date"
              id="ngayApDung"
              name="ngayApDung"
              value={newVoucher.ngayApDung}
              onChange={handleInputChange}
              isInvalid={!!errors.ngayApDung}
            />
            {errors.ngayApDung && <div className="text-danger">{errors.ngayApDung}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="ngayKetThuc" className="form-label">Ngày kết thúc</label>
            <input
              className="form-control mb-4"
              placeholder="Ngày kết thúc"
              type="date"
              id="ngayKetThuc"
              name="ngayKetThuc"
              value={newVoucher.ngayKetThuc}
              onChange={handleInputChange}
              isInvalid={!!errors.ngayKetThuc}
            />
            {errors.ngayKetThuc && <div className="text-danger">{errors.ngayKetThuc}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="soLuong" className="form-label">Số lượng</label>
            <input
              className="form-control mb-4"
              placeholder="Số lượng"
              type="number"
              id="soLuong"
              name="soLuong"
              value={newVoucher.soLuong}
              onChange={handleInputChange}
              isInvalid={!!errors.soLuong}
            />
            {errors.soLuong && <div className="text-danger">{errors.soLuong}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="moTa" className="form-label">Mô tả</label>
            <textarea
              className="form-control mb-4"
              placeholder="Mô tả"
              id="moTa"
              name="moTa"
              value={newVoucher.moTa}
              onChange={handleInputChange}
              isInvalid={!!errors.moTa}
            ></textarea>
            {errors.moTa && <div className="text-danger">{errors.moTa}</div>}
          </div>

          <div className="mb-4">
            <label htmlFor="trangThai" className="form-label">Trạng thái</label>
            <select
              className="form-select"
              id="trangThai"
              name="trangThai"
              value={newVoucher.trangThai}
              onChange={handleInputChange}
              isInvalid={!!errors.trangThai}
            >
              <option value={0}>Hết</option>
              <option value={1}>Còn</option>
            </select>
            {errors.trangThai && <div className="text-danger">{errors.trangThai}</div>}
          </div>

          <button type="submit" className="btn btn-primary">
            {isEditing ? "Cập nhật" : "Tạo"}
          </button>
        </form>
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
