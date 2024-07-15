using AppAPI.IServices;
using AppData.Models;
using Microsoft.EntityFrameworkCore;

namespace AppAPI.Services
{
    public class QlThuocTinhService : IQlThuocTinhService
    {
        private readonly
        AssignmentDBContext _dbContext;
        public QlThuocTinhService()
        {
            _dbContext = new AssignmentDBContext();
        }
		#region coAo
		public async Task<List<CoAo>> GetAllCoAo()
		{
			return await _dbContext.CoAos.OrderByDescending(c => c.trangThai).ToListAsync();
		}

		public async Task<List<CoAo>> GetAllCoAobyName(string name)
		{
			return await _dbContext.CoAos.Where( p=> p.ten.Contains(name)).ToListAsync();
		}

		public async Task<int> DeleteCoAo(Guid id)
		{
			try
			{
				var check = await _dbContext.SanPhams.FirstOrDefaultAsync(x => x.idCoAo == id);
				if (check != null) return 0;
				var nv = await _dbContext.CoAos.FirstOrDefaultAsync(nv => nv.Id == id);
				if (nv != null)
				{
					_dbContext.CoAos.Remove(nv);
					_dbContext.SaveChanges();
					return 1;
				}
				return 2;
			}
			catch (Exception)
			{

				throw;
			}
		}

		public async Task<CoAo> AddCoAo(string ten, int trangthai)
		{
			try
			{
				var existingColor = await _dbContext.CoAos.FirstOrDefaultAsync(x => x.ten.Trim().ToUpper() == ten.Trim().ToUpper());
				if (existingColor != null)
				{
					return null;
				}
				CoAo kc = new CoAo()
				{
					Id = Guid.NewGuid(),
					ten = ten.ToUpper(),
					trangThai = trangthai
				};
				_dbContext.CoAos.Add(kc);
				_dbContext.SaveChanges();
				return kc;
			}
			catch (Exception)
			{

				throw;
			}
		}

