'use server'

import { redirect } from "next/navigation";
import { getFormData, setFormData } from "../user";

export interface FormData {
    subscribe: boolean;
    categories: string[];
    fromDate: string;
    toDate: string;
    keywords: string;
}

export async function onSubmit(formData: FormData) {
    setFormData(formData);
    redirect("/summary");
}
