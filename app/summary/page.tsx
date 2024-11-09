import { getFormData } from "@/app/user";
import { FormData } from "@/app/preferences/actions";

export default async function Summary() {

    return (
        <div>
            <h1>Summary</h1>

            <p>{getFormData().categories}</p>
        </div>
    );

};

