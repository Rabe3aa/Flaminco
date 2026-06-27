import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import { getBlogsForDisplay } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600;

export default async function BlogsPage() {
  const blogs = await getBlogsForDisplay().catch(() => null);

  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0 bg-brand-bg pt-32">
      <AnimatedBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6">
              <BookOpen size={14} />
              <span>Insights & Updates</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
              Latest from <span className="text-brand-primary">our</span><br />
              <span className="text-brand-neutral">advertising experts.</span>
            </h1>
            <p className="text-xl text-brand-neutral/80 max-w-2xl font-light leading-relaxed">
              Dive into our latest thoughts on marketing strategies, design trends, and industry insights that are shaping the future of digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 relative z-10 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          {blogs && blogs.length > 0 ? (
            <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((blog) => (
                <Link 
                  href={`/blogs/${blog.slug}`}
                  key={blog.id}
                  className="group bg-brand-bg border border-brand-neutral/10 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {blog.coverImage && (
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <FileText size={24} />
                      </div>
                      {blog.tags.length > 0 && (
                        <span className="text-xs font-bold text-brand-neutral/60 uppercase tracking-widest bg-white px-3 py-1 rounded-full">
                          {blog.tags[0]}
                        </span>
                      )}
                    </div>
                    
                    {blog.author && (
                      <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-3">
                        {blog.author}
                      </p>
                    )}
                    <h3 className="text-2xl font-bold text-brand-neutral mb-4 leading-tight group-hover:text-brand-primary transition-colors">
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p className="text-brand-neutral/70 text-sm mb-6 line-clamp-2">
                        {blog.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm font-bold text-brand-neutral group-hover:text-brand-primary transition-colors">
                      Read Article
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </Reveal>
          ) : (
            <div className="text-center py-20 bg-brand-bg rounded-3xl border border-brand-neutral/10">
              <FileText className="w-16 h-16 text-brand-neutral/30 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-brand-primary mb-3">Coming Soon</h3>
              <p className="text-brand-neutral/70 max-w-md mx-auto">
                We&apos;re working on exciting new content. Check back soon for our latest insights and articles.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
