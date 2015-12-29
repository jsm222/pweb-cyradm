package PwebCyradm::DB::Object;
use PwebCyradm::DB;
use Rose::DB::Object::Helpers qw/as_tree as_json/;
use base qw(Rose::DB::Object);

use strict;
use warnings;

sub init_db { PwebCyradm::DB->new }
1;
