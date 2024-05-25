using API.IServices;
using Microsoft.EntityFrameworkCore;
using ShopOnlineModel.Data;
using ShopOnlineModel.Entities;

namespace API.Services
{
    public class VaiTroService : IVaiTroService
    {
        private readonly ShopOnlineDBContext _context;
        public VaiTroService(ShopOnlineDBContext context)
        {
            _context = context;
        }
        public bool CreateVaiTro(string ten, int trangthai)
        {
            try
            {
                var vaitro = new VaiTro();
                vaitro.ID = Guid.NewGuid();
                vaitro.Ten = ten;
                vaitro.TrangThai = trangthai;
                _context.VaiTros.Add(vaitro);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool DeleteVaiTro(Guid id)
        {
            try
            {
                var vt = _context.VaiTros.FirstOrDefault(a => a.ID == id);
                if (vt != null)
                {
                    _context.VaiTros.Remove(vt);
                    return true;
                }
                return false;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<VaiTro> GetAllVaiTro()
        {
            try
            {
                return _context.VaiTros.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public VaiTro GetVaiTroById(Guid id)
        {
            try
            {
                return _context.VaiTros.FirstOrDefault(x => x.ID == id);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool UpdateVaiTro(Guid id, string ten, int trangthai)
        {
            try
            {
                var vaitro = _context.VaiTros.FirstOrDefault(a => a.ID == id);
                if (vaitro == null)
                {
                    return false;
                }
                else
                {
                    vaitro.Ten = ten;
                    vaitro.TrangThai = trangthai;
                    _context.VaiTros.Update(vaitro);
                    _context.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
