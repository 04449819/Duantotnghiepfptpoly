using AppData.Models;
using AppData.ViewModels;

namespace AppAPI.IServices
{
    public interface IKhachHangService
    {
        Task<KhachHang> Add(KhachHangViewModel nv);
        public KhachHang GetById(Guid id);
     


        public KhachHang GetBySDT(string sdt);
        //End
        public bool Delete(Guid id);
        public bool Update(KhachHang khachHang);

        public Task<List<KhachHangView>> GetAll();

        public Task< (List<KhachHangView>, int)> GetAll(int pageIndex, int pageSize);

        public Task<List<HoaDon>> GetAllHDKH(Guid idkh);

        public List<KhachHang> GetKMByName(string Ten);


    }
}
