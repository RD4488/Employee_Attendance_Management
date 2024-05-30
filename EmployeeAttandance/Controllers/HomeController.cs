using EmployeeAttandance.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Diagnostics;
using Dapper;

namespace EmployeeAttandance.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        readonly IDbConnection connection = new SqlConnection("Data Source=(localdb)\\ProjectModels;Initial Catalog=EmployeeAttendance;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Attendance()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public ActionResult GetMarkedEmployee()
        {
            var results = connection.Query("select e.Id,e.Name,e.Email,e.Phone,a.DateTime,d.DepartmentName,p.PostName,e.Exp,e.DOJ from dbo.Attendance as a  join dbo.Employee as e on a.EmployeeId = e.Id  join dbo.Department as d on e.DepartmentId = d.Id  join dbo.Post as p on e.PostId = p.Id;", new { }).ToList();
            return Json(new { data = results });
        }

        public ActionResult InsertUpdate(EmployeeModel p)
        {
            connection.Execute("insert into dbo.Employee (Name,Email,Phone,DepartmentId,PostId,Exp,DOJ) values (@Name,@Email,@Phone,@DepartmentId,@PostId,@Exp,@DOJ);", new { Name= p.Name,Email = p.Email,Phone=p.Phone, DepartmentId = p.Department,PostId = p.Post,Exp = p.Exp,DOJ = p.DOJ  });
            return Ok();
        }
        public ActionResult GetAllEmployee()
        {
            var results = connection.Query("SELECT e.Id, e.Name,p.PostName,a.DateTime as AttendanceDate FROM Employee e LEFT JOIN Attendance a ON e.Id = a.EmployeeId AND CONVERT(date, a.DateTime) = CONVERT(date, GETDATE())join dbo.Post as p on p.Id = e.PostId;", new { }).ToList();
            return Json(new { data = results });
        }
        public ActionResult MarkAttendance(int id)
        {
            connection.Execute("insert into dbo.Attendance (EmployeeId,DateTime) values (@ID,CURRENT_TIMESTAMP);", new { ID = id });
            return Ok();
        }

        public ActionResult GetAllDepartment()
        {
            var results = connection.Query("select * from dbo.Department", new { }).ToList();
            return Json(new { data = results });
        }

        public ActionResult GetAllPost()
        {
            var results = connection.Query("select * from dbo.Post", new { }).ToList();
            return Json(new { data = results });
        }
    }
}
