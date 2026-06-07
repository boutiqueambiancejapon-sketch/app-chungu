-- ============================================================
-- Séoul Mate — schéma Supabase
-- À coller dans SQL Editor > New Query > Run
-- ============================================================

-- Profils utilisateurs
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  username text,
  avatar_url text,
  trip_start date,
  trip_end date,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Profil visible par son owner" on profiles
  for all using (auth.uid() = id);

-- Conversations Yuna
create table if not exists conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  role text check (role in ('user', 'model')) not null,
  content text not null,
  created_at timestamptz default now()
);
alter table conversations enable row level security;
create policy "Conversations visibles par leur owner" on conversations
  for all using (auth.uid() = user_id);

-- Planner — activités
create table if not exists activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  location text,
  date date,
  done boolean default false,
  created_at timestamptz default now()
);
alter table activities enable row level security;
create policy "Activités visibles par leur owner" on activities
  for all using (auth.uid() = user_id);

-- Souvenirs
create table if not exists souvenirs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  caption text,
  image_url text,
  location text,
  created_at timestamptz default now()
);
alter table souvenirs enable row level security;
create policy "Souvenirs visibles par leur owner" on souvenirs
  for all using (auth.uid() = user_id);