		public async Task<CoAo> UpdateCoAo(Guid id, string ten, int trangthai)
		{
			try
			{
				var nv = await _dbContext.CoAos.FirstOrDefaultAsync(x => x.Id == id);
				if (nv != null)
				{
					if (nv.ten.ToLower().Trim() == ten.ToLower().Trim())
					{
						nv.ten = ten.ToUpper();
						nv.trangThai = trangthai;
					}
					else
					{
						var existingColor = await _dbContext.CoAos.FirstOrDefaultAsync(x => x.ten.Trim().ToUpper() == ten.Trim().ToUpper());
						if (existingColor != null)
						{
							return null; // Trả về null để báo hiệu tên trùng
						}
						nv.ten = ten.ToUpper();
						nv.trangThai = trangthai;
					}
					_dbContext.CoAos.Update(nv);
					_dbContext.SaveChanges();
					return nv;
				}

				return null;
			}
			catch (Exception)
			{

				throw;
			}
		}
		#endregion
		#region KichCo
		public async Task<KichCo> AddKichCo(string ten, int trangthai)
        {
            try
            {
                var existingColor = await _dbContext.KichCos.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == ten.Trim().ToUpper());
                if (existingColor != null)
                {
                    return null;
                }
                KichCo kc = new KichCo()
                {
                    ID = Guid.NewGuid(),
                    Ten = ten.ToUpper(),
                    TrangThai = trangthai
				};
                _dbContext.KichCos.Add(kc);
                _dbContext.SaveChanges();
                return kc;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<int> DeleteKichCo(Guid id)
        {
            try
            {
				var check = await _dbContext.ChiTietSanPhams.FirstOrDefaultAsync(p => p.IDKichCo == id);
				if (check != null) return 0;
				var nv = await _dbContext.KichCos.FirstOrDefaultAsync(nv => nv.ID == id);
                if (nv != null)
                {
                    _dbContext.KichCos.Remove(nv);
                    _dbContext.SaveChanges();
                    return 1;
                }
                return 2;
            }
            catch (Exception) { throw; }
        }
        public async Task<KichCo> UpdateKichCo(Guid id, string ten, int trangthai)
        {
            try
            {
                var nv = await _dbContext.KichCos.FirstOrDefaultAsync(x => x.ID == id);
                if (nv != null)
                {
					if(nv.Ten.ToLower().Trim() == ten.ToLower().Trim())
					{
						nv.Ten = ten.ToUpper();
						nv.TrangThai = trangthai;
					}
					else
					{
						var existingColor = await _dbContext.KichCos.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == ten.Trim().ToUpper());
						if (existingColor != null)
						{
							return null; // Trả về null để báo hiệu tên trùng
						}
						nv.Ten = ten.ToUpper();
						nv.TrangThai = trangthai;
					}
                    _dbContext.KichCos.Update(nv);
                    _dbContext.SaveChanges();
                    return nv;
                }

                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public async Task<List<KichCo>> GetAllKichCo()
        {
            try
            {
                return await _dbContext.KichCos.OrderByDescending(x => x.TrangThai).ToListAsync();
            }
            catch (Exception) { throw; }
        }
        public async Task<KichCo> GetKickCoById(Guid id)
        {
            var nv = await _dbContext.KichCos.FirstOrDefaultAsync(nv => nv.ID == id);
            return nv;
        }

        #endregion MauSac
        public async Task<MauSac> AddMauSac(string ten, string ma, int trangthai)
        {
            try
            {
                var existingColor = await _dbContext.MauSacs.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == ten.Trim().ToUpper());
                if (existingColor != null)
                {
                    return null;
                }
                MauSac kc = new MauSac()
                {
                    ID = Guid.NewGuid(),
                    Ten = ten.ToUpper(),
                    Ma = ma,
                    TrangThai = trangthai,
                };
                _dbContext.MauSacs.Add(kc);
                _dbContext.SaveChanges();
                return kc;
            }
            catch (Exception)
            {
                throw;
            }
        }
        public async Task<int> DeleteMauSac(Guid id)
        {
            try
            {
                var check = await _dbContext.ChiTietSanPhams.FirstOrDefaultAsync( p => p.IDMauSac == id);
				if(check != null)  return 0;

				var nv = await _dbContext.MauSacs.FirstOrDefaultAsync(nv => nv.ID == id);
                if (nv != null)
                {
                    _dbContext.MauSacs.Remove(nv);
                    _dbContext.SaveChanges();
                    return 1;
                }
                return 2;
            }
            catch (Exception)
            {

                throw;

            }
        }

        public async Task<List<MauSac>> GetAllMauSac()
        {
            try
            {
                return await _dbContext.MauSacs.OrderByDescending(x => x.TrangThai).ToListAsync();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<MauSac> GetMauSacById(Guid id)
        {
            try
            {
                var nv = await _dbContext.MauSacs.FirstOrDefaultAsync(nv => nv.ID == id);
                return nv;
            }
            catch (Exception) { throw; }
        }

        public async Task<MauSac> UpdateMauSac(Guid id, string ten, string ma, int trangthai)
        {
            try
            {
                var nv = await _dbContext.MauSacs.FirstOrDefaultAsync(x => x.ID == id);
                if (nv != null)
                {
					if(nv.Ten.ToLower().Trim() == ten.ToLower().Trim())
					{
						nv.Ten = ten.ToUpper();
						nv.Ma = ma;
						nv.TrangThai = trangthai;
					}
					else
					{
						var existingColor = await _dbContext.MauSacs.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == ten.Trim().ToUpper());
						if (existingColor != null)
						{
							return null;
						}
						nv.Ten = ten.ToUpper();
						nv.Ma = ma;
						nv.TrangThai = trangthai;
					}
                    _dbContext.MauSacs.Update(nv);
                    _dbContext.SaveChanges();
                    return nv;
                }

                return null;

            }
            catch (Exception)
            {

                throw;
            }
        }
        #region chat lieu
        public async Task<ChatLieu> AddChatLieu(string ten, int trangthai)
        {
            try
            {
                var existingColor = await _dbContext.ChatLieus.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == ten.Trim().ToUpper());
                if (existingColor != null)
                {
                    return null;
                }
                ChatLieu kc = new ChatLieu()
                {
                    ID = Guid.NewGuid(),
                    Ten = ten.ToUpper(),
                    TrangThai = 1
                };
                _dbContext.ChatLieus.Add(kc);
                _dbContext.SaveChanges();
                return kc;

            }
            catch (Exception)
            {

                throw;

            }
        }

        public async Task<ChatLieu> GetChatLieuById(Guid id)
        {
            try
            {
                var nv = await _dbContext.ChatLieus.FirstOrDefaultAsync(nv => nv.ID == id);
                return nv;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<int> DeleteChatLieu(Guid id)
        {

            try
            {
				var check = await _dbContext.SanPhams.FirstOrDefaultAsync(x => x.IDChatLieu == id);
                if (check != null) return 0;
				var nv = await _dbContext.ChatLieus.FirstOrDefaultAsync(nv => nv.ID == id);
                if (nv != null)
                {
                    _dbContext.ChatLieus.Remove(nv);
                    _dbContext.SaveChanges();
                    return 1;
                }
                return 2;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<ChatLieu> UpdateChatLieu(Guid id, string ten, int trangthai)
        {

            try
            {
                var nv = await _dbContext.ChatLieus.FirstOrDefaultAsync(x => x.ID == id);
                if (nv != null)
                {
					if(nv.Ten.ToLower().Trim() == ten.ToLower().Trim())
					{
						nv.Ten = ten.ToUpper();
						nv.TrangThai = trangthai;
					}
					else
					{
						var existingColor = await _dbContext.ChatLieus.FirstOrDefaultAsync(x => x.Ten.Trim().ToUpper() == ten.Trim().ToUpper());
                    if (existingColor != null)
                    {
                        return null; // Trả về null để báo hiệu tên trùng
                    }
						nv.Ten = ten.ToUpper();
						nv.TrangThai = trangthai;
					}
                    _dbContext.ChatLieus.Update(nv);
                    _dbContext.SaveChanges();
                    return nv;
                }

                return null;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<List<ChatLieu>> GetAllChatLieu()
        {
            try
            {
                return await _dbContext.ChatLieus.OrderByDescending(x => x.TrangThai).ToListAsync();
            }
            catch (Exception)
            {

                throw;

            }
        }

	






		#endregion
	}
}
