using API.IServices;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;
using ShopOnlineModel.Repositories;
using ShopOnlineModel.Repositories.Contracts;

namespace API.Services
{
    public class KhuyenMaiService : IKhuyenMaiService
    {
        private readonly IAllRepository<KhuyenMai> repos;
        private readonly IAllRepository<ChiTietSanPham> reposCTSP;
        private readonly IAllRepository<SanPham> reposSP;
        private readonly IAllRepository<MauSac> reposMS;
        private readonly IAllRepository<KichCo> reposSize;
        ShopOnlineDBContext context = new ShopOnlineDBContext();
        public KhuyenMaiService()
        {
            repos = new AllRepository<KhuyenMai>(context, context.KhuyenMais);
            reposCTSP = new AllRepository<ChiTietSanPham>(context, context.ChiTietSanPhams);
            reposSP = new AllRepository<SanPham>(context, context.SanPhams);
            reposMS = new AllRepository<MauSac>(context, context.MauSacs);
            reposSize = new AllRepository<KichCo>(context, context.KichCos);
        }
        public bool AdKMVoBT(List<Guid> btrequest, Guid IdKhuyenMai)
        {
            foreach (var km in btrequest)
            {
                var timidkm = repos.GetAll().FirstOrDefault(x => x.ID == IdKhuyenMai);
                if (timidkm.NgayKetThuc < DateTime.Now)
                {
                    return false;
                }
                else
                {
                    var tim = reposCTSP.GetAll().FirstOrDefault(x => x.ID == km);
                    if (tim != null)
                    {
                        tim.IDKhuyenMai = IdKhuyenMai;
                        reposCTSP.Update(tim);
                    }
                }

            }
            return true;
        }

        public bool Delete(Guid Id)
        {
            var khuyenmai = repos.GetAll().FirstOrDefault(x => x.ID == Id);
            if (khuyenmai != null)
            {

                return repos.Delete(khuyenmai);
            }
            else
            {
                return false;
            }
        }

        public List<KhuyenMai> GetAll()
        {
            return repos.GetAll();
        }

        public KhuyenMai GetById(Guid Id)
        {
            return repos.GetAll().FirstOrDefault(x => x.ID == Id);
        }

        public List<KhuyenMai> GetKMByName(string Ten)
        {
            return repos.GetAll().Where(x => x.Ten.Contains(Ten)).ToList();
        }

        public bool XoaAllKMRaBT(List<Guid> bienthes)
        {
            foreach (var km in bienthes)
            {

                var tim = reposCTSP.GetAll().FirstOrDefault(x => x.ID == km);
                if (tim != null)
                {
                    tim.IDKhuyenMai = null;
                    reposCTSP.Update(tim);
                }


            }
            return true;
        }
    }
}
