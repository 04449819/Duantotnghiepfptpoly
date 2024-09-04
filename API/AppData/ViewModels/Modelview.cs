using AppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
    public class Modelview
    {
        public ChiTietHoaDon ChiTietHoaDon { get; set; }
        public ChiTietSanPham ChiTietSanPham { get; set; }
        public SanPhamDetail SanPham { get; set; }
        public IEnumerable<Anh> Anhs { get; set; } // Thêm thông tin về ảnh
    }
}
