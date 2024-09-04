using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppData.Migrations
{
    public partial class abc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hoanhangsanpham_ChiTietHoaDon_ChiTietHoaDonID",
                table: "Hoanhangsanpham");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Hoanhangsanpham",
                table: "Hoanhangsanpham");

            migrationBuilder.DropColumn(
                name: "Idchitiethoadon",
                table: "Hoanhangsanpham");

            migrationBuilder.RenameTable(
                name: "Hoanhangsanpham",
                newName: "hoanhangsanphams");

            migrationBuilder.RenameIndex(
                name: "IX_Hoanhangsanpham_ChiTietHoaDonID",
                table: "hoanhangsanphams",
                newName: "IX_hoanhangsanphams_ChiTietHoaDonID");

            migrationBuilder.AlterColumn<string>(
                name: "BinhLuan",
                table: "DanhGia",
                type: "nvarchar(100)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(250)",
                oldMaxLength: 250,
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_hoanhangsanphams",
                table: "hoanhangsanphams",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_hoanhangsanphams_ChiTietHoaDon_ChiTietHoaDonID",
                table: "hoanhangsanphams",
                column: "ChiTietHoaDonID",
                principalTable: "ChiTietHoaDon",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_hoanhangsanphams_ChiTietHoaDon_ChiTietHoaDonID",
                table: "hoanhangsanphams");

            migrationBuilder.DropPrimaryKey(
                name: "PK_hoanhangsanphams",
                table: "hoanhangsanphams");

            migrationBuilder.RenameTable(
                name: "hoanhangsanphams",
                newName: "Hoanhangsanpham");

            migrationBuilder.RenameIndex(
                name: "IX_hoanhangsanphams_ChiTietHoaDonID",
                table: "Hoanhangsanpham",
                newName: "IX_Hoanhangsanpham_ChiTietHoaDonID");

            migrationBuilder.AlterColumn<string>(
                name: "BinhLuan",
                table: "DanhGia",
                type: "nvarchar(250)",
                maxLength: 250,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Idchitiethoadon",
                table: "Hoanhangsanpham",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Hoanhangsanpham",
                table: "Hoanhangsanpham",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Hoanhangsanpham_ChiTietHoaDon_ChiTietHoaDonID",
                table: "Hoanhangsanpham",
                column: "ChiTietHoaDonID",
                principalTable: "ChiTietHoaDon",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
