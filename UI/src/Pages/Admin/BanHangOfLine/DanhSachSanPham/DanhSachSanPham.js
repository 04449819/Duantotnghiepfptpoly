import "./DanhSachSanPham.scss";
const DanhSachSanPham = () => {
  return (
    <>
      <div className="d-flex" style={{ margin: "10px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Mã sản phấm"
          style={{ width: "35%", marginRight: "10px" }}
        />
        <button type="button" className="btn btn-primary">
          Tìm kiếm
        </button>
      </div>
      <div className="row banhangol_danhsachsanpham">
        <div className="col-4 ">
          <div className="dssp_sanpham">sanpham1</div>
        </div>
        <div className="col-4 ">
          <div className="dssp_sanpham">sanpham1</div>
        </div>
        <div className="col-4 ">
          <div className="dssp_sanpham">sanpham1</div>
        </div>
        <div className="col-4 ">
          <div className="dssp_sanpham">sanpham1</div>
        </div>
        <div className="col-4 ">
          <div className="dssp_sanpham">sanpham1</div>
        </div>
        <div className="col-4 ">
          <div className="dssp_sanpham">sanpham1</div>
        </div>
        <div className="col-4 ">
          <div className="dssp_sanpham">sanpham1</div>
        </div>
        <div className="col-4 ">
          <div className="dssp_sanpham">sanpham1</div>
        </div>
        <div className="col-4 ">
          <div className="dssp_sanpham">sanpham1</div>
        </div>
        <div className="col-4 ">
          <div className="dssp_sanpham">sanpham1</div>
        </div>
        <div className="col-4 ">
          <div className="dssp_sanpham">sanpham1</div>
        </div>
        <div className="col-4 ">
          <div className="dssp_sanpham">sanpham1</div>
        </div>
      </div>
    </>
  );
};

export default DanhSachSanPham;
