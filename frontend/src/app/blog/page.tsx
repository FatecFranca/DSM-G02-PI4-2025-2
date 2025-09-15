"use client"

import { useMemo, useState } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Button from "@/components/ui/Button"
import { Calendar, Search, Tag, User } from "lucide-react"
import Link from "next/link"
import { posts as postsSeed } from "@/data/posts"

type Post = {
    id: string
    title: string
    excerpt: string
    cover: string
    category: string
    author: string
    date: string
}

export default function BlogPage() {
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("todas")

    const categories = useMemo(() => {
        const unique = Array.from(new Set(postsSeed.map(p => p.category)))
        return ["todas", ...unique]
    }, [])

    const filtered = useMemo(() => {
        return postsSeed
            .filter(p => category === "todas" ? true : p.category === category)
            .filter(p => search.trim() === "" ? true : (
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.excerpt.toLowerCase().includes(search.toLowerCase())
            ))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }, [search, category])

    const featured = filtered[0]
    const rest = filtered.slice(1)

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900">
            <Header />

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Hero */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Tag className="w-10 h-10 text-primary-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Novidades, dicas e tendências sobre mobilidade urbana, IoT e gestão de estacionamentos.
                    </p>
                </div>

                {/* Tools */}
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 mb-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Busque por título ou assunto..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                    <div>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                            {categories.map((c) => (
                                <option key={c} value={c}>{c[0]?.toUpperCase() + c.slice(1)}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <Button variant="primary" size="md" icon="arrow" className="!rounded-lg">
                            Assinar novidades
                        </Button>
                    </div>
                </div>

                {/* Featured */}
                {featured && (
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
                            <img src={featured.cover} alt={featured.title} className="w-full h-64 object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-sm text-primary-600 font-semibold mb-2">{featured.category}</div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">{featured.title}</h2>
                            <p className="text-gray-600 mb-4">{featured.excerpt}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {featured.author}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(featured.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                                </div>
                            </div>
                            <Link href={`/blog/${featured.id}`} className="inline-block">
                                <Button variant="secondary" size="md" icon="arrow" className="!rounded-lg w-fit">Ler mais</Button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rest.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <img src={post.cover} alt={post.title} className="w-full h-44 object-cover" />
                            <div className="p-5">
                                <div className="text-xs text-primary-600 font-semibold mb-2">{post.category}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        {post.author}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(post.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    )
}


