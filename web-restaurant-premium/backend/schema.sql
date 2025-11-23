-- Create a table for reservations if it doesn't exist
create table if not exists reservations (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_email text not null,
  reservation_date date not null,
  reservation_time time not null,
  service_type text not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  notes text
);

-- Enable Row Level Security (RLS)
alter table reservations enable row level security;

-- Recreate policies to ensure they are correct
drop policy if exists "Enable insert for everyone" on reservations;
create policy "Enable insert for everyone" on reservations for insert with check (true);

drop policy if exists "Enable select for users based on email" on reservations;
create policy "Enable select for users based on email" on reservations for select using (true);
