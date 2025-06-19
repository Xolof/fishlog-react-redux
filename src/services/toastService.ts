import { toast } from "react-toastify";

export function successToast(message: string) {
  if (typeof message === "function") return;
  toast.success(message);
}

export function infoToast(message: string) {
  if (typeof message === "function") return;
  toast.info(message);
}

export function warningToast(message: string) {
  if (typeof message === "function") return;
  toast.warning(message);
}

export function errorToast(message: string) {
  if (typeof message === "function") return;
  toast.error(message);
}
