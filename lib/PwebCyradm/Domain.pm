package PwebCyradm::Domain;
use base qw(PwebCyradm::DB::Object);
use strict;
use warnings;
__PACKAGE__->meta->setup(
    table => 'domains',

    columns => [
        id          => { type => 'serial',  not_null => 1 },
        domain_name => { type => 'varchar', length   => 255, not_null => 1 },
        max_quota_per_account   => { type => 'int' },
        max_accounts_per_domain   => { type => 'int' },
        max_aliases_per_account => { type => 'int' },
		is_alias_domain => { type => 'bool' },
    ],

    primary_key_columns => ['id'],

    unique_key    => ['domain_name'],
    relationships => [
        users => {
            type      => 'many to many',
            map_class => 'PwebCyradm::UserDomainMap',
            map_from  => 'domain',
            map_to    => 'user',
        },
      ]

);

1;

