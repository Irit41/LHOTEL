using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using System.Net;
using System.Net.Http;
using System.Web.Http;
using DAL;
using BLL;
using Newtonsoft.Json.Linq;




namespace LHOTELServer.Controllers
{


    [System.Web.Http.RoutePrefix("api/Receptionist")]

    public class ReceptionistController : ApiController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetBookedRooms")]
        public IHttpActionResult GetBookedRooms()
        {
            try
            {
                return Ok(BllReceptionist.GetBookedRooms());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/GetReservedRoomsByCustomerId")]
        public IHttpActionResult GetReservedRoomsByCustomerId([FromBody] JObject data)
        {
            try
            {
                int id = data["id"].ToObject<int>();
                return Ok(BllReceptionist.GetReservedRoomsByCustomerId(id));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


    }

}