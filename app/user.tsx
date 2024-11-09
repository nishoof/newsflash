import { FormData } from "@/app/preferences/actions";

let savedFormData: FormData = {
    subscribe: false,
    categories: [],
    fromDate: "",
    toDate: "",
    keywords: "",
};

export function getFormData(): FormData {
    return savedFormData;
}

export function setFormData(formData: FormData) {
    savedFormData = formData;
}
