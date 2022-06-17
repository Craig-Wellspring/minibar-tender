using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using recordsAPI.Repositories;
using recordsAPI.Models;

namespace recordsAPI.Controllers
{
    [Route("api/drinkrecords")]
    [ApiController]
    public class DrinkController : Controller
    {
        private readonly IDrinkRecordRepository _drinkRecordRepository;
        public DrinkController(IDrinkRecordRepository drinkRecordRepository)
        {
            _drinkRecordRepository = drinkRecordRepository;
        }

        // GET: drinkrecords/8
        [HttpGet("{barID}")]
        public IActionResult GetDrinkRecords(int barID)
        {
            var match = _drinkRecordRepository.GetDrinkRecordsByBarID(barID);
            if (match == null)
            {
                return NotFound();
            }

            return Ok(match);

        }

        // POST: drinkrecords/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(DrinkRecord drinkRecord)
        {
            if (drinkRecord == null)
            {
                return BadRequest();
            }
            else
            {
                _drinkRecordRepository.CreateDrinkRecord(drinkRecord);
                return Ok(drinkRecord);
            }
        }
    }
}
