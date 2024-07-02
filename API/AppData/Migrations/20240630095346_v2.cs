using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppData.Migrations
{
    public partial class v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SanPham_coAos_idCoAo",
                table: "SanPham");

            migrationBuilder.DropPrimaryKey(
                name: "PK_coAos",
                table: "coAos");

            migrationBuilder.RenameTable(
                name: "coAos",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SanPham_CoAos_idCoAo",
                table: "SanPham");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CoAos",
                table: "CoAos");

            migrationBuilder.RenameTable(
                name: "CoAos",
                newName: "coAos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_coAos",
                table: "coAos",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SanPham_coAos_idCoAo",
                table: "SanPham",
                column: "idCoAo",
                principalTable: "coAos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
