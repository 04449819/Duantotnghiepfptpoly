using ShopOnlineModel.Entities;

namespace API.IServices
{
    public interface IKhuyenMaiService
    {
        //public bool Add(KhuyenMaiView kmv);
        public bool AdKMVoBT(List<Guid> btrequest, Guid IdKhuyenMai);

        public bool XoaAllKMRaBT(List<Guid> bienthes);


        //public bool Update(KhuyenMaiView kmv);
        public bool Delete(Guid Id);

        public KhuyenMai GetById(Guid Id);
        public List<KhuyenMai> GetAll();

        public List<KhuyenMai> GetKMByName(string Ten);
    }
}
