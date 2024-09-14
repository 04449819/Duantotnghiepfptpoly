import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './FeedbackModal.scss'; // Import file SCSS
import { toast } from 'react-toastify';

const FeedbackModal = ({ show, onHide, productId, onSubmit }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0); // Trạng thái để lưu đánh giá sao
  const [status, setStatus] = useState('');


  useEffect(() => {
    
    toast.success('Đánh giá đã được gửi thành công!');
    
  },[]);
  const handleSubmit = async () => {
    // Validate input
    if (rating === 0) {
      toast.error('Vui lòng chọn số sao đánh giá.');
      return;
    }
    if (!productId) {
      toast.error('ID sản phẩm không hợp lệ.');
      return;
    }
  
    try {
      // Send the request to the API
      const response = await axios.put(
        'https://localhost:7095/api/DanhGia',
        null,
        {
          params: {
            idCTHD: productId,
            soSao: rating,
            binhLuan: feedback
          },
          headers: {
            'Accept': 'text/plain'
          }
        }
      );
  
      if (response.status === 200) {
        const responseBody = response.data;
        if (responseBody === true) {
          // Success case
          toast.success('Đánh giá đã được gửi thành công!');
          onSubmit(true);
          setFeedback('');
          setRating(0);
        } else {
          toast.error('Gửi đánh giá không thành công.');
          onSubmit(false);
        }
      } else {
        // HTTP status code is not 200
        toast.error('Gửi đánh giá không thành công.');
        onSubmit(false);
      }
    } catch (error) {
      // Handle errors during the request
      console.error('Error submitting rating:', error);
      toast.error('Gửi đánh giá không thành công. Vui lòng thử lại.');
      onSubmit(false);
    }
  };
  

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Đánh Giá Sản Phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="feedbackForm.ControlTextarea1">
            <Form.Label>Nhập ý kiến của bạn:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="feedbackForm.ControlSelectRating">
            <Form.Label>Chọn số sao:</Form.Label>
            <div className="feedback-star-rating">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`feedback-star ${index < rating ? 'selected' : ''}`}
                  onClick={() => setRating(index + 1)}
                >
                  ★
                </span>
              ))}
            </div>
          </Form.Group>
        </Form>
        {status && <div className={`feedback-status ${status.includes('thành công') ? 'text-success' : 'text-danger'}`}>{status}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>Gửi</Button>
        <Button variant="secondary" onClick={onHide}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeedbackModal;
