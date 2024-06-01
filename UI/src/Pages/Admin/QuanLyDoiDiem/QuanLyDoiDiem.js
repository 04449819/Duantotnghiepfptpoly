import "./QuanLyDoiDiem.scss";
const QuanLyDoiDiem = () => {
  return (
    <div className="quanlydoidiem">
      <form class="search" action="action_page.php">
        <input type="text" placeholder="Search.." name="search"/>
        <button type="submit"><i class="fa fa-search"></i></button>
      </form>
      <div className="TableDoiDiem">Trang Đổi Điểm</div>
      <div>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">STT</th>
      <th scope="col">Tỉ lệ tích điểm</th>
      <th scope="col">Tỉ lệ tiêu điểm</th>
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
      <div className="CRUD">
      <button>sửa</button>
      <button>xóa</button>
      </div>
    </tr>
  </tbody>
 </table>
 <div  className = "doidiem">
        <button> Đổi Điểm</button>
      </div>
 </div>
</div>
  );
};

export default QuanLyDoiDiem;
