namespace recordsAPI.Models
{
    public class BarRecord
    {
        public int Id { get; set; }
        public int? Store_Id { get; set; }
        public int? Bar_Id { get; set; }
        public string? Bar_Date { get; set; }
        public int? Floor { get; set; }
        public string? Server_Name { get; set; }
        public string? Stocker_Name { get; set; }
    }
}
