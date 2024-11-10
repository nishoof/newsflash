import { getFormData } from "../userData";

export default async function Summary({ searchParams }: { searchParams: { [key: string]: string } }) {

    const formData = getFormData();
    console.log(searchParams);
    // console.log(formData);

    console.log("Summary: ", formData);

    return (
        <div>
            <h1>Summary</h1>

            <p>{formData.categories}</p>
        </div>
    );

};
