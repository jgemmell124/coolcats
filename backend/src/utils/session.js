/**
 * Gets the user session from the request object
 *
 * @param {Object} req - The request object
 * @returns {Object} - The user session
 */
export const getUserSession = (req) => {
  return req.session['user'];
};

/**
 * Sets the user session in the request object
 *
 * @param {Object} req - The request object
 * @param {Object} user - The user object
 * @returns {Object} - The user session info
 */
export const setUserSession = (req, user) => {
  const userSessionInfo = {
    username: user.username,
    role: user.role,
    name: user.name,
    email: user.email,
    _id: user._id,
    followers: user.followers,
    following: user.following,
  };
  req.session['user'] = userSessionInfo;

  return userSessionInfo;
};
