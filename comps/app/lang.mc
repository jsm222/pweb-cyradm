<% # Copyright (c) 2015 Jesper Schmitz Mouridsen %>
<% # See the file LICENSE.txt for copying permission. %>
<%class>
	has 'language';
</%class>
% my $setlang;
% if($self->language) {
% $setlang = $self->language;
% } elsif($m->session->{"lang"}) {
% $setlang = $m->session->{"lang"};
% } else {
%     my @languages =
%    I18N::LangTags::implicate_supers(
%    I18N::LangTags::Detect::detect()
%    );
% my @translations = qw/da en/;
% foreach my $lng (@languages) {
% foreach my $transl(@translations) {
% if($transl eq $lng) {
% $setlang = $transl; 
% last;
% } 
% }
% }
% }
<script src="../static/js/lib/i18n/<% $setlang %>.js"></script>
