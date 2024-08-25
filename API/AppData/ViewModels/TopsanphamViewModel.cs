using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
    public class TopsanphamViewModel
    {
        public Guid IdSanPham { get; set; }
        public string TenSP { get; set; }
        public int SoLuong { get; set; }
        public decimal Gia { get; set; }
        public decimal DoanhThu { get; set; }

        // URL or path to the image
        public string? HinhAnhUrl { get; set; }
    }
}
