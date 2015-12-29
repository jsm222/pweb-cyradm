CREATE TABLE auth_items (
  id SERIAL, 
  auth_item varchar(255) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT auth_item UNIQUE(auth_item)
);
CREATE TABLE domains (
  id SERIAL,
  domain_name varchar(255) NOT NULL,
  max_quota_per_account bigint DEFAULT NULL,
  max_accounts_per_domain integer DEFAULT NULL,
  max_aliases_per_account integer DEFAULT NULL,
  is_alias_domain bool DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT domain_name_unique_constraint UNIQUE(domain_name)
);

CREATE TABLE users (
  id SERIAL,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  domain_id integer DEFAULT NULL,
  role_id integer DEFAULT NULL,
  max_aliases integer DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT username_unique UNIQUE(username),
  CONSTRAINT role_id_fkey FOREIGN KEY (role_id) REFERENCES auth_items (id),
  CONSTRAINT user_domain_id_fkey FOREIGN KEY (domain_id) REFERENCES domains (id)
);
CREATE TABLE user_domain_map (
  user_id integer NOT NULL,
  domain_id integer NOT NULL,
  PRIMARY KEY (user_id,domain_id),
  CONSTRAINT domain_id_fkey FOREIGN KEY (domain_id) REFERENCES domains (id),
  CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES users (id)
); 


CREATE TABLE virtual_delivery (
  id SERIAL,
  alias varchar(255) NOT NULL,
  dest varchar(255) NOT NULL,
  alias_domain_id integer DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT alias_unique_constraint UNIQUE(alias),
  CONSTRAINT alias_domain_id_fkey FOREIGN KEY (alias_domain_id) REFERENCES domains (id),
  CONSTRAINT dest_fkey FOREIGN KEY (dest) REFERENCES users (username)
);
