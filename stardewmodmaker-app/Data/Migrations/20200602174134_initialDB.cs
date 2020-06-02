using Microsoft.EntityFrameworkCore.Migrations;

namespace stardewmodmaker_app.Data.Migrations
{
    public partial class initialDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "nexusModId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "nickname",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "nexusModId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "nickname",
                table: "AspNetUsers");
        }
    }
}
