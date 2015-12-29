<% # Copyright (c) 2015 Jesper Schmitz Mouridsen %>
<% # See the file LICENSE.txt for copying permission. %>
<%class>
	has 'lh';
	has 'authorize';
</%class>
% use PwebCyradm::AuthItem;
% my %assignments = %{$self->authorize->has_roles()};
% my $cnt = scalar(keys %assignments);
% if($cnt == 0 && $m->session->{"~uid~"}) {
<% $self->lh->maketext("You are not assigned any role") %>
% } elsif($cnt==0) {
<% $self->lh->maketext("You are not logged in") %>
% } elsif($cnt) {
% my $role = ((keys %assignments))[0];
<% $self->lh->maketext("You are logged in as [_1]",$role) %>

% }
 

