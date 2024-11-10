'use server'

import { redirect } from "next/navigation";
import { getFormData, setFormData } from "../userData";

export interface FormData {
    subscribe: boolean;
    categories: string[];
    sources: string[];
    fromDate: string;
    toDate: string;
    keywords: string;
}

export async function onSubmit(formData: FormData) {
    console.log("action started");
    // console.log("Form data 1:", formData);
    setFormData(formData);
    // console.log("Form data 2:", getFormData());
    redirect("/summary?categories=['a','b']");
    console.log("");
}
