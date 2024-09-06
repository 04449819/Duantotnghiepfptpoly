import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import './kk.scss';

const ReturnModal = ({ show, onHide, orderId, productDetails, onSubmit }) => {
  const [quantityToReturn, setQuantityToReturn] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});
  const [descriptions, setDescriptions] = useState({});

  useEffect(() => {
    if (productDetails) {
      const initialQuantities = productDetails.reduce((acc, product) => {
        acc[product.sanPhamId] = 0; // Initialize quantity to 0
        return acc;
      }, {});

      const initialSelections = productDetails.reduce((acc, product) => {
        acc[product.sanPhamId] = false; // Set initial selection state to false
        return acc;
      }, {});

      const initialDescriptions = productDetails.reduce((acc, product) => {
        acc[product.sanPhamId] = ''; // Initialize description to empty
        return acc;
      }, {});

      setQuantityToReturn(initialQuantities);
      setSelectedProducts(initialSelections);
      setDescriptions(initialDescriptions);
    }
  }, [productDetails]);

  const handleQuantityChange = (productId, value) => {
    const numberValue = Number(value);
    setQuantityToReturn(prev => ({
      ...prev,
      [productId]: numberValue >= 0 && numberValue <= (productDetails.find(p => p.sanPhamId === productId)?.soLuong || 0)
        ? numberValue
        : 0
    }));
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const handleDescriptionChange = (productId, value) => {
    setDescriptions(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Tạo dữ liệu yêu cầu từ productDetails
      const requestData = productDetails.reduce((acc, product) => {
        if (selectedProducts[product.sanPhamId] && quantityToReturn[product.sanPhamId] > 0) {
          (product.iDcthd || []).forEach(detail => {
            acc.push({
              soLuong: quantityToReturn[product.sanPhamId],
              moTa: descriptions[product.sanPhamId] || 'Không có mô tả',
              idChiTietHoaDon: detail.id // Sử dụng ID từ product.iDcthd
            });
          });
        }
        return acc;
      }, []);
  
      // Ghi lại thông tin dữ liệu yêu cầu vào console
      console.log('Request Data Array:', requestData);  
      productDetails.forEach(product => {
        if (selectedProducts[product.sanPhamId]) { // Sửa thành product.sanPhamId
          console.log('Sản phẩm:', product.tenSanPham);
          console.log('ID sản phẩm:', product.sanPhamId);
          console.log('Số lượng hoàn trả:', quantityToReturn[product.sanPhamId]);
          console.log('Mô tả:', descriptions[product.sanPhamId]);
        }
      });
  
      // Kiểm tra nếu không có sản phẩm nào được chọn
      if (requestData.length === 0) {
        alert('Vui lòng chọn ít nhất một sản phẩm và nhập số lượng hoàn trả.');
        return;
      }
  
      // Gửi yêu cầu tới API
      const response = await axios.post('https://localhost:7095/api/HoanhangControllers', requestData, {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json-patch+json'
        }
      });
  
      // Ghi lại phản hồi từ API vào console
      console.log('API Response:', response.data);
  
      // Lưu trữ phản hồi từ API và gọi onSubmit
      onSubmit(true);
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu hoàn hàng:', error);
      onSubmit(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết Hoàn Hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="return-modal-content">
          {productDetails.map(product => (
            <div className="return-modal-item" key={product.sanPhamId}>
              <img
                src={product.anhSanPham || 'default-image-url.jpg'}
                alt={product.tenSanPham}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <div className="return-modal-item-details">
                <p><strong>{product.tenSanPham}</strong></p>
                <p>Phân loại hàng: {product.mauSac || 'Không có màu sắc'} | Size: {product.kichCo || 'Không có kích cỡ'}</p>
                <p className="price">
                  {product.donGia !== undefined ? product.donGia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'Chưa có giá'}
                </p>
                <p>
                  <label>Số lượng hiện tại:</label>
                  <span>{product.soLuong}</span>
                </p>
                <p>
                  <label>Số lượng để hoàn:</label>
                  <input
                    type="number"
                    min="0"
                    max={product.soLuong}
                    value={quantityToReturn[product.sanPhamId] || 0}
                    onChange={(e) => handleQuantityChange(product.sanPhamId, e.target.value)}
                    disabled={!selectedProducts[product.sanPhamId]}
                  />
                </p>
                <p>
                  <label>Mô tả:</label>
                  <input
                    type="text"
                    value={descriptions[product.sanPhamId] || ''}
                    onChange={(e) => handleDescriptionChange(product.sanPhamId, e.target.value)}
                    disabled={!selectedProducts[product.sanPhamId]}
                  />
                </p>
                <p>
                  <input
                    type="checkbox"
                    checked={selectedProducts[product.sanPhamId] || false}
                    onChange={() => handleCheckboxChange(product.sanPhamId)}
                  />
                  <label>Chọn sản phẩm để hoàn</label>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Xác Nhận Hoàn Hàng
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReturnModal;
