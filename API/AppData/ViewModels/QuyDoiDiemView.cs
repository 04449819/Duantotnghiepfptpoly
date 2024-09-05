using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
    public class QuyDoiDiemView
    {
        public Guid Id { get; set; }
        public int TiLeTichDiem { get; set; }
        public int TiLeTieuDiem { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime? NgayKetThuc { get; set; }
        public int TrangThai { get; set; }
    }
}
