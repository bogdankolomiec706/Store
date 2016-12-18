using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RudenSoftStore.ViewModel;
using RudenSoftStore.DAL.Interfaces;
using RudenSoftStore.DAL.Entitites;

namespace RudenSoftStore.Controllers
{
    public class CartController : Controller
    {
        private IUnitOfWork UOW;
        public CartController(IUnitOfWork uow)
        {
            UOW = uow;
        }

        private Cart GetCart()
        {
            Cart cart = (Cart)Session["Cart"];
            if(cart == null)
            {
                cart = new Cart();
                Session["Cart"] = cart;
            }
            return cart;
        }

        public ActionResult Index(string returnUrl)
        {
            if (returnUrl.Contains("Products/Index"))
                returnUrl = "/Home/Index";
            return View(new CartViewModel { Cart = GetCart(), ReturnUrl = returnUrl });
        }

        public ActionResult MakeOrder()
        {
            Session["Cart"] = null;
            return View();
        }

        public ActionResult AddToCart(int productId, string returnUrl)
        {
            Product product = UOW.Products.Get(productId);
            if(product != null)
            {
                GetCart().AddItem(product, 1);
                GetCart().ComputeTotalValue();
            }
            return RedirectToAction("Index", new { returnUrl });
        }

        public ActionResult RemoveFromCart(int productId, string returnUrl)
        {
            Product product = UOW.Products.Get(productId);
            if(product != null)
            {
                GetCart().RemoveItem(product);
                GetCart().ComputeTotalValue();
            }
            return RedirectToAction("Index", new { returnUrl });
        }
    }
}