namespace recordsAPI.Models
{
    public class DrinkRecord
    {
        public int? Id { get; set; }
        public string? Drink_Name { get; set; }
        public string? Drink_Type { get; set; }
        public int? Drink_Price { get; set; }
        public int? Number_Sold { get; set; }
        public int? Bar_Id { get; set; }
    }
}
