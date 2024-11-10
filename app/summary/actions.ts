'use server'

import { redirect } from "next/navigation";

export async function onButtonClick() {
    redirect('/preferences');
}
