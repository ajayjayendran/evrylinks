export const successResponse = (data: any) => ({
  success: true,
  data,
});

export const handleError = (error: any) => ({
  success: false,
  message: error.message || "Internal Server Error",
});
