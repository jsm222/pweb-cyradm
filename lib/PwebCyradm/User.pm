package PwebCyradm::User;
use base qw(PwebCyradm::DB::Object);
use strict;
use warnings;
__PACKAGE__->meta->setup(
    table => 'users',

    columns => [
        id       => { type => 'serial',  not_null => 1 },
        username => { type => 'varchar', length   => 255, not_null => 1 },
        password =>
          { type => 'varchar', length => 255, not_null => 1, lazy => 1 },
        role_id     => { type => 'int' },
        domain_id   => { type => 'int' },
        max_aliases => { type => 'int' }
    ],

    primary_key_columns => ['id'],

    unique_key => ['username'],

    relationships => [
        authitem => {
            class       => 'PwebCyradm::AuthItem',
            type        => 'one to one',
            key_columns => { role_id => 'id' }

        },
        domains => {
            type      => 'many to many',
            map_class => 'PwebCyradm::UserDomainMap',
            map_from  => 'user',
            map_to    => 'domain',
        },
        aliases => {
            class       => 'PwebCyradm::VirtualDelivery',
            type        => 'one to many',
            key_columns => { username => 'dest' }
        },

        admindomainids => {
            class       => 'PwebCyradm::UserDomainMap',
            type        => 'one to many',
            key_columns => { id => 'user_id' }
        },

        indomain => {
            class       => 'PwebCyradm::Domain',
            type        => 'one to one',
            key_columns => { domain_id => 'id' }
        }
    ],
);

sub getAdminDomainIds() {
    my $self      = shift;
    my @domainids = ();
    foreach my $admindomain ( $self->admindomainids ) {
        push( @domainids, $admindomain->domain_id );
    }
    if ( $#domainids == -1 ) {

        return [0];
    }
    return \@domainids;
}

1;

