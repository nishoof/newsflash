export default async function Test({ searchParams }: { searchParams: { [key: string]: string } })
{
    const {startDate, endDate, categories} = searchParams;
    return(
        <div>HI test
        </div>
    )
}