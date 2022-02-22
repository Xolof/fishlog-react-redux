import { toast } from "react-toastify";

export function successToast(message) {
  if (typeof message === "function") return;
  toast.success(message);
}

export function infoToast(message) {
  if (typeof message === "function") return;
  toast.info(message);
}

export function errorToast(message) {
  if (typeof message === "function") return;
  toast.error(message);
}
