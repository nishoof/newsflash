'use server'

import { redirect } from "next/navigation";
import { getFormData, setFormData } from "../userData";

export interface FormData {
    subscribe: boolean;
    categories: string[];
    fromDate: string;
    toDate: string;
    keywords: string;
}

export async function onSubmit(formData: FormData) {
    console.log("action started");
    // console.log("Form data 1:", formData);
    setFormData(formData);
    // console.log("Form data 2:", getFormData());
    
    redirect(`/summary?fromDate=${formData.fromDate}&toDate=${formData.toDate}&keywords=${formData.keywords}&categories=${formData.categories}`);
    console.log("");
}
