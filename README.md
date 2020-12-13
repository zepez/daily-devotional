
## Daily devotional web scraper

This is a simple web scraper to get the daily devotional from [The Upper Room](https://www.upperroom.org/)

This can be automated via the run-cron file. 


## Running the project

Clone the project: 
```bash
git clone https://github.com/zepez/daily-devotional.git
```


Change directory: 
```bash
cd daily-devotional
```


Install dependencies: 
```bash
npm install
```


Start the development server: 
```bash
node index.js
```

## Environment variables

- TZ=America/New_York
- ENDPOINT=YOURENDPOINT
- API_KEY=YOURAPIKEY

The API key corresponds to 'token' in the request header.  


## Docker

[Docker repository](https://hub.docker.com/r/zepezauer/daily-devotional)

Sample docker command:
```bash
docker run -e TZ=America/New_York -e ENDPOINT=YOURENDPOINT -e API_KEY=YOURAPIKEY zepezauer/daily-devotional
```




