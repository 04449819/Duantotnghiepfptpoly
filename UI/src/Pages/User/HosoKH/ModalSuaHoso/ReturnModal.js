import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import "./ReturnModal.scss"

const ReturnModal = ({ show, onHide, orderId, productDetails, onSubmit }) => {
  const [selectedProducts, setSelectedProducts] = useState({});
  const [error, setError] = useState('');
  const [completedProducts, setCompletedProducts] = useState({}); // Trạng thái sản phẩm đã hoàn hàng

  const handleProductChange = (e) => {
    const { value, checked } = e.target;
    setSelectedProducts(prevState => ({
      ...prevState,
      [value]: {
        ...prevState[value],
        selected: checked,
      },
    }));
  };

  const handleQuantityChange = (e, productId) => {
    const { value } = e.target;
    const quantity = Number(value);
    const availableQuantity = productDetails.find(product => product.id === productId)?.soLuong || 1;

    if (quantity > availableQuantity) {
      setError('Số lượng hoàn hàng không được vượt quá số lượng hiện có.');
    } else {
      setError('');
      setSelectedProducts(prevState => ({
        ...prevState,
        [productId]: {
          ...prevState[productId],
          quantity: quantity,
        },
      }));
    }
  };

  const handleDescriptionChange = (e, productId) => {
    const { value } = e.target;
    setSelectedProducts(prevState => ({
      ...prevState,
      [productId]: {
        ...prevState[productId],
        description: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const requestData = Object.keys(selectedProducts)
      .filter(productId => selectedProducts[productId].selected)
      .map(productId => ({
        soLuong: selectedProducts[productId].quantity || 1,
        moTa: selectedProducts[productId].description || '',
        idChiTietHoaDon: productId,
      }));

    if (requestData.length === 0) {
      setError('Vui lòng chọn ít nhất một sản phẩm để hoàn hàng.');
      return;
    }

    console.log('Dữ liệu gửi đến API:', requestData);

    try {
      const responses = await Promise.all(
        requestData.map(data => 
          axios.post('https://localhost:7095/api/HoanhangControllers', data, {
            headers: {
              'Content-Type': 'application/json-patch+json',
            },
          })
        )
      );

      // Cập nhật sản phẩm đã hoàn
      setCompletedProducts(requestData.reduce((acc, data) => {
        acc[data.idChiTietHoaDon] = true;
        return acc;
      }, {}));
      
      onSubmit(true);
      setError('');
    } catch (error) {
      // Kiểm tra lỗi từ API
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Gửi yêu cầu hoàn hàng không thành công. Vui lòng kiểm tra lại.';
        setError(errorMessage);
      } else {
        setError('Gửi yêu cầu hoàn hàng không thành công. Vui lòng kiểm tra lại.');
      }
      
      onSubmit(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Hoàn Hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {error && <div className="text-danger mb-3">{error}</div>}
          <Form.Group controlId="formBasicSelect">
            <Form.Label>Chọn sản phẩm để hoàn hàng</Form.Label>
            <div>
              {productDetails.map((product) => (
                <div key={product.id} className="product-item">
                  <Form.Check 
                    type="checkbox"
                    id={`product-${product.id}`}
                    label={
                      <div className="product-content">
                        <img
                          src={product.anhSanPham || 'default-image-url.jpg'}
                          alt={product.tenSanPham}
                          className="product-image"
                        />
                        <div className="product-info">
                          <div>{product.tenSanPham}</div>
                          <div>Số lượng hiện có: {product.soLuong}</div>
                          {completedProducts[product.id] && (
                            <div className="text-success">Sản phẩm đã được hoàn hàng.</div>
                          )}
                        </div>
                        {selectedProducts[product.id] && selectedProducts[product.id].selected && (
                          <div className="product-details">
                            <Form.Group controlId={`quantity-${product.id}`}>
                              <Form.Label>Số lượng hoàn hàng</Form.Label>
                              <Form.Control
                                type="number"
                                min="1"
                                value={selectedProducts[product.id]?.quantity || 1}
                                onChange={(e) => handleQuantityChange(e, product.id)}
                              />
                            </Form.Group>
                            <Form.Group controlId={`description-${product.id}`}>
                              <Form.Label>Mô tả hoàn hàng</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={3}
                                value={selectedProducts[product.id]?.description || ''}
                                onChange={(e) => handleDescriptionChange(e, product.id)}
                              />
                            </Form.Group>
                          </div>
                        )}
                      </div>
                    }
                    value={product.id}
                    onChange={handleProductChange}
                    checked={selectedProducts[product.id]?.selected || false}
                  />
                </div>
              ))}
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Đóng</Button>
        <Button variant="primary" onClick={handleSubmit}>Gửi yêu cầu hoàn hàng</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReturnModal;
