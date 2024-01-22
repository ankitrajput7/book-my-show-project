export function apiResponseMessage(statusCode, message, status = false, data = []) {
  let response = {
    statusCode: statusCode,
    message: message,
    status: status,
    data: data,
  };

  return response;
}
