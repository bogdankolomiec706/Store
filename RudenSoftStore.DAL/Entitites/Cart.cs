using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RudenSoftStore.DAL.Entitites
{
    public class Cart
    {
        private decimal totalPrice;
        public Cart()
        {
            OrderItems = new HashSet<OrderItem>();
        }

        //PROPERTIES
        public int Id { get; set; }
        public decimal TotalPrice { get { return totalPrice; } }

        public ICollection<OrderItem> OrderItems { get; } = new List<OrderItem>();

        //METHODS
        public void AddItem(Product product, int Quantity)
        {
            OrderItem orderItem = OrderItems.Where(i => i.Product.Id == product.Id).FirstOrDefault();
            if (orderItem == null)
            {
                OrderItems.Add(new OrderItem { Product = product, Quantity = Quantity });
            }
            else
            {
                orderItem.Quantity += Quantity;
            }
        }
        public void RemoveItem(Product product)
        {
            OrderItem item = OrderItems.Where(i => i.Product.Id == product.Id).FirstOrDefault();
            if (item != null)
            {
                OrderItems.Remove(item);
            }
        }
        public void ComputeTotalValue()
        {
            totalPrice = OrderItems.Sum(i => i.Product.Price * i.Quantity);
        }
        public void ClearCart()
        {
            OrderItems.Clear();
        }
    }

}
