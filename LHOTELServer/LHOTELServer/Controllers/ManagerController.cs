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
    [System.Web.Http.RoutePrefix("api/Manager")]

    public class ManagerController : ApiController
    {

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetAllEmployees")]
        public IHttpActionResult GetAllEmployees()
        {
            try
            {
                return Ok(BllEmployees.GetAllEmployees());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetEmployeesBasicDetails")]
        public IHttpActionResult GetEmployeesBasicDetails()
        {
            try
            {
                return Ok(BllManager.GetEmployeesBasicDetails());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetAllShift")]
        public IHttpActionResult GetAllShift()
        {
            try
            {
                return Ok(BllManager.GetAllShift());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetWorkersOnShift")]
        public IHttpActionResult GetWorkersOnShift()
        {
            try
            {
                return Ok(BllManager.GetWorkersOnShift());
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("~/GetEmployeeById")]
        public IHttpActionResult GetEmployeeById([FromBody] JObject data)
        {
            try
            {
                int id = data["id"].ToObject<int>();
                return Ok(BllEmployees.GetEmployeeById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("~/AddNewEmployee")]
        public IHttpActionResult AddNewEmployee([FromBody] Employee employee)
        {
            try
            {
                return Ok(BllEmployees.AddNewEmployee(employee));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [System.Web.Http.HttpPut]
        [System.Web.Http.Route("~/AlterEmployeeById")]
        public IHttpActionResult AlterEmployeeById([FromBody] Employee employee)
        {
            try
            {
                return Ok(BllEmployees.AlterEmployeeById(employee));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }




        [System.Web.Http.HttpDelete]
        [System.Web.Http.Route("~/DeleteEmployeeById")]
        public IHttpActionResult DeleteEmployeeById([FromBody] JObject data)
        {
            try
            {
                int id = data["id"].ToObject<int>();
                return Ok(BllEmployees.DeleteEmployeeById(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}