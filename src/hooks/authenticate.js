const {authenticate} = require('@feathersjs/authentication').hooks;
const {NotAuthenticated} = require('@feathersjs/errors');
const verifyIdentity = authenticate('jwt', 'sms');

function hasToken(hook) {
  if (hook.params.headers == undefined) return false;
  if (hook.data == undefined) return false;

  console.log('pppp');
  return hook.params.headers.authorization || hook.data.accessToken;
}

module.exports = async function authenticate(hook) {
  try {
    return await verifyIdentity(hook);
  } catch (error) {
    if (error instanceof NotAuthenticated && !hasToken(hook)) {
      return hook;
    }

    throw error;
  }
};
