using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace MITA.DB.Migrations
{
    public partial class fixPriorityPropertyName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MyProperty",
                table: "Tasks");

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Tasks",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Tasks");

            migrationBuilder.AddColumn<int>(
                name: "MyProperty",
                table: "Tasks",
                nullable: false,
                defaultValue: 0);
        }
    }
}
