using AppAPI.IServices;
using AppData.IRepositories;
using AppData.Models;
using AppData.Repositories;
using AppData.ViewModels;

namespace AppAPI.Services
{
    public class QuyDoiDiemServices : IQuyDoiDiemServices
    {
        private readonly IAllRepository<QuyDoiDiem> _allRepository;
        AssignmentDBContext context = new AssignmentDBContext();
        public QuyDoiDiemServices()
        {
            _allRepository = new AllRepository<QuyDoiDiem>(context, context.QuyDoiDiems);
        }
        public bool Add(QuyDoiDiemView quyDoi)
        {
            var  quyDoiDiem = new QuyDoiDiem
            {
                ID = Guid.NewGuid(),
                TiLeTichDiem = quyDoi.TiLeTichDiem,
                TiLeTieuDiem = quyDoi.TiLeTieuDiem,
                ngayBatDau = quyDoi.NgayBatDau,
                ngayKetThuc = quyDoi.NgayKetThuc,
                TrangThai = quyDoi.TrangThai,
            };
            if(quyDoiDiem.ngayBatDau > quyDoiDiem.ngayKetThuc) 
            {
                return false; 
            }

            return _allRepository.Add(quyDoiDiem);
        }

        public bool Delete(Guid Id)
        {
            var quydoidiem = _allRepository.GetAll().FirstOrDefault(x => x.ID == Id);
            if (quydoidiem != null)
            {
               
                return _allRepository.Delete(quydoidiem);
            }
            else
            {
                return false;
            }
        }

        public List<QuyDoiDiem> GetAll()
        {
           return _allRepository.GetAll();
        }

        public QuyDoiDiem GetApplicableQuyDoiDiem()
        {
            return _allRepository.GetAll().FirstOrDefault(x => x.TrangThai == 1);
        }

        public QuyDoiDiem GetById(Guid Id)
        {
            return _allRepository.GetAll().FirstOrDefault(x => x.ID == Id);
        }

        public bool Update(Guid Id, QuyDoiDiemView quyDoi)
        {
            var quydoidiem= _allRepository.GetAll().FirstOrDefault(x => x.ID == Id);
            if(quydoidiem != null)
            {

                quydoidiem.TiLeTichDiem = quyDoi.TiLeTichDiem;
                quydoidiem.TiLeTieuDiem = quyDoi.TiLeTieuDiem;
                quydoidiem.ngayBatDau = quyDoi.NgayBatDau;
                quydoidiem.ngayKetThuc = quyDoi.NgayKetThuc;
                quydoidiem.TrangThai = quyDoi.TrangThai;
                
                if(quydoidiem.ngayBatDau > quydoidiem.ngayKetThuc)
                {
                    return false;
                }
                return _allRepository.Update(quydoidiem);
            }
            else
            {
                return false;
            }
        }
    }
}
