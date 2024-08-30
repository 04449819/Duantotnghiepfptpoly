using AppData.Models;

namespace AppAPI.IServices
{
    public interface IPhuongThucThanhToanService
    {
        public PhuongThucThanhToan GetPTTTByIdHoaDon(Guid idHoaDon);
    }
}
