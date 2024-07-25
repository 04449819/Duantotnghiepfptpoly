import React, { useState } from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import ModalDangNhap from "../HomePage/Modaldangnhap/ModalDangNhap";
import { AiOutlineUser } from "react-icons/ai";
import Select from "react-select";
import { BiX } from "react-icons/bi";
const GioHang = () => {
  const [shows, setShows] = useState(false);
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const provinces = [
    { value: "AnGiang", label: "An Giang" },
    { value: "BaRiaVungTau", label: "Bà Rịa - Vũng Tàu" },
    { value: "BacGiang", label: "Bắc Giang" },
    { value: "BacKan", label: "Bắc Kạn" },
    { value: "BacLieu", label: "Bạc Liêu" },
    { value: "BacNinh", label: "Bắc Ninh" },
    { value: "BenTre", label: "Bến Tre" },
    { value: "BinhDinh", label: "Bình Định" },
    { value: "BinhDuong", label: "Bình Dương" },
    { value: "BinhPhuoc", label: "Bình Phước" },
    { value: "BinhThuan", label: "Bình Thuận" },
    { value: "CaMau", label: "Cà Mau" },
    { value: "CanTho", label: "Cần Thơ" },
    { value: "CaoBang", label: "Cao Bằng" },
    { value: "DaNang", label: "Đà Nẵng" },
    { value: "DakLak", label: "Đắk Lắk" },
    { value: "DakNong", label: "Đắk Nông" },
    { value: "DienBien", label: "Điện Biên" },
    { value: "DongNai", label: "Đồng Nai" },
    { value: "DongThap", label: "Đồng Tháp" },
    { value: "GiaLai", label: "Gia Lai" },
    { value: "HaGiang", label: "Hà Giang" },
    { value: "HaNam", label: "Hà Nam" },
    { value: "HaNoi", label: "Hà Nội" },
    { value: "HaTinh", label: "Hà Tĩnh" },
    { value: "HaiDuong", label: "Hải Dương" },
    { value: "HaiPhong", label: "Hải Phòng" },
    { value: "HauGiang", label: "Hậu Giang" },
    { value: "HoChiMinh", label: "TP HCM" },
    { value: "HoaBinh", label: "Hòa Bình" },
    { value: "HungYen", label: "Hưng Yên" },
    { value: "KhanhHoa", label: "Khánh Hòa" },
    { value: "KienGiang", label: "Kiên Giang" },
    { value: "KonTum", label: "Kon Tum" },
    { value: "LaiChau", label: "Lai Châu" },
    { value: "LamDong", label: "Lâm Đồng" },
    { value: "LangSon", label: "Lạng Sơn" },
    { value: "LaoCai", label: "Lào Cai" },
    { value: "LongAn", label: "Long An" },
    { value: "NamDinh", label: "Nam Định" },
    { value: "NgheAn", label: "Nghệ An" },
    { value: "NinhBinh", label: "Ninh Bình" },
    { value: "NinhThuan", label: "Ninh Thuận" },
    { value: "PhuTho", label: "Phú Thọ" },
    { value: "PhuYen", label: "Phú Yên" },
    { value: "QuangBinh", label: "Quảng Bình" },
    { value: "QuangNam", label: "Quảng Nam" },
    { value: "QuangNgai", label: "Quảng Ngãi" },
    { value: "QuangNinh", label: "Quảng Ninh" },
    { value: "QuangTri", label: "Quảng Trị" },
    { value: "SocTrang", label: "Sóc Trăng" },
    { value: "SonLa", label: "Sơn La" },
    { value: "TayNinh", label: "Tây Ninh" },
    { value: "ThaiBinh", label: "Thái Bình" },
    { value: "ThaiNguyen", label: "Thái Nguyên" },
    { value: "ThanhHoa", label: "Thanh Hóa" },
    { value: "ThuaThienHue", label: "Thừa Thiên Huế" },
    { value: "TienGiang", label: "Tiền Giang" },
    { value: "TraVinh", label: "Trà Vinh" },
    { value: "TuyenQuang", label: "Tuyên Quang" },
    { value: "VinhLong", label: "Vĩnh Long" },
    { value: "VinhPhuc", label: "Vĩnh Phúc" },
    { value: "YenBai", label: "Yên Bái" },
  ];

  const districts = {
    AnGiang: [
      { value: "LongXuyen", label: "Long Xuyên" },
      { value: "ChauDoc", label: "Châu Đốc" },
      { value: "TanChau", label: "Tân Châu" },
      { value: "ChauPhu", label: "Châu Phú" },
      { value: "ThoaiSon", label: "Thoại Sơn" },
      // Thêm các quận/huyện khác nếu có
    ],
    BaRiaVungTau: [
      { value: "VungTau", label: "Vũng Tàu" },
      { value: "Baria", label: "Bà Rịa" },
      { value: "PhuMy", label: "Phú Mỹ" },
      { value: "XuyenMoc", label: "Xuyên Mộc" },
      { value: "DatDo", label: "Đất Đỏ" },
      // Thêm các quận/huyện khác nếu có
    ],
    BacGiang: [
      { value: "BacGiangCity", label: "Thành phố Bắc Giang" },
      { value: "HiepHoa", label: "Hiệp Hòa" },
      { value: "LangGiang", label: "Lạng Giang" },
      { value: "YenThe", label: "Yên Thế" },
      { value: "Viet", label: "Việt Yên" },
      // Thêm các quận/huyện khác nếu có
    ],
    BacKan: [
      { value: "BacKanCity", label: "Thành phố Bắc Kạn" },
      { value: "BaBe", label: "Ba Bể" },
      { value: "ChoDon", label: "Chợ Đồn" },
      { value: "ChoMoi", label: "Chợ Mới" },
      { value: "NguyenBinh", label: "Nguyên Bình" },
      // Thêm các quận/huyện khác nếu có
    ],
    BacLieu: [
      { value: "BacLieuCity", label: "Thành phố Bạc Liêu" },
      { value: "HoaBinh", label: "Hòa Bình" },
      { value: "PhuocLong", label: "Phước Long" },
      { value: "VinhLoc", label: "Vĩnh Lộc" },
      { value: "DaiLoc", label: "Đại Lộc" },
      // Thêm các quận/huyện khác nếu có
    ],
    BacNinh: [
      { value: "BacNinhCity", label: "Thành phố Bắc Ninh" },
      { value: "TuSon", label: "Từ Sơn" },
      { value: "QueVo", label: "Quế Võ" },
      { value: "YenPhong", label: "Yên Phong" },
      { value: "GiaBinh", label: "Gia Bình" },
      // Thêm các quận/huyện khác nếu có
    ],
    BenTre: [
      { value: "BenTreCity", label: "Thành phố Bến Tre" },
      { value: "ChauThanh", label: "Châu Thành" },
      { value: "GiongTam", label: "Giồng Trôm" },
      { value: "BaTri", label: "Ba Tri" },
      { value: "ThanhPhu", label: "Thạnh Phú" },
      // Thêm các quận/huyện khác nếu có
    ],
    BinhDinh: [
      { value: "QuyNhon", label: "Quy Nhơn" },
      { value: "AnLao", label: "An Lão" },
      { value: "HoaiNhon", label: "Hoài Nhơn" },
      { value: "VanCanh", label: "Vân Canh" },
      { value: "PhuMy", label: "Phú Mỹ" },
      // Thêm các quận/huyện khác nếu có
    ],
    BinhDuong: [
      { value: "ThuDauMot", label: "Thủ Dầu Một" },
      { value: "DiAn", label: "Dĩ An" },
      { value: "ThuanAn", label: "Thuận An" },
      { value: "TanUyen", label: "Tân Uyên" },
      { value: "BenCat", label: "Bến Cát" },
      // Thêm các quận/huyện khác nếu có
    ],
    BinhPhuoc: [
      { value: "DongXoai", label: "Đồng Xoài" },
      { value: "BinhLong", label: "Bình Long" },
      { value: "PhuRong", label: "Phú Rồ" },
      { value: "ChonThanh", label: "Chơn Thành" },
      { value: "BinhPhuocCity", label: "Thành phố Bình Phước" },
      // Thêm các quận/huyện khác nếu có
    ],
    BinhThuan: [
      { value: "PhanThiet", label: "Phan Thiết" },
      { value: "LaGi", label: "La Gi" },
      { value: "TuyPhong", label: "Tuy Phong" },
      { value: "HamThuanNam", label: "Hàm Thuận Nam" },
      { value: "HamThuanBac", label: "Hàm Thuận Bắc" },
      // Thêm các quận/huyện khác nếu có
    ],
    CaMau: [
      { value: "CaMauCity", label: "Thành phố Cà Mau" },
      { value: "DamDoi", label: "Đầm Dơi" },
      { value: "NamCan", label: "Nam Can" },
      { value: "NgocHien", label: "Ngọc Hiển" },
      { value: "PhuDuc", label: "Phú Đức" },
      // Thêm các quận/huyện khác nếu có
    ],
    CanTho: [
      { value: "CanThoCity", label: "Thành phố Cần Thơ" },
      { value: "NinhKieu", label: "Ninh Kiều" },
      { value: "BinhThuy", label: "Bình Thủy" },
      { value: "CaiRang", label: "Cái Răng" },
      { value: "OMon", label: "Ô Môn" },
      { value: "ThotNot", label: "Thốt Nốt" },
      // Thêm các quận/huyện khác nếu có
    ],
    CaoBang: [
      { value: "CaoBangCity", label: "Thành phố Cao Bằng" },
      { value: "HoaAn", label: "Hòa An" },
      { value: "HaQuang", label: "Hạ Quang" },
      { value: "NguyenBinh", label: "Nguyên Bình" },
      { value: "PhongTho", label: "Phong Thổ" },
      // Thêm các quận/huyện khác nếu có
    ],
    DaNang: [
      { value: "DaNangCity", label: "Thành phố Đà Nẵng" },
      { value: "HaiChau", label: "Hải Châu" },
      { value: "ThanhKhe", label: "Thanh Khê" },
      { value: "LienChieu", label: "Liên Chiểu" },
      { value: "CamLe", label: "Cẩm Lệ" },
      { value: "NguHanhSon", label: "Ngũ Hành Sơn" },
      { value: "SonTra", label: "Sơn Trà" },
      // Thêm các quận/huyện khác nếu có
    ],
    DakLak: [
      { value: "BuonMaThuot", label: "Buôn Ma Thuột" },
      { value: "BuonHo", label: "Buôn Hồ" },
      { value: "EaKar", label: "Ea Kar" },
      { value: "EaH'Leo", label: "Ea H'Leo" },
      { value: "KrongAna", label: "Krong Ana" },
      // Thêm các quận/huyện khác nếu có
    ],
    DakNong: [
      { value: "GiaNghia", label: "Gia Nghĩa" },
      { value: "DakRLap", label: "Đắk R'Lấp" },
      { value: "DakMil", label: "Đắk Mil" },
      { value: "DakSong", label: "Đắk Song" },
      { value: "KrongNang", label: "Krong Năng" },
      // Thêm các quận/huyện khác nếu có
    ],
    DienBien: [
      { value: "DienBienCity", label: "Thành phố Điện Biên Phủ" },
      { value: "DienBienDong", label: "Điện Biên Đông" },
      { value: "MuongAng", label: "Mường Ang" },
      { value: "MuongCha", label: "Mường Chà" },
      { value: "MuongNhe", label: "Mường Nhé" },
      // Thêm các quận/huyện khác nếu có
    ],
    DongNai: [
      { value: "BienHoa", label: "Biên Hòa" },
      { value: "LongThanh", label: "Long Thành" },
      { value: "TrangBom", label: "Trảng Bom" },
      { value: "DinhQuan", label: "Định Quán" },
      { value: "TanPhu", label: "Tân Phú" },
      // Thêm các quận/huyện khác nếu có
    ],
    DongThap: [
      { value: "SaDec", label: "Sa Đéc" },
      { value: "CaoLanh", label: "Cao Lãnh" },
      { value: "HongNgu", label: "Hồng Ngự" },
      { value: "TamNong", label: "Tam Nông" },
      { value: "ThanhBinh", label: "Thành Bình" },
      // Thêm các quận/huyện khác nếu có
    ],
    GiaLai: [
      { value: "Pleiku", label: "Pleiku" },
      { value: "Kbang", label: "Kbang" },
      { value: "KongChro", label: "Kong Chro" },
      { value: "DakDoa", label: "Đak Đoa" },
      { value: "ChưPăh", label: "Chư Păh" },
      // Thêm các quận/huyện khác nếu có
    ],
    HaNam: [
      { value: "PhuLy", label: "Phủ Lý" },
      { value: "BacLy", label: "Bắc Lý" },
      { value: "LyNhan", label: "Lý Nhân" },
      { value: "ThanhLiem", label: "Thanh Liêm" },
      { value: "DuyTien", label: "Duy Tiên" },
      // Thêm các quận/huyện khác nếu có
    ],
    HaNoi: [
      { value: "BaDinh", label: "Ba Đình" },
      { value: "HoanKiem", label: "Hoàn Kiếm" },
      { value: "TayHo", label: "Tây Hồ" },
      { value: "LongBien", label: "Long Biên" },
      { value: "CauGiay", label: "Cầu Giấy" },
      { value: "DongDa", label: "Đống Đa" },
      { value: "HaiBaTrung", label: "Hai Bà Trưng" },
      { value: "HoangMai", label: "Hoàng Mai" },
      { value: "ThanhXuan", label: "Thanh Xuân" },
      { value: "NamTuLiem", label: "Nam Từ Liêm" },
      { value: "BacTuLiem", label: "Bắc Từ Liêm" },
      // Thêm các quận/huyện khác nếu có
    ],
    HaTinh: [
      { value: "HaTinhCity", label: "Thành phố Hà Tĩnh" },
      { value: "CanLoc", label: "Can Lộc" },
      { value: "HuongKhe", label: "Hương Khê" },
      { value: "NghiXuan", label: "Nghi Xuân" },
      { value: "ThachHa", label: "Thạch Hà" },
      // Thêm các quận/huyện khác nếu có
    ],
    HaiDuong: [
      { value: "HaiDuongCity", label: "Thành phố Hải Dương" },
      { value: "BinhGiang", label: "Bình Giang" },
      { value: "GiaLoc", label: "Gia Lộc" },
      { value: "KimThanh", label: "Kim Thành" },
      { value: "NamSach", label: "Nam Sách" },
      // Thêm các quận/huyện khác nếu có
    ],
    HaGiang: [
      { value: "HaGiangCity", label: "Thành phố Hà Giang" },
      { value: "ViXuyen", label: "Vị Xuyên" },
      { value: "QuanBa", label: "Quản Bạ" },
      { value: "YenMinh", label: "Yên Minh" },
      { value: "MeoVac", label: "Mèo Vạc" },
      // Thêm các quận/huyện khác nếu có
    ],
    HaNam: [
      { value: "HaNamCity", label: "Thành phố Hà Nam" },
      { value: "BacLy", label: "Bắc Lý" },
      { value: "DuyTien", label: "Duy Tiên" },
      { value: "LyNhan", label: "Lý Nhân" },
      { value: "ThanhLiem", label: "Thanh Liêm" },
      // Thêm các quận/huyện khác nếu có
    ],
    HoaBinh: [
      { value: "HoaBinhCity", label: "Thành phố Hòa Bình" },
      { value: "KimBong", label: "Kim Bồng" },
      { value: "LacSon", label: "Lạc Sơn" },
      { value: "LacThuy", label: "Lạc Thủy" },
      { value: "YenThuy", label: "Yên Thủy" },
      // Thêm các quận/huyện khác nếu có
    ],
    HCMC: [
      { value: "District1", label: "Quận 1" },
      { value: "District2", label: "Quận 2" },
      { value: "District3", label: "Quận 3" },
      { value: "District4", label: "Quận 4" },
      { value: "District5", label: "Quận 5" },
      { value: "District6", label: "Quận 6" },
      { value: "District7", label: "Quận 7" },
      { value: "District8", label: "Quận 8" },
      { value: "District9", label: "Quận 9" },
      { value: "District10", label: "Quận 10" },
      { value: "District11", label: "Quận 11" },
      { value: "District12", label: "Quận 12" },
      { value: "BinhThanh", label: "Bình Thạnh" },
      { value: "GoVap", label: "Gò Vấp" },
      { value: "PhuNhuan", label: "Phú Nhuận" },
      { value: "TanBinh", label: "Tân Bình" },
      { value: "TanPhu", label: "Tân Phú" },
      { value: "ThuDuc", label: "Thủ Đức" },
      // Thêm các quận/huyện khác nếu có
    ],
    HungYen: [
      { value: "HungYenCity", label: "Thành phố Hưng Yên" },
      { value: "KhoaiChau", label: "Khoái Châu" },
      { value: "KimDong", label: "Kim Động" },
      { value: "TienLu", label: "Tiên Lữ" },
      { value: "VanGiang", label: "Văn Giang" },
      // Thêm các quận/huyện khác nếu có
    ],
    KienGiang: [
      { value: "RachGia", label: "Rạch Giá" },
      { value: "HaTien", label: "Hà Tiên" },
      { value: "KienLuong", label: "Kiên Lương" },
      { value: "GoQuao", label: "Gò Quao" },
      { value: "PhuQuoc", label: "Phú Quốc" },
      // Thêm các quận/huyện khác nếu có
    ],
    KonTum: [
      { value: "KonTumCity", label: "Thành phố Kon Tum" },
      { value: "DakHa", label: "Đăk Hà" },
      { value: "DakGlei", label: "Đăk Glei" },
      { value: "KonRay", label: "Kon Rẫy" },
      { value: "SaThay", label: "Sa Thầy" },
      // Thêm các quận/huyện khác nếu có
    ],
    LaiChau: [
      { value: "LaiChauCity", label: "Thành phố Lai Châu" },
      { value: "TamDuong", label: "Tam Đường" },
      { value: "PhongTho", label: "Phong Thổ" },
      { value: "MongCai", label: "Móng Cái" },
      { value: "SinHo", label: "Sìn Hồ" },
      // Thêm các quận/huyện khác nếu có
    ],
    LangSon: [
      { value: "LangSonCity", label: "Thành phố Lạng Sơn" },
      { value: "CaoLoc", label: "Cao Lộc" },
      { value: "ChiLang", label: "Chi Lăng" },
      { value: "HuuLung", label: "Hữu Lũng" },
      { value: "VietLuong", label: "Việt Lâm" },
      // Thêm các quận/huyện khác nếu có
    ],
    LaoCai: [
      { value: "LaoCaiCity", label: "Thành phố Lào Cai" },
      { value: "BatXat", label: "Bát Xát" },
      { value: "BacHa", label: "Bắc Hà" },
      { value: "MuongKhuong", label: "Mường Khương" },
      { value: "SiMaCai", label: "Si Ma Cai" },
      // Thêm các quận/huyện khác nếu có
    ],
    NamDinh: [
      { value: "NamDinhCity", label: "Thành phố Nam Định" },
      { value: "HaiHau", label: "Hải Hậu" },
      { value: "MyLoc", label: "Mỹ Lộc" },
      { value: "VuBan", label: "Vụ Bản" },
      { value: "XuanThuy", label: "Xuân Thủy" },
      // Thêm các quận/huyện khác nếu có
    ],
    NgheAn: [
      { value: "Vinh", label: "Vinh" },
      { value: "CuaLo", label: "Cửa Lò" },
      { value: "ConCuong", label: "Con Cuông" },
      { value: "NghiLoc", label: "Nghi Lộc" },
      { value: "QuynhLuu", label: "Quỳnh Lưu" },
      // Thêm các quận/huyện khác nếu có
    ],
    NinhBinh: [
      { value: "NinhBinhCity", label: "Thành phố Ninh Bình" },
      { value: "GiaVien", label: "Gia Viễn" },
      { value: "HoaLu", label: "Hoa Lư" },
      { value: "KimSon", label: "Kim Sơn" },
      { value: "YenMo", label: "Yên Mô" },
      // Thêm các quận/huyện khác nếu có
    ],
    NinhThuan: [
      { value: "PhanRangThapCham", label: "Phan Rang-Tháp Chàm" },
      { value: "NinhHai", label: "Ninh Hải" },
      { value: "NinhPhuoc", label: "Ninh Phước" },
      { value: "ThuanNam", label: "Thuận Nam" },
      { value: "ThuanBac", label: "Thuận Bắc" },
      // Thêm các quận/huyện khác nếu có
    ],
    PhuTho: [
      { value: "PhuThoCity", label: "Thành phố Phú Thọ" },
      { value: "CamKhe", label: "Cẩm Khê" },
      { value: "HanhLang", label: "Hạ Lang" },
      { value: "PhuTho", label: "Phú Thọ" },
      { value: "ThanhSon", label: "Thanh Sơn" },
      // Thêm các quận/huyện khác nếu có
    ],
    QuangBinh: [
      { value: "DongHoi", label: "Đồng Hới" },
      { value: "BoTrach", label: "Bố Trạch" },
      { value: "MinhHoa", label: "Minh Hóa" },
      { value: "QuangTrach", label: "Quảng Trạch" },
      { value: "TuyenHoa", label: "Tuyên Hóa" },
      // Thêm các quận/huyện khác nếu có
    ],
    QuangNam: [
      { value: "TamKy", label: "Tam Kỳ" },
      { value: "HoiAn", label: "Hội An" },
      { value: "DaiLoc", label: "Đại Lộc" },
      { value: "DuyXuyen", label: "Duy Xuyên" },
      { value: "NuiThanh", label: "Núi Thành" },
      // Thêm các quận/huyện khác nếu có
    ],
    QuangNgai: [
      { value: "QuangNgaiCity", label: "Thành phố Quảng Ngãi" },
      { value: "BinhSon", label: "Bình Sơn" },
      { value: "DaiLoc", label: "Đại Lộc" },
      { value: "MoCao", label: "Mộ Đức" },
      { value: "SonTay", label: "Sơn Tây" },
      // Thêm các quận/huyện khác nếu có
    ],
    QuangTri: [
      { value: "DongHa", label: "Đông Hà" },
      { value: "QuangTriCity", label: "Thành phố Quảng Trị" },
      { value: "HienLoc", label: "Hiền Lộc" },
      { value: "VinhLin", label: "Vĩnh Linh" },
      { value: "CamLo", label: "Cẩm Lộc" },
      // Thêm các quận/huyện khác nếu có
    ],
    SocTrang: [
      { value: "SocTrangCity", label: "Thành phố Sóc Trăng" },
      { value: "KeSach", label: "Kế Sách" },
      { value: "MyTu", label: "Mỹ Tú" },
      { value: "LongPhu", label: "Long Phú" },
      { value: "TranDe", label: "Trần Đề" },
      // Thêm các quận/huyện khác nếu có
    ],
    SonLa: [
      { value: "SonLaCity", label: "Thành phố Sơn La" },
      { value: "MaiSon", label: "Mai Sơn" },
      { value: "MocChau", label: "Mộc Châu" },
      { value: "PhuYen", label: "Phù Yên" },
      { value: "YenChau", label: "Yên Châu" },
      // Thêm các quận/huyện khác nếu có
    ],
    TayNinh: [
      { value: "TayNinhCity", label: "Thành phố Tây Ninh" },
      { value: "BenCau", label: "Bến Cầu" },
      { value: "ChauThanh", label: "Châu Thành" },
      { value: "TanChau", label: "Tân Châu" },
      { value: "DuongMinhChau", label: "Dương Minh Châu" },
      // Thêm các quận/huyện khác nếu có
    ],
    ThaiBinh: [
      { value: "ThaiBinhCity", label: "Thành phố Thái Bình" },
      { value: "QuynhPhu", label: "Quỳnh Phú" },
      { value: "VuThu", label: "Vũ Thư" },
      { value: "DongHung", label: "Đông Hưng" },
      { value: "ThaiThuy", label: "Thái Thụy" },
      // Thêm các quận/huyện khác nếu có
    ],
    ThaiNguyen: [
      { value: "ThaiNguyenCity", label: "Thành phố Thái Nguyên" },
      { value: "DaiTu", label: "Đại Từ" },
      { value: "DinhHoa", label: "Định Hóa" },
      { value: "PhuLinh", label: "Phú Lương" },
      { value: "VoNhai", label: "Võ Nhai" },
      // Thêm các quận/huyện khác nếu có
    ],
    ThanhHoa: [
      { value: "ThanhHoaCity", label: "Thành phố Thanh Hóa" },
      { value: "HoangHoa", label: "Hoàng Hóa" },
      { value: "NhuXuan", label: "Như Xuân" },
      { value: "QuangXuong", label: "Quảng Xương" },
      { value: "ThieuHoa", label: "Thiệu Hóa" },
      // Thêm các quận/huyện khác nếu có
    ],
    TienGiang: [
      { value: "MyTho", label: "Mỹ Tho" },
      { value: "GoCong", label: "Gò Công" },
      { value: "CaiBe", label: "Cái Bè" },
      { value: "ChoGao", label: "Chợ Gạo" },
      { value: "TanPhuoc", label: "Tân Phước" },
      // Thêm các quận/huyện khác nếu có
    ],
    TraVinh: [
      { value: "TraVinhCity", label: "Thành phố Trà Vinh" },
      { value: "CauKe", label: "Cầu Kè" },
      { value: "CauNgan", label: "Cầu Ngang" },
      { value: "DuyenHai", label: "Duyên Hải" },
      { value: "TienCam", label: "Tiểu Cần" },
      // Thêm các quận/huyện khác nếu có
    ],
    VinhLong: [
      { value: "VinhLongCity", label: "Thành phố Vĩnh Long" },
      { value: "BinhMinh", label: "Bình Minh" },
      { value: "LongHo", label: "Long Hồ" },
      { value: "TraOn", label: "Trà Ôn" },
      { value: "VungLiem", label: "Vũng Liêm" },
      // Thêm các quận/huyện khác nếu có
    ],
    YenBai: [
      { value: "YenBaiCity", label: "Thành phố Yên Bái" },
      { value: "LucYen", label: "Lục Yên" },
      { value: "VanChan", label: "Văn Chấn" },
      { value: "TramTau", label: "Trạm Tấu" },
      { value: "MuCangChai", label: "Mù Cang Chải" },
      // Thêm các quận/huyện khác nếu có
    ],
  };

  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(null); // Reset district khi thay đổi tỉnh/thành phố
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption);
  };
  const Hanleonclickthemspkhac = () => {
    navigate("/cuahang");
  };
  return (
    <div className="GioHang pb-4">
      <div className="cart-container">
        <h2>GIỎ HÀNG</h2>
        <div className="cart-content">
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="product-info">
                      <img
                        className="mt-3"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhdWrvgaByHH59L4NJHL3zf8NihxADPl14Q&s"
                        alt="Áo sơ mi"
                      />
                      <div>
                        <p>
                          Áo sơ mi nam tay ngắn OldSailor - O.S.L KAKI SHIRT -
                          WHITE - SMGA88548 - trắng - Big size upto 5XL
                        </p>
                        <p>Mã SP: SMGA885481</p>
                        <p>Size: M</p>
                      </div>
                    </div>
                  </td>
                  <td>355,000 VND</td>
                  <td>
                    <input type="number" defaultValue="1" />
                  </td>
                  <td>355,000 VND</td>
                  <td>
                    {/* <button className="btn btn-danger">X</button> */}
                    <BiX size="2em" style={{ cursor: "pointer" }} />
                  </td>
                </tr>
              </tbody>
            </table>
            <hr />
            <button
              style={{ fontSize: "14px", borderRadius: "5px" }}
              onClick={Hanleonclickthemspkhac}
              className="add-more-button"
            >
              CHỌN THÊM SẢN PHẨM KHÁC
            </button>
          </div>
          <div className="cart-summary">
            <h5>THÔNG TIN CHUNG</h5>
            <p>Tổng giỏ hàng: 355,000 VND</p>
            <p>Giảm giá: -0 VND</p>
            <p>Phí vận chuyển: 30,000 VND</p>
            <hr className="my-3" />
            <h5>Tổng cộng: 385,000 VND</h5>
            <hr className="my-3" />
            <div className="discount-code">
              <input type="text" placeholder="Nhập mã khuyến mãi nếu có" />
              <button>SỬ DỤNG</button>
            </div>
          </div>
        </div>
      </div>
      <div className="checkout-container mt-5">
        <div className="customer-info">
          <h3>THÔNG TIN KHÁCH HÀNG</h3>
          <form>
            <div className="mb-4 curtordangnhap" onClick={() => setShows(true)}>
              <AiOutlineUser /> Đăng nhập nếu đã là thành viên
            </div>
            <label>Họ và tên (*)</label>
            <input type="text" placeholder="Họ và tên" required />
            <label>Email</label>
            <input type="email" placeholder="Email" />
            <label>Điện thoại (*)</label>
            <input type="text" placeholder="Điện thoại" required />
            <label>Địa chỉ (*)</label>
            <input type="text" placeholder="Địa chỉ" required />
            <label>Tỉnh/ Thành phố</label>
            <Select
              value={selectedProvince}
              onChange={handleProvinceChange}
              options={provinces}
              placeholder="Chọn Tỉnh/ Thành phố"
            />
            <label>Quận Huyện</label>
            <Select
              value={selectedDistrict}
              onChange={handleDistrictChange}
              options={
                selectedProvince ? districts[selectedProvince.value] : []
              }
              placeholder="Chọn Quận Huyện"
              isDisabled={!selectedProvince}
            />
            <label>Ghi chú cho hóa đơn</label>
            <textarea placeholder="Ghi chú cho hóa đơn"></textarea>
            {/* <div className="checkbox-group">
              <label>
                <input type="checkbox" /> Giao hàng tại địa chỉ khác
              </label>
              <label>
                <input type="checkbox" /> Xuất hóa đơn công ty
              </label>
            </div> */}
          </form>
        </div>
        <div className="payment-method">
          <h5>PHƯƠNG THỨC THANH TOÁN</h5>
          <div className="payment-options">
            <label>
              <input type="radio" name="payment" defaultChecked /> Thanh toán
              khi nhận hàng (COD)
            </label>
            <p>
              Cảm ơn quý khách đã mua sắm tại SHOP MAN
              <br />
              **Lưu ý: Mã giảm giá không áp dụng cho các sản phẩm đang khuyến
              mãi
              <br />
              Để ship nhanh trong ngày, vui lòng gọi (028) 36 222 000 để được
              hướng dẫn
            </p>
            <label>
              <input type="radio" name="payment" /> Thanh toán qua TÀI KHOẢN
              NGÂN HÀNG
            </label>
            <p>
              Khi chuyển khoản, quý khách vui lòng nhập nội dung chuyển khoản:
              <br />
              Mua [Tên loại sản phẩm hoặc mã số đơn hàng] - [Tên khách hàng] -
              [Số điện thoại]
              <br />
              Tên tài khoản: Nguyễn Văn Kiên
              <br />
              Số tài khoản: 04449819001
              <br />
              Ngân Hàng Ngân hàng Thương mại Cổ phần Tiên Phong (TPBANK) - CN.
              Tân Định - Tp. Hồ Chí Minh
            </p>
            <p>
              **Lưu ý: Mã giảm giá không áp dụng cho các sản phẩm đang khuyến
              mãi
              <br />
              Để ship nhanh trong ngày, vui lòng gọi (028) 36 222 000 để được
              hướng dẫn
            </p>
            <p>Cảm ơn quý khách đã mua sắm tại Oldsailor.com.vn</p>
          </div>
          <button
            className="complete-order-button"
            style={{ borderRadius: "5px" }}
          >
            HOÀN TẤT ĐƠN HÀNG
          </button>
        </div>
      </div>
      <ModalDangNhap show={shows} setShow={setShows} />
    </div>
  );
};

export default GioHang;
