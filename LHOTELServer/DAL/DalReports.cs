using DAL.Classes;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public abstract class DalReports
    {
        public static List<Report> NumberOfVisitorsPerMonth()
        {
            List<Report> reports = new List<Report>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec Number_Of_Visitors_Per_Month");
               
                while (reader.Read())
                {
                    reports.Add(new Report()
                    {
                        Year = (string)reader["Year"],
                        Month = (string)reader["Month"],
                        Amount = (int)reader["Amount"]
                    });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                SqlClass.CloseDB();
            }
            return reports;

        }

        public static List<ProductReport> AmountOfProductsPurchased()
        {
            List<ProductReport> reports = new List<ProductReport>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec Amount_Of_Products_Purchased_In_The_Store");
              
                while (reader.Read())
                {
                    reports.Add(new ProductReport()
                    {
                        Code = (int)reader["Code"],
                        Category = (string)reader["Category"],
                        Product = (string)reader["Product"],
                        Amount = (int)reader["Amount"],
                        

                    });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                
            }
            finally
            {
                SqlClass.CloseDB();
            }
            return reports;

        }

        public static List<Report> NumberOfTasksPerMonth()
        {
            List<Report> reports = new List<Report>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec Number_of_tasks_per_month");
              
                while (reader.Read())
                {
                    reports.Add(new Report()
                    {
                        Year = (string)reader["Year"],
                        Month = (string)reader["Month"],
                        Amount = (int)reader["Amount"]
                    });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                SqlClass.CloseDB();
            }
            return reports;

        }

        public static ProductReport ProductPurchaseByName(string name)
        {
            ProductReport productReport = null;

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec ProductPurchaseByName '{name}'");
              
                while (reader.Read())
                {
                    productReport = new ProductReport()
                    {
                        Code = (int)reader["Code"],
                        Category = (string)reader["Category"],
                        Product = (string)reader["Product"],
                        Amount = (int)reader["Amount"],
                       
                    };
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                SqlClass.CloseDB();
            }
            return productReport;

        }

        public static List<IncomeVsExpense> IncomeAndExpenses()
        {
            List<IncomeVsExpense> report = new List<IncomeVsExpense>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec Income_And_Expenses");
              
                while (reader.Read())
                {
                    report.Add(new IncomeVsExpense()
                    {
                        Date = (string)reader["Date"],
                        Sum = (double)reader["Expens + / Profit -"],
                    });
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            finally
            {
                SqlClass.CloseDB();
            }
            return report;

        }
    }
}
