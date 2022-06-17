using drinks_api.Models;
using System.Data.SqlClient;

namespace drinks_api.Repositories
{
    public class DrinkRecordRepository : IDrinkRecordRepository
    {
        private readonly IConfiguration _config;

        public DrinkRecordRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection => new SqlConnection(_config.GetConnectionString("DefaultConnection"));


        //public List<DrinkRecord> GetAllRecords()
        //{
        //    return new List<DrinkRecord>();
        //}
        public List<DrinkRecord> GetDrinkRecordsByBarID(int barID)
        {
            return new List<DrinkRecord>();
        }
        public void CreateDrinkRecord(DrinkRecord drinkRecord) { }
    }
}
