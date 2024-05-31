import "./QuanLyNhanVienPage.scss";
const QuanLyNhanVienPage = () => {
  return (
    <div className="qlnhanvien">
      <form className="search" action="action_page.php">
        <input type="text" placeholder="Search.." name="search"/>
        <button type="submit"><i class="fa fa-search"></i></button>
      </form>     
      <div className="DanhMucHienThi">Trang Nhân Viên</div>
      <div  className = "TNhanVien">
        <button> + Thêm nhân viên</button>
      </div>
      <div>
     <table className="table">
       <thead>
         <tr>
          <th scope="col">STT</th>
          <th scope="col">Tên nhân viên</th>
          <th scope="col">Email</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Địa chỉ</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Vai trò</th>
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
      <div className="Sua">
      <button>sửa</button>
      </div>
    </tr>
  </tbody>
</table>
      </div>
    </div>
  );
};

export default QuanLyNhanVienPage;
