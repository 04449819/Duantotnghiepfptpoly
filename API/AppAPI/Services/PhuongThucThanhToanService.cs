using AppAPI.IServices;
using AppData.IRepositories;
using AppData.Models;
using AppData.Repositories;

namespace AppAPI.Services
{
    public class PhuongThucThanhToanService : IPhuongThucThanhToanService
    {
        private readonly IAllRepository<PhuongThucThanhToan> _allRepository;
        private readonly IAllRepository<HoaDon> _reposHoaDon;
        AssignmentDBContext context = new AssignmentDBContext();
        public PhuongThucThanhToanService()
        {
            _allRepository = new AllRepository<PhuongThucThanhToan>(context,context.phuongThucThanhToans);
            _reposHoaDon = new AllRepository<HoaDon>(context,context.HoaDons);
        }
        public PhuongThucThanhToan GetPTTTByIdHoaDon(Guid idHoaDon)
        {
            var hoaDonPTTID =  _reposHoaDon.GetById(idHoaDon).phuongThucTTID;
            var pttt = _allRepository.GetById(hoaDonPTTID);
            return pttt;
        }
    }
}
