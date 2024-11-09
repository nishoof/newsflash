import Input from "../../components/Input";

export default function Preferences() {
    return (
        <div>
            <Input onSubmit={function (): void {
                // navigate("/summary");
                console.log("submit");
            }} />
        </div>
    );
};
