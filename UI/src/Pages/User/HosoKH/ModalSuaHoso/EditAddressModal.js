// EditAddressModal.js
import React, { useState } from 'react';
import { MDBModal, MDBModalDialog, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';

const EditAddressModal = ({ isOpen, onClose, address, onSave }) => {
  const [addressData, setAddressData] = useState(address);

  const handleSave = async () => {
    try {
      await axios.put(`https://localhost:7095/api/DiaChiKhachHang/${addressData.id}`, addressData);
      onSave(); // Notify parent to refresh address list
    } catch (error) {
      console.error('Lỗi khi cập nhật địa chỉ:', error);
    } finally {
      onClose(); // Close the modal
    }
  };

  return (
    <MDBModal show={isOpen} setShow={onClose} tabIndex='-1'>
      <MDBModalDialog centered>
        <MDBModalHeader>
          <h5 className="modal-title">Sửa Địa Chỉ</h5>
          <MDBBtn className="btn-close" color="none" onClick={onClose}></MDBBtn>
        </MDBModalHeader>
        <MDBModalBody>
          <MDBInput 
            label="Địa Chỉ" 
            value={addressData.diaChiKhachHang.diaChi || ''} 
            onChange={(e) => setAddressData({ ...addressData, diaChi: e.target.value })}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={onClose}>Hủy</MDBBtn>
          <MDBBtn onClick={handleSave}>Lưu</MDBBtn>
        </MDBModalFooter>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default EditAddressModal;
