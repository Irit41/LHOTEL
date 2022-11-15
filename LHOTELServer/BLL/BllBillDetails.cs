using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DAL.Classes;

namespace BLL
{
    public abstract class BllBillDetails
    {
        public static List<RoomResit> RoomResit(int id)
        {
            return DalBillDetails.RoomResit(id);
        }
        public static bool AddCharge(Charge charge)
        {
            return DalBillDetails.AddCharge(charge);
        }
    }
}
