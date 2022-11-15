using System.Web;
using System.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DAL;
using BLL;
using Newtonsoft.Json.Linq;

namespace LHOTELServer.Controllers
{
    [System.Web.Http.RoutePrefix("api/Bill_Details")]

    public class BillDetailsController : ApiController
    {

        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/GetRoomResit")]
        public IHttpActionResult RoomResit([FromBody] JObject data)
        {
            try
            {
                int id = data["id"].ToObject<int>();
                return Ok(BllBillDetails.RoomResit(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/AddCharge")]
        public IHttpActionResult AddCharge([FromBody] Charge charge)
        {
            try
            {
                return Ok(BllBillDetails.AddCharge(charge));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}