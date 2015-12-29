package PwebCyradm::AuthItem::Manager;

use base qw(Rose::DB::Object::Manager);

sub object_class { 'PwebCyradm::AuthItem' }

__PACKAGE__->make_manager_methods('auth_items');

1;
