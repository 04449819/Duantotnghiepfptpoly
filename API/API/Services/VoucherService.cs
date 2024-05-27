using API.IServices;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;
using ShopOnlineModel.Repositories;
using ShopOnlineModel.Repositories.Contracts;

namespace API.Services
{
    public class VoucherService : IVoucherService
    {
        private readonly IAllRepository<Voucher> repos;
        ShopOnlineDBContext context = new ShopOnlineDBContext();
        public VoucherService()
        {
            repos = new AllRepository<Voucher>(context, context.Vouchers);
        }
        public bool Delete(Guid Id)
        {
            var voucher = repos.GetAll().FirstOrDefault(x => x.ID == Id);
            if (voucher != null)
            {

                return repos.Delete(voucher);
            }
            else
            {
                return false;
            }
        }

        public List<Voucher> GetAll()
        {
            return repos.GetAll();
        }

        public List<Voucher> GetAllVoucherByTien(int tongTien)
        {
            return repos.GetAll().Where(x => x.NgayApDung < DateTime.Now && x.NgayKetThuc > DateTime.Now && x.SoTienCan < tongTien && x.TrangThai > 0 && x.SoLuong > 0).ToList();
        }

        public Voucher GetById(Guid Id)
        {
            return repos.GetAll().FirstOrDefault(x => x.ID == Id);
        }

        public Voucher? GetVoucherByMa(string ma)
        {
            return repos.GetAll().FirstOrDefault(x => x.Ten.ToUpper() == ma.ToUpper());
        }
    }
}
