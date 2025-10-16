import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader.tsx';
import { supabase } from '../supabaseClient.tsx';

interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    published_at: string;
    image_url: string;
}

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('published_at', { ascending: false });

            if (error) {
                console.error("Error fetching posts:", error);
            } else if (data) {
                setPosts(data);
            }
            setLoading(false);
        };
        fetchPosts();
    }, []);

  return (
    <>
      <PageHeader
        title="TreshTalk Blog"
        subtitle="Insights, tips, and stories on customer communication and AI technology."
        imageUrl="https://picsum.photos/seed/blog/1920/1080"
      />
      <div className="bg-light py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center text-gray-500">Loading articles...</div>
          ) : (
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                    <BlogPostCard key={post.id} {...post} />
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const BlogPostCard: React.FC<Post> = ({ slug, title, excerpt, author, published_at, image_url }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
    <Link to={`/blog/${slug}`}>
      <img src={image_url} alt={title} className="h-48 w-full object-cover" />
    </Link>
    <div className="p-6 flex-grow flex flex-col">
      <h2 className="text-xl font-bold text-dark mb-2">
        <Link to={`/blog/${slug}`} className="hover:text-primary">{title}</Link>
      </h2>
      <p className="text-gray-600 flex-grow">{excerpt}</p>
      <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
        <span>By {author}</span> &bull; <span>{new Date(published_at).toLocaleDateString()}</span>
      </div>
    </div>
  </div>
);

export default BlogPage;