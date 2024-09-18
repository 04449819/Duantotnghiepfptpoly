import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "./QuanLyKhuyenMai.scss";
import { toast } from "react-toastify";
import { IoHammerSharp, IoNewspaper } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import ModalApplyKM from "./ModalApplyKM/ModalApplyKM";

const QuanLyKhuyenMai = () => {
  const [promotions, setPromotions] = useState([]);
  const [newPromotion, setNewPromotion] = useState({
    ten: "",
    giaTri: 0,
    ngayApDung: "",
    ngayKetThuc: "",
    moTa: "",
    trangThai: 0,
  });
  const [errors, setErrors] = useState({
    ten: '',
    giaTri: '',
    ngayApDung: '',
    ngayKetThuc: '',
    moTa: '',
    trangThai: '',
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState();
  const [page, setPage] = useState(1);
  const tableRef = useRef(null);
  const ROWS_PER_PAGE = 8;

  useEffect(() => {
    fetchPromotions(page, false);
  }, []);
 

  const handleScroll = async (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 5;
    if (isBottom) {
      if (page < total) {
        fetchPromotions(page + 1, false);
        setPage(page + 1);
      }
    }
  };

  const fetchPromotions = async (pageNumber, refresh = false) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/KhuyenMai?pageIndex=${pageNumber}&pageSize=${ROWS_PER_PAGE}`
      );
      const data = res.data;
      refresh ? setPromotions(data.data) : setPromotions(prev => [...prev, ...data.data]);
      setTotal(data.totalCount);
    } catch (error) {}
  };

  const handleClose = () => setShowModal(false);

  const handleShow = () => {
    setIsEditing(false);
    setNewPromotion({
      ten: "",
      giaTri: 0,
      ngayApDung: "",
      ngayKetThuc: "",
      moTa: "",
      trangThai: 0,
    });
    setShowModal(true);
  };

  const handleDelete = async (kmId) => {
    try {
      await axios.delete(`https://localhost:7095/api/KhuyenMai/${kmId}`);
      fetchPromotions(1, true);
      setPage(1);
    } catch (error) {
      console.error("Error deleting khuyen mai:", error);
    }
  };

  const handleEdit = (km) => {
    setNewPromotion(km);
    setIsEditing(true);
    setShowModal(true);
   
  };
 

  const validateInput = (id, value) => {
    let error = "";
    switch (id) {
      case "ten":
        if (!value.trim()) {
          error = "Tên khuyến mại không được để trống";
        }
        break;
      case "giaTri":
        console.log(newPromotion);
        
        if (isNaN(value) || value <= 0) {
          error = "Giá trị phải là số lớn hơn 0";
        }else if (newPromotion.trangThai === '1'  && value > 100) {
          error = "Giá trị phải nhỏ hơn hoặc bằng 100 khi chọn phần trăm";
        }else if (newPromotion.trangThai === '3'  && value > 100) {
          error = "Giá trị phải nhỏ hơn hoặc bằng 100 khi chọn phần trăm";
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
        } else if (newPromotion.ngayApDung && new Date(value) < new Date(newPromotion.ngayApDung)) {
          error = "Ngày kết thúc phải sau ngày áp dụng";
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
    const { id, value } = e.target;
    setNewPromotion((prev) => ({
      ...prev,
      [id]: value,
    }));

    const error = validateInput(id, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: error,
    }));
  };
  const getEndOfDay = (dateString) => {
    const date = new Date(dateString);
    date.setHours(23, 59, 59, 999);
    return date;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionPromotion = { ...newPromotion };

  // Chuyển đổi ngayKetThuc thành cuối ngày
  if (submissionPromotion.ngayKetThuc) {
    const endDate = new Date(submissionPromotion.ngayKetThuc);
    endDate.setHours(23, 59, 59, 999);
    submissionPromotion.ngayKetThuc = endDate.toISOString();
    console.log(submissionPromotion.ngayKetThuc);
    
  }
  console.log(submissionPromotion);
  
    const newErrors = {
      ten: validateInput("ten", newPromotion.ten),
      giaTri: validateInput("giaTri", newPromotion.giaTri),
      ngayApDung: validateInput("ngayApDung", newPromotion.ngayApDung),
      ngayKetThuc: validateInput("ngayKetThuc", newPromotion.ngayKetThuc),
      moTa: validateInput("moTa", newPromotion.moTa),
      trangThai: validateInput("trangThai", newPromotion.trangThai),
    };
  
    setErrors(newErrors);
  
    // Kiểm tra nếu có lỗi
    const hasError = Object.values(newErrors).some(error => error !== "");
    if (hasError) {
      toast.error("Vui lòng kiểm tra và sửa các lỗi trước khi tiếp tục.");
      return; // Ngăn submit nếu có lỗi
    }
  
    try {
      if (!isEditing) {
        try {
          await axios.post(
            "https://localhost:7095/api/KhuyenMai",
            submissionPromotion
          );
          toast.success("Thêm khuyến mãi thành công");
        } catch (error) {
          toast.error("Thêm khuyến mãi thất bại");
        }
      } else {
        try {
          await axios.put(
            `https://localhost:7095/api/KhuyenMai/${newPromotion.id}`,
            submissionPromotion
          );
          toast.success("Cập nhật khuyến mãi thành công");
        } catch (error) {
          toast.error("Cập nhật khuyến mãi thất bại");
        }
      }
      setNewPromotion({
        ten: "",
        giaTri: 0,
        ngayApDung: "",
        ngayKetThuc: "",
        moTa: "",
        trangThai: 0,
      });
      setIsEditing(false);
      setNewPromotion({
        ten: "",
        giaTri: 0,
        ngayApDung: "",
        ngayKetThuc: "",
        moTa: "",
        trangThai: 0,
      });
      fetchPromotions(1, true);
      setPage(1);
    } catch (error) {
      console.error("Error creating promotion:", error);
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
      <h1 style={{ textAlign: "center" }}>Quản lý khuyến mại</h1>
      <hr></hr>
   
      <Button variant="primary" onClick={handleShow}>
        Tạo khuyến mại
      </Button>
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
  {isEditing ? "Cập nhật khuyến mãi" : "Tạo khuyến mãi"}
</Modal.Title>
        </Modal.Header>

        {/* <Modal.Body>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="ten" className="form-label">
                Tên khuyến mại:
              </label>
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
              <label htmlFor="giaTri" className="form-label">
                Giá trị:
              </label>
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
              <label htmlFor="ngayApDung" className="form-label">
                Ngày áp dụng:
              </label>
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
              <label htmlFor="ngayKetThuc" className="form-label">
                Ngày kết thúc:
              </label>
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
              <label htmlFor="moTa" className="form-label">
                Mô tả:
              </label>
              <textarea
                id="moTa"
                name="moTa"
                className="form-control"
                value={newPromotion.moTa}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="trangThai" className="form-label">
                Trạng thái:
              </label>
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
            <button type="submit" className="btn btn-primary">
              {isEditing ? "Cập nhật" : "Tạo "}
            </button>
          </form>
        </Modal.Body> */}
        <Modal.Body>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <label htmlFor="ten" className="form-label">
              Tên khuyến mại:
            </label>
            <input
              type="text"
              id="ten"
              name="ten"
              className="form-control"
              value={newPromotion.ten}
              onChange={handleInputChange}
              isInvalid={!!errors.ten}
            />
            {errors.ten && <div className="text-danger">{errors.ten}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="giaTri" className="form-label">
              Giá trị:
            </label>
            <input
              type="number"
              id="giaTri"
              name="giaTri"
              className="form-control"
              value={newPromotion.giaTri}
              onChange={handleInputChange}
              isInvalid={!!errors.giaTri}
            />
            {errors.giaTri && <div className="text-danger">{errors.giaTri}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="ngayApDung" className="form-label">
              Ngày áp dụng:
            </label>
            <input
              type="date"
              id="ngayApDung"
              name="ngayApDung"
              className="form-control"
              value={newPromotion.ngayApDung}
              onChange={handleInputChange}
              isInvalid={!!errors.ngayApDung}
            />
            {errors.ngayApDung && <div className="text-danger">{errors.ngayApDung}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="ngayKetThuc" className="form-label">
              Ngày kết thúc:
            </label>
            <input
              type="date"
              id="ngayKetThuc"
              name="ngayKetThuc"
              className="form-control"
              value={newPromotion.ngayKetThuc}
              onChange={handleInputChange}
              isInvalid={!!errors.ngayKetThuc}
            />
            {errors.ngayKetThuc && <div className="text-danger">{errors.ngayKetThuc}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="moTa" className="form-label">
              Mô tả:
            </label>
            <textarea
              id="moTa"
              name="moTa"
              className="form-control"
              value={newPromotion.moTa}
              onChange={handleInputChange}
              isInvalid={!!errors.moTa}
            ></textarea>
            {errors.moTa && <div className="text-danger">{errors.moTa}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="trangThai" className="form-label">
              Trạng thái:
            </label>
            <select
              id="trangThai"
              name="trangThai"
              className="form-select"
              value={newPromotion.trangThai}
              onChange={handleInputChange}
              isInvalid={!!errors.trangThai}
            >
              <option value="">Chọn trạng thái</option>
              <option value={0}>Tiền mặt</option>
              <option value={1}>Phần trăm</option>
              <option value={2}>Xóa từ tiền mặt</option>
              <option value={3}>Xóa từ phần trăm</option>
            </select>
            {errors.trangThai && <div className="text-danger">{errors.trangThai}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Cập nhật" : "Tạo mới"}
          </button>
        </form>
      </Modal.Body>
      </Modal>

      <hr></hr>
      <div style={{ width: "30%" }}>
        <input
          className="form-control mb-4"
          placeholder="Tìm kiếm theo tên khuyến mại"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <h2 style={{ textAlign: "center" }}>Danh sách khuyến mại</h2>
      <div
        className="table-container"
        ref={tableRef}
        style={{ height: "400px", overflowY: "scroll", marginTop: "40px" }}
        onScroll={handleScroll}
      >
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
                <td>{new Date(promotion.ngayApDung).toLocaleDateString()}</td>
                <td>{new Date(promotion.ngayKetThuc).toLocaleDateString()}</td>
                <td>{promotion.moTa}</td>
                <td>
                  {promotion.trangThai === 0 && "Tiền mặt"}
                  {promotion.trangThai === 1 && "Phần trăm"}
                  {promotion.trangThai === 2 && "Xóa từ tiền mặt"}
                  {promotion.trangThai === 3 && "Xóa từ phần trăm"}
                </td>
                <td>
                  <ModalApplyKM item={promotion} />
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                      handleEdit(promotion);
                      
                    }}
                  >
                    <IoHammerSharp />
                  </button>
                  {/* <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(promotion.id)}
                  >
                    <MdDelete />
                  </button> */}
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
