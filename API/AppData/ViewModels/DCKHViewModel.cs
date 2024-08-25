using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
    public class DCKHViewModel
    {
        public Guid KhachHangID { get; set; }

        public string tenKhachHang { get; set; }
        public string sdt { get; set; }
        public string DiaChi { get; set; }

        public int TrangThai { get; set; }
    }
}
