var text = "LOREM IPSUM";

export function updateText(updated: string): void
{
    text = updated;
}

const Summ = () =>
{
    return (
        <div>{text}</div>
    );
};

export default Summ;