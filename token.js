const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const generateToken = config => {
return new AccessToken(
    config.accountSid,
    config.apiKey,
    config.apiSecret
  );
};

const videoToken = (identity, room, config) => {
  let videoGrant;
  console.log("identity",identity)
  console.log("room",room)

  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken(config);
  token.addGrant(videoGrant);
  token.identity = identity;
  console.log("token",token)
  return token;
};

module.exports = { videoToken };