import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import "./QuanLyKhuyenMai.scss";
const QuanLyKhuyenMai = () => {
  const [promotions, setPromotions] = useState([]);
  const [newPromotion, setNewPromotion] = useState({
    ten: '',
    giaTri: 0,
    ngayApDung: '',
    ngayKetThuc: '',
    moTa: '',
    trangThai: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const tableRef = useRef(null);
  const ROWS_PER_PAGE = 2;
  const [isFetching, setIsFetching] = useState(false);
  
  useEffect(() => {  
    fetchPromotions(1);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
        if (isFetching || (scrollTop + clientHeight >= scrollHeight - 5 && promotions.length < ROWS_PER_PAGE)) return;
        setIsFetching(true);
        loadMoreItems();
      }
    };
    if (tableRef.current) {
      tableRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (tableRef.current) {
        tableRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [promotions, page, isFetching]);

  const fetchPromotions = async (pageNumber) => {
    try {
      const response = await axios.get(`https://localhost:7095/api/KhuyenMai?page=${pageNumber}&limit=${ROWS_PER_PAGE}`);
      if (pageNumber === 1) {
        setPromotions(response.data);
      } else if (response.data.length === ROWS_PER_PAGE) {
        setPromotions((prevPromotions) => [...prevPromotions, ...response.data]);
      }
      setHasMore(response.data.length >= ROWS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    }
  };
 

  
  const loadMoreItems = async () => {
    if (hasMore) {
      try {
        const nextPage = page + 1;
        await fetchPromotions(nextPage);
      } catch (error) {
        console.error('Error loading more items:', error);
      } finally {
        setIsFetching(false);
      }
    }
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleDelete = async (kmId) => {
    try {
      await axios.delete(`https://localhost:7095/api/KhuyenMai/${kmId}`);
      await fetchPromotions(page);
    } catch (error) {
      console.error('Error deleting khuyen mai:', error);
    }
  };
  const handleEdit = (km) => {
    setNewPromotion(km);
    setIsEditing(true);
  };
  const handleInputChange = (e) => {
    setNewPromotion({ ...newPromotion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!isEditing) {
        await axios.post('https://localhost:7095/api/KhuyenMai', newPromotion);
      }
      else{
        await axios.put(`https://localhost:7095/api/KhuyenMai/${newPromotion.id}`, newPromotion);
      }
      setNewPromotion({
        ten: '',
        giaTri: 0,
        ngayApDung: '',
        ngayKetThuc: '',
        moTa: '',
        trangThai: 0,
      });
      setIsEditing(false);
      fetchPromotions();
    } catch (error) {
      console.error('Error creating promotion:', error);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredKM = promotions.filter((km) =>
    km.ten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
  <h1>Quản lý khuyến mại</h1>
  <Button variant="primary" onClick={handleShow}>
        Tạo khuyến mại
      </Button>
      <Modal show={showModal} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Thông Tin khuyến mại</Modal.Title>
        </Modal.Header>
          
        <Modal.Body>
        <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-3">
                <label htmlFor="ten" className="form-label">Tên khuyến mại:</label>
                <input
                  type="text"
                  id="ten"
                  name="ten"
                  className="form-control"
                  value={newPromotion.ten}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="giaTri" className="form-label">Giá trị:</label>
                <input
                  type="number"
                  id="giaTri"
                  name="giaTri"
                  className="form-control"
                  value={newPromotion.giaTri}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ngayApDung" className="form-label">Ngày áp dụng:</label>
                <input
                  type="date"
                  id="ngayApDung"
                  name="ngayApDung"
                  className="form-control"
                  value={newPromotion.ngayApDung}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ngayKetThuc" className="form-label">Ngày kết thúc:</label>
                <input
                  type="date"
                  id="ngayKetThuc"
                  name="ngayKetThuc"
                  className="form-control"
                  value={newPromotion.ngayKetThuc}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="moTa" className="form-label">Mô tả:</label>
                <textarea
                  id="moTa"
                  name="moTa"
                  className="form-control"
                  value={newPromotion.moTa}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="trangThai" className="form-label">Trạng thái:</label>
                <select
                  id="trangThai"
                  name="trangThai"
                  className="form-select"
                  value={newPromotion.trangThai}
                  onChange={handleInputChange}
                >
                  <option value={0}>Tiền mặt</option>
                  <option value={1}>Phần trăm</option>
                  <option value={2}>Xóa từ tiền mặt</option>
                  <option value={3}>Xóa từ phần trăm</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">{isEditing ? 'Cập nhật' : 'Tạo '}</button>
            </form>
        </Modal.Body>
      </Modal>



  <h2>Danh sách khuyến mại</h2>
  <input
    className="form-control mb-4"
    placeholder="Tìm kiếm theo tên khuyến mại"
    type="text"
    value={searchTerm}
    onChange={handleSearchChange}
  />

<div className="table-container" ref={tableRef} style={{ height: '200px', overflowY: 'scroll' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Giá trị</th>
            <th>Ngày áp dụng</th>
            <th>Ngày kết thúc</th>
            <th>Mô tả</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredKM.map((promotion) => (
            <tr key={promotion.id}>
              <td>{promotion.ten}</td>
              <td>{promotion.giaTri}</td>
              <td>{(new Date(promotion.ngayApDung)).toLocaleDateString()}</td>
              <td>{(new Date(promotion.ngayKetThuc)).toLocaleDateString()}</td>
              <td>{promotion.moTa}</td>
              <td>
                {promotion.trangThai === 0 && 'Tiền mặt'}
                {promotion.trangThai === 1 && 'Phần trăm'}
                {promotion.trangThai === 2 && 'Xóa từ tiền mặt'}
                {promotion.trangThai === 3 && 'Xóa từ phần trăm'}
              </td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => { handleEdit(promotion); handleShow() }}>
                  Sửa
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(promotion.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
  </div>


</div>
  );
};
export default QuanLyKhuyenMai;
