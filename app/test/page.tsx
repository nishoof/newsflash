export default async function Test({ searchParams }: { searchParams: { [key: string]: string } })
{
    const {hi} = searchParams;
    return(
        <div>HI test
            Name: {hi}
        </div>
    )
}