using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppData.Migrations
{
    public partial class khuyenmaichitietsanpham : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KhuyenMaiCTSanPham_ChiTietSanPham_IdChiTietSanPham",
                table: "KhuyenMaiCTSanPham");

            migrationBuilder.DropForeignKey(
                name: "FK_KhuyenMaiCTSanPham_KhuyenMai_IdKhuyenMai",
                table: "KhuyenMaiCTSanPham");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KhuyenMaiCTSanPham",
                table: "KhuyenMaiCTSanPham");

            migrationBuilder.RenameTable(
                name: "KhuyenMaiCTSanPham",
                newName: "KhuyenMaiCTSanPhams");

            migrationBuilder.RenameIndex(
                name: "IX_KhuyenMaiCTSanPham_IdKhuyenMai",
                table: "KhuyenMaiCTSanPhams",
                newName: "IX_KhuyenMaiCTSanPhams_IdKhuyenMai");

            migrationBuilder.RenameIndex(
                name: "IX_KhuyenMaiCTSanPham_IdChiTietSanPham",
                table: "KhuyenMaiCTSanPhams",
                newName: "IX_KhuyenMaiCTSanPhams_IdChiTietSanPham");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KhuyenMaiCTSanPhams",
                table: "KhuyenMaiCTSanPhams",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KhuyenMaiCTSanPhams_ChiTietSanPham_IdChiTietSanPham",
                table: "KhuyenMaiCTSanPhams",
                column: "IdChiTietSanPham",
                principalTable: "ChiTietSanPham",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_KhuyenMaiCTSanPhams_KhuyenMai_IdKhuyenMai",
                table: "KhuyenMaiCTSanPhams",
                column: "IdKhuyenMai",
                principalTable: "KhuyenMai",
                principalColumn: "ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KhuyenMaiCTSanPhams_ChiTietSanPham_IdChiTietSanPham",
                table: "KhuyenMaiCTSanPhams");

            migrationBuilder.DropForeignKey(
                name: "FK_KhuyenMaiCTSanPhams_KhuyenMai_IdKhuyenMai",
                table: "KhuyenMaiCTSanPhams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_KhuyenMaiCTSanPhams",
                table: "KhuyenMaiCTSanPhams");

            migrationBuilder.RenameTable(
                name: "KhuyenMaiCTSanPhams",
                newName: "KhuyenMaiCTSanPham");

            migrationBuilder.RenameIndex(
                name: "IX_KhuyenMaiCTSanPhams_IdKhuyenMai",
                table: "KhuyenMaiCTSanPham",
                newName: "IX_KhuyenMaiCTSanPham_IdKhuyenMai");

            migrationBuilder.RenameIndex(
                name: "IX_KhuyenMaiCTSanPhams_IdChiTietSanPham",
                table: "KhuyenMaiCTSanPham",
                newName: "IX_KhuyenMaiCTSanPham_IdChiTietSanPham");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KhuyenMaiCTSanPham",
                table: "KhuyenMaiCTSanPham",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_KhuyenMaiCTSanPham_ChiTietSanPham_IdChiTietSanPham",
                table: "KhuyenMaiCTSanPham",
                column: "IdChiTietSanPham",
                principalTable: "ChiTietSanPham",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_KhuyenMaiCTSanPham_KhuyenMai_IdKhuyenMai",
                table: "KhuyenMaiCTSanPham",
                column: "IdKhuyenMai",
                principalTable: "KhuyenMai",
                principalColumn: "ID");
        }
    }
}
