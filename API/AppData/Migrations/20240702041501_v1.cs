using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppData.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChatLieu",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatLieu", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "CoAo",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ten = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    trangThai = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoAo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DanhGia",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BinhLuan = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    Sao = table.Column<int>(type: "int", nullable: true),
                    NgayDanhGia = table.Column<DateTime>(type: "datetime", nullable: true),
                    phanHoi = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    TrangThai = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhGia", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "GioHang",
                columns: table => new
                {
                    IDKhachHang = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GioHang", x => x.IDKhachHang);
                });

            migrationBuilder.CreateTable(
                name: "KhuyenMai",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    GiaTri = table.Column<int>(type: "int", nullable: false),
                    NgayApDung = table.Column<DateTime>(type: "datetime", nullable: false),
                    NgayKetThuc = table.Column<DateTime>(type: "datetime", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    TrangThai = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhuyenMai", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "KichCo",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KichCo", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "LoaiSP",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(30)", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    IDLoaiSPCha = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoaiSP", x => x.ID);
                    table.ForeignKey(
                        name: "FK_LoaiSP_LoaiSP_IDLoaiSPCha",
                        column: x => x.IDLoaiSPCha,
                        principalTable: "LoaiSP",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "MauSac",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Ma = table.Column<string>(type: "varchar(10)", nullable: true),
                    TrangThai = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MauSac", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "phuongThucThanhToans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ten = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Thongtin = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    trangThai = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_phuongThucThanhToans", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "QuyDoiDiem",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TiLeTichDiem = table.Column<int>(type: "int", nullable: false),
                    TiLeTieuDiem = table.Column<int>(type: "int", nullable: false),
                    ngayBatDau = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ngayKetThuc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TrangThai = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuyDoiDiem", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "VaiTro",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VaiTro", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Voucher",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    HinhThucGiamGia = table.Column<int>(type: "int", nullable: false),
                    SoTienCan = table.Column<int>(type: "int", nullable: false),
                    GiaTri = table.Column<int>(type: "int", nullable: false),
                    NgayApDung = table.Column<DateTime>(type: "datetime", nullable: false),
                    NgayKetThuc = table.Column<DateTime>(type: "datetime", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    TrangThai = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Voucher", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "KhachHang",
                columns: table => new
                {
                    IDKhachHang = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    Password = table.Column<string>(type: "varchar(MAX)", nullable: false),
                    GioiTinh = table.Column<int>(type: "int", nullable: true),
                    NgaySinh = table.Column<DateTime>(type: "datetime", nullable: true),
                    Email = table.Column<string>(type: "varchar(250)", nullable: true),
                    SDT = table.Column<string>(type: "varchar(10)", nullable: true),
                    DiemTich = table.Column<int>(type: "int", nullable: true),
                    TrangThai = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhachHang", x => x.IDKhachHang);
                    table.ForeignKey(
                        name: "FK_KhachHang_GioHang_IDKhachHang",
                        column: x => x.IDKhachHang,
                        principalTable: "GioHang",
                        principalColumn: "IDKhachHang",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SanPham",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Ma = table.Column<string>(type: "nvarchar(10)", nullable: true),
                    MoTa = table.Column<string>(type: "nvarchar(300)", nullable: true),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    IDLoaiSP = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IDChatLieu = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    idCoAo = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SanPham", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SanPham_ChatLieu_IDChatLieu",
                        column: x => x.IDChatLieu,
                        principalTable: "ChatLieu",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SanPham_CoAo_idCoAo",
                        column: x => x.idCoAo,
                        principalTable: "CoAo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SanPham_LoaiSP_IDLoaiSP",
                        column: x => x.IDLoaiSP,
                        principalTable: "LoaiSP",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "NhanVien",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ten = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PassWord = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SDT = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    DiaChi = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: true),
                    IDVaiTro = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NhanVien", x => x.ID);
                    table.ForeignKey(
                        name: "FK_NhanVien_VaiTro_IDVaiTro",
                        column: x => x.IDVaiTro,
                        principalTable: "VaiTro",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "diaChiKhachHangs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    KhachHangID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_diaChiKhachHangs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_diaChiKhachHangs_KhachHang_KhachHangID",
                        column: x => x.KhachHangID,
                        principalTable: "KhachHang",
                        principalColumn: "IDKhachHang",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietSanPham",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Ma = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    GiaBan = table.Column<int>(type: "int", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "datetime", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    IDSanPham = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IDMauSac = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IDKichCo = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietSanPham", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ChiTietSanPham_KichCo_IDKichCo",
                        column: x => x.IDKichCo,
                        principalTable: "KichCo",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietSanPham_MauSac_IDMauSac",
                        column: x => x.IDMauSac,
                        principalTable: "MauSac",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietSanPham_SanPham_IDSanPham",
                        column: x => x.IDSanPham,
                        principalTable: "SanPham",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HoaDon",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaHD = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NgayTao = table.Column<DateTime>(type: "datetime", nullable: false),
                    NgayThanhToan = table.Column<DateTime>(type: "datetime", nullable: true),
                    NgayNhanHang = table.Column<DateTime>(type: "datetime", nullable: true),
                    TenNguoiNhan = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    SDT = table.Column<string>(type: "nvarchar(10)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    TienShip = table.Column<int>(type: "int", nullable: false),
                    TongTien = table.Column<int>(type: "int", nullable: true),
                    LoaiHD = table.Column<int>(type: "int", nullable: false),
                    GhiChu = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    TrangThaiTT = table.Column<int>(type: "int", nullable: false),
                    TrangThaiGiaoHang = table.Column<int>(type: "int", nullable: false),
                    IDNhanVien = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IDVoucher = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    phuongThucTTID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    KhachHangID = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDon", x => x.ID);
                    table.ForeignKey(
                        name: "FK_HoaDon_KhachHang_KhachHangID",
                        column: x => x.KhachHangID,
                        principalTable: "KhachHang",
                        principalColumn: "IDKhachHang");
                    table.ForeignKey(
                        name: "FK_HoaDon_NhanVien_IDNhanVien",
                        column: x => x.IDNhanVien,
                        principalTable: "NhanVien",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_HoaDon_phuongThucThanhToans_phuongThucTTID",
                        column: x => x.phuongThucTTID,
                        principalTable: "phuongThucThanhToans",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HoaDon_Voucher_IDVoucher",
                        column: x => x.IDVoucher,
                        principalTable: "Voucher",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "Anh",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DuongDan = table.Column<string>(type: "varchar(100)", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    IDChitietsanpham = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Anh", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Anh_ChiTietSanPham_IDChitietsanpham",
                        column: x => x.IDChitietsanpham,
                        principalTable: "ChiTietSanPham",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateTable(
                name: "ChiTietGioHang",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    IDCTSP = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IDNguoiDung = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietGioHang", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ChiTietGioHang_ChiTietSanPham_IDCTSP",
                        column: x => x.IDCTSP,
                        principalTable: "ChiTietSanPham",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietGioHang_GioHang_IDNguoiDung",
                        column: x => x.IDNguoiDung,
                        principalTable: "GioHang",
                        principalColumn: "IDKhachHang",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KhuyenMaiCTSanPhams",
                columns: table => new
                {
                    IdKhuyenMai = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IdChiTietSanPham = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhuyenMaiCTSanPhams", x => new { x.IdKhuyenMai, x.IdChiTietSanPham });
                    table.ForeignKey(
                        name: "FK_KhuyenMaiCTSanPhams_ChiTietSanPham_IdChiTietSanPham",
                        column: x => x.IdChiTietSanPham,
                        principalTable: "ChiTietSanPham",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_KhuyenMaiCTSanPhams_KhuyenMai_IdKhuyenMai",
                        column: x => x.IdKhuyenMai,
                        principalTable: "KhuyenMai",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChiTietHoaDon",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DonGia = table.Column<int>(type: "int", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    IDCTSP = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IDHoaDon = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietHoaDon", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ChiTietHoaDon_ChiTietSanPham_IDCTSP",
                        column: x => x.IDCTSP,
                        principalTable: "ChiTietSanPham",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietHoaDon_DanhGia_ID",
                        column: x => x.ID,
                        principalTable: "DanhGia",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietHoaDon_HoaDon_IDHoaDon",
                        column: x => x.IDHoaDon,
                        principalTable: "HoaDon",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LichSuTichDiem",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Diem = table.Column<int>(type: "int", nullable: false),
                    TrangThai = table.Column<int>(type: "int", nullable: false),
                    IDKhachHang = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IDQuyDoiDiem = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IDHoaDon = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LichSuTichDiem", x => x.ID);
                    table.ForeignKey(
                        name: "FK_LichSuTichDiem_HoaDon_IDHoaDon",
                        column: x => x.IDHoaDon,
                        principalTable: "HoaDon",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LichSuTichDiem_KhachHang_IDKhachHang",
                        column: x => x.IDKhachHang,
                        principalTable: "KhachHang",
                        principalColumn: "IDKhachHang");
                    table.ForeignKey(
                        name: "FK_LichSuTichDiem_QuyDoiDiem_IDQuyDoiDiem",
                        column: x => x.IDQuyDoiDiem,
                        principalTable: "QuyDoiDiem",
                        principalColumn: "ID");
                });

            migrationBuilder.InsertData(
                table: "QuyDoiDiem",
                columns: new[] { "ID", "TiLeTichDiem", "TiLeTieuDiem", "TrangThai", "ngayBatDau", "ngayKetThuc" },
                values: new object[] { new Guid("16bd37c4-cef0-4e92-9bb5-511c43d99037"), 0, 0, 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null });

            migrationBuilder.InsertData(
                table: "VaiTro",
                columns: new[] { "ID", "Ten", "TrangThai" },
                values: new object[] { new Guid("952c1a5d-74ff-4daf-ba88-135c5440809c"), "Nhân viên", 1 });

            migrationBuilder.InsertData(
                table: "VaiTro",
                columns: new[] { "ID", "Ten", "TrangThai" },
                values: new object[] { new Guid("b4996b2d-a343-434b-bfe9-09f8efbb3852"), "Admin", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Anh_IDChitietsanpham",
                table: "Anh",
                column: "IDChitietsanpham");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGioHang_IDCTSP",
                table: "ChiTietGioHang",
                column: "IDCTSP");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietGioHang_IDNguoiDung",
                table: "ChiTietGioHang",
                column: "IDNguoiDung");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietHoaDon_IDCTSP",
                table: "ChiTietHoaDon",
                column: "IDCTSP");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietHoaDon_IDHoaDon",
                table: "ChiTietHoaDon",
                column: "IDHoaDon");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietSanPham_IDKichCo",
                table: "ChiTietSanPham",
                column: "IDKichCo");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietSanPham_IDMauSac",
                table: "ChiTietSanPham",
                column: "IDMauSac");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietSanPham_IDSanPham",
                table: "ChiTietSanPham",
                column: "IDSanPham");

            migrationBuilder.CreateIndex(
                name: "IX_diaChiKhachHangs_KhachHangID",
                table: "diaChiKhachHangs",
                column: "KhachHangID");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDon_IDNhanVien",
                table: "HoaDon",
                column: "IDNhanVien");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDon_IDVoucher",
                table: "HoaDon",
                column: "IDVoucher");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDon_KhachHangID",
                table: "HoaDon",
                column: "KhachHangID");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDon_phuongThucTTID",
                table: "HoaDon",
                column: "phuongThucTTID");

            migrationBuilder.CreateIndex(
                name: "IX_KhuyenMaiCTSanPhams_IdChiTietSanPham",
                table: "KhuyenMaiCTSanPhams",
                column: "IdChiTietSanPham");

            migrationBuilder.CreateIndex(
                name: "IX_LichSuTichDiem_IDHoaDon",
                table: "LichSuTichDiem",
                column: "IDHoaDon");

            migrationBuilder.CreateIndex(
                name: "IX_LichSuTichDiem_IDKhachHang",
                table: "LichSuTichDiem",
                column: "IDKhachHang");

            migrationBuilder.CreateIndex(
                name: "IX_LichSuTichDiem_IDQuyDoiDiem",
                table: "LichSuTichDiem",
                column: "IDQuyDoiDiem");

            migrationBuilder.CreateIndex(
                name: "IX_LoaiSP_IDLoaiSPCha",
                table: "LoaiSP",
                column: "IDLoaiSPCha");

            migrationBuilder.CreateIndex(
                name: "IX_NhanVien_IDVaiTro",
                table: "NhanVien",
                column: "IDVaiTro");

            migrationBuilder.CreateIndex(
                name: "IX_SanPham_IDChatLieu",
                table: "SanPham",
                column: "IDChatLieu");

            migrationBuilder.CreateIndex(
                name: "IX_SanPham_idCoAo",
                table: "SanPham",
                column: "idCoAo");

            migrationBuilder.CreateIndex(
                name: "IX_SanPham_IDLoaiSP",
                table: "SanPham",
                column: "IDLoaiSP");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Anh");

            migrationBuilder.DropTable(
                name: "ChiTietGioHang");

            migrationBuilder.DropTable(
                name: "ChiTietHoaDon");

            migrationBuilder.DropTable(
                name: "diaChiKhachHangs");

            migrationBuilder.DropTable(
                name: "KhuyenMaiCTSanPhams");

            migrationBuilder.DropTable(
                name: "LichSuTichDiem");

            migrationBuilder.DropTable(
                name: "DanhGia");

            migrationBuilder.DropTable(
                name: "ChiTietSanPham");

            migrationBuilder.DropTable(
                name: "KhuyenMai");

            migrationBuilder.DropTable(
                name: "HoaDon");

            migrationBuilder.DropTable(
                name: "QuyDoiDiem");

            migrationBuilder.DropTable(
                name: "KichCo");

            migrationBuilder.DropTable(
                name: "MauSac");

            migrationBuilder.DropTable(
                name: "SanPham");

            migrationBuilder.DropTable(
                name: "KhachHang");

            migrationBuilder.DropTable(
                name: "NhanVien");

            migrationBuilder.DropTable(
                name: "phuongThucThanhToans");

            migrationBuilder.DropTable(
                name: "Voucher");

            migrationBuilder.DropTable(
                name: "ChatLieu");

            migrationBuilder.DropTable(
                name: "CoAo");

            migrationBuilder.DropTable(
                name: "LoaiSP");

            migrationBuilder.DropTable(
                name: "GioHang");

            migrationBuilder.DropTable(
                name: "VaiTro");
        }
    }
}
