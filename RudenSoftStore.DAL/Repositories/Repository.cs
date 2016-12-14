using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RudenSoftStore.DAL.Interfaces;
using RudenSoftStore.DAL.Entitites;
using System.Data.Entity;

namespace RudenSoftStore.DAL.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private AppContext db;
        private DbSet<T> table;
        public Repository(AppContext context)
        {
            db = context;
            table = db.Set<T>();
        }
        public void Create(T item)
        {
            table.Add(item);
        }

        public void Delete(int id)
        {
            T item = table.Find(id);
            if (item != null)
                table.Remove(item);
        }

        public IEnumerable<T> Find(Func<T, bool> predicate)
        {
            return table.Where(predicate);
        }

        public T Get(int id)
        {
            return table.Find(id);
        }

        public IEnumerable<T> GetAll()
        {
            return table;
        }

        public void Update(T item)
        {
            table.Attach(item);
            db.Entry(item).State = EntityState.Modified;
        }
    }
}
