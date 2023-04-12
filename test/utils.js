module.exports.getCallError = async (promise) => {
  try {
    await promise;
    throw undefined;
  } catch (error) {
    assert(error, "Expected an error but did not get one.");
    return error.message
      .replace("VM Exception while processing transaction: revert ", "")
      .replace(/ -- Reason given.*/, "");
  }
};
