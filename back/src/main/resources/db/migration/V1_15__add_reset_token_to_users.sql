alter table users
    add column if not exists reset_token varchar(255);
alter table users
    add column if not exists reset_token_lifetime bigint;