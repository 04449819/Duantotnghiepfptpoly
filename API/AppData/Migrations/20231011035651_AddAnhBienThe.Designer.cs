﻿// <auto-generated />
using System;
using AppData.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AppData.Migrations
{
    [DbContext(typeof(AssignmentDBContext))]
    [Migration("20231011035651_AddAnhBienThe")]
    partial class AddAnhBienThe
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.21")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("AppData.Models.Anh", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Ten")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("Anh", (string)null);
                });

            modelBuilder.Entity("AppData.Models.AnhBienThe", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdAnh")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdBienThe")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("NgayTao")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("IdAnh");

                    b.HasIndex("IdBienThe");

                    b.ToTable("BienTheAnh", (string)null);
                });

            modelBuilder.Entity("AppData.Models.BienThe", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("GiaBan")
                        .HasColumnType("int");

                    b.Property<Guid>("IDKhuyenMai")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDSanPham")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("NgayTao")
                        .HasColumnType("Datetime");

                    b.Property<int>("SoLuong")
                        .HasColumnType("int");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("IDKhuyenMai");

                    b.HasIndex("IDSanPham");

                    b.ToTable("BienThe", (string)null);
                });

            modelBuilder.Entity("AppData.Models.ChiTietBienThe", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDBienThe")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDGiaTri")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("NgayLuu")
                        .HasColumnType("datetime2");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("IDBienThe");

                    b.HasIndex("IDGiaTri");

                    b.ToTable("ChiTietBienThe", (string)null);
                });

            modelBuilder.Entity("AppData.Models.ChiTietGioHang", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDBienThe")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDNguoiDung")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("SoLuong")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("IDBienThe");

                    b.HasIndex("IDNguoiDung");

                    b.ToTable("ChiTietGioHang", (string)null);
                });

            modelBuilder.Entity("AppData.Models.ChiTietHoaDon", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("DonGia")
                        .HasColumnType("int");

                    b.Property<Guid>("IDBienThe")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDHoaDon")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("SoLuong")
                        .HasColumnType("int");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("IDBienThe");

                    b.HasIndex("IDHoaDon");

                    b.ToTable("ChiTietHoaDon", (string)null);
                });

            modelBuilder.Entity("AppData.Models.ChiTietPTTT", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDHoaDon")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDPTTT")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("SoTien")
                        .HasColumnType("int");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("IDHoaDon");

                    b.HasIndex("IDPTTT");

                    b.ToTable("ChiTietPTTT", (string)null);
                });

            modelBuilder.Entity("AppData.Models.DanhGia", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("BinhLuan")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("nvarchar(250)");

                    b.Property<Guid>("IDBienThe")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDKhachHang")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Sao")
                        .HasColumnType("int");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("IDBienThe");

                    b.HasIndex("IDKhachHang");

                    b.ToTable("DanhGia", (string)null);
                });

            modelBuilder.Entity("AppData.Models.GiaTri", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IdThuocTinh")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Ten")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("ID");

                    b.HasIndex("IdThuocTinh");

                    b.ToTable("GiaTri", (string)null);
                });

            modelBuilder.Entity("AppData.Models.GioHang", b =>
                {
                    b.Property<Guid>("IDKhachHang")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("NgayTao")
                        .HasColumnType("datetime");

                    b.HasKey("IDKhachHang");

                    b.ToTable("GioHang", (string)null);
                });

            modelBuilder.Entity("AppData.Models.HoaDon", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DiaChi")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(50)");

                    b.Property<Guid?>("IDNhanVien")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("IDVoucher")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("NgayTao")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("NgayThanhToan")
                        .HasColumnType("datetime");

                    b.Property<string>("PhuongThucThanhToan")
                        .IsRequired()
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("SDT")
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("TenNguoiNhan")
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("TienShip")
                        .HasColumnType("int");

                    b.Property<int>("TrangThaiGiaoHang")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("IDNhanVien");

                    b.HasIndex("IDVoucher");

                    b.ToTable("HoaDon", (string)null);
                });

            modelBuilder.Entity("AppData.Models.KhachHang", b =>
                {
                    b.Property<Guid>("IDKhachHang")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DiaChi")
                        .HasColumnType("nvarchar(100)");

                    b.Property<int?>("DiemTich")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<int?>("GioiTinh")
                        .HasColumnType("int");

                    b.Property<DateTime?>("NgaySinh")
                        .HasColumnType("datetime");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(15)");

                    b.Property<string>("SDT")
                        .HasColumnType("varchar(10)");

                    b.Property<string>("Ten")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)");

                    b.Property<int?>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("IDKhachHang");

                    b.ToTable("KhachHang", (string)null);
                });

            modelBuilder.Entity("AppData.Models.KhuyenMai", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("GiaTri")
                        .HasColumnType("int");

                    b.Property<string>("MoTa")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("NgayApDung")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("NgayKetThuc")
                        .HasColumnType("datetime");

                    b.Property<string>("Ten")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("KhuyenMai", (string)null);
                });

            modelBuilder.Entity("AppData.Models.LichSuTichDiem", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Diem")
                        .HasColumnType("int");

                    b.Property<Guid>("IDHoaDon")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("IDKhachHang")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDQuyDoiDiem")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("IDHoaDon");

                    b.HasIndex("IDKhachHang");

                    b.HasIndex("IDQuyDoiDiem");

                    b.ToTable("LichSuTichDiem", (string)null);
                });

            modelBuilder.Entity("AppData.Models.LoaiSP", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("IDLoaiSPCha")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Ten")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("IDLoaiSPCha");

                    b.ToTable("LoaiSP", (string)null);
                });

            modelBuilder.Entity("AppData.Models.NhanVien", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("DiaChi")
                        .IsRequired()
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(20)");

                    b.Property<Guid>("IDVaiTro")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("PassWord")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SDT")
                        .IsRequired()
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Ten")
                        .IsRequired()
                        .HasColumnType("nvarchar(20)");

                    b.Property<int?>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("IDVaiTro");

                    b.ToTable("NhanVien", (string)null);
                });

            modelBuilder.Entity("AppData.Models.PhuongThucThanhToan", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Ten")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("PhuongThucThanhToan", (string)null);
                });

            modelBuilder.Entity("AppData.Models.QuyDoiDiem", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("SoDiem")
                        .HasColumnType("int");

                    b.Property<int>("TiLeTichDiem")
                        .HasColumnType("int");

                    b.Property<int>("TiLeTieuDiem")
                        .HasColumnType("int");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("QuyDoiDiem", (string)null);
                });

            modelBuilder.Entity("AppData.Models.SanPham", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDLoaiSP")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("MoTa")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Ten")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("IDLoaiSP");

                    b.ToTable("SanPham", (string)null);
                });

            modelBuilder.Entity("AppData.Models.ThuocTinh", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("NgayTao")
                        .HasColumnType("Datetime");

                    b.Property<string>("Ten")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("ThuocTinh", (string)null);
                });

            modelBuilder.Entity("AppData.Models.ThuocTinhSanPham", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDSanPham")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("IDThuocTinh")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("NgayLuu")
                        .HasColumnType("datetime2");

                    b.HasKey("ID");

                    b.HasIndex("IDSanPham");

                    b.HasIndex("IDThuocTinh");

                    b.ToTable("ThuocTinhSanPham", (string)null);
                });

            modelBuilder.Entity("AppData.Models.VaiTro", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Ten")
                        .IsRequired()
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("VaiTro", (string)null);
                });

            modelBuilder.Entity("AppData.Models.Voucher", b =>
                {
                    b.Property<Guid>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("GiaTri")
                        .HasColumnType("int");

                    b.Property<int>("HinhThucGiamGia")
                        .HasColumnType("int");

                    b.Property<string>("MoTa")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime>("NgayApDung")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("NgayKetThuc")
                        .HasColumnType("datetime");

                    b.Property<int>("SoLuong")
                        .HasColumnType("int");

                    b.Property<int>("SoTienCan")
                        .HasColumnType("int");

                    b.Property<string>("Ten")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("TrangThai")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("Voucher", (string)null);
                });

            modelBuilder.Entity("AppData.Models.AnhBienThe", b =>
                {
                    b.HasOne("AppData.Models.Anh", "Anh")
                        .WithMany("AnhBienThes")
                        .HasForeignKey("IdAnh")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppData.Models.BienThe", "BienThe")
                        .WithMany("BienTheAnhs")
                        .HasForeignKey("IdBienThe")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Anh");

                    b.Navigation("BienThe");
                });

            modelBuilder.Entity("AppData.Models.BienThe", b =>
                {
                    b.HasOne("AppData.Models.KhuyenMai", "KhuyenMai")
                        .WithMany("BienThes")
                        .HasForeignKey("IDKhuyenMai")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppData.Models.SanPham", "SanPham")
                        .WithMany("BienThes")
                        .HasForeignKey("IDSanPham")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("KhuyenMai");

                    b.Navigation("SanPham");
                });

            modelBuilder.Entity("AppData.Models.ChiTietBienThe", b =>
                {
                    b.HasOne("AppData.Models.BienThe", "BienThe")
                        .WithMany("ChiTietBienThes")
                        .HasForeignKey("IDBienThe")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppData.Models.GiaTri", "GiaTri")
                        .WithMany("ChiTietBienThes")
                        .HasForeignKey("IDGiaTri")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BienThe");

                    b.Navigation("GiaTri");
                });

            modelBuilder.Entity("AppData.Models.ChiTietGioHang", b =>
                {
                    b.HasOne("AppData.Models.BienThe", "BienThe")
                        .WithMany("ChiTietGioHangs")
                        .HasForeignKey("IDBienThe")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppData.Models.GioHang", "GioHang")
                        .WithMany("ChiTietGioHangs")
                        .HasForeignKey("IDNguoiDung")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BienThe");

                    b.Navigation("GioHang");
                });

            modelBuilder.Entity("AppData.Models.ChiTietHoaDon", b =>
                {
                    b.HasOne("AppData.Models.BienThe", "BienThe")
                        .WithMany("ChiTietHoaDons")
                        .HasForeignKey("IDBienThe")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppData.Models.HoaDon", "HoaDon")
                        .WithMany("ChiTietHoaDons")
                        .HasForeignKey("IDHoaDon")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BienThe");

                    b.Navigation("HoaDon");
                });

            modelBuilder.Entity("AppData.Models.ChiTietPTTT", b =>
                {
                    b.HasOne("AppData.Models.HoaDon", "HoaDon")
                        .WithMany("ChiTietPTTTs")
                        .HasForeignKey("IDHoaDon")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppData.Models.PhuongThucThanhToan", "PhuongThucThanhToan")
                        .WithMany("ChiTietPTTTs")
                        .HasForeignKey("IDPTTT")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("HoaDon");

                    b.Navigation("PhuongThucThanhToan");
                });

            modelBuilder.Entity("AppData.Models.DanhGia", b =>
                {
                    b.HasOne("AppData.Models.BienThe", "BienThe")
                        .WithMany("DanhGias")
                        .HasForeignKey("IDBienThe")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppData.Models.KhachHang", "KhachHang")
                        .WithMany("DanhGias")
                        .HasForeignKey("IDKhachHang")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BienThe");

                    b.Navigation("KhachHang");
                });

            modelBuilder.Entity("AppData.Models.GiaTri", b =>
                {
                    b.HasOne("AppData.Models.ThuocTinh", "ThuocTinh")
                        .WithMany("GiaTris")
                        .HasForeignKey("IdThuocTinh")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ThuocTinh");
                });

            modelBuilder.Entity("AppData.Models.HoaDon", b =>
                {
                    b.HasOne("AppData.Models.NhanVien", "NhanVien")
                        .WithMany("HoaDons")
                        .HasForeignKey("IDNhanVien");

                    b.HasOne("AppData.Models.Voucher", "Voucher")
                        .WithMany("HoaDons")
                        .HasForeignKey("IDVoucher");

                    b.Navigation("NhanVien");

                    b.Navigation("Voucher");
                });

            modelBuilder.Entity("AppData.Models.KhachHang", b =>
                {
                    b.HasOne("AppData.Models.GioHang", "GioHang")
                        .WithOne("KhachHang")
                        .HasForeignKey("AppData.Models.KhachHang", "IDKhachHang")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GioHang");
                });

            modelBuilder.Entity("AppData.Models.LichSuTichDiem", b =>
                {
                    b.HasOne("AppData.Models.HoaDon", "HoaDon")
                        .WithMany("LichSuTichDiems")
                        .HasForeignKey("IDHoaDon")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppData.Models.KhachHang", "KhachHang")
                        .WithMany("LichSuTichDiems")
                        .HasForeignKey("IDKhachHang");

                    b.HasOne("AppData.Models.QuyDoiDiem", "QuyDoiDiem")
                        .WithMany("LichSuTichDiems")
                        .HasForeignKey("IDQuyDoiDiem")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("HoaDon");

                    b.Navigation("KhachHang");

                    b.Navigation("QuyDoiDiem");
                });

            modelBuilder.Entity("AppData.Models.LoaiSP", b =>
                {
                    b.HasOne("AppData.Models.LoaiSP", "LoaiSPCha")
                        .WithMany()
                        .HasForeignKey("IDLoaiSPCha");

                    b.Navigation("LoaiSPCha");
                });

            modelBuilder.Entity("AppData.Models.NhanVien", b =>
                {
                    b.HasOne("AppData.Models.VaiTro", "VaiTro")
                        .WithMany("NhanViens")
                        .HasForeignKey("IDVaiTro")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("VaiTro");
                });

            modelBuilder.Entity("AppData.Models.SanPham", b =>
                {
                    b.HasOne("AppData.Models.LoaiSP", "LoaiSP")
                        .WithMany("SanPhams")
                        .HasForeignKey("IDLoaiSP")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LoaiSP");
                });

            modelBuilder.Entity("AppData.Models.ThuocTinhSanPham", b =>
                {
                    b.HasOne("AppData.Models.SanPham", "SanPham")
                        .WithMany("ThuocTinhSanPhams")
                        .HasForeignKey("IDSanPham")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AppData.Models.ThuocTinh", "ThuocTinh")
                        .WithMany("ThuocTinhLoaiSPs")
                        .HasForeignKey("IDThuocTinh")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SanPham");

                    b.Navigation("ThuocTinh");
                });

            modelBuilder.Entity("AppData.Models.Anh", b =>
                {
                    b.Navigation("AnhBienThes");
                });

            modelBuilder.Entity("AppData.Models.BienThe", b =>
                {
                    b.Navigation("BienTheAnhs");

                    b.Navigation("ChiTietBienThes");

                    b.Navigation("ChiTietGioHangs");

                    b.Navigation("ChiTietHoaDons");

                    b.Navigation("DanhGias");
                });

            modelBuilder.Entity("AppData.Models.GiaTri", b =>
                {
                    b.Navigation("ChiTietBienThes");
                });

            modelBuilder.Entity("AppData.Models.GioHang", b =>
                {
                    b.Navigation("ChiTietGioHangs");

                    b.Navigation("KhachHang");
                });

            modelBuilder.Entity("AppData.Models.HoaDon", b =>
                {
                    b.Navigation("ChiTietHoaDons");

                    b.Navigation("ChiTietPTTTs");

                    b.Navigation("LichSuTichDiems");
                });

            modelBuilder.Entity("AppData.Models.KhachHang", b =>
                {
                    b.Navigation("DanhGias");

                    b.Navigation("LichSuTichDiems");
                });

            modelBuilder.Entity("AppData.Models.KhuyenMai", b =>
                {
                    b.Navigation("BienThes");
                });

            modelBuilder.Entity("AppData.Models.LoaiSP", b =>
                {
                    b.Navigation("SanPhams");
                });

            modelBuilder.Entity("AppData.Models.NhanVien", b =>
                {
                    b.Navigation("HoaDons");
                });

            modelBuilder.Entity("AppData.Models.PhuongThucThanhToan", b =>
                {
                    b.Navigation("ChiTietPTTTs");
                });

            modelBuilder.Entity("AppData.Models.QuyDoiDiem", b =>
                {
                    b.Navigation("LichSuTichDiems");
                });

            modelBuilder.Entity("AppData.Models.SanPham", b =>
                {
                    b.Navigation("BienThes");

                    b.Navigation("ThuocTinhSanPhams");
                });

            modelBuilder.Entity("AppData.Models.ThuocTinh", b =>
                {
                    b.Navigation("GiaTris");

                    b.Navigation("ThuocTinhLoaiSPs");
                });

            modelBuilder.Entity("AppData.Models.VaiTro", b =>
                {
                    b.Navigation("NhanViens");
                });

            modelBuilder.Entity("AppData.Models.Voucher", b =>
                {
                    b.Navigation("HoaDons");
                });
#pragma warning restore 612, 618
        }
    }
}
