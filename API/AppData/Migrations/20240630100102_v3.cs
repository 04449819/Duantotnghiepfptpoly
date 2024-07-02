using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppData.Migrations
{
    public partial class v3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SanPham_CoAos_idCoAo",
                table: "SanPham");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CoAos",
                table: "CoAos");

            migrationBuilder.RenameTable(
                name: "CoAos",
                newName: "CoAo");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CoAo",
                table: "CoAo",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SanPham_CoAo_idCoAo",
                table: "SanPham",
                column: "idCoAo",
                principalTable: "CoAo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SanPham_CoAo_idCoAo",
                table: "SanPham");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CoAo",
                table: "CoAo");

            migrationBuilder.RenameTable(
                name: "CoAo",
                newName: "CoAos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CoAos",
                table: "CoAos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SanPham_CoAos_idCoAo",
                table: "SanPham",
                column: "idCoAo",
                principalTable: "CoAos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
