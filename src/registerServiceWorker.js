import { toast } from 'react-toastify';

export default function showToast(message) {
    if (typeof message === "function") return;
    toast(message);
}