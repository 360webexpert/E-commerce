import React from 'react';

export default function About() {
    return (
        <section className="pt-10 overflow-hidden bg-gray-50 dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid items-center grid-cols-1 md:grid-cols-2">

                    <div>
                        <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">
                            Hey 👋 I am
                            <br className="block sm:hidden" /> Jenny Carter
                        </h2>
                        <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:mt-8">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                        </p>

                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 md:mt-8">
                            <span className="relative inline-block">
                                <span className="absolute inline-block w-full bottom-0.5 h-2 bg-yellow-300 dark:bg-gray-900"></span>
                                <span className="relative"> Have a question? </span>
                            </span>
                            <br className="block sm:hidden" /> Ask me on
                            <a href="#" title="" className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline">Twitter</a>
                        </p>
                    </div>

                    <div className="relative">
                        <img className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt="" />

                        <img className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/business-woman.png" alt="" />
                    </div>

                </div>
            </div>

            <div className="mt-8 p-10 sm:mt-10 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-3xl lg:mx-auto">
                <div className="border border-neutral-200 rounded-lg shadow-sm divide-y divide-neutral-200">
                    <div className="p-6">
                        <h2 className="text-lg leading-6 font-medium text-neutral-900">Personal</h2>
                        <p className="mt-4 text-sm h-10 text-neutral-500">For Notion users getting started on Twitter.</p>
                        <p className="mt-4 flex flex-col space-y-2">
                            <span className="text-5xl font-extrabold text-neutral-900">Free</span>
                        </p>
                        <a href="#" className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Get Started
                        </a>
                    </div>
                    <div className="pt-6 pb-8 px-6">
                        <h3 className="text-xs font-medium text-neutral-900 tracking-wide uppercase">What's included</h3>
                        <ul role="list" className="mt-6 space-y-4">
                            <li className="flex space-x-3">
                                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-sm text-neutral-500">10 tweets/month</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-sm text-neutral-500">2 threads/month</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-sm text-neutral-500">Only you</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border border-neutral-200 rounded-lg shadow-sm divide-y divide-neutral-200">
                    <div className="p-6">
                        <h2 className="text-lg leading-6 font-medium text-neutral-900">Personal Pro</h2>
                        <p className="mt-4 text-sm h-10 text-neutral-500">For professionals who use Notion to write, collaborate, plan, and grow on Twitter.</p>
                        <p className="mt-4 flex flex-col space-y-2">
                            <span className="flex flex-row space-x-2 items-center">
                                <span className="text-5xl font-extrabold text-neutral-900">$9</span>
                                <span className="text-xs font-medium text-neutral-500">per month<br /> billed annually</span>
                            </span>
                        </p>
                        <a href="#" className="mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Get Started
                        </a>
                    </div>
                    <div className="pt-6 pb-8 px-6">
                        <h3 className="text-xs font-medium text-neutral-900 tracking-wide uppercase">What's included</h3>
                        <ul role="list" className="mt-6 space-y-4">
                            <li className="flex space-x-3">
                                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-sm text-neutral-500">Unlimited tweets</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-sm text-neutral-500">Unlimited threads</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-sm text-neutral-500">Real-time analytics</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span className="text-sm text-neutral-500">Collaborate with unlimited guests</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
