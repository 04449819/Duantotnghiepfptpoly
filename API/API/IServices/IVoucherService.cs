using ShopOnlineModel.Entities;

namespace API.IServices
{
    public interface IVoucherService
    {
        //public bool Add(VoucherView voucherview);
        //public bool Update(Guid id, VoucherView voucherview);
        public bool Delete(Guid Id);
        public Voucher GetById(Guid Id);
        public List<Voucher> GetAll();
        public Voucher? GetVoucherByMa(string ma);
        public List<Voucher> GetAllVoucherByTien(int tongTien);
    }
}
