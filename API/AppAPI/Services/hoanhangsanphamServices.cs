using AppAPI.IServices;
using AppData.Models;
using AppData.ViewModels;
using AppData.ViewModels.BanOffline;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AppAPI.Services
{
    public class hoanhangsanphamServices : IhoanhangsanphamServices
    {
        private readonly AssignmentDBContext _context;
        public hoanhangsanphamServices()
        {
            _context = new AssignmentDBContext();
        }

        public async Task<Hoanhangsanpham> CreateAsync(hoanhangviewmodel viewModel)
        {
            // Find ChiTietHoaDon based on ID
            var chiTietHoaDon = await _context.ChiTietHoaDons.FindAsync(viewModel.IdChiTietHoaDon);
            if (chiTietHoaDon == null)
            {
                throw new InvalidOperationException("Chi tiết hóa đơn không tìm thấy.");
            }

            // Check the quantity of the return
            if (viewModel.SoLuong <= 0)
            {
                throw new InvalidOperationException("Số lượng hoàn hàng phải lớn hơn 0.");
            }

            // Find the associated HoaDon
            var hoaDon = await _context.HoaDons.FindAsync(chiTietHoaDon.IDHoaDon);
            if (hoaDon == null)
            {
                throw new InvalidOperationException("Hóa đơn không tìm thấy.");
            }

            var daHoanHang = await _context.Hoanhangsanphams
					 .Where(hh => hh.ChiTietHoaDon.ID == chiTietHoaDon.ID && hh.TrangThaiHoanHang == 1)
                       .SumAsync(hh => hh.SoLuong);


            // Calculate total quantity returned
            var totalReturnedQuantity = await _context.Hoanhangsanphams
				.Where(hh => hh.ChiTietHoaDon.ID == chiTietHoaDon.ID )
                .SumAsync(hh => hh.SoLuong);

            // Check if the quantity to be returned is valid
            if (totalReturnedQuantity + viewModel.SoLuong > chiTietHoaDon.SoLuong)
            {
                throw new InvalidOperationException("Số lượng hoàn hàng vượt quá số lượng còn lại.");
            }

            // Find existing return record
            var existingReturn = await _context.Hoanhangsanphams
				.FirstOrDefaultAsync(hh => hh.ChiTietHoaDon.ID == chiTietHoaDon.ID && hh.TrangThaiHoanHang == 1);

            if (existingReturn != null)
            {
                // Update existing return record
                existingReturn.SoLuong += viewModel.SoLuong;
                existingReturn.Mota = viewModel.MoTa; // Update description if needed
                existingReturn.Ngayhoanhang = DateTime.UtcNow; // Update return date
                _context.Hoanhangsanphams.Update(existingReturn);
            }
            else
            {
                // Create a new return record
                var diaChiKhachHang = hoaDon.DiaChi; // Customer address from HoaDon

                var hoanhangsanpham = new Hoanhangsanpham
                {
                    ID = Guid.NewGuid(),
                    ChiTietHoaDon = chiTietHoaDon,
                    Diachikhachhang = diaChiKhachHang,
                    SoLuong = viewModel.SoLuong,
                    Ngayhoanhang = DateTime.UtcNow,
                    Mota = viewModel.MoTa,
                    TrangThaiHoanHang = 1
                };

                await _context.Hoanhangsanphams.AddAsync(hoanhangsanpham);
            }


            // Update the delivery status of the invoice if necessary
            hoaDon.TrangThaiGiaoHang = 9;

            // Save changes
            await _context.SaveChangesAsync();

            // Return the updated or newly created return record
            return existingReturn ?? await _context.Hoanhangsanphams
				.FirstOrDefaultAsync(hh => hh.ChiTietHoaDon.ID == chiTietHoaDon.ID && hh.TrangThaiHoanHang == 1);
        }

        public async Task<IEnumerable<Hoanhangsanpham>> GetAllAsync()
        {
            return await _context.Hoanhangsanphams.ToArrayAsync();

        }

        //public async Task<IActionResult> GetReturnedProductsByInvoiceIdAsync(Guid invoiceId)
        //{
        //    var productReturns = await _context.ChiTietHoaDons
        //        .Where(cthd => cthd.ID == invoiceId)
        //        .Select(cthd => new
        //        {
        //            ChiTietHoaDonId = cthd.ID,
        //            SanPhamId = cthd.ChiTietSanPham.IDSanPham,
        //            TenSanPham = cthd.ChiTietSanPham.SanPham.Ten,
        //            AnhSanPham = _context.Anhs
        //                .Where(a => a.IDChitietsanpham == cthd.ChiTietSanPham.ID)
        //                .Select(a => a.DuongDan)
        //                .FirstOrDefault(),
        //            MauSac = cthd.ChiTietSanPham.MauSac.Ten,
        //            KichCo = cthd.ChiTietSanPham.KichCo.Ten,
        //            DonGia = cthd.DonGia,
        //            SoLuong = cthd.SoLuong,
        //            // Thông tin hoàn hàng
        //            HoanHangDetails = _context.hoanhangsanphams
        //                .Where(hhsp => hhsp.ID == cthd.ID) // Sửa đây để lọc theo IDChiTietHoaDon
        //                .Select(hhsp => new
        //                {
        //                    hhsp.ID,
        //                    hhsp.SoLuong,
        //                    hhsp.Diachikhachhang,
        //                    hhsp.Ngayhoanhang,
        //                    hhsp.Mota,
        //                    TrangThaiHoanHang = hhsp.TrangThaiHoanHang
        //                })
        //                .ToList() // Lấy danh sách hoàn hàng liên quan
        //        })
        //        .ToListAsync(); // Sửa để trả về danh sách

          
        //    return Ok(productReturns);
        //}


        public async Task<Hoanhangsanpham> UpdateStatusAsync(Guid id, int newStatus)
        {
            var trangthai = await _context.Hoanhangsanphams.FindAsync(id);
            if (trangthai != null)
            {
                trangthai.TrangThaiHoanHang = newStatus;
                _context.Hoanhangsanphams.Update(trangthai);
                await _context.SaveChangesAsync();
            }
            return trangthai;
        }

        public async Task<List<ChiTietSanPham>> GetReturnedProductsByInvoiceIdAsync(Guid invoiceId)
        {
            var returnedProducts = await _context.ChiTietHoaDons
                .Where(cthd => cthd.ID == invoiceId) // Lọc theo IDChiTietHoaDon
                .SelectMany(cthd => _context.Hoanhangsanphams.Where(hhsp => hhsp.ChiTietHoaDon.ID == cthd.ID) // Lọc hoàn hàng theo ChiTietHoaDon
                    .Select(hhsp => new ChiTietSanPham
                    {
                        ID = cthd.ChiTietSanPham.ID,
                        Ma = cthd.ChiTietSanPham.Ma,
                        SoLuong = cthd.ChiTietSanPham.SoLuong,
                        GiaBan = cthd.ChiTietSanPham.GiaBan,
                        NgayTao = cthd.ChiTietSanPham.NgayTao,
                        TrangThai = cthd.ChiTietSanPham.TrangThai,
                        IDSanPham = cthd.ChiTietSanPham.IDSanPham,
                        IDMauSac = cthd.ChiTietSanPham.IDMauSac,
                        IDKichCo = cthd.ChiTietSanPham.IDKichCo,
                        // Lấy thông tin của sản phẩm hoàn hàng
                        Anhs = _context.Anhs
                            .Where(a => a.IDChitietsanpham == cthd.ChiTietSanPham.ID)
                            .ToList(),
                        KichCo = cthd.ChiTietSanPham.KichCo,
                        MauSac = cthd.ChiTietSanPham.MauSac
                    })
                )
                .Distinct() // Đảm bảo không có sản phẩm trùng lặp
                .ToListAsync();

            if (returnedProducts == null || !returnedProducts.Any())
            {
                throw new KeyNotFoundException("Không tìm thấy sản phẩm hoàn hàng cho hóa đơn này.");
            }

            return returnedProducts;
        }

    }
}
