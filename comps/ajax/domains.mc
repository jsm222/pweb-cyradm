<% # Copyright (c) 2015 Jesper Schmitz Mouridsen %>
<% # See the file LICENSE.txt for copying permission. %>
<%class>
        has 'q' => (default=>'');
        has 'all'=>(default=>'');
	has 'qtype'=>(default=>'domain_name');
	has 'page_limit'=>(default=>'10');
	has 'page'=>(default=>'1');
        has 'domain_name'=>(default=>undef);
	has 'is_alias_domain'=>(default=>0);
	has 'id' =>(default=>-1);
	has 'action'=>(default=>'');
	has 'query' => (default=>undef);
	has 'user_id' =>(isa => "ArrayRef[Int]","default"=>sub{[]});
	has 'max_quota_per_account'=>(default=>undef);
	has 'max_accounts_per_domain'=>(default=>undef);
	has 'max_aliases_per_account'=>(default=>undef);
	has 'sortname' =>(isa => "ArrayRef","default"=>sub {[]});
	has 'sortorder'=>(isa => "ArrayRef","default"=>sub {[]});
	has 'start'=>(default=>'0');
	has 'limit'=>(default=>'50');
	has 'sortstr';
</%class>
% use JSON;
% use PwebCyradm::I18N;
% use PwebCyradm::Domain;
% use PwebCyradm::Authorize;
% use PwebCyradm::Domain::Manager;
% use PwebCyradm::UserDomainMap::Manager;
% my $json = JSON->new;
% my $authorize = PwebCyradm::Authorize->new($m->session->{'~uid~'});
% my $lh = PwebCyradm::I18N->get_handle($m->session->{'lang'}) || die "What language";
% if($self->id ne "" && $self->id >-1 && $self->action eq "delete") {
% if($authorize->can_do("DeleteDomain",sub {return 1;},[])) {
% my $domain = PwebCyradm::Domain->new(id=>$self->id)->load();
% if($domain->delete) {
% print $json->encode({success=>1});
% } else {
% print $json->encode({success=>0});
% }
% } else {
% $m->res->status(403);
% }
% }
% elsif($self->id eq '' && $self->action eq 'save') {
% my $error="";
% if($authorize->can_do("CreateDomain",sub {return 1;},[])) {
% my $domain;
% if($self->is_alias_domain eq "1" && $self->domain_name) {
% $domain = PwebCyradm::Domain->new(domain_name=>$self->domain_name,is_alias_domain=>1,max_aliases_per_account=>undef,max_quota_per_account=>undef,max_accounts_per_domain=>undef);
% } elsif($self->domain_name) {
% if(!defined($self->max_quota_per_account) || $self->max_quota_per_account eq "") { $error.=$lh->maketext("Max quota per account is as required field for a non alias domain"); }
% if(defined($self->max_aliases_per_account) && $self->max_aliases_per_account eq "") { $self->max_aliases_per_account(undef);}
% $domain = PwebCyradm::Domain->new(domain_name=>$self->domain_name,max_aliases_per_account=>$self->max_aliases_per_account,max_quota_per_account=>$self->max_quota_per_account);
% }
% if(defined($domain)) {
% my $d = PwebCyradm::Domain->new("domain_name"=>$self->domain_name);
% if(!$d->load(speculative=>1))  {
% my $users=[];
% if(scalar(@{$self->user_id})) {
% $users = PwebCyradm::User::Manager->get_users(
%	query=>
%	[
%	id=>{"eq"=>$self->user_id},
%	role_id=>{"eq"=>3}
%	]
%	);
% 
% $domain->users($users);
% }
% if(!$error && $domain->save) {
% print $domain->as_json;
% } else { print $json->encode({success=>0,errorMsg=>$error}); }
% } else { print $json->encode({success=>0,errorMsg=>$lh->maketext("Domain already exists")}); }
% } else { print $json->encode({success=>0,errorMsg=>$lh->maketext("Missing information")}); }
% } else { $m->res->status(403); }
% } elsif(defined($self->id) && $self->id >0 && $self->action ne "delete")  {
% if($authorize->can_do("UpdateDomain",sub {return 1;},[])) {
% my $domain = PwebCyradm::Domain->new(id=>$self->id);
% my $error="";
% $domain->load({with=>"users"});
% if($self->is_alias_domain ne "1") {
% $domain->is_alias_domain(0);
% if(defined($self->max_quota_per_account) && $self->max_quota_per_account  ne '') {
% $domain->max_quota_per_account($self->max_quota_per_account);
% } elsif(defined($self->max_quota_per_account))  {$error.=$lh->maketext("Max quota per account is as required field for a non alias domain"); }
% if($self->max_aliases_per_account) {
% $domain->max_aliases_per_account($self->max_aliases_per_account);
% } elsif(defined($self->max_aliases_per_account)) {
% 	$domain->max_aliases_per_account(undef);
% }
% if($self->max_accounts_per_domain) {
%	my $account_cnt = PwebCyradm::User::Manager::get_users_count(
%	query=>["domain_id"=>{"eq"=>$self->id}]);
%       if($self->max_accounts_per_domain < $account_cnt) {
%	$error.=$lh->maketext("The domain [_1] has already more than [_2] accounts ([_3])",$domain->domain_name,$self->max_accounts_per_domain,$account_cnt);
% } else {
% $domain->max_accounts_per_domain($self->max_accounts_per_domain);
% }
% }
% } else {
% $domain->max_accounts_per_domain(undef);
% $domain->max_aliases_per_account(undef);
% $domain->max_quota_per_account(undef);
% $domain->is_alias_domain(1);
% }
% if($self->domain_name) {
% $domain->domain_name($self->domain_name);
% } elsif(defined($self->domain_name)) {
% $error.=$lh->maketext("Missing domain name");
% }
% my $users=[];
% my $userid = $self->user_id;
% if(scalar(@{$self->user_id})) {
% $users = PwebCyradm::User::Manager->get_users(
%	query=>
%	[
%	id=>{"eq"=>$userid},
%	role_id=>{"eq"=>3}
%	]);
% }
% if(($self->id && $self->domain_name) || $self->id &&
%     !($self->domain_name) && (
%	  !(defined($self->max_quota_per_account)) &&
%     !(defined($self->max_aliases_per_account)) &&
%     !(defined($self->max_accounts_per_domain))))
%     {
% $domain->users($users);
% }
% my $d;
% if(defined($self->domain_name)) {
% $d = PwebCyradm::Domain->new("domain_name"=>$self->domain_name);
% }
% if((!defined($d) || (defined($d) && !$d->load(speculative=>1) || (defined($d) && $self->id && $d->load()->id == $self->id))) && !$error) {
% $domain->save();
% $domain->load({with=>"users"});
% $domain->users;
% print $domain->as_json;
% } elsif(defined($d) && !$error) {
% $error.=$lh->maketext("Domain already exists");
% }
% if($error) {
% print $json->encode({success=>0,errorMsg=>$error});
% }
% } else { $m->res->status(403); }
% } elsif($self->q) {
% if($authorize->can_do("DomainAdministrator",sub {return 1;},[]) || $authorize->can_do("AccountUser",sub {return 1},[])) {
% my $query = [is_alias_domain=>0,domain_name=>{"like"=>[$self->q.'%']}];
% if($self->all) {
% $query = [domain_name=>{"like"=>[$self->q.'%']}];
% }
% my $currentuser = PwebCyradm::User->new(id=>$m->session->{"~uid~"})->load();
% if(!($authorize->can_do("SuperDomainAdministrator",sub {return 1;},[]))) {
% if($authorize->can_do("DomainAdministrator",sub {my $size = @{$currentuser->admindomainids};return ($size>0)},[])) {
% my @domains = $currentuser->admindomainids;
% my @domainids = ();
% foreach my $domain(@domains) {
% push(@domainids,$domain->domain_id);
% }
% if(!(scalar(@domainids))>0) {
% push(@domainids,0);
% }
% if($self->all) {
% $query = [domain_name=>{"like"=>[$self->q.'%']},'id'=>\@domainids];
% } else {
% $query = [is_alias_domain=>0,domain_name=>{"like"=>[$self->q.'%']},'id'=>\@domainids];
% }
% } elsif($authorize->can_do("AccountUser",sub {return 1},[])) {
% if($self->all) {
% $query = [domain_name=>{"like"=>[$self->q.'%']},'id'=>{"eq"=>$currentuser->domain_id}];
% } else {
% $query = [is_alias_domain=>0,domain_name=>{"like"=>[$self->q.'%']},'id'=>{"eq"=>$currentuser->domain_id}];
% }
% }
% }
% my  $domains = 
%    PwebCyradm::Domain::Manager->get_domains
%    (
%	query=>$query,
%      multi_many_ok   => 1,
%      limit   => $self->page_limit,
%      offset  => ($self->page-1)*$self->page_limit,
%      );
% my $cnt = PwebCyradm::Domain::Manager::get_domains_count(
%  query=>$query,
%   multi_many_ok=> 1,
% );
% my @rows = qw//; 
% map { push(@rows,$_->as_json)} @{$domains};
% print '{"total":'.$cnt.',"results":['.join(",",@rows).'],"more":'.(($cnt>scalar(@rows)) ? 'true':'false').'}';
% } else {$m->res->status(403); }
% } elsif($authorize->can_do("ManageDomains",sub {return 1},[])) {
% my $i = 0;
% $self->sortstr("");
% foreach my $sortcolumn(@{$self->sortname}) {
% $sortcolumn = "t1.$sortcolumn";
% $self->sortstr(($self->sortstr.$sortcolumn." ".$self->sortorder->[$i]).","); 
% $i++;
% }
% if($self->sortstr eq "") {
% $self->sortstr("domain_name asc");
% } else {$self->sortstr(substr($self->sortstr,0,-1))}
% if($self->qtype eq "managedby") {
% $self->qtype("username");
% }
% my $query = [];
% $query =[$self->qtype=>{"like"=>[$self->query.'%']}] if ($self->qtype ne "t1.id" && $self->qtype ne "id" and $self->query ne "");  
% $query =[$self->qtype=>{"eq"=>[$self->query]}] if ($self->qtype eq "t1.id" || $self->qtype eq "id" and $self->query ne "" && $self->query >0);  
% my  $domains = 
%    PwebCyradm::Domain::Manager->get_domains
%    (
%      query=>$query,
%      multi_many_ok   => 1,
%      sort_by => $self->sortstr,
%      limit   => $self->limit,
%      offset  => $self->start,
%      with_objects=>['users']
%      );
%  my $cnt = PwebCyradm::Domain::Manager::get_domains_count(
%      
% 	query=>$query,
% 	with_objects=>['users'],
%      multi_many_ok   => 1,
% );
% my @rows = qw//; 
% map { push(@rows,$_->as_json)} @{$domains};
% print '{"request":{"start":'.$self->start.',"total":'.$cnt.'},"results":['.join(",",@rows).']}';
% } else {
% $m->res->status(403);
% }

