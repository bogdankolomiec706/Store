using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RudenSoftStore.DAL.Interfaces;
using RudenSoftStore.DAL.Entitites;
using RudenSoftStore.ViewModel;

namespace RudenSoftStore.Controllers
{
    public class HomeController : Controller
    {
        private IUnitOfWork UOW;
        public HomeController(IUnitOfWork uow)
        {
            UOW = uow;
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}