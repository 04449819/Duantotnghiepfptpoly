import "./QuanlyKhachHang.scss";


const QuanLyKhachHang = () => {

  return (
    <div className="QlKhachHang">
      <div className="DanhMucHienThi">Trang Khách Hàng</div>
      <form className="search" action="action_page.php">
        <input type="text" placeholder="Search.." name="search" />
        <button type="submit">
          <i class="fa fa-search"></i>
        </button>
      </form>
      <div className="ThemKhachHang">
        <button> + Thêm khách hàng</button>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Giới tính</th>
              <th scope="col">Ngày sinh</th>
              <th scope="col">Email</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Điểm tích</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <div className="CRUD">
                <button>sửa</button>
                <button>xóa</button>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default QuanLyKhachHang;
