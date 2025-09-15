"use client"

import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import { getPostById, getRelatedPosts } from "@/data/posts"
import { ArrowLeft, Calendar, Tag, User } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

interface PageProps {
  params: { id: string }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostById(params.id)
  const related = useMemo(() => (post ? getRelatedPosts(post.id, post.category, 3) : []), [post])

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/blog" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para o Blog
            </Link>
          </div>

          {!post ? (
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold mb-2">Post não encontrado</h1>
              <p className="text-gray-600">O conteúdo que você procura não existe ou foi movido.</p>
            </div>
          ) : (
            <article className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <img src={post.cover} alt={post.title} className="w-full h-80 object-cover" />
              <div className="p-6 md:p-10">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    {post.category}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{post.excerpt}</p>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.content}
                  </p>
                </div>
              </div>
            </article>
          )}

          {/* Related */}
          {post && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Relacionados</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map(r => (
                  <Link key={r.id} href={`/blog/${r.id}`} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <img src={r.cover} alt={r.title} className="w-full h-36 object-cover" />
                    <div className="p-4">
                      <div className="text-xs text-primary-600 font-semibold mb-1">{r.category}</div>
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{r.title}</h4>
                    </div>
                  </Link>
                ))}
                {related.length === 0 && (
                  <div className="text-sm text-gray-500">Sem posts relacionados.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}


