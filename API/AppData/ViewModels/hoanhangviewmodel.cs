using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
    public class hoanhangviewmodel
    {
        public int SoLuong { get; set; }
        public string DiaChiKhachHang { get; set; }
        public DateTime NgayHoanHang { get; set; }
        public string MoTa { get; set; }
        public Guid IdChiTietHoaDon { get; set; }
    }
}
