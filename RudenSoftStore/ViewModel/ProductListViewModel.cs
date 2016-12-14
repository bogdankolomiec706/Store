using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RudenSoftStore.DAL.Entitites;

namespace RudenSoftStore.ViewModel
{
    public class ProductListViewModel
    {
        public IEnumerable<Product> Products { get; set; } = new List<Product>();
        public PagingInfo PagingInfo { get; set; }
    }
}
