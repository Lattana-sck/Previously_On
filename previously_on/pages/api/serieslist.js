export default async function getList(req, res) {

    // const id = localStorage.getItem('token');
  
    await fetch('https://api.betaseries.com/shows/discover?key=3bee3373bb7d', {
  
      method: "GET",
      "header": {
        "Content-Type": "application/json",
        "X-BetaSeries-Key": "3bee3373bb7d",
        "accept": "application/json",
        "Authorization": "Bearer d9f7494c47b1",
      },
    }).then((response) => {
      return response.json()
    }).then((data) => {
      res.status(200).json(data)
    })
  }