using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppData.ViewModels
{
    public class Danhgiamodel
    {

        public string? BinhLuan { get; set; } // Nội dung bình luận

        [Range(1, 5, ErrorMessage = "Số sao từ 1 đến 5")]
        public int? Sao { get; set; } // Số sao đánh giá

        public DateTime? NgayDanhGia { get; set; } // Ngày đánh giá

        public string? PhanHoi { get; set; } // Phản hồi từ người khác (nếu có)

        public int TrangThai { get; set; } // Trạng thái đánh giá (ví dụ: chưa xử lý, đã xử lý, v.v.)
        public Guid IDcthd { get; set; }


    }
}
