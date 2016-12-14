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
                Category c1 = new Category { Name = "Sport clothes", Description = "Description of sport clothes." };
                Category c2 = new Category { Name = "Bags", Description = "Description of bags." };
                Category c3 = new Category { Name = "Acceessories", Description = "Description of accessories." };

                context.Categories.Add(c1);
                context.Categories.Add(c2);
                context.Categories.Add(c3);

                context.SaveChanges();
            }

            base.InitializeDatabase(context);
        }
    }
}
