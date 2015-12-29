package PwebCyradm::User::QueryBuilder;
use PwebCyradm::DB;
use Rose::DB::Object::QueryBuilder qw(build_select);
use strict;
use warnings;

# Build simple query
my $db  = PwebCyradm::DB->new();
my $sql = build_select(
    dbh          => $db->dbh,
    select       => 'COUNT(*)',
    tables       => ['users'],
    columns      => { users => [qw(id username)] },
    query_is_sql => 1,
);

my $sth = $db->dbh->prepare($sql);
$sth->execute;
my $count = $sth->fetchrow_array;
print $count;
1;
