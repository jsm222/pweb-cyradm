package PwebCyradm::User::Manager;
use base qw(Rose::DB::Object::Manager);
use PwebCyradm::DB;
use strict;
use warnings;

sub object_class { 'PwebCyradm::User' }

__PACKAGE__->make_manager_methods('users');

sub get_users_with_alias_count {
    my ( $class, %args ) = @_;

    # group_by is an undocumented Manager parameter that
    # only works with get_objects_sql()
    $args{'group_by'} = 't1.id,t3.max_aliases_per_account';
    $args{'select'} = "$args{'select'},count(t2.alias) as aliases_count",
      my ( $sql, $bind ) = $class->get_objects_sql(%args);

    my @rows;

    eval {
        my $dbh = PwebCyradm::DB->new->retain_dbh;
        local $dbh->{'RaiseError'} = 1;
        my $sth = $dbh->prepare($sql);
        $sth->execute(@$bind);

        while ( my $row = $sth->fetchrow_hashref ) {
            push( @rows, $row );
        }

        $dbh->disconnect;
    };

    die "Could not get aliases_count: $@" if ($@);
    return \@rows;
}

1;
