namespace RudenSoftStore.DAL.Entitites
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class AppContext : DbContext
    {
        public AppContext(string connectionString) : base(connectionString)
        {
            Database.SetInitializer(new AppInitializer());
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Product>()
                .HasMany(e => e.OderItems)
                .WithOptional(e => e.Product)
                .WillCascadeOnDelete();
        }
    }

    public class AppInitializer : CreateDatabaseIfNotExists<AppContext>
    {
        public override void InitializeDatabase(AppContext context)
        {
            if(context.Categories.Count() == 0)
            {
                Category c1 = new Category {Id = 1, Name = "Sport clothes", Description = "Description of sport clothes." };
                Category c2 = new Category { Id = 2, Name = "Bags", Description = "Description of bags." };
                Category c3 = new Category { Id = 3, Name = "Acceessories", Description = "Description of accessories." };

                context.Categories.Add(c1);
                context.Categories.Add(c2);
                context.Categories.Add(c3);

                Product p1 = new Product {CategoryId = 1, Name = "Sport_produc_1", Description="Sport description 1", Price = 120M};
                Product p2 = new Product { CategoryId = 1, Name = "Sport_produc_2", Description = "Sport description 2", Price = 320M };
                Product p3 = new Product { CategoryId = 1, Name = "Sport_produc_3", Description = "Sport description 3", Price = 300M };

                Product p4 = new Product { CategoryId = 2, Name = "Bags_produc_1", Description = "Bags description 1", Price = 500M };
                Product p5 = new Product { CategoryId = 2, Name = "Bags_produc_2", Description = "Bags description 2", Price = 190M };

                Product p6 = new Product { CategoryId = 3, Name = "Acceessories_produc_1", Description = "Acceessories description 1", Price = 100M };
                Product p7 = new Product { CategoryId = 3, Name = "Acceessories_produc_2", Description = "Acceessories description 2", Price = 290M };
                Product p8 = new Product { CategoryId = 3, Name = "Acceessories_produc_3", Description = "Acceessories description 3", Price = 300M };
                Product p9 = new Product { CategoryId = 3, Name = "Acceessories_produc_4", Description = "Acceessories description 4", Price = 490M };

                context.Products.Add(p1);
                context.Products.Add(p2);
                context.Products.Add(p3);
                context.Products.Add(p4);
                context.Products.Add(p5);
                context.Products.Add(p6);
                context.Products.Add(p7);
                context.Products.Add(p8);
                context.Products.Add(p9);

                context.SaveChanges();
            }

            base.InitializeDatabase(context);
        }
    }
}
