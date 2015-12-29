package PwebCyradm::VirtualDelivery;
use base qw(PwebCyradm::DB::Object);
use strict;
use warnings;
__PACKAGE__->meta->setup(
    table => 'virtual_delivery',

    columns => [
        id    => { type => 'serial',  not_null => 1 },
        alias => { type => 'varchar', length   => 255, not_null => 1 },
        dest  => { type => 'varchar', length   => 255, not_null => 1 },
        alias_domain_id => { type => 'int' },
    ],

    primary_key_columns => ['id'],

    unique_key   => ['alias'],
    foreign_keys => [
        user => {
            class             => 'PwebCyradm::User',
            key_columns       => { 'dest' => 'username' },
            relationship_type => 'one to one',
        },
        alias_domain => {
            class             => 'PwebCyradm::Domain',
            key_columns       => { 'alias_domain_id' => 'id' },
            relationship_type => 'one to one'

        }
    ]
);

1;
