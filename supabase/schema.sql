-- Run this script once in your Supabase Dashboard -> SQL Editor

create table if not exists public.gallery_items (
  id text primary key,
  title text not null,
  category text not null,
  src text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create table if not exists public.testimonials (
  id text primary key,
  author text not null,
  role text not null,
  quote text not null,
  rating smallint not null default 5 check (rating between 1 and 5),
  avatar text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

-- Public storage bucket for admin-uploaded Gallery & Avatar images
insert into storage.buckets (id, name, public)
values ('space11-media', 'space11-media', true)
on conflict (id) do update set public = true;

-- Seed initial Gallery items (safe to re-run)
insert into public.gallery_items (id, title, category, src, created_at)
values
  ('gal-1', 'Open Coworking Lounge', 'Coworking', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', '2026-07-01T00:00:00Z'),
  ('gal-2', 'Private Executive Suite', 'Offices', 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80', '2026-07-02T00:00:00Z'),
  ('gal-3', 'Photography & Podcast Studio', 'Studios', 'https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&w=800&q=80', '2026-07-03T00:00:00Z'),
  ('gal-4', 'Dedicated Work Desks', 'Coworking', 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80', '2026-07-04T00:00:00Z'),
  ('gal-5', 'Conference & Event Space', 'Events', 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80', '2026-07-05T00:00:00Z'),
  ('gal-6', 'Green Outdoor Lounge', 'Studios', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', '2026-07-06T00:00:00Z')
on conflict (id) do nothing;

-- Seed initial Testimonials (safe to re-run)
insert into public.testimonials (id, author, role, quote, rating, avatar, created_at)
values
  ('test-1', 'Alex Morgan', 'Creative Director, Studio Nexus', 'SPACE11 completely transformed how our agency operates. The photography studio and private office setup under one roof saved us countless hours.', 5, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', '2026-07-01T00:00:00Z'),
  ('test-2', 'Priya Sharma', 'Founder & CEO, GreenScale', 'The green surroundings and peaceful workspace vibe helped our tech startup focus and grow. Plus, the community networking is top-tier.', 5, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80', '2026-07-02T00:00:00Z'),
  ('test-3', 'David Chen', 'Senior Consultant, Apex Ventures', 'Super flexible rental options and incredibly helpful staff. Having power backup and high-speed Wi-Fi 24/7 gives us total peace of mind.', 5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', '2026-07-03T00:00:00Z')
on conflict (id) do nothing;
