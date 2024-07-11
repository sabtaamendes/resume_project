CREATE DATABASE resume_submission;

CREATE TABLE candidates(
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone VARCHAR(11) NOT NULL 
);

CREATE TABLE resume(
    id SERIAL PRIMARY KEY,
    desired_position VARCHAR(50) NOT NULL,
    filename TEXT NOT NULL,
    pdf BYTEA NOT NULL,
    candidates_id INTEGER NOT NULL REFERENCES candidates(id)
);

/*BYTEA: armazena dados binários*/