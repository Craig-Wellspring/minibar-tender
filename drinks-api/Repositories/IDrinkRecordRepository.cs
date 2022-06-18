using recordsAPI.Models;

namespace recordsAPI.Repositories
{
    public interface IDrinkRecordRepository
    {
        // GET
        //List<DrinkRecord> GetAllRecords();
        //DrinkRecord GetDrinkRecordByDBID(int DBID);
        //List<DrinkRecord> GetDrinkRecordsByDrinkName(string drink_name);
        //List<DrinkRecord> GetDrinkRecordsByDrinkType(string drink_type);
        List<DrinkRecord> GetDrinkRecordsByBarID(int barID);

        // CREATE
        void CreateDrinkRecord(DrinkRecord drinkRecord);

        // UPDATE
        //void UpdateDrinkRecord(DrinkRecord drinkRecord);

        // DELETE
        //void DeleteDrinkRecord(int drinkID);
        //void DeleteDrinkRecordsByBarID(int barID);
    }
}
