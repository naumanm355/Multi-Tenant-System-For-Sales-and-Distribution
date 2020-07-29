using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SalesandDistrib_Backend.Migrations
{
    public partial class _12_june_all_migartions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OrderStatusType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderStatus = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderStatusType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Packages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false),
                    TotalUsers = table.Column<int>(nullable: false),
                    DurationPerMonth = table.Column<int>(nullable: false),
                    Bandwidth = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Packages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Privileges",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Privileges", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShopVisitedClaimTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClaimType = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopVisitedClaimTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TargetStatusType",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TargetStatusType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Contact = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AgentCustomer",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SaleAgentId = table.Column<int>(nullable: false),
                    CustomerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgentCustomer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AgentCustomer_Users_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AgentCustomer_Users_SaleAgentId",
                        column: x => x.SaleAgentId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "DistributorAgents",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DistributorId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DistributorAgents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DistributorAgents_Users_DistributorId",
                        column: x => x.DistributorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DistributorAgents_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "DistributorDetail",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DistributorId = table.Column<int>(nullable: false),
                    City = table.Column<string>(nullable: true),
                    Province = table.Column<string>(nullable: true),
                    PostalCode = table.Column<int>(nullable: false),
                    Country = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DistributorDetail", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DistributorDetail_Users_DistributorId",
                        column: x => x.DistributorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DistributorPackages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DistributorId = table.Column<int>(nullable: false),
                    PackageId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DistributorPackages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DistributorPackages_Users_DistributorId",
                        column: x => x.DistributorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DistributorPackages_Packages_PackageId",
                        column: x => x.PackageId,
                        principalTable: "Packages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DistributorId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Price = table.Column<int>(nullable: false),
                    Category = table.Column<string>(nullable: true),
                    Company = table.Column<string>(nullable: true),
                    PrimaryUnit = table.Column<int>(nullable: false),
                    SecondaryUnit = table.Column<int>(nullable: false),
                    ExpiryDate = table.Column<DateTime>(nullable: true),
                    imageUrl = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Products_Users_DistributorId",
                        column: x => x.DistributorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RolePrivileges",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DistributorId = table.Column<int>(nullable: false),
                    RoleId = table.Column<int>(nullable: false),
                    PrivilgeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RolePrivileges", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RolePrivileges_Users_DistributorId",
                        column: x => x.DistributorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePrivileges_Privileges_PrivilgeId",
                        column: x => x.PrivilgeId,
                        principalTable: "Privileges",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RolePrivileges_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Store",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Store", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Store_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(nullable: false),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AgentOrderStatus",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderStatusId = table.Column<int>(nullable: false),
                    AgentTargetStatusId = table.Column<int>(nullable: false),
                    AgentCustomerId = table.Column<int>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    EndDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgentOrderStatus", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AgentOrderStatus_AgentCustomer_AgentCustomerId",
                        column: x => x.AgentCustomerId,
                        principalTable: "AgentCustomer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AgentOrderStatus_TargetStatusType_AgentTargetStatusId",
                        column: x => x.AgentTargetStatusId,
                        principalTable: "TargetStatusType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AgentOrderStatus_OrderStatusType_OrderStatusId",
                        column: x => x.OrderStatusId,
                        principalTable: "OrderStatusType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Inventory",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(nullable: false),
                    TotalPacket_Cartoon = table.Column<int>(nullable: false),
                    Price = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inventory_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AgentCustomersVisitedClaims",
                columns: table => new
                {
                    AgentOrderStatusId = table.Column<int>(nullable: false),
                    VisitedClaimTypeId = table.Column<int>(nullable: false),
                    ClaimDate = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgentCustomersVisitedClaims", x => x.AgentOrderStatusId);
                    table.ForeignKey(
                        name: "FK_AgentCustomersVisitedClaims_AgentOrderStatus_AgentOrderStatusId",
                        column: x => x.AgentOrderStatusId,
                        principalTable: "AgentOrderStatus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AgentCustomersVisitedClaims_ShopVisitedClaimTypes_VisitedClaimTypeId",
                        column: x => x.VisitedClaimTypeId,
                        principalTable: "ShopVisitedClaimTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomerOrderPayment",
                columns: table => new
                {
                    AgentOrderStatusId = table.Column<int>(nullable: false),
                    AmountPaid = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerOrderPayment", x => x.AgentOrderStatusId);
                    table.ForeignKey(
                        name: "FK_CustomerOrderPayment_AgentOrderStatus_AgentOrderStatusId",
                        column: x => x.AgentOrderStatusId,
                        principalTable: "AgentOrderStatus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderProducts",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InventoryId = table.Column<int>(nullable: false),
                    AgentOrderStatusId = table.Column<int>(nullable: false),
                    QTY = table.Column<int>(nullable: false),
                    OrderDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderProducts_AgentOrderStatus_AgentOrderStatusId",
                        column: x => x.AgentOrderStatusId,
                        principalTable: "AgentOrderStatus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProducts_Inventory_InventoryId",
                        column: x => x.InventoryId,
                        principalTable: "Inventory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AgentCustomer_CustomerId",
                table: "AgentCustomer",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_AgentCustomer_SaleAgentId",
                table: "AgentCustomer",
                column: "SaleAgentId");

            migrationBuilder.CreateIndex(
                name: "IX_AgentCustomersVisitedClaims_VisitedClaimTypeId",
                table: "AgentCustomersVisitedClaims",
                column: "VisitedClaimTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_AgentOrderStatus_AgentCustomerId",
                table: "AgentOrderStatus",
                column: "AgentCustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_AgentOrderStatus_AgentTargetStatusId",
                table: "AgentOrderStatus",
                column: "AgentTargetStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_AgentOrderStatus_OrderStatusId",
                table: "AgentOrderStatus",
                column: "OrderStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_DistributorAgents_DistributorId",
                table: "DistributorAgents",
                column: "DistributorId");

            migrationBuilder.CreateIndex(
                name: "IX_DistributorAgents_UserId",
                table: "DistributorAgents",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_DistributorDetail_DistributorId",
                table: "DistributorDetail",
                column: "DistributorId");

            migrationBuilder.CreateIndex(
                name: "IX_DistributorPackages_DistributorId",
                table: "DistributorPackages",
                column: "DistributorId");

            migrationBuilder.CreateIndex(
                name: "IX_DistributorPackages_PackageId",
                table: "DistributorPackages",
                column: "PackageId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_ProductId",
                table: "Inventory",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_AgentOrderStatusId",
                table: "OrderProducts",
                column: "AgentOrderStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProducts_InventoryId",
                table: "OrderProducts",
                column: "InventoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_DistributorId",
                table: "Products",
                column: "DistributorId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePrivileges_DistributorId",
                table: "RolePrivileges",
                column: "DistributorId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePrivileges_PrivilgeId",
                table: "RolePrivileges",
                column: "PrivilgeId");

            migrationBuilder.CreateIndex(
                name: "IX_RolePrivileges_RoleId",
                table: "RolePrivileges",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Store_UserId",
                table: "Store",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_RoleId",
                table: "UserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_UserId",
                table: "UserRoles",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgentCustomersVisitedClaims");

            migrationBuilder.DropTable(
                name: "CustomerOrderPayment");

            migrationBuilder.DropTable(
                name: "DistributorAgents");

            migrationBuilder.DropTable(
                name: "DistributorDetail");

            migrationBuilder.DropTable(
                name: "DistributorPackages");

            migrationBuilder.DropTable(
                name: "OrderProducts");

            migrationBuilder.DropTable(
                name: "RolePrivileges");

            migrationBuilder.DropTable(
                name: "Store");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "ShopVisitedClaimTypes");

            migrationBuilder.DropTable(
                name: "Packages");

            migrationBuilder.DropTable(
                name: "AgentOrderStatus");

            migrationBuilder.DropTable(
                name: "Inventory");

            migrationBuilder.DropTable(
                name: "Privileges");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "AgentCustomer");

            migrationBuilder.DropTable(
                name: "TargetStatusType");

            migrationBuilder.DropTable(
                name: "OrderStatusType");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
