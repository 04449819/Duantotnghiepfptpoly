using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels.BanOffline
{
    public class UpdateHoaDonDto
    {
        public string? TenKhachHang { get; set; }
        public string? SDT { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public bool? isGiaoHang { get; set; }
        public int TienShip { get; set; }
        public Guid IdPhuongThucThanhToan { get; set; }
        public string? GhiChu { get; set; }
        public Guid? IdKhachHang { get; set; }
        public Guid? IdVoucher { get; set; }
        public int? SoDiemSuDung { get; set; }
        public int TrangThaiGiaoHang { get; set; }
        public List<ChiTietHoaDonDTO> SanPhams { get; set; }
        public int? TongTienHoaDon { get; set; } // Tổng tiền của hóa đơn 
    }

    public class ChiTietHoaDonDTO
    {
        public Guid IDCTSP { get; set; }
        public int SoLuongMua { get; set; }
        public int? DonGia { get; set; }
    }

}
