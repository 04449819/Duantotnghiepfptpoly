using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppData.Migrations
{
    public partial class delete_sp_anh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Anh_SanPham_IDSanPham",
                table: "Anh");

            migrationBuilder.DropIndex(
                name: "IX_Anh_IDSanPham",
                table: "Anh");

            migrationBuilder.DeleteData(
                table: "NhanVien",
                keyColumn: "ID",
                keyValue: new Guid("2ec27ab7-5f67-4ed5-ae67-52f9c9726ebf"));

            migrationBuilder.DropColumn(
                name: "IDSanPham",
                table: "Anh");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "IDSanPham",
                table: "Anh",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.InsertData(
                table: "NhanVien",
                columns: new[] { "ID", "DiaChi", "Email", "IDVaiTro", "PassWord", "SDT", "Ten", "TrangThai" },
                values: new object[] { new Guid("2ec27ab7-5f67-4ed5-ae67-52f9c9726ebf"), "Ha Noi", "tamncph25588@fpt.edu.vn", new Guid("b4996b2d-a343-434b-bfe9-09f8efbb3852"), "$2a$10$SkimxxBIlrv/l33hTFvbkutV/.jF4rlwd9APgp1ZZjNEgVDYXvHa6", "0988143310", "Admin", 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Anh_IDSanPham",
                table: "Anh",
                column: "IDSanPham");

            migrationBuilder.AddForeignKey(
                name: "FK_Anh_SanPham_IDSanPham",
                table: "Anh",
                column: "IDSanPham",
                principalTable: "SanPham",
                principalColumn: "ID");
        }
    }
}
