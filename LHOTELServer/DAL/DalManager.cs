using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public abstract class DalManager
    {
        public static List<Employee> GetAllEmployees()
        {
            List<Employee> employees = new List<Employee>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder(@"exec GetAllEmployees");
               

                while (reader.Read())
                {
                    employees.Add(new Employee()
                    {
                        EmployeeID = (int)reader["Employee_ID"],
                        Description = (string)reader["Description"],
                        EmployeeName = (string)reader["Employee_Name"],
                        PhoneNumber = (string)reader["Phone_Number"],
                        BirthDate = (DateTime)reader["Birth_Date"],
                        HourlyWage = (int)reader["Hourly_Wage"],
                        Address = (string)reader["Address"],

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
            return employees;

        }
        public static List<EmployeeBasicDetails> GetEmployeesBasicDetails()
        {
            List<EmployeeBasicDetails> employees = new List<EmployeeBasicDetails>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder(@"exec GetEmployeesBasicDetails");
              


                while (reader.Read())
                {
                    employees.Add(new EmployeeBasicDetails()
                    {
                        EmployeeID = (int)reader["Employee_ID"],

                        EmployeeName = (string)reader["Employee_Name"],
                        Description = (string)reader["Description"],



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
            return employees;
        }

        public static List<Shift> GetAllShift()
        {
            List<Shift> employeesShifts = new List<Shift>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder(@"exec GetAllShifts");
              

                while (reader.Read())
                {

                    employeesShifts.Add(new Shift()
                    {
                        EmployeeID = (int)reader["Employee_ID"],
                        EmployeeCode = (int)reader["Employee_Code"],
                        EmployeeName = (string)reader["Employee_Name"],
                        Description = (string)reader["Description"],
                        Date = (DateTime)reader["Date"],
                        EntranceTime = (string)reader["Entrance_Time"],
                        LeavingTime = (reader["Leaving_Time"] != DBNull.Value)
                        ? (string)reader["Leaving_Time"] : null

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
            return employeesShifts;

        }


        public static List<Shift> GetWorkersOnShift() // פונקציה המחזירה רשימה של משמרות 
        {
            List<Shift> employeesShifts = new List<Shift>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder(@"exec GetWorkersOnShift"); //השמת תוצאת הרצת הפרוצדורה
               

                while (reader.Read())//הגדרת רשימה מסוג משמרת ,יצירה והכנסה של אובייקטים מסוג משמרת מנתוני הרידר אליה 
                {

                    employeesShifts.Add(new Shift()
                    {
                        EmployeeID = (int)reader["Employee_ID"],
                        EmployeeCode = (int)reader["Employee_Code"],
                        EmployeeName = (string)reader["Employee_Name"],
                        Description = (string)reader["Description"],
                        Date = (DateTime)reader["Date"],
                        EntranceTime = (string)reader["Entrance_Time"],
                        LeavingTime = (reader["Leaving_Time"] != DBNull.Value)
                        ? (string)reader["Leaving_Time"] : null
                    });
                }
                
            }
            catch (Exception e)// הצגת שגיאה במידה והתקבלה
            {
                Console.WriteLine(e.Message);
              
            }
            finally//סגירת החיבור אל מסד הנתונים 
            {
                SqlClass.CloseDB();
            }
            return employeesShifts;//החזרה של הרשימה
        }
    }
}
