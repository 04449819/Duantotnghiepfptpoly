import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function ModalSuaDiaChi({ isOpen, onClose, address, onSave }) {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("Hà nội");
  const [selectedDistrict, setSelectedDistrict] = useState("hai bà trưng");
  const [data, setData] = useState({
    tenKhachHang: "",
    sdt: "",
    diaChi: "",
  });
  const [massagename, setmassagename] = useState(true);
  const [massagesdt, setmassagesdt] = useState(true);
  const [massageprovince, setmassageprovince] = useState(true);
  const [massageDistrict, setmassageDistrict] = useState(true);
  const [massagedcct, setmassagedcct] = useState(true);
  const user = useSelector((p) => p.user.User);

  useEffect(() => {
    if (address) {
      setData({
        tenKhachHang: address.tenKhachHang,
        sdt: address.sdt,
        diaChi: address.diaChi,
      });
      setSelectedProvince({ value: address.provinceId, label: address.province });
      setSelectedDistrict({ value: address.districtId, label: address.district });
    }
    getProvinces();
  }, [address]);

  const getProvinces = async () => {
    try {
      const res = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
      const data = res.data.data.map((p) => ({
        value: p.id,
        label: p.name,
      }));
      setProvinces(data);
    } catch (error) {
      toast.error("Failed to load provinces.");
    }
  };

  const getDistricts = async (provinceId) => {
    try {
      const res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
      const data = res.data.data.map((p) => ({
        value: p.id,
        label: p.name,
      }));
      setDistricts(data);
    } catch (error) {
      toast.error("Failed to load districts.");
    }
  };

  const handleProvinceChange = (selectedOption) => {
    if (massageprovince === false && selectedOption !== "") {
      setmassageprovince(true);
    }
    setSelectedProvince(selectedOption);
    getDistricts(selectedOption.value);
    setSelectedDistrict(null);
  };

  const handleDistrictChange = (selectedOption) => {
    if (massageDistrict === false && selectedOption !== "") {
      setmassageDistrict(true);
    }
    setSelectedDistrict(selectedOption);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "tenKhachHang" && massagename === false && value.trim() !== "") {
      setmassagename(true);
    }
    if (name === "sdt" && massagesdt === false && validatePhone(value)) {
      setmassagesdt(true);
    }
    if (name === "diaChi" && massagedcct === false && value.trim() !== "") {
      setmassagedcct(true);
    }
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    let isValid = true;
    if (data.tenKhachHang.trim() === "") {
      setmassagename(false);
      isValid = false;
    }
    if (!validatePhone(data.sdt)) {
      setmassagesdt(false);
      isValid = false;
    }
    if (selectedProvince === null) {
      setmassageprovince(false);
      isValid = false;
    }
    if (selectedDistrict === null) {
      setmassageDistrict(false);
      isValid = false;
    }
    if (data.diaChi.trim() === "") {
      setmassagedcct(false);
      isValid = false;
    }
    if (isValid) {
      const fullAddress = `${selectedProvince.label}, ${selectedDistrict.label}, ${data.diaChi}`;
      try {
        const response = await axios.put(
          `https://localhost:7095/api/DiaChiKhachHang/${address.id}`, // Assuming the endpoint needs the address ID
          {
            tenKhachHang: data.tenKhachHang,
            sdt: data.sdt,
            diaChi: fullAddress,
            idkh: user.id,
          }
        );
        toast.success("Address updated successfully.");
        onSave(); // Call onSave to refresh the address list
        onClose(); // Close the modal
      } catch (error) {
        toast.error(`Error: ${error.response.data}`);
      }
    }
  };

  const validatePhone = (sdt) => {
    return String(sdt).toLowerCase().match(/^(0)([0-9]){9,9}$/);
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <h4 className="mx-auto">Sửa Địa Chỉ</h4>
      </Modal.Header>
      <Modal.Body>
        <div className="contact-form">
          <div className="section-header">Liên hệ</div>
          <div className="form-group">
            <label className="label">Họ và tên</label>
            <input
              name="tenKhachHang"
              value={data.tenKhachHang}
              onChange={handleInputChange}
              type="text"
              className="input"
              placeholder="Họ và tên"
            />
          </div>
          <label hidden={massagename} className="text-danger">
            Tên không được để trống!
          </label>
          <div className="form-group">
            <label className="label">Số điện thoại</label>
            <input
              type="text"
              name="sdt"
              value={data.sdt}
              onChange={handleInputChange}
              className="input"
              placeholder="Số điện thoại"
            />
          </div>
          <label hidden={massagesdt} className="text-danger">
            Số điện thoại không đúng định dạng!
          </label>
          <div className="section-header">Địa chỉ</div>
          <div className="mt-4">
            <label>Tỉnh/ Thành phố</label>
            <Select
              // value={selectedProvince}
              value={"fgtyua"}
              onChange={handleProvinceChange}
              options={provinces}
              placeholder="Chọn Tỉnh/ Thành phố"
            />  
          </div>
          <hr className="mt-4" />
          <label hidden={massageprovince} className="text-danger">
            Chọn thành phố!
          </label>
          <div className="mt-4">
            <label>Quận Huyện</label>
            <Select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              options={districts}
              placeholder="Chọn Quận Huyện"
              isDisabled={!selectedProvince}
            />
          </div>
          <hr className="mt-4" />
          <label hidden={massageDistrict} className="text-danger">
            Chọn quận huyện!
          </label>
          <div className="mt-3">
            <label>Địa chỉ (*)</label>
            <input
              type="text"
              name="diaChi"
              value={data.diaChi}
              onChange={handleInputChange}
              placeholder="Địa chỉ"
              required
              className="w-75 ms-3"
            />
          </div>
          <label hidden={massagedcct} className="text-danger">
            Địa chỉ chi tiết!
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Cập nhật địa chỉ
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalSuaDiaChi;
