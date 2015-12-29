package PwebCyradm::DB;
use strict;
use warnings;
use base qw(Rose::DB);

__PACKAGE__->use_private_registry;
__PACKAGE__->register_db(
    driver   => 'mysql',
    database => 'mail',
    host     => 'localhost',
    username => 'mail',
    password => 'mail'
    );

    __PACKAGE__->default_connect_options( mysql_enable_utf8 => 1 );
    1;
