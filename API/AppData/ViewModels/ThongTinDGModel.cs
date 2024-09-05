using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
    public class ThongTinDGModel
    {
        public Guid DanhGiaId { get; set; }
        public string BinhLuan { get; set; }
        public int Sao { get; set; }
        public DateTime NgayDanhGia { get; set; }
        public string PhanHoi { get; set; }
        public int TrangThaiDanhGia { get; set; }
        public Guid KhachHangId { get; set; }
        public string KhachHangTen { get; set; }
    }
}

