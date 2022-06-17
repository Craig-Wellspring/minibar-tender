using drinks_api.Models;

namespace drinks_api.Repositories
{
    public interface IBarRecordRepository
    {
        // GET
        List<BarRecord> GetAllRecords();
        //BarRecord GetBarRecordByDBID(int DBID);
        //List<BarRecord> GetBarRecordsByStoreID(int storeID);
        BarRecord GetRecordByBarID(int barID);
        //List<BarRecord> GetBarRecordsByDate(string date = "yyyy-mm-dd");
        //List<BarRecord> GetBarRecordsByServer(string server_name);
        //List<BarRecord> GetBarRecordsByStocker(string stocker_name);

        // CREATE
        void CreateBarRecord(BarRecord barRecord);

        // UPDATE
        //void UpdateBarRecord(BarRecord barRecord);

        // DELETE
        //void DeleteBarRecord(int barID);
    }
}
