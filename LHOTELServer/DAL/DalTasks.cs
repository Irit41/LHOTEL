using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public abstract class DalTasks
    {
        public static List<Task> GetAllTasks()
        {
            List<Task> tasks = new List<Task>();

            try
            {
                SqlDataReader reader = SqlClass.ExcNQReturnReder(@"exec GetAllTasks");
              
                while (reader.Read())
                {
                    tasks.Add(new Task()
                    {
                        TaskCode = (int)reader["Task_Code"],
                        EmployeeID = (reader["Employee_ID"] != DBNull.Value) ? (int)reader["Employee_ID"] : -1,
                        EmployeeName = (reader["Employee_Name"] != DBNull.Value) ? (string)reader["Employee_Name"] : null,

                        TaskName = (string)reader["Task_Name"],
                        RoomNumber = (reader["Room_Number"] != DBNull.Value) ? (int)reader["Room_Number"] : -1,
                        StartDate = (DateTime)reader["Start_Date"],
                        StartTime = (string)reader["Start_Time"],
                        EndTime = (reader["End_Time"] != DBNull.Value)
                        ? (string)reader["End_Time"] : null,
                        TaskStatus = (string)reader["Task_Status"],

                        Description = (reader["Description"] != DBNull.Value)
                        ? (string)reader["Description"] : null
                    });
                }
                return tasks;
            }
            catch (Exception e)
            {
               
                Console.WriteLine(e.Message);
            
            }
            finally
            {
                SqlClass.CloseDB();
            }
            return tasks;
        }

        public static List<Task> GetTaskById(int id)// פונקציה המחזירה רשימת משימות של עובד 
        {
            List<Task> tasks = new List<Task>();

            try
            {
                string str = $@"exec GetTask_ById {id}";// הגדרת הפקודה להרצת הפרוצודורה הרלוונטית
                str = str.Replace("\r\n", string.Empty);//סידור תחביר הפקודה ע"י מחיקה של רווחים וירידות שורה מיותרים
                SqlDataReader reader = SqlClass.ExcNQReturnReder(str); // השמת הנתונים המוחזרים ממסד הנתונים בעקבות הרצת הפרוצדורה לאובייקט רידר
                
                while (reader.Read())//באם קיימים נתונים מוחזרים יצירת אובייקטי משימה מהם והכנסתם לרשימה 
                {
                    tasks.Add(new Task()
                    {
                        TaskCode = (int)reader["Task_Code"],
                        EmployeeID = (int)reader["Employee_ID"],
                        EmployeeName = (string)reader["Employee_Name"],
                        TaskName = (string)reader["Task_Name"],
                        RoomNumber = (reader["Room_Number"] != DBNull.Value)// תנאי אם מקוצר לטובת השמת ערך דיפולטיבי במידה ולא קיים ערך
                        ? (int)reader["Room_Number"] : -1,

                        StartDate = (DateTime)reader["Start_Date"],
                        StartTime = (string)reader["Start_Time"],

                        EndTime = (reader["End_Time"] != DBNull.Value)
                        ? (string)reader["End_Time"] : null,

                        TaskStatus = (string)reader["Task_Status"],
                        Description = (reader["Description"] != DBNull.Value)
                        ? (string)reader["Description"] : null,
                    });
                }

            }
            catch (Exception e)  // הצגת שגיאה במידה והתקבלה
            {
               
                Console.WriteLine(e.Message);
            }
            finally   //סגירת החיבור אל מסד הנתונים
            {
                SqlClass.CloseDB();
            }
            return tasks;// החזרה של הרשימה 

        }

        public static List<Task> GetTaskByCode(int code)
        {
            List<Task> tasks = new List<Task>();
            try
            {
                string str = $@"exec GetTask_ByCode {code}";
                str = str.Replace("\r\n", string.Empty);
                SqlDataReader reader = SqlClass.ExcNQReturnReder(str);
               
                while (reader.Read())
                {
                    tasks.Add(new Task()
                    {
                        TaskCode = (int)reader["Task_Code"],
                        EmployeeID = (reader["Employee_ID"] != DBNull.Value)
                        ? (int)reader["Employee_ID"] : -1,
                        TaskName = (string)reader["Task_Name"],
                        RoomNumber = (reader["Room_Number"] != DBNull.Value)
                        ? (int)reader["Room_Number"] : -1,
                        StartDate = (DateTime)reader["Start_Date"],
                        StartTime = (string)reader["Start_Time"],

                        EndTime = (reader["End_Time"] != DBNull.Value)
                        ? (string)reader["End_Time"] : null,

                        TaskStatus = (string)reader["Task_Status"],
                        Description = (reader["Description"] != DBNull.Value)
                        ?(string)reader["Description"] : null,
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
            return tasks;

        }

        public static bool AddNewTask(Task task)
        {
            try
            {
                string str = $@"exec AddNewTask null,null,{task.RoomNumber},'{task.TaskName}','{task.StartDate:yyyy-MM-dd}',
'{task.StartTime}','{task.EndTime}','{task.TaskStatus}','{task.Description}'";
                if(task.EmployeeID != -1 ) str = str.Replace("null,null", $"{task.EmployeeID},'{task.EmployeeName}'");
                str = str.Replace("\r\n", string.Empty);
                int result = SqlClass.ExeNonQuery(str);
                return result == 1;
                    
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

        public static bool CloseTask(int code, string endTime)
        {
            try
            {
                if (GetTaskByCode(code) == null)
                {
                    return false;
                }
                string str = $@"exec CloseTask {code}, '{endTime}'";
                int result = SqlClass.ExeNonQuery(str);
                if (result >= 1)
                    return true;
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

        public static bool AlterTask(Task task)
        {
            try
            {
                if (GetTaskByCode(task.TaskCode) == null)
                {
                    return false;
                }

                string str = $@"exec AlterTask {task.TaskCode},{task.EmployeeID},{task.RoomNumber},
'{task.TaskName}','{task.StartTime}','{task.EndTime}','{task.TaskStatus}','{task.Description}'";
               
                str = str.Replace("\r\n", string.Empty);
                int result = SqlClass.ExeNonQuery(str);
                if (result == 1)
                    return true;
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


        public static bool DeleteTask(int code)
        {
            try
            {
                if (GetTaskByCode(code) == null)
                {
                    return false;
                }
                string str = $@"exec DeleteTask {code}";
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

