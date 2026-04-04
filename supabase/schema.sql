-- Run in Supabase SQL editor after creating a project.
-- Adjust RLS policies for your security model.

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete cascade,
  street text not null,
  city text not null,
  state text,
  zip text not null,
  country text default 'US',
  is_default boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.products (
  id text primary key,
  name text not null,
  description text,
  price numeric(10,2) not null,
  category text,
  images text[] default '{}',
  stock int default 0,
  slug text unique not null
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id),
  guest_email text,
  status text default 'placed',
  items jsonb not null default '[]',
  subtotal numeric(10,2),
  shipping numeric(10,2),
  total numeric(10,2),
  created_at timestamptz default now()
);

create table if not exists public.returns (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders (id),
  user_id uuid references auth.users (id),
  reason text,
  status text default 'requested',
  created_at timestamptz default now()
);

alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.returns enable row level security;

create policy "Users manage own addresses" on public.addresses
  for all using (auth.uid() = user_id);

create policy "Users read own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "Users insert own orders" on public.orders
  for insert with check (auth.uid() = user_id or user_id is null);
