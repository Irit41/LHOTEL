using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BLL
{
    public abstract class  BllEmployees
    {
        public static bool ClockIn(int id, string time)
        {
            return DalEmployees.ClockIn(id, time);
        }
        public static bool ClockOut(int id, string time)
        {
            return DalEmployees.ClockOut(id, time);
        }
        public static List<Employee> GetAllEmployees()
        {
            return DalEmployees.GetAllEmployees();
        }

        public static bool AddNewEmployee(Employee newEmployee)
        {
            return DalEmployees.AddNewEmployee(newEmployee);
        }

        public static Employee GetEmployeeById(int id)
        {
            return DalEmployees.GetEmployeeById(id);
        }
        public static Employee GetEmployeeByIdAndPassword(int id, int password)
        {
            return DalEmployees.GetEmployeeByIdAndPassword(id, password);
        }
        public static bool AlterEmployeeById(Employee employee)
        {
            return DalEmployees.AlterEmployeeById(employee);
        }

        public static bool DeleteEmployeeById(int id)
        {
            return DalEmployees.DeleteEmployeeById(id);
        }

    }
}
