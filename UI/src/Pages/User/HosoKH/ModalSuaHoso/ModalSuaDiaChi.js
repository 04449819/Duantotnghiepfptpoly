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
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
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
  const user = useSelector((state) => state.user.User);

  useEffect(() => {
    if (address) {
      setData({
        tenKhachHang: address.tenKhachHang,
        sdt: address.sdt,
        diaChi: address.diaChi.split(",").slice(2).join(",").trim(), // Phần địa chỉ chi tiết
      });
      setSelectedProvince({
        value: address.provinceId,
        label: address.province,
      });
      setSelectedDistrict({
        value: address.districtId,
        label: address.district,
      });
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
      if (address) {
        const thanhpho = data.find(
          (p) => p.label === address.diaChi.split(",")[0].trim()
        );
        setSelectedProvince(thanhpho);
        if (thanhpho) getDistricts(thanhpho.value);
      }
    } catch (error) {
      toast.error("Failed to load provinces.");
    }
  };

  const getDistricts = async (provinceId) => {
    try {
      const res = await axios.get(
        `https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`
      );
      const data = res.data.data.map((p) => ({
        value: p.id,
        label: p.name,
      }));
      setDistricts(data);
      if (address) {
        const quanhuyen = data.find(
          (p) => p.label === address.diaChi.split(",")[1].trim()
        );
        setSelectedDistrict(quanhuyen);
      }
    } catch (error) {
      toast.error("Failed to load districts.");
    }
  };

  const handleProvinceChange = (selectedOption) => {
    if (!selectedOption) return;
    setSelectedProvince(selectedOption);
    getDistricts(selectedOption.value);
    setSelectedDistrict(null);
    setmassageprovince(true); // Reset error state when user selects a province
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setmassageDistrict(true); // Reset error state when user selects a district
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    // Validate inputs
    if (name === "tenKhachHang" && value.trim() !== "") {
      setmassagename(true);
    }
    if (name === "sdt" && validatePhone(value)) {
      setmassagesdt(true);
    }
    if (name === "diaChi" && value.trim() !== "") {
      setmassagedcct(true);
    }
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
        await axios.put(
          `https://localhost:7095/api/DiaChiKhachHang/${address.id}`, // Assuming the endpoint needs the address ID
          {
            tenKhachHang: data.tenKhachHang,
            sdt: data.sdt,
            diaChi: fullAddress,
            idkh: user.id,
          }
        );
        toast.success("Địa chỉ đã được cập nhật thành công.");
        onSave(); // Call onSave to refresh the address list
        onClose(); // Close the modal
      } catch (error) {
        toast.error(`Lỗi: ${error.response?.data || error.message}`);
      }
    }
  };

  const validatePhone = (sdt) => {
    return String(sdt)
      .toLowerCase()
      .match(/^(0)([0-9]){9}$/); // Adjust regex if necessary
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
              value={selectedProvince}
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
              placeholder="Địa chỉ chi tiết"
              required
              className="w-75 ms-3"
            />
          </div>
          <label hidden={massagedcct} className="text-danger">
            Địa chỉ chi tiết không được để trống!
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
