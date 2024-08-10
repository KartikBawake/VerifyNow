const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
  const { url } = event.queryStringParameters;

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'URL is required' })
    };
  }

  try {
    const startTime = Date.now();
    const response = await axios.get(url);
    const responseTime = Date.now() - startTime;

    const $ = cheerio.load(response.data);
    const metaDescription = $('meta[name="description"]').attr('content');
    const h1Text = $('h1').first().text();
    
    const websiteInfo = metaDescription || h1Text || 'No description available';

    const status = {
      responseTime,
      sslInfo: response.request.protocol === 'https:' ? 'Secure (HTTPS)' : 'Not Secure (HTTP)',
      isUp: true,
      server: response.headers['server'] || 'Unknown',
      ipAddress: response.request.socket.remoteAddress,
      contentLength: response.headers['content-length'] || 'Unknown',
      contentType: response.headers['content-type'] || 'Unknown',
      websiteInfo: websiteInfo.substring(0, 100) + (websiteInfo.length > 120 ? '...' : '')
    };

    return {
      statusCode: 200,
      body: JSON.stringify(status)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Error checking website', 
        message: error.message,
        isUp: false,
        websiteInfo: 'Unable to fetch website information'
      })
    };
  }
};