/**
 * v0 by Vercel.
 * @see https://v0.dev/t/EtZIfEtdc4L
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Leaf } from "lucide-react"

export default function Component() {
    return (
        <footer className=" py-6 w-full">
            <div className="container max-w-7xl flex flex-col items-center gap-4 md:flex-row md:justify-between">
                <div className="flex items-center gap-2">
                    <Leaf className="mr-2" color="#16A34A" />
                    MoNature
                </div>
                <p className="text-xs text-muted-foreground">&copy; 2024 Vincdotcode Inc. All rights reserved.</p>
                <nav className="flex gap-4 text-xs">
                    <Link href="#" className="hover:underline underline-offset-4" prefetch={false}>
                        Privacy Policy
                    </Link>
                </nav>
            </div>
        </footer>
    )
}

