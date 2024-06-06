import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import "./QuanLySanPham.scss";
const QuanLySanPham = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: null,
    anh: '',
    ten: '',
    ma: '',
    moTa: '',
    trangThai: 0,
    idLoaiSP: '',
    idChatLieu: '',
    idmauSac: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loaiSanPhams, setLoaiSanPhams] = useState([]);
  const [chatLieus, setChatLieus] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fetchProducts();
    fetchLoaiSanPhams();
    fetchChatLieus();
    fetchMauSacs();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7095/api/SanPham/getAll');

      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const fetchLoaiSanPhams = async () => {
    try {
      const response = await axios.get('https://localhost:7095/api/LoaiSP/getAll');
      setLoaiSanPhams(response.data);
    } catch (error) {
      console.error('Error fetching loai san phams:', error);
    }
  };
  const fetchChatLieus = async () => {
    try {
      const response = await axios.get('https://localhost:7095/api/ChatLieu/GetAllChatLieu');
      setChatLieus(response.data);
    } catch (error) {
      console.error('Error fetching chat lieus:', error);
    }
  };
  const fetchMauSacs = async () => {
    try {
      const response = await axios.get('https://localhost:7095/api/MauSac/GetAllMauSac');
      setMauSacs(response.data);
    } catch (error) {
      console.error('Error fetching mau sacs:', error);
    }
  };
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/SanPham/UpdateSanPham/${newProduct.id}`, newProduct);
      } else {
        await axios.post('/api/SanPham/AddSanPham', newProduct);
      }
      setNewProduct({
        id: null,
        ten: '',
        ma: '',
        moTa: '',
        trangThai: 0,
        idLoaiSP: '',
        idChatLieu: '',
      });
      setIsEditing(false);
      fetchProducts();
    } catch (error) {
      console.error('Error creating/updating product:', error);
    }
  };

  const handleEdit = (product) => {
    setNewProduct(product);
    setIsEditing(true);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.ten.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1>Quản lý sản phẩm</h1>

        </div>
      </div>

      <Button variant="primary" onClick={handleShow}>
        Tạo sản phẩm
      </Button>
      <Modal show={showModal} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Thông Tin Sản Phẩm</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="ten" className="form-label">Ảnh sản phẩm</label>
                  <input
                    className="form-control"
                    type="file"
                    id="anh"
                    name="anh"
                    value={newProduct.anh}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ten" className="form-label">Tên sản phẩm</label>
                  <input
                    className="form-control"
                    type="text"
                    id="ten"
                    name="ten"
                    value={newProduct.ten}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ma" className="form-label">Mã sản phẩm</label>
                  <input
                    className="form-control"
                    type="text"
                    id="ma"
                    name="ma"
                    value={newProduct.ma}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="moTa" className="form-label">Mô tả sản phẩm</label>
                  <textarea
                    className="form-control"
                    id="moTa"
                    name="moTa"
                    value={newProduct.moTa}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="idLoaiSP" className="form-label">Loại sản phẩm:</label>
                  <select
                    className="form-select"
                    id="idLoaiSP"
                    name="idLoaiSP"
                    value={newProduct.idLoaiSP}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Chọn loại sản phẩm --</option>
                    {loaiSanPhams.map((loaiSP) => (
                      <option key={loaiSP.id} value={loaiSP.id}>
                        {loaiSP.ten}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="idChatLieu" className="form-label">Chất liệu:</label>
                  <select
                    className="form-select"
                    id="idChatLieu"
                    name="idChatLieu"
                    value={newProduct.idChatLieu}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Chọn chất liệu --</option>
                    {chatLieus.map((chatLieu) => (
                      <option key={chatLieu.id} value={chatLieu.id}>
                        {chatLieu.ten}
                      </option>
                    ))}
                  </select>
                </div>


                <div className="mb-3">
                  <label htmlFor="idMauSac" className="form-label">Màu sắc:</label>
                  <select
                    className="form-select"
                    id="idMauSac"
                    name="idMauSac"
                    value={newProduct.idmauSac}
                    onChange={handleInputChange}
                  >
                    <option value="">-- Chọn màu sắc --</option>
                    {mauSacs.map((mauSac) => (
                      <option key={mauSac.id} value={mauSac.id}>
                        {mauSac.ten}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="trangThai" className="form-label">Trạng thái</label>
                  <select
                    className="form-select"
                    id="trangThai"
                    name="trangThai"
                    value={newProduct.trangThai}
                    onChange={handleInputChange}
                  >
                    <option value={0}>Hết</option>
                    <option value={1}>Còn</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Cập nhật' : 'Tạo '}
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="row">
        <div className="col-12">
          <input
            className="form-control mb-4 mt-4"
            placeholder="Tìm kiếm theo tên sản phẩm"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <table className="table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Mã</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Loại sản phẩm</th>
                <th>Chất liệu</th>
                <th>Màu sắc</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.ten}</td>
                  <td>{product.ma}</td>
                  <td>{product.moTa}</td>
                  <td>{product.trangThai === 0 ? 'Hết' : 'Còn'}</td>
                  <td>{product.loaiSP ? product.loaiSP.ten : ''}</td>
                  <td>{product.chatLieu ? product.chatLieu.ten : ''}</td>
                  <td>{product.mauSac ? product.mauSac.ten : ''}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => { handleEdit(product); handleShow(); }}>
                      Sửa
                    </button>
                    <button className="btn btn-danger">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuanLySanPham;
