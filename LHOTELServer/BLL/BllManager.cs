using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;


namespace BLL
{
    public abstract class BllManager
    {
        public static List<Employee> GetAllEmployees()
        {
            return DalManager.GetAllEmployees();
        }
        public static List<EmployeeBasicDetails> GetEmployeesBasicDetails()
        {
            return DalManager.GetEmployeesBasicDetails();
        }
        
        public static List<Shift> GetAllShift()
        {
            return DalManager.GetAllShift();
        }

        public static List<Shift> GetWorkersOnShift()
        {
            return DalManager.GetWorkersOnShift();
        }
    }
}
