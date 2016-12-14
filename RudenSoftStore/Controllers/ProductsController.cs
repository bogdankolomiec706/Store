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
    public class ProductsController : Controller
    {
        private IUnitOfWork UOW;
        private int pageSize = 3;

        public ProductsController(IUnitOfWork uow)
        {
            UOW = uow;
        }

        public ActionResult Index(int page = 1)
        {
            ProductListViewModel model = new ProductListViewModel
            {
                PagingInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = pageSize,
                    TotalItems = UOW.Products.GetAll().Count()
                },
                Products = UOW.Products.GetAll().Skip((page - 1) * pageSize).Take(pageSize)
            };
            return PartialView(model);
        }


        [HttpGet]
        public ActionResult Create()
        {
            ViewBag.CategoryId = new SelectList(UOW.Categories.GetAll(), "Id", "Name");
            return PartialView(new ProductRegisterViewModel());
        }

        [HttpPost]
        public ActionResult Create(ProductRegisterViewModel model)
        {
            Product product = new Product
            { Name = model.Name, Description = model.Description,
                CategoryId = model.CategoryId, Price = model.Price };
            UOW.Products.Create(product);
            UOW.Save();
            return RedirectToAction("Index","Home");
        }

        public ActionResult Delete()
        {
            return PartialView();
        }
    }
}