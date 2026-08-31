-- Blog posts: lets admins publish blog content from /admin/blog.

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_image text not null default '',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_at_idx on blog_posts (published_at desc);

alter table blog_posts enable row level security;

-- anyone can read published posts (public blog)
drop policy if exists "Public can view published blog posts" on blog_posts;
create policy "Public can view published blog posts"
on blog_posts for select
using (published = true);

-- logged-in admins can also see drafts
drop policy if exists "Authenticated users can view all blog posts" on blog_posts;
create policy "Authenticated users can view all blog posts"
on blog_posts for select
to authenticated
using (true);

-- only logged-in users (admins) can add/edit/delete posts
drop policy if exists "Authenticated users can insert blog posts" on blog_posts;
create policy "Authenticated users can insert blog posts"
on blog_posts for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update blog posts" on blog_posts;
create policy "Authenticated users can update blog posts"
on blog_posts for update
to authenticated
using (true);

drop policy if exists "Authenticated users can delete blog posts" on blog_posts;
create policy "Authenticated users can delete blog posts"
on blog_posts for delete
to authenticated
using (true);
