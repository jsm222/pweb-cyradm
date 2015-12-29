package PwebCyradm::UserDomainMap;

use warnings;
use strict;

use base qw(PwebCyradm::DB::Object);

__PACKAGE__->meta->setup(
    table => 'user_domain_map',

    columns => [
        user_id   => { type => 'integer', not_null => 1 },
        domain_id => { type => 'integer', not_null => 1 },
    ],

    primary_key_columns => [ 'user_id', 'domain_id' ],
    foreign_keys        => [
        user => {
            class       => 'PwebCyradm::User',
            key_columns => { user_id => 'id' },
        },

        domain => {
            class       => 'PwebCyradm::Domain',
            key_columns => { domain_id => 'id' },
        },
      ]

);

1;
