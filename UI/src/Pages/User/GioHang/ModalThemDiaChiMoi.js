import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./ContactForm.scss";
import Select from "react-select";
import axios from "axios";
import { set } from "lodash";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function ModalThemDiaChiMoi(props) {
  const handleClose = () => {
    setdata({ ten: "", sdt: "", diachi: "" });
    setSelectedDistrict(null);
    setmassagename(true);
    setmassagesdt(true);
    setmassageprovince(true);
    setmassageDistrict(true);
    setmassagedcct(true);
    setSelectedProvince(null);
    props.setShow(false);
    props.setload(!props.load);
  };
  const [provinces, setprovinces] = useState([]);
  const [districts, setdistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [data, setdata] = useState({ ten: "", sdt: "", diachi: "" });
  const [massagename, setmassagename] = useState(true);
  const [massagesdt, setmassagesdt] = useState(true);
  const [massageprovince, setmassageprovince] = useState(true);
  const [massageDistrict, setmassageDistrict] = useState(true);
  const [massagedcct, setmassagedcct] = useState(true);
  const user = useSelector((p) => p.user.User);
  useEffect(() => {
    getLoaiSanPhamBanHang1();
  }, []);

  const getLoaiSanPhamBanHang1 = async () => {
    try {
      const res = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
      // console.log(res.data.data);
      const datatam = res.data.data.map((p) => {
        return { value: p.id, label: p.name };
      });
      setprovinces(datatam);
    } catch (error) {}
  };
  const getLoaiSanPhamBanHang2 = async (selectedOption) => {
    try {
      const res = await axios.get(
        `https://esgoo.net/api-tinhthanh/2/${selectedOption}.htm`
      );
      console.log(res.data.data);
      const datatam = res.data.data.map((p) => {
        return { value: p.id, label: p.name };
      });
      setdistricts(datatam);
    } catch (error) {}
  };

  const handleProvinceChange = (selectedOption) => {
    console.log(selectedOption);
    if (massageprovince === false) {
      if (selectedOption !== "") {
        setmassageprovince(true);
      }
    }
    setSelectedProvince(selectedOption);
    getLoaiSanPhamBanHang2(selectedOption.value);
    setSelectedDistrict(null); // Reset district khi thay đổi tỉnh/thành phố
  };

  const handleDistrictChange = (selectedOption) => {
    if (massageDistrict === false) {
      if (selectedOption !== "") {
        setmassageDistrict(true);
      }
    }
    setSelectedDistrict(selectedOption);
  };

  const HandleOnchang = (e) => {
    const { name, value } = e.target;
    if (name === "ten" && massagename === false) {
      if (value.trim() !== "") {
        setmassagename(true);
      }
    }
    if (name === "sdt" && massagesdt === false) {
      if (validatesdt(value)) {
        setmassagesdt(true);
      }
    }
    if (name === "diachi" && massagedcct === false) {
      if (value.trim() !== "") {
        setmassagedcct(true);
      }
    }
    setdata({ ...data, [name]: value });
  };

  const HandleOnclickThem = async () => {
    let a = true;
    if (data.ten.trim() === "") {
      setmassagename(false);
      a = false;
    }
    if (!validatesdt(data.sdt)) {
      setmassagesdt(false);
      a = false;
    }
    if (selectedProvince === null) {
      setmassageprovince(false);
      a = false;
    }
    if (selectedDistrict === null) {
      setmassageDistrict(false);
      a = false;
    }
    if (data.diachi.trim() === "") {
      setmassagedcct(false);
      a = false;
    }
    if (a === true) {
      // console.log(data);
      const dc = `${selectedProvince.label},${selectedDistrict.label},${data.diachi}`;
      // console.log(dc);
      try {
        const res = await axios.post(
          `https://localhost:7095/api/DiaChiKhachHang/themdiachikhachhangmoi?tenkh=${data.ten}&sdt=${data.sdt}&diachi=${dc}&idkh=${user.id}`
        );
        toast.success(`${res.data}`);
        setdata({ ten: "", sdt: "", diachi: "" });
        setSelectedDistrict(null);
        setmassagename(true);
        setmassagesdt(true);
        setmassageprovince(true);
        setmassageDistrict(true);
        setmassagedcct(true);
        setSelectedProvince(null);
        props.setShow(false);
        props.setload(!props.load);
      } catch (error) {
        toast.error(`Gặp lỗi: ${error.response.data}`);
      }
    }
  };

  const validatesdt = (sdt) => {
    return String(sdt)
      .toLowerCase()
      .match(/^(0)([0-9]){9,9}$/);
  };
  return (
    <>
      <Modal show={props.show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <h4 style={{ width: "20%" }} className="mx-auto">
            Địa chỉ mới
          </h4>
        </Modal.Header>
        <Modal.Body>
          <div className="contact-form">
            <div className="section-header">Liên hệ</div>
            <div className="form-group">
              <label className="label">Họ và tên</label>
              <input
                name="ten"
                onChange={HandleOnchang}
                type="text"
                className="input"
                placeholder="Họ và tên"
              />
            </div>
            <label hidden={massagename} className=" text-danger">
              Tên không được để trống !
            </label>
            <div className="form-group">
              <label className="label">Số điện thoại</label>
              <input
                type="text"
                className="input"
                placeholder="Số điện thoại"
                name="sdt"
                onChange={HandleOnchang}
              />
            </div>
            <label hidden={massagesdt} className=" text-danger">
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
            <label hidden={massageprovince} className=" text-danger">
              Chọn thành phố !
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
            <label hidden={massageDistrict} className=" text-danger">
              Chọn quận huyện !
            </label>
            <div className="mt-3">
              <label>Địa chỉ (*)</label>
              <input
                type="text"
                name="diachi"
                placeholder="Địa chỉ"
                required
                className="w-75 ms-3"
                onChange={HandleOnchang}
              />
            </div>
            <label hidden={massagedcct} className=" text-danger">
              Địa chỉ chi tiêt !
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={HandleOnclickThem}>
            Thêm Địa chỉ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalThemDiaChiMoi;
