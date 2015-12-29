package PwebCyradm::Mason;
use Poet qw($conf $poet);
use Poet::Moose;

extends 'Poet::Mason';

# Add customizations to Poet::Mason here.
#
# e.g. Add plugins
#
override 'get_plugins' => sub {
        return ( 'HTMLFilters', 'RouterSimple', 'Cache');

};

# You can also create Mason subclasses in PwebCyradm/Mason, e.g.
# PwebCyradm::Mason::Request, and they will be autodetected by Mason.

1;
