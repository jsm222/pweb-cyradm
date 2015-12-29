<% # Copyright (c) 2015 Jesper Schmitz Mouridsen %>
<% # See the file LICENSE.txt for copying permission. %>
<%class>
	has 'qtype'=>(default=>'username');
	has 'action'=>(default=>'');
	has 'q'=>(default=>'');
	has 'role_id'=>(default=>undef);
	has 'username'=>(default=>'');
	has 'id' =>(default=>0);
	has 'query' => (default=>undef);
	has 'domain_id' =>(isa => "ArrayRef[Int]","default"=>sub {[]});
	has 'sortname' =>(isa => "ArrayRef","default"=>sub {[]});
	has 'sortorder'=>(isa => "ArrayRef","default"=>sub {[]});
	has 'start'=>(default=>'0');
	has 'limit'=>(default=>'50');
	has 'page_limit'=>(default=>'10');
	has 'page'=>(default=>'1');
	has 'sortstr';
	has 'password'=>(default=>'');
        has 'passwordconfirm'=>(default=>'');
</%class>
% use strict;
% use warnings; 
% use JSON;
% use PwebCyradm::User;
% use PwebCyradm::Authenticate;
% use PwebCyradm::Authorize;
% use PwebCyradm::AuthorizeRules;
% use PwebCyradm::User::Manager;
% use PwebCyradm::UserDomainMap::Manager;
% use PwebCyradm::I18N;
% my $json = JSON->new;
% my $authorize = PwebCyradm::Authorize->new($m->session->{'~uid~'});
% my $rules = PwebCyradm::AuthorizeRules->new();
% my $lh = PwebCyradm::I18N->get_handle($m->session->{'lang'}) || die "What language";
% my $error = undef;
% if($self->action eq "save" || ($self->id ne "" && $self->id>0)) {
% my $user = PwebCyradm::User->new(id=>$self->id)->load();
% my $alteruid = $self->id;
% my $altertoroleid = defined($self->role_id) ? $self->role_id : $user->role_id;
% if($authorize->can_do("Administrator",\&PwebCyradm::AuthorizeRules::adminSaveUser,[$rules,$m->session->{"~uid~"},$alteruid,$altertoroleid])     
%   ) {
% if((scalar(@{$self->domain_id})<1) && (($altertoroleid == 3 && $user->role_id == 3) || $altertoroleid == 3)) {
% $error.=$lh->maketext("A domainadminsitrator must have at least one domain");
% }
%	if($altertoroleid && $altertoroleid >0 && $user->role_id != $altertoroleid) {
%    	$user->role_id($altertoroleid);
% 	}
% 
% 		if($self->password ne '' && $self->passwordconfirm ne '' && $self->password eq $self->passwordconfirm) {
% 	 		my $authenticate = PwebCyradm::Authenticate->new($conf->get("pwhash"));
%			$user->password($authenticate->hashpassword($self->password));
%		} elsif($self->password ne '' && $self->password ne $self->passwordconfirm)  {
%			$error.=$lh->maketext("The passwords does not match");
%		}
% if(!$error) {
% if($user->save()) {
% $user->password('');
% PwebCyradm::UserDomainMap::Manager->delete_userdomainmaps(
%	where =>
%        [
%          user_id    => { eq =>  $self->id},
%       ]);
% if($user->role_id == 3) {
% foreach my $domain_id(@{$self->domain_id}) {
% my $userdomainmap = PwebCyradm::UserDomainMap->new(user_id=>$self->id,domain_id=>$domain_id)->save();
% }
% } elsif (scalar(@{$self->domain_id})) {
% $m->res->status(404);
% }
% $user->domains;
% $user->authitem;
% print $user->as_json;
% } else { $self->error = $user->error; }
% }
% if($error) { print $json->encode({success=>0,errorMsg=>$error}); }	
% } else {
% $m->res->status(403);
% }
% } elsif($self->q) {
% my $query = ['username'=>{'like'=>[$self->q.'%']},'role_id'=>{'eq'=>3}];# 3 is domainadministrator
% if(!($authorize->can_do("SuperDomainAdministrator",sub {return 1;},[])) && $authorize->can_do("ManageDomains",sub{ return 1;},[])) {
% my $currentuser = PwebCyradm::User->new(id=>$m->session->{"~uid~"});
% my @domains = $currentuser->admindomainsid;	
% my @domainids = ();
% foreach my $domainid(@domains) {
% push(@domainids,$domainid);
% }
%  $query = ['username'=>{'like'=>[$self->q.'%']},'domain_id'=>{'IN'=>\@domainids}];
% }
% my  $users = 
%    PwebCyradm::User::Manager->get_users
%    (
%      query=>$query,
%      multi_many_ok   => 1,
%      limit   => $self->page_limit,
%      offset  => ($self->page-1)*$self->page_limit,
%      );
%  my $cnt = PwebCyradm::User::Manager::get_users_count(
% query=>$query,
%       multi_many_ok   => 1,
% );
% 
% my @rows = qw//; 
% map { push(@rows,$_->as_json)} @{$users};
% print '{"total":'.$cnt.',"results":['.join(",",@rows).'],"more":'.(($cnt>scalar(@rows)) ? 'true':'false').'}';
% }  elsif ($authorize->can_do("Administrator",sub {return 1},[])) {
% if($self->qtype eq "authitem") { $self->qtype("auth_item")};
% my @query = ('t1.domain_id'=>{"is_not"=>undef});
% push(@query,$self->qtype=>{"like"=>[$self->query.'%']}) unless ($self->qtype eq 't1.id' || $self->qtype eq 'id');
% push(@query,$self->qtype=>{"eq"=>[$self->query]}) if ($self->qtype eq 'id' || $self->qtype eq 't1.id') && $self->query ne '' && $self->query > 0;
% my $i = 0;
% $self->sortstr("");
% foreach my $sortcolumn(@{$self->sortname}) {
% $sortcolumn = "t1.$sortcolumn";
% $self->sortstr(($self->sortstr.$sortcolumn." ".$self->sortorder->[$i]).","); 
% $i++;
% }
% if($self->sortstr eq "") {
% $self->sortstr("username asc");
% } else {$self->sortstr(substr($self->sortstr,0,-1))}
% if($self->qtype eq "domains") {
% $self->qtype("domain_name");
% }
% 
% my  $users = 
%    PwebCyradm::User::Manager->get_users
%    (
%	query=>\@query,
%      multi_many_ok   => 1,
%      sort_by => $self->sortstr,
%      limit   => $self->limit,
%      offset  => $self->start,
%      with_objects=>['domains','authitem']
%      );
%  my $cnt = PwebCyradm::User::Manager::get_users_count(
% 	query=>\@query,
% 	with_objects=>['authitem','domains'],
%      multi_many_ok   => 1,
% );
% 
% my @rows = qw//; 
% map { push(@rows,$_->as_json)} @{$users};
% print '{"request":{"start":'.$self->start.',"total":'.$cnt.'},"results":['.join(",",@rows).']}';
% } else   {
% $m->res->status(403);
% }

