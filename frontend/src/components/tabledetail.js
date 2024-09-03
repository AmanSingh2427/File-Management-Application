import React from 'react'

const tabledetail = () => {
  return (
    <div>
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




///////  
CREATE TABLE shashank_pathak.excel_data (
	id serial4 NOT NULL,
	"name" varchar(100) NULL,
	email varchar(100) NOT NULL,
	contact_no varchar(20) NOT NULL,
	gender varchar(10) NULL,
	address text NULL,
	upload_users_id int4 NULL,
	CONSTRAINT excel_data_email_key UNIQUE (email),
	CONSTRAINT excel_data_pkey PRIMARY KEY (id)
);


-- shashank_pathak.excel_data foreign keys

ALTER TABLE shashank_pathak.excel_data ADD CONSTRAINT excel_data_upload_users_id_fkey FOREIGN KEY (upload_users_id) REFERENCES shashank_pathak.uploadusers(id) ON DELETE SET NULL;
    </div>
  )
}

export default tabledetail
