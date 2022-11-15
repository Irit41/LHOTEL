using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public abstract class DalEmployees
    {
        public static bool ClockIn(int id, string time)
        {
            try
            {
                string str = $@"exec ClockIn {id},'{time}'";
                str = str.Replace("\r\n", string.Empty);
                int rowsAffected = SqlClass.ExeNonQuery(str);
                return rowsAffected >= 1;
                   
         
            }

            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }

        public static bool ClockOut(int id, string time)
        {
            try
            {
                string str = $@"exec ClockOut {id}, '{time}'";
                str = str.Replace("\r\n", string.Empty);
                int rowsAffected = SqlClass.ExeNonQuery(str);
                return rowsAffected >= 1;
            }

            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }
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
                        EmployeeCode = (int)reader["Employee_Code"]
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

        public static Employee GetEmployeeById(int id)
        {
            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec GetEmployeeById {id} ");

                if (reader == null || !reader.HasRows)
                {
                    Console.WriteLine("There is no such employee in the system");
                    return null;
                }
                Employee employee = null;
                while (reader.Read())
                {
                    employee = new Employee()
                    {
                        EmployeeID = (int)reader["Employee_ID"],
                        Description = (string)reader["Description"],
                        EmployeeName = (string)reader["Employee_Name"],
                        PhoneNumber = (string)reader["Phone_Number"],
                        BirthDate = (DateTime)reader["Birth_Date"],
                        HourlyWage = (int)reader["Hourly_Wage"],
                        Address = (string)reader["Address"],
                        EmployeeCode = (int)reader["Employee_Code"]
                    };
                }
                return employee;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }
        public static Employee GetEmployeeByIdAndPassword(int id, int password)
        {
            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder($@"exec GetEmployeeByIdAndPassword {id},{password} ");

                if (reader == null || !reader.HasRows)
                {
                    Console.WriteLine("There is no such employee in the system");
                    return null;
                }
                Employee employee = null;
                while (reader.Read())
                {
                    employee = new Employee()
                    {
                        EmployeeID = (int)reader["Employee_ID"],
                        Description = (string)reader["Description"],
                        EmployeeName = (string)reader["Employee_Name"],
                        PhoneNumber = (string)reader["Phone_Number"],
                        BirthDate = (DateTime)reader["Birth_Date"],
                        HourlyWage = (int)reader["Hourly_Wage"],
                        Address = (string)reader["Address"],
                        EmployeeCode = (int)reader["Employee_Code"]
                    };
                }
                return employee;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }

        public static bool AddNewEmployee(Employee newEmployee)
        {
            try
            {
                if (GetEmployeeById(newEmployee.EmployeeID) == null)
                {
                    string str = $@"exec InsertEmployee {newEmployee.EmployeeID},'{newEmployee.EmployeeName}',
'{newEmployee.PhoneNumber}','{newEmployee.BirthDate:yyyy - MM - dd}',
'{newEmployee.Description}',{newEmployee.HourlyWage},'{newEmployee.Address}'";
                    str = str.Replace("\r\n", string.Empty);
                    int rowsAffected = SqlClass.ExeNonQuery(str);
                    return rowsAffected >= 1;
                      
                }
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }

        public static bool AlterEmployeeById(Employee employee)
        {
            try
            {
                Employee findEmployee = GetEmployeeById(employee.EmployeeID);
                if (findEmployee == null)
                {
                    return false;
                }
                string str = $@"exec AlterEmployee {employee.EmployeeID},
'{employee.EmployeeName}','{employee.PhoneNumber}','{employee.BirthDate:yyyy-MM-dd}',
'{employee.Description}',{employee.HourlyWage},'{employee.Address}'";
                str = str.Replace("\r\n", string.Empty);
                int result = SqlClass.ExeNonQuery(str);
                return result == 1;
                  
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return true;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }

        public static bool DeleteEmployeeById(int id)
        {
            try
            {
                Employee findEmployee = GetEmployeeById(id);
                if (findEmployee == null)
                {
                    return false;
                }
                string str = $@"exec DeleteEmployeeById {id}";
                int result = SqlClass.ExeNonQuery(str);
                return result >= 1;
                    
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SqlClass.CloseDB();
            }
        }

    }
}


