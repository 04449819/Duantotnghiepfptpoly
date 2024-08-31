using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppData.Migrations
{
    public partial class updatehoanhang : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Hoanhangsanpham",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Idchitiethoadon = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    Diachikhachhang = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ngayhoanhang = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Mota = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrangThaiHoanHang = table.Column<int>(type: "int", nullable: false),
                    ChiTietHoaDonID = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hoanhangsanpham", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Hoanhangsanpham_ChiTietHoaDon_ChiTietHoaDonID",
                        column: x => x.ChiTietHoaDonID,
                        principalTable: "ChiTietHoaDon",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Hoanhangsanpham_ChiTietHoaDonID",
                table: "Hoanhangsanpham",
                column: "ChiTietHoaDonID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Hoanhangsanpham");
        }
    }
}
