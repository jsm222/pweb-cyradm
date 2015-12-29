package PwebCyradm::AuthItem;

use strict;

use base qw(PwebCyradm::DB::Object);

__PACKAGE__->meta->setup(
    table => 'auth_items',

    columns => [
        id        => { type => 'serial',  not_null => 1 },
        auth_item => { type => 'varchar', length   => 255, not_null => 1 },
    ],

    primary_key_columns => ['id'],

    unique_key => ['auth_item'],
);

1;

