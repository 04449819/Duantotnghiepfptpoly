using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppData.Migrations
{
    public partial class v4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HoaDon_KhachHang_KhachHangID",
                table: "HoaDon");

            migrationBuilder.AlterColumn<Guid>(
                name: "KhachHangID",
                table: "HoaDon",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_HoaDon_KhachHang_KhachHangID",
                table: "HoaDon",
                column: "KhachHangID",
                principalTable: "KhachHang",
                principalColumn: "IDKhachHang");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HoaDon_KhachHang_KhachHangID",
                table: "HoaDon");

            migrationBuilder.AlterColumn<Guid>(
                name: "KhachHangID",
                table: "HoaDon",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_HoaDon_KhachHang_KhachHangID",
                table: "HoaDon",
                column: "KhachHangID",
                principalTable: "KhachHang",
                principalColumn: "IDKhachHang",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
