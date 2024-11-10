import { FormData } from "@/app/preferences/actions";
import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'formData.json');

var savedFormData: FormData = {
    subscribe: false,
    categories: [],
    fromDate: "",
    toDate: "",
    keywords: "",
};

export function getFormData(): FormData {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        savedFormData = JSON.parse(data);
    }
    return savedFormData;
}

export function setFormData(formData: FormData) {
    // console.log("Form data saved in userData: ", formData);
    savedFormData = formData;

    fs.writeFileSync(filePath, JSON.stringify(savedFormData, null, 2));
}
