using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppData.Migrations
{
    public partial class update_database : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropIndex(
                name: "IX_KhuyenMaiCTSanPhams_IdKhuyenMai",
                table: "KhuyenMaiCTSanPhams");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "KhuyenMaiCTSanPhams");

            migrationBuilder.AlterColumn<Guid>(
                name: "IdKhuyenMai",
                table: "KhuyenMaiCTSanPhams",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "IdChiTietSanPham",
                table: "KhuyenMaiCTSanPhams",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_KhuyenMaiCTSanPhams",
                table: "KhuyenMaiCTSanPhams",
                columns: new[] { "IdKhuyenMai", "IdChiTietSanPham" });

            migrationBuilder.AddForeignKey(
                name: "FK_KhuyenMaiCTSanPhams_ChiTietSanPham_IdChiTietSanPham",
                table: "KhuyenMaiCTSanPhams",
                column: "IdChiTietSanPham",
                principalTable: "ChiTietSanPham",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KhuyenMaiCTSanPhams_KhuyenMai_IdKhuyenMai",
                table: "KhuyenMaiCTSanPhams",
                column: "IdKhuyenMai",
                principalTable: "KhuyenMai",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.AlterColumn<Guid>(
                name: "IdChiTietSanPham",
                table: "KhuyenMaiCTSanPhams",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<Guid>(
                name: "IdKhuyenMai",
                table: "KhuyenMaiCTSanPhams",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "KhuyenMaiCTSanPhams",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_KhuyenMaiCTSanPhams",
                table: "KhuyenMaiCTSanPhams",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_KhuyenMaiCTSanPhams_IdKhuyenMai",
                table: "KhuyenMaiCTSanPhams",
                column: "IdKhuyenMai");

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
    }
}
