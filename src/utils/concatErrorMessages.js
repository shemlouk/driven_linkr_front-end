const concatErrorMessages = (error) => {
  let message = "";
  error.details.forEach((err) => (message += `${err.message}\n`));
  return message;
};

export default concatErrorMessages;
