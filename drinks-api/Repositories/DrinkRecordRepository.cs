using recordsAPI.Models;
using System.Data.SqlClient;

namespace recordsAPI.Repositories
{
    public class DrinkRecordRepository : IDrinkRecordRepository
    {
        private readonly IConfiguration _config;

        public DrinkRecordRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection => new SqlConnection(_config.GetConnectionString("DefaultConnection"));


        private static List<DrinkRecord> ReadRecords(SqlDataReader _reader)
        {
            var records = new List<DrinkRecord>();
            while (_reader.Read())
            {
                DrinkRecord record = new()
                {
                    Id = _reader.GetInt32(_reader.GetOrdinal("id")),
                    Drink_Name = _reader.GetString(_reader.GetOrdinal("drink_name")),
                    Drink_Type = _reader.GetString(_reader.GetOrdinal("drink_type")),
                    Drink_Price = _reader.GetInt32(_reader.GetOrdinal("drink_price")),
                    Number_Sold = _reader.GetInt32(_reader.GetOrdinal("number_sold")),
                    Bar_Id = _reader.GetInt32(_reader.GetOrdinal("bar_id")),
                };
                records.Add(record);
            }
            _reader.Close();
            return records;
        }

        //public List<DrinkRecord> GetAllRecords()
        //{
        //    return new List<DrinkRecord>();
        //}

        public List<DrinkRecord> GetDrinkRecordsByBarID(int barID)
        {
            using SqlConnection conn = Connection;
            conn.Open();
            using SqlCommand cmd = conn.CreateCommand();

            cmd.CommandText = @"
                SELECT * FROM DRINK_SALES_RECORDS
                WHERE bar_id = @bar_id
            ";

            cmd.Parameters.AddWithValue("@bar_id", barID);

            using SqlDataReader reader = cmd.ExecuteReader();
            var record = ReadRecords(reader);
            return record;
        }

        public void CreateDrinkRecord(DrinkRecord drinkRecord)
        {
            using SqlConnection conn = Connection;
            conn.Open();
            using SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = @"
                INSERT INTO DRINK_SALES_RECORDS (drink_name, drink_type, drink_price, number_sold, bar_id)
                VALUES (@drink_name, @drink_type, @drink_price, @number_sold, @bar_id)
            ";
            cmd.Parameters.AddWithValue("@drink_name", drinkRecord.Drink_Name);
            cmd.Parameters.AddWithValue("@drink_type", drinkRecord.Drink_Type);
            cmd.Parameters.AddWithValue("@drink_price", drinkRecord.Drink_Price);
            cmd.Parameters.AddWithValue("@number_sold", drinkRecord.Number_Sold);
            cmd.Parameters.AddWithValue("@bar_id", drinkRecord.Bar_Id);

            cmd.ExecuteNonQuery();
        }
    }
}
