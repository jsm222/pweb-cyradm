package PwebCyradm::UserDomainMap::Manager;

use base qw(Rose::DB::Object::Manager);

sub object_class { 'PwebCyradm::UserDomainMap' }

__PACKAGE__->make_manager_methods('userdomainmaps');

1;
