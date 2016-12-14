using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RudenSoftStore.DAL.Entitites;

namespace RudenSoftStore.DAL.Interfaces
{
    public interface IUnitOfWork: IDisposable
    {
        IRepository<Category> Categories { get; }
        IRepository<Product> Products { get; }

        void Save();

    }
}
