import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaCheckCircle, FaShoppingCart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ThanhToanThanhCong = () => {
  const redirectToCart = () => {
    toast.success('Đang chuyển hướng đến giỏ hàng...', {
      position: 'top-right',
      autoClose: 2000,
    });
    setTimeout(() => {
      window.location.href = '/giohang';
    }, 2000);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} className="text-center">
          <FaCheckCircle className="text-success mb-4" size={80} />
          <h1 className="mb-4">Thanh Toán Thành Công!</h1>
          <p className="lead mb-4">
            Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận và đang được xử lý.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={redirectToCart}
            className="d-flex align-items-center justify-content-center mx-auto"
          >
            <FaShoppingCart className="me-2" />
            Tiếp tục mua sắm
          </Button>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default ThanhToanThanhCong;