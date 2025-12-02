import toast from "react-hot-toast";

const isNetworkError = (error) => {
  return (
    error?.message === "Network Error" ||
    error?.code === "ERR_NETWORK" ||
    !error?.response
  );
};

export const getErrorMessage = (error) => {
  if (isNetworkError(error)) return "خطا در ارتباط با سرور";
  if (error?.response?.data?.message) return error.response.data.message;
  return "خطایی رخ داده است";
};

export const handleApiError = (error) => {
  toast.error(getErrorMessage(error));
};
