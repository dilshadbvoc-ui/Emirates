"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, Calendar, User, RefreshCw } from 'lucide-react';
import { articles as staticArticles, Article } from '@/data/articles';

export default function ArticleDetail() {
  const { slug } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    fetch(`/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.article) {
          setArticle(data.article);
        } else {
          // Fall back to static articles
          const found = staticArticles.find((a) => a.slug === slug);
          if (found) {
            setArticle(found);
          } else {
            router.replace('/articles');
          }
        }
      })
      .catch(() => {
        const found = staticArticles.find((a) => a.slug === slug);
        if (found) {
          setArticle(found);
        } else {
          router.replace('/articles');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, router]);

  if (loading) {
    return (
      <div className="text-center py-40">
        <RefreshCw size={36} className="text-[#EF3340] animate-spin mx-auto mb-4" />
        <p className="text-[#6B7280]">Loading article...</p>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
            <Link href="/" className="hover:text-[#EF3340] transition-colors">Home</Link>
            <span>&rsaquo;</span>
            <Link href="/articles" className="hover:text-[#EF3340] transition-colors">Articles</Link>
            <span>&rsaquo;</span>
            <span className="text-[#111827]">{article.category}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#EF3340] bg-white px-3 py-1 rounded-full border border-gray-100 mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#6B7280]">
              <span className="flex items-center gap-1.5"><User size={14} /> {article.author}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {article.date}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            {/* Article Image */}
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#FDE8EA] to-[#F7F8FA] aspect-[16/9] mb-8 flex items-center justify-center">
              <div className="text-center px-8">
                <BookOpen size={48} className="text-[#EF3340] mx-auto mb-4" />
                <h2 className="text-xl font-bold text-[#111827]">{article.title}</h2>
              </div>
            </div>

            {/* Article Content */}
            {article.content ? (
              <div className="prose prose-lg max-w-none">
                {article.content.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl font-bold text-[#111827] mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                    const items = paragraph.split('\n').filter((l) => l.match(/^\d+\./));
                    return (
                      <ol key={i} className="list-decimal list-inside space-y-2 mb-4 text-[#4B5563]">
                        {items.map((item, j) => (
                          <li key={j} className="text-base leading-relaxed">
                            <span dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter((l) => l.startsWith('- '));
                    return (
                      <ul key={i} className="list-disc list-inside space-y-2 mb-4 text-[#4B5563]">
                        {items.map((item, j) => (
                          <li key={j} className="text-base leading-relaxed">{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={i} className="text-base text-[#4B5563] leading-relaxed mb-4" dangerouslySetInnerHTML={{
                      __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#111827]">$1</strong>')
                    }} />
                  );
                })}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <p className="text-[#6B7280] mb-4">Full article content coming soon.</p>
                <p className="text-sm text-[#4B5563]">{article.excerpt}</p>
              </div>
            )}

            <div className="mt-10 pt-8 border-t border-gray-100">
              <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-medium text-[#EF3340] hover:text-[#D62B35] transition-colors">
                <ArrowLeft size={16} /> Back to all articles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
