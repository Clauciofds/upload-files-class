create database aula_upload_arquivos;

create table users (
  id uuid primary key,
  name text not null,
  email text not null,
  photo text,
  password text not null
);