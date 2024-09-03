CREATE TABLE shashank_pathak.uploadusers (
	id serial4 NOT NULL,
	"name" varchar(100) NOT NULL,
	username varchar(50) NOT NULL,
	email varchar(100) NOT NULL,
	gender varchar(10) NULL,
	"password" varchar(255) NOT NULL,
	created timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT uploadusers_email_key UNIQUE (email),
	CONSTRAINT uploadusers_pkey PRIMARY KEY (id),
	CONSTRAINT uploadusers_username_key UNIQUE (username)
);


CREATE TABLE shashank_pathak.excel_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),                -- Allows NULL values by default
    email VARCHAR(100) UNIQUE NOT NULL, -- Must be unique and not null
    contact_no VARCHAR(20) NOT NULL,    -- Must not be null
    gender VARCHAR(10),                -- Allows NULL values by default
    address TEXT,                      -- Allows NULL values by default
    upload_users_id INTEGER,           -- Allows NULL values by default
    FOREIGN KEY (upload_users_id) REFERENCES shashank_pathak.uploadusers(id) ON DELETE SET NULL
);
