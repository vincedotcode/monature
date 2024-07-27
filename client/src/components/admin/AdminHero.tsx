
import Link from "next/link"

export default function Component() {
    return (
        <div className="relative w-full h-[400px]">
            <div className="absolute inset-0 flex flex-col justify-center gap-4 p-4 md:gap-10">
                <div className="grid gap-4">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900 dark:text-gray-50">
                        Welcome to Admin
                    </h1>
                    <p className="max-w-[700px] text-gray-500 dark:text-gray-400">
                        MoNature Admin Panel
                    </p>
                </div>
            </div>
        </div>
    )
}