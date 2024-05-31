import "./ThongKe.scss";
const ThongKe = () => {
  return (
    <div className="thongke">
      <h1 className="DanhMucHienThi">Trang Thong Ke</h1>
     
      <div className="input">
        <span>Doanh thu theo ngày</span>
        <input
          type="date"
          className="form-control"
          aria-describedby="emailHelp"
        />
        <span>Doanh thu theo tháng</span>
        <input
          type="month"
          className="form-control"
          aria-describedby="emailHelp"
        />
        <span>Doanh thu theo năm</span>
        <input
          type="year"
          className="form-control"
          aria-describedby="emailHelp"
        />
      </div>
      <button className="Kiemtra">Kiểm tra</button>
    </div>
  );
};

export default ThongKe;
