namespace EmployeeAttandance.Models
{
    public class EmployeeModel
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public long? Phone { get; set; }
        public int? Exp { get; set; }
        public DateTime DOJ { get; set; }
        public int Department { get; set; }
        public int Post { get; set; }
    }
}
