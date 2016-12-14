using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RudenSoftStore.DAL.Entitites;
using RudenSoftStore.DAL.Interfaces;

namespace RudenSoftStore.DAL.Repositories
{
    public class EFUnitOfWork : IUnitOfWork
    {
        private AppContext db;

        private Repository<Category> categoryRepository;
        private Repository<Product> productRepository;

        public EFUnitOfWork(string connectionString)
        {
            db = new AppContext(connectionString);
        }

        public IRepository<Category> Categories
        {
            get
            {
                if (categoryRepository == null)
                    categoryRepository = new Repository<Category>(db);
                return categoryRepository;
            }
        }

        public IRepository<Product> Products
        {
            get
            {
                if (productRepository == null)
                    productRepository = new Repository<Product>(db);
                return productRepository;
            }
        }

        public void Save()
        {
            db.SaveChanges();
        }
        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
