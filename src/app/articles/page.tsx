"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, RefreshCw } from 'lucide-react';
import { articles as staticArticles, articleCategories, Article } from '@/data/articles';

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = activeCategory === 'all' ? '/api/articles' : `/api/articles?category=${activeCategory}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          // Fall back to static filtering
          const filtered = activeCategory === 'all'
            ? staticArticles
            : staticArticles.filter((a) => a.categorySlug === activeCategory);
          setArticles(filtered);
        }
      })
      .catch(() => {
        const filtered = activeCategory === 'all'
          ? staticArticles
          : staticArticles.filter((a) => a.categorySlug === activeCategory);
        setArticles(filtered);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <div>
      <section className="bg-gradient-to-b from-[#FDE8EA] via-[#FFF5F6] to-white py-12 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
            <Link href="/" className="hover:text-[#EF3340] transition-colors">Home</Link>
            <span>&rsaquo;</span>
            <span className="text-[#111827]">Articles</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={16} className="text-[#EF3340]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">From our desk</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#111827] mb-3">Articles <span className="text-[#EF3340]">& guides</span></h1>
            <p className="text-[#4B5563] mb-6 max-w-xl">Everything we publish about UAE visas, Emirates ID, attestation and family documents — in one place.</p>
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="flex items-center gap-1.5 text-sm text-[#4B5563] bg-white px-3 py-1.5 rounded-full border border-gray-100"><BookOpen size={14} /> {articles.length} articles</span>
              <span className="flex items-center gap-1.5 text-sm text-[#4B5563] bg-white px-3 py-1.5 rounded-full border border-gray-100"><RefreshCw size={14} /> Updated 11 Jun 2026</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-8 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {articleCategories.map((cat) => (
              <button key={cat.slug} onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.slug ? 'bg-[#EF3340] text-white' : 'bg-gray-100 text-[#4B5563] hover:bg-gray-200'}`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="text-center py-20">
              <RefreshCw size={36} className="text-[#EF3340] animate-spin mx-auto mb-4" />
              <p className="text-[#6B7280]">Loading articles...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <motion.div key={article.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                  <Link href={`/articles/${article.slug}`}
                    className="block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="h-48 bg-gradient-to-br from-[#FDE8EA] to-[#F7F8FA] flex items-center justify-center">
                      <div className="text-center px-6">
                        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#EF3340] bg-white px-3 py-1 rounded-full mb-2">{article.category}</span>
                        <h4 className="text-sm font-bold text-[#111827] line-clamp-2">{article.title}</h4>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-[#111827] mb-2 group-hover:text-[#EF3340] transition-colors line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-[#4B5563] line-clamp-2 mb-4">{article.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <span>{article.author}</span><span>&middot;</span><span>{article.date}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
          {!loading && articles.length === 0 && (
            <div className="text-center py-20">
              <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-[#6B7280]">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
