import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Veocraft Pro - AI-Powered Video Prompt Generator">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6 text-white lg:justify-center lg:p-8">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-6xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                                🎬
                            </div>
                            <span className="text-xl font-bold">Veocraft Pro</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2.5 text-sm font-medium text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border border-white/20 px-5 py-2 text-sm leading-normal text-white hover:border-white/40 hover:bg-white/5 transition-all duration-200"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 text-sm font-medium text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                                    >
                                        Get Started Free
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-6xl flex-col items-center text-center">
                        {/* Hero Section */}
                        <div className="mb-16 max-w-4xl">
                            <h1 className="mb-6 text-5xl font-bold leading-tight lg:text-6xl">
                                🎬 Transform Ideas into
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Professional Video Prompts</span>
                            </h1>
                            <p className="mb-8 text-xl text-gray-300 lg:text-2xl">
                                AI-powered video prompt generation with instant storyboard visualization. 
                                Turn simple concepts into detailed, professional-grade video production prompts.
                            </p>
                            
                            {!auth.user && (
                                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                    >
                                        🚀 Start Creating Now
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white hover:border-white/50 hover:bg-white/10 transition-all duration-200"
                                    >
                                        👋 Welcome Back
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl">
                            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                                <div className="mb-4 text-4xl">🤖</div>
                                <h3 className="mb-2 text-xl font-semibold">SatSet Mode</h3>
                                <p className="text-gray-300">AI transforms simple ideas into comprehensive, detailed video prompts automatically</p>
                            </div>
                            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                                <div className="mb-4 text-4xl">✏️</div>
                                <h3 className="mb-2 text-xl font-semibold">Manual Mode</h3>
                                <p className="text-gray-300">Scene-by-scene construction with structured forms for precise creative control</p>
                            </div>
                            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                                <div className="mb-4 text-4xl">🎨</div>
                                <h3 className="mb-2 text-xl font-semibold">Visual Storyboards</h3>
                                <p className="text-gray-300">Generate instant visual storyboards from your prompts using AI image generation</p>
                            </div>
                            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                                <div className="mb-4 text-4xl">📚</div>
                                <h3 className="mb-2 text-xl font-semibold">Asset Library</h3>
                                <p className="text-gray-300">Build reusable characters, objects, and components for consistent branding</p>
                            </div>
                        </div>

                        {/* How It Works */}
                        <div className="mb-16 max-w-4xl">
                            <h2 className="mb-8 text-3xl font-bold">How Veocraft Pro Works</h2>
                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="flex flex-col items-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-bold">1</div>
                                    <h3 className="mb-2 text-lg font-semibold">Input Your Idea</h3>
                                    <p className="text-center text-gray-300">Enter a simple concept like "promotional video for energy drink"</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-bold">2</div>
                                    <h3 className="mb-2 text-lg font-semibold">AI Enhancement</h3>
                                    <p className="text-center text-gray-300">Our AI expands it into detailed scenes, camera angles, and production notes</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-bold">3</div>
                                    <h3 className="mb-2 text-lg font-semibold">Visual Storyboard</h3>
                                    <p className="text-center text-gray-300">Generate a complete visual storyboard with AI-created scene images</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-8 backdrop-blur-sm border border-white/20 max-w-2xl">
                            <h2 className="mb-4 text-2xl font-bold">Ready to Create Professional Video Content?</h2>
                            <p className="mb-6 text-gray-300">
                                Join thousands of creators using Veocraft Pro to streamline their video production workflow.
                            </p>
                            {!auth.user ? (
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                >
                                    🎬 Start Your Free Account
                                </Link>
                            ) : (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                >
                                    🚀 Go to Dashboard
                                </Link>
                            )}
                        </div>

                        <footer className="mt-16 text-sm text-gray-400">
                            <p>© 2024 Veocraft Pro. Powered by advanced AI technology.</p>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}