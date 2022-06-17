using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using recordsAPI.Repositories;
using recordsAPI.Models;

namespace recordsAPI.Controllers
{
    [Route("api/barrecords")]
    [ApiController]
    public class BarController : Controller
    {
        private readonly IBarRecordRepository _barRecordRepository;
        public BarController(IBarRecordRepository barRecordRepository)
        {
            _barRecordRepository = barRecordRepository;
        }

        // GET: barrecords
        [HttpGet]
        public IActionResult GetAllBarRecords()
        {
            return Ok(_barRecordRepository.GetAllRecords());
        }

        // GET: barrecords/5
        [HttpGet("{id}")]
        public IActionResult GetRecordByBarID(int id)
        {
            var match = _barRecordRepository.GetRecordByBarID(id);
            if (match == null)
            {
                return NotFound();
            }

            return Ok(match);
        }

        // POST: barrecords/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(BarRecord barRecord)
        {
            if (barRecord == null)
            {
                return BadRequest();
            }
            else
            {
                _barRecordRepository.CreateBarRecord(barRecord);
                return Ok(barRecord);
            }
        }
    }
}
