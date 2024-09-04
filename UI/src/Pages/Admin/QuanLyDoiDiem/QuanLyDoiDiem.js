import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './QuanLyDoiDiem.scss';

const initialFormState = {
  id: null,
  tiLeTichDiem: 0,
  tiLeTieuDiem: 0,
  ngayBatDau: '',
  ngayKetThuc: '',
  trangThai: 0
};

const QuanLyDoiDiem = () => {
  const [quyDoiDiems, setQuyDoiDiems] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [statusFilter, setStatusFilter] = useState('all');

  const getQuyDoiDiems = async () => {
    try {
      const response = await axios.get("https://localhost:7095/api/QuyDoiDiem");
      setQuyDoiDiems(response.data);
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu");
    }
  };

  useEffect(() => {
    getQuyDoiDiems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'trangThai' ? parseInt(value, 10) : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.tiLeTichDiem <= 0) newErrors.tiLeTichDiem = 'Tỉ lệ tích điểm phải lớn hơn 0';
    if (formData.tiLeTieuDiem <= 0) newErrors.tiLeTieuDiem = 'Tỉ lệ tiêu điểm phải lớn hơn 0';
    if (!formData.ngayBatDau) newErrors.ngayBatDau = 'Ngày bắt đầu không được để trống';
    if (!formData.ngayKetThuc) newErrors.ngayKetThuc = 'Ngày kết thúc không được để trống';
    if (new Date(formData.ngayKetThuc) <= new Date(formData.ngayBatDau)) {
      newErrors.ngayKetThuc = 'Ngày kết thúc phải sau ngày bắt đầu';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      let updatedQuyDoiDiems = [...quyDoiDiems];
      
      if (formData.trangThai === 1) {
        updatedQuyDoiDiems = updatedQuyDoiDiems.map(item => ({
          ...item,
          trangThai: 0
        }));
      }

      const dataToSend = {
        tiLeTichDiem: formData.tiLeTichDiem,
        tiLeTieuDiem: formData.tiLeTieuDiem,
        ngayBatDau: formData.ngayBatDau,
        ngayKetThuc: formData.ngayKetThuc,
        trangThai: formData.trangThai
      };

      if (formData.id) {
        // Updating existing record
        dataToSend.id = formData.id; // Include id for existing records
        const index = updatedQuyDoiDiems.findIndex(item => item.id === formData.id);
        if (index !== -1) {
          updatedQuyDoiDiems[index] = { ...formData };
        }
        await axios.put(`https://localhost:7095/api/QuyDoiDiem/${formData.id}`, dataToSend);
        toast.success("Cập nhật đổi điểm thành công");
      } else {
        // Creating new record
        const response = await axios.post('https://localhost:7095/api/QuyDoiDiem', dataToSend);
        const newRecord = { ...dataToSend, id: response.data.id };
        updatedQuyDoiDiems.push(newRecord);
        toast.success("Thêm đổi điểm thành công");
      }

      // Update all records if the current record is set to active
      if (formData.trangThai === 1) {
        for (const item of updatedQuyDoiDiems) {
          if (item.id !== formData.id) {
            await axios.put(`https://localhost:7095/api/QuyDoiDiem/${item.id}`, { ...item, trangThai: 0 });
          }
        }
      }

      setQuyDoiDiems(updatedQuyDoiDiems);
      setShowModal(false);
      getQuyDoiDiems(); // Refresh data from server
    } catch (error) {
      toast.error(formData.id ? "Cập nhật đổi điểm thất bại" : "Thêm đổi điểm thất bại");
      console.error('Error:', error.response ? error.response.data : error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      try {
        await axios.delete(`https://localhost:7095/api/QuyDoiDiem/${id}`);
        toast.success("Xóa đổi điểm thành công");
        getQuyDoiDiems();
      } catch (error) {
        toast.error('Lỗi khi xóa quy đổi điểm');
      }
    }
  };

  const openModal = (item = null) => {
    setFormData(item ? {
      ...item,
      ngayBatDau: new Date(item.ngayBatDau).toISOString().split('T')[0],
      ngayKetThuc: new Date(item.ngayKetThuc).toISOString().split('T')[0]
    } : initialFormState);
    setErrors({});
    setShowModal(true);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredQuyDoiDiems = quyDoiDiems.filter(item => {
    if (statusFilter === 'all') return true;
    return item.trangThai === parseInt(statusFilter, 10);
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">Quản lý đổi điểm</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>
          Tạo mới
        </button>
      </div>
      <div className="mb-3">
        <select
          className="form-select"
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="1">Đang áp dụng</option>
          <option value="0">Không hoạt động</option>
        </select>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-light">
            <tr>
              <th>TT</th>
              <th>Tỉ lệ tích điểm</th>
              <th>Tỉ lệ tiêu điểm</th>
              <th>Ngày bắt đầu</th>
              <th>Ngày kết thúc</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuyDoiDiems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.tiLeTichDiem.toLocaleString()}</td>
                <td>{item.tiLeTieuDiem.toLocaleString()}</td>
                <td>{new Date(item.ngayBatDau).toLocaleDateString()}</td>
                <td>{new Date(item.ngayKetThuc).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${item.trangThai === 1 ? 'bg-success' : 'bg-danger'}`}>
                    {item.trangThai === 1 ? 'Đang áp dụng' : 'Không hoạt động'}
                  </span>
                </td>
                <td>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => openModal(item)}>
                    Sửa
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{formData.id ? 'Sửa quy đổi điểm' : 'Tạo mới quy đổi điểm'}</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-5">
                  <label htmlFor="tiLeTichDiem" className="form-label">Tỉ lệ tích điểm</label>
                  <input
                    type="number"
                    className={`form-control ${errors.tiLeTichDiem ? 'is-invalid' : ''}`}
                    id="tiLeTichDiem"
                    name="tiLeTichDiem"
                    value={formData.tiLeTichDiem}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                  />
                  {errors.tiLeTichDiem && <div className="invalid-feedback ">{errors.tiLeTichDiem}</div>}
                </div>
                <div className="mb-5">
                  <label htmlFor="tiLeTieuDiem" className="form-label">Tỉ lệ tiêu điểm</label>
                  <input
                    type="number"
                    className={`form-control ${errors.tiLeTieuDiem ? 'is-invalid' : ''}`}
                    id="tiLeTieuDiem"
                    name="tiLeTieuDiem"
                    value={formData.tiLeTieuDiem}
                    onChange={handleInputChange}
                    step="0.01"
                    required
                  />
                  {errors.tiLeTieuDiem && <div className="invalid-feedback">{errors.tiLeTieuDiem}</div>}
                </div>
                <div className="mb-5">
                  <label htmlFor="ngayBatDau" className="form-label">Ngày bắt đầu</label>
                  <input
                    type="date"
                    className={`form-control ${errors.ngayBatDau ? 'is-invalid' : ''}`}
                    id="ngayBatDau"
                    name="ngayBatDau"
                    value={formData.ngayBatDau}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.ngayBatDau && <div className="invalid-feedback">{errors.ngayBatDau}</div>}
                </div>
                <div className="mb-5">
                  <label htmlFor="ngayKetThuc" className="form-label">Ngày kết thúc</label>
                  <input
                    type="date"
                    className={`form-control ${errors.ngayKetThuc ? 'is-invalid' : ''}`}
                    id="ngayKetThuc"
                    name="ngayKetThuc"
                    value={formData.ngayKetThuc}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.ngayKetThuc && <div className="invalid-feedback">{errors.ngayKetThuc}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="trangThai" className="form-label">Trạng thái</label>
                  <select
                    className="form-select"
                    id="trangThai"
                    name="trangThai"
                    value={formData.trangThai}
                    onChange={handleInputChange}
                  >
                    <option value={1}>Đang áp dụng</option>
                    <option value={0}>Không hoạt động</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Đóng</button>
                <button type="submit" className="btn btn-primary">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default QuanLyDoiDiem;