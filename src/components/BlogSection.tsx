"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { articles as staticArticles, Article } from '@/data/articles';
import SectionBadge from './SectionBadge';

export default function BlogSection() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.articles && data.articles.length > 0) {
          setArticles(data.articles);
        } else {
          setArticles(staticArticles);
        }
      })
      .catch(() => {
        setArticles(staticArticles);
      });
  }, []);

  const recentArticles = articles.slice(0, 3);

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <SectionBadge text="From our desk" />
        <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-3">
          Recent <span className="text-[#EF3340]">articles</span>
        </h2>
        <p className="text-[#4B5563] mb-8">Recent UAE Family Visa articles</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recentArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="h-40 bg-gradient-to-br from-[#FDE8EA] to-[#F7F8FA] flex items-center justify-center">
                <div className="text-center px-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#EF3340]">{article.category}</span>
                  <h4 className="text-sm font-bold text-[#111827] mt-1 line-clamp-2">{article.title}</h4>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#111827] mb-2 group-hover:text-[#EF3340] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-[#4B5563] line-clamp-2 mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <span>{article.author}</span>
                  <span>&middot;</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/articles" className="text-sm font-medium text-[#EF3340] hover:text-[#D62B35] transition-colors flex items-center gap-1">
            All UAE Family Visa articles ({articles.length}) <ArrowRight size={14} />
          </Link>
          <Link href="/articles" className="text-sm font-medium text-[#4B5563] hover:text-[#111827] transition-colors flex items-center gap-1">
            Browse every article <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
