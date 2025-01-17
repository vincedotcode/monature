"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Leaf, Menu, User } from 'lucide-react';
import { ModeToggle } from "@/helper/darkmode";
import UserDropdown from '@/components/UserDropdown';
import { useAuth } from '@/hooks/useUserData';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const { getUserData } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userData = getUserData();
        setIsLoggedIn(!!userData);
    }, [getUserData]);

    return (
        <div className="bg-background shadow-md w-full dark:bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
                <div className="flex justify-between items-center py-3 md:py-5">
                    <Link href="/" passHref className="flex items-center text-xl font-bold text-gray-800 dark:text-gray-200">
                        <Leaf className="mr-2" color="#16A34A" />
                        MoNature
                    </Link>
                    <div className="md:hidden d-flex justify-between">
                        <ModeToggle />
                        <button onClick={toggleMenu} className="mx-3">
                            <Menu size={24} />
                        </button>
                    </div>
                    <div className={`absolute md:relative top-16 left-0 md:top-auto md:left-auto w-full md:w-auto transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'} md:block dark:bg-background shadow-md md:shadow-none z-50`}>
                        <ul className="flex flex-col md:flex-row md:space-x-6 md:mt-0 md:text-sm md:font-medium z-50 bg-background">
                            <li>
                                <Link href="/events" passHref className="block py-2 px-4 hover:bg-primary-foreground rounded-sm">
                                    Events
                                </Link>

                            </li>
                            <li>
                                <Link href="/community" passHref className="block py-2 px-4 hover:bg-primary-foreground rounded-sm">
                                    Community
                                </Link>
                            </li>


                            <li>
                                <Link href="/donation" passHref className="block py-2 px-4 hover:bg-primary-foreground rounded-sm">
                                    Donation
                                </Link>
                            </li>
                            <li>
                                <Link href="/game" passHref className="block py-2 px-4 hover:bg-primary-foreground rounded-sm">
                                    Game
                                </Link>
                            </li>
                            <li>
                                <Link href="/ai" passHref className="block py-2 px-4 hover:bg-primary-foreground rounded-sm">
                                    AI
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" passHref className="block py-2 px-4 hover:bg-primary-foreground rounded-sm">
                                    Contact Us
                                </Link>
                            </li>
                            {isLoggedIn ? (
                                <li className="block md:hidden">
                                    <UserDropdown />
                                </li>
                            ) : (
                                <>
                                    <li className="block md:hidden">
                                        <Link href="/auth/signup" passHref className="block py-2 px-4 hover:bg-primary-foreground rounded-sm">
                                            Sign Up
                                        </Link>
                                    </li>
                                    <li className="block md:hidden">
                                        <Link href="/auth/login" passHref className="block py-2 px-4 hover:bg-primary-foreground rounded-sm">
                                            Login
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="hidden md:flex items-center md:text-sm md:font-medium z-50">
                        {isLoggedIn ? (
                            <div className='mx-2 flex items-center'>
                                <div className='mx-3'>
                                    <UserDropdown />
                                </div>
                                <ModeToggle />
                            </div>
                        ) : (
                            <ul className="flex flex-col mx-1 md:flex-row md:space-x-6 md:mt-0 md:text-sm md:font-medium">
                                <li>
                                    <Link href="/auth/signup" passHref className="block py-2 px-2 hover:bg-primary-foreground rounded-sm">
                                        Sign Up
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/auth/login" passHref className="block py-2 px-2 mr-1 hover:bg-primary-foreground rounded-sm">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <ModeToggle />
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}