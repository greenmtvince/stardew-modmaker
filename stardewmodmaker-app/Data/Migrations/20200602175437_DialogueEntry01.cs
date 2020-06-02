using Microsoft.EntityFrameworkCore.Migrations;

namespace stardewmodmaker_app.Data.Migrations
{
    public partial class DialogueEntry01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DialogueEntry",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ownerId = table.Column<string>(nullable: true),
                    modId = table.Column<string>(nullable: true),
                    characterName = table.Column<string>(nullable: true),
                    conditionsType = table.Column<byte>(nullable: false),
                    day = table.Column<int>(nullable: false),
                    dayOfWeek = table.Column<string>(maxLength: 3, nullable: true),
                    dialogueKey = table.Column<string>(nullable: true),
                    genericDayType = table.Column<byte>(nullable: false),
                    hearts = table.Column<byte>(nullable: false),
                    isFollowup = table.Column<bool>(nullable: false),
                    isResponse = table.Column<bool>(nullable: false),
                    location = table.Column<string>(nullable: true),
                    rain = table.Column<bool>(nullable: false),
                    season = table.Column<string>(maxLength: 6, nullable: true),
                    showCoordinates = table.Column<bool>(nullable: false),
                    showDayOfWeek = table.Column<bool>(nullable: false),
                    showFirstYear = table.Column<bool>(nullable: false),
                    showRelationship = table.Column<bool>(nullable: false),
                    showSeason = table.Column<bool>(nullable: false),
                    showSpouse = table.Column<bool>(nullable: false),
                    specialDialogue = table.Column<short>(nullable: false),
                    spouse = table.Column<string>(maxLength: 50, nullable: true),
                    x = table.Column<short>(nullable: false),
                    y = table.Column<short>(nullable: false),
                    year = table.Column<byte>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DialogueEntry", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "DialogueLine",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ownerId = table.Column<string>(nullable: true),
                    modId = table.Column<string>(nullable: true),
                    endStyle = table.Column<byte>(nullable: false),
                    firstTimeFemale = table.Column<string>(nullable: true),
                    firstTimeText = table.Column<string>(nullable: true),
                    letterId = table.Column<string>(nullable: true),
                    order = table.Column<byte>(nullable: false),
                    portrait = table.Column<byte>(nullable: false),
                    randomItems = table.Column<string>(nullable: true),
                    showFirst = table.Column<bool>(nullable: false),
                    switchGender = table.Column<bool>(nullable: false),
                    textDefault = table.Column<string>(nullable: true),
                    textFemale = table.Column<string>(nullable: true),
                    dialogue_entry_ref = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DialogueLine", x => x.id);
                    table.ForeignKey(
                        name: "FK_DialogueLine_DialogueEntry_dialogue_entry_ref",
                        column: x => x.dialogue_entry_ref,
                        principalTable: "DialogueEntry",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DialogueResponse",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ownerId = table.Column<string>(nullable: true),
                    modId = table.Column<string>(nullable: true),
                    followup = table.Column<bool>(nullable: false),
                    portrait = table.Column<byte>(nullable: false),
                    responseID = table.Column<int>(nullable: false),
                    switchGender = table.Column<bool>(nullable: false),
                    textDefault = table.Column<string>(nullable: true),
                    textFemale = table.Column<string>(nullable: true),
                    dialogue_line_ref = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DialogueResponse", x => x.id);
                    table.ForeignKey(
                        name: "FK_DialogueResponse_DialogueLine_dialogue_line_ref",
                        column: x => x.dialogue_line_ref,
                        principalTable: "DialogueLine",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DialogueLine_dialogue_entry_ref",
                table: "DialogueLine",
                column: "dialogue_entry_ref");

            migrationBuilder.CreateIndex(
                name: "IX_DialogueResponse_dialogue_line_ref",
                table: "DialogueResponse",
                column: "dialogue_line_ref");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DialogueResponse");

            migrationBuilder.DropTable(
                name: "DialogueLine");

            migrationBuilder.DropTable(
                name: "DialogueEntry");
        }
    }
}
