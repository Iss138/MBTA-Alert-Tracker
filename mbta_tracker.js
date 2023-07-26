const axios = require('axios');

const MBTA_API_URL = 'https://api-v3.mbta.com/alerts';

async function getMBTAAlerts() {
  try {
    const response = await axios.get(MBTA_API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching MBTA alerts:', error.message);
    return [];
  }
}

function formatAlert(alert) {
  return {
    id: alert.id,
    effect: alert.attributes.effect,
    severity: alert.attributes.severity,
    description: alert.attributes.header,
    createdAt: new Date(alert.attributes.created_at),
    lastUpdated: new Date(alert.attributes.updated_at),
  };
}

async function main() {
  const alerts = await getMBTAAlerts();
  const formattedAlerts = alerts.map(formatAlert);

  console.log('MBTA Alerts:');
  formattedAlerts.forEach((alert) => {
    console.log(`ID: ${alert.id}`);
    console.log(`Effect: ${alert.effect}`);
    console.log(`Severity: ${alert.severity}`);
    console.log(`Description: ${alert.description}`);
    console.log(`Created At: ${alert.createdAt}`);
    console.log(`Last Updated: ${alert.lastUpdated}`);
    console.log('-----------------------');
  });
}

main();
