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
    [System.Web.Http.RoutePrefix("api/Employees")]

    public class EmployeesController : ApiController
    {




        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/GetEmployeeByIdAndPassword")]
        public IHttpActionResult GetEmployeeByIdAndPassword([FromBody] JObject data)
        {
            try
            {
                int id = data["id"].ToObject<int>();
                int password = data["password"].ToObject<int>();
                return Ok(BllEmployees.GetEmployeeByIdAndPassword(id, password));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/ClockIn")]
        public IHttpActionResult ClockIn([FromBody] JObject data)
        {
            try
            {
                int id = data["id"].ToObject<int>();
                string time = data["time"].ToObject<string>();
                return Ok(BllEmployees.ClockIn(id, time));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/ClockOut")]
        public IHttpActionResult ClockOut([FromBody] JObject data)
        {
            try
            {
                int id = data["id"].ToObject<int>();
                string time = data["time"].ToObject<string>();
                return Ok(BllEmployees.ClockOut(id, time));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
