using Microsoft.EntityFrameworkCore.Migrations;

namespace stardewmodmaker_app.Data.Migrations
{
    public partial class DialogueEntry02 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DialogueReply",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ownerId = table.Column<string>(nullable: true),
                    modId = table.Column<string>(nullable: true),
                    responseId = table.Column<int>(nullable: false),
                    text = table.Column<string>(nullable: true),
                    friendshipBonus = table.Column<short>(nullable: false),
                    dialogue_line_ref = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DialogueReply", x => x.id);
                    table.ForeignKey(
                        name: "FK_DialogueReply_DialogueLine_dialogue_line_ref",
                        column: x => x.dialogue_line_ref,
                        principalTable: "DialogueLine",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DialogueReply_dialogue_line_ref",
                table: "DialogueReply",
                column: "dialogue_line_ref");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DialogueReply");
        }
    }
}
