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

        public SqlConnection Connection => new SqlConnection(_config.GetConnectionString("DefaultConnection"));


        public List<BarRecord> GetAllRecords()
        {
            return new List<BarRecord>();
        }
        public BarRecord GetRecordByBarID(int barID)
        {
            return new BarRecord();
        }
        public void CreateBarRecord(BarRecord barRecord) { }
    }
}
