package PwebCyradm::Domain::Manager;

use base qw(Rose::DB::Object::Manager);

sub object_class { 'PwebCyradm::Domain' }

__PACKAGE__->make_manager_methods('domains');

1;
