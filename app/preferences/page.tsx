import { Form } from "../../components/Input";
import "./preferences.css";
import "../App.css";

export default async function Preferences() {
  console.log(process.env.OPENAI_API_KEY);

  return (
    <div>
      <h2>Preferences</h2>
      <Form></Form>
    </div>
  );
}
