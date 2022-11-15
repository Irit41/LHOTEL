using DAL;
using DAL.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public abstract class BllReports
    {
        public static List<Report> NumberOfVisitorsPerMonth()
        {
            return DalReports.NumberOfVisitorsPerMonth();
        }

        public static List<ProductReport> AmountOfProductsPurchased()
        {
            return DalReports.AmountOfProductsPurchased();
        }

        public static List<Report> NumberOfTasksPerMonth()
        {
            return DalReports.NumberOfTasksPerMonth();
        }

        public static ProductReport ProductPurchaseByName(string name)
        {
            return DalReports.ProductPurchaseByName(name);

        }

        public static List<IncomeVsExpense> IncomeAndExpenses()
        {
            return DalReports.IncomeAndExpenses();
        }

    }
}
