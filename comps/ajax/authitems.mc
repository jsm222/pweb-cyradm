<% # Copyright (c) 2015 Jesper Schmitz Mouridsen %>
<% # See the file LICENSE.txt for copying permission. %>
% use PwebCyradm::AuthItem;
% use PwebCyradm::User;
% use PwebCyradm::Authorize;
% use PwebCyradm::AuthItem::Manager;
% my $currentuser = PwebCyradm::User->new(id=>$m->session->{"~uid~"})->load();
% my $maxroleid = $currentuser->role_id;--$maxroleid;
% my $authorize = PwebCyradm::Authorize->new($m->session->{'~uid~'});
% my  $authitems = 
%    PwebCyradm::AuthItem::Manager->get_auth_items
%    (
%	query=>[id=>{gt=>$maxroleid}]
%     );
%  my $cnt = PwebCyradm::User::Manager::get_users_count(
%   query=>[id=>{gt=>$maxroleid}]
% );
% my @rows = qw//; 
% map { push(@rows,$_->as_json)} @{$authitems};
% print '{"request":{"start":0,"total":'.$cnt.'},"results":['.join(",",@rows).']}';
