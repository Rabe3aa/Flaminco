import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedBackground } from "@/components/layout/animated-background";
import { getBlogBySlugForDisplay } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

// Pre-render every published blog post at build time so first visits are
// instant. New slugs still render on-demand (and then cache) via ISR.
export async function generateStaticParams() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return blogs.map((b) => ({ slug: b.slug }));
  } catch {
    return [];
  }
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlugForDisplay(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen text-brand-neutral overflow-x-hidden font-sans relative z-0 bg-brand-bg pt-32">
      <AnimatedBackground />
      <Header />

      {/* Top Navigation */}
      <div className="container mx-auto px-4 md:px-8 pt-8 relative z-10">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:bg-brand-primary/10 px-4 py-2 rounded-full transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blogs
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-primary tracking-tighter mb-8 leading-[0.95]">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-brand-neutral/70 mb-8 pb-8 border-b border-brand-neutral/10">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <User size={16} className="text-brand-primary" />
                  <span className="font-medium">{blog.author}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-brand-primary" />
                <span>{blog.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              {blog.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-brand-primary" />
                  <div className="flex gap-2">
                    {blog.tags.map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {blog.excerpt && (
              <p className="text-xl text-brand-neutral/80 font-light leading-relaxed mb-12">
                {blog.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {blog.coverImage && (
        <section className="pb-12 relative z-10">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="w-full aspect-[21/9] relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16 relative z-10 bg-white border-y border-brand-neutral/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg prose-gray">
            <div
              className="text-brand-neutral/90 leading-relaxed text-lg whitespace-pre-wrap"
              style={{ lineHeight: 1.8 }}
            >
              {blog.content}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="pb-32 pt-16 relative z-10">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter mb-6">
            Want to learn more?
          </h2>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-brand-primary font-bold hover:underline"
          >
            <ArrowLeft size={16} />
            Back to all articles
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
