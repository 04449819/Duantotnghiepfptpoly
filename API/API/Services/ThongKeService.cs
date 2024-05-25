using API.IServices;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;
using ShopOnlineModel.Repositories;
using ShopOnlineModel.Repositories.Contracts;

namespace API.Services
{
    public class ThongKeService : IThongKeService
    {

        private readonly IAllRepository<HoaDon> repos;
        ShopOnlineDBContext context = new ShopOnlineDBContext();
        public ThongKeService()
        {
            repos = new AllRepository<HoaDon>(context, context.HoaDons);
        }
        public decimal DoanhThuNam(int year)
        {
            var nam = context.HoaDons.Where(hd => hd.NgayTao.Year == year).ToList();
            decimal total = nam.Sum(hd => hd.TienShip);
            return total;
        }

        public decimal DoanhThuNgay(DateTime date)
        {
            var ngay = context.HoaDons.Where(hd => hd.NgayTao.Date == date.Date).ToList();
            decimal total = ngay.Sum(hd => hd.TienShip);
            return total;
        }

        public decimal DoanhThuThang(int month, int year)
        {
            var thang = context.HoaDons.Where(hd => hd.NgayTao.Month == month && hd.NgayTao.Year == year).ToList();
            decimal total = thang.Sum(hd => hd.TienShip);
            return total;
        }
    }
}
