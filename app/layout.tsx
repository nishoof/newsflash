import { type Metadata } from "next"

export const metadata: Metadata = {
    title: 'React App',
    description: 'Web site created with Next.js.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <html lang="en">
                <body>
                    <h1>Newsflash</h1>
                    {children}
                </body>
            </html>
        </>
    )
}
