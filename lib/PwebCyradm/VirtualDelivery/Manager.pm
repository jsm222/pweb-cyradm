package PwebCyradm::VirtualDelivery::Manager;

use base qw(Rose::DB::Object::Manager);

sub object_class { 'PwebCyradm::VirtualDelivery' }

__PACKAGE__->make_manager_methods('virtual_deliveries');

1;
