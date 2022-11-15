using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Task = DAL.Task;

namespace BLL
{
    public abstract class BllTasks
    {
        public static List<Task> GetAllTasks()
        {
            return DalTasks.GetAllTasks();
        }

        public static List<Task> GetTaskById(int id)
        {
            return DalTasks.GetTaskById(id);
        }

        public static List<Task> GetTaskByCode(int code)
        {
            return DalTasks.GetTaskByCode(code);
        }

        public static bool AddNewTask(Task task)
        {
            return DalTasks.AddNewTask(task);
        }

        public static bool CloseTask(int code, string endTime)
        {
            return DalTasks.CloseTask(code, endTime);
        }
        public static bool AlterTask(Task task)
        {
            return DalTasks.AlterTask(task);
        }
        public static bool DeleteTask(int code)
        {
            return DalTasks.DeleteTask(code);
        }
    }
}
