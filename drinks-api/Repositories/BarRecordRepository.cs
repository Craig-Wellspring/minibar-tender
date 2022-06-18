using recordsAPI.Models;
using System.Data.SqlClient;

namespace recordsAPI.Repositories
{
    public class BarRecordRepository : IBarRecordRepository
    {
        private readonly IConfiguration _config;

        public BarRecordRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection => new(_config.GetConnectionString("DefaultConnection"));


        private static List<BarRecord> ReadRecords(SqlDataReader _reader)
        {
            var records = new List<BarRecord>();
            while (_reader.Read())
            {
                BarRecord record = new()
                {
                    Id = _reader.GetInt32(_reader.GetOrdinal("id")),
                    Store_Id = _reader.GetInt32(_reader.GetOrdinal("store_id")),
                    Bar_Id = _reader.GetInt32(_reader.GetOrdinal("bar_id")),
                    Bar_Date = _reader.GetString(_reader.GetOrdinal("bar_date")),
                    Floor = _reader.GetInt32(_reader.GetOrdinal("floor")),
                    Server_Name = _reader.GetString(_reader.GetOrdinal("server_name")),
                    Stocker_Name = _reader.GetString(_reader.GetOrdinal("stocker_name")),
                };
                records.Add(record);
            }
            _reader.Close();
            return records;
        }

        public List<BarRecord> GetAllRecords()
        {
            using SqlConnection conn = Connection;
            conn.Open();
            using SqlCommand cmd = conn.CreateCommand();

            cmd.CommandText = @"
                SELECT * FROM BAR_SALES_RECORDS
            ";

            using SqlDataReader reader = cmd.ExecuteReader();
            var records = ReadRecords(reader);
            return records;
        }

        public BarRecord GetRecordByBarID(int barID)
        {
            using SqlConnection conn = Connection;
            conn.Open();
            using SqlCommand cmd = conn.CreateCommand();

            cmd.CommandText = @"
                SELECT * FROM BAR_SALES_RECORDS
                WHERE bar_id = @bar_id
            ";

            cmd.Parameters.AddWithValue("@bar_id", barID);

            using SqlDataReader reader = cmd.ExecuteReader();
            var record = ReadRecords(reader).FirstOrDefault();
            return record;
        }

        public void CreateBarRecord(BarRecord barRecord)
        {
            using SqlConnection conn = Connection;
            conn.Open();
            using SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = @"
                INSERT INTO BAR_SALES_RECORDS (store_id, bar_id, bar_date, [floor], server_name, stocker_name)
                VALUES (@store_id, @bar_id, @bar_date, @floor, @server_name, @stocker_name)
            ";
            cmd.Parameters.AddWithValue("@store_id", barRecord.Store_Id);
            cmd.Parameters.AddWithValue("@bar_id", barRecord.Bar_Id);
            cmd.Parameters.AddWithValue("@bar_date", barRecord.Bar_Date);
            cmd.Parameters.AddWithValue("@floor", barRecord.Floor);
            cmd.Parameters.AddWithValue("@server_name", barRecord.Server_Name);
            cmd.Parameters.AddWithValue("@stocker_name", barRecord.Stocker_Name);

            cmd.ExecuteNonQuery();
        }
    }
}
