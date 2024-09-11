namespace Capstone.Server.Models
{
    public class Card
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string GameCategory { get; set; }
        public string Condition { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
    }
}
