using AppData.Models;
using AppData.ViewModels;

namespace AppAPI.IServices
{
    public interface IQuyDoiDiemServices
    {
        public bool Add(QuyDoiDiemView quyDoi);
        public bool Update(Guid Id,  QuyDoiDiemView quyDoi);
        public bool Delete(Guid Id);
        public QuyDoiDiem GetById(Guid Id);
        public List<QuyDoiDiem> GetAll();
        public QuyDoiDiem GetApplicableQuyDoiDiem();
    }
}
