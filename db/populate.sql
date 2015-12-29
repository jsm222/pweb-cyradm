insert into auth_items (auth_item) VALUES ('Administrator'),('SuperDomainAdministrator'),('DomainAdministrator'),('AccountUser');
--- change to your cyrus admin credentials according to your auth backend.
--- and your name of the local host
insert into users (username,password) VALUES ('cyrus@localhostname','secret');
