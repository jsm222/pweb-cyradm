<% # Copyright (c) 2015 Jesper Schmitz Mouridsen %>
<% # See the file LICENSE.txt for copying permission. %>
<%class>
	has 'qtype'=>(default=>'alias');
	has 'sortstr';
	has 'action'=>(default=>'');
	has 'id'=>(default=>-1);
	has 'dest'=>(default=>-1);
	has 'alias'=>(default=>0);
	has 'limit'=>(default=>50);
	has 'start'=>(default=>0);
	has 'query'=>(Default=>'%');
	has 'user_id'=>(Default=>0);
	has 'domain_id'=>(Default=>0);
	has 'sortname' =>(isa => "ArrayRef",default=>sub {[]});
	has 'sortorder'=>(isa => "ArrayRef",default=>sub{[]});
</%class>
% use Email::Valid;
% use PwebCyradm::I18N;
% use PwebCyradm::VirtualDelivery;
% use PwebCyradm::VirtualDelivery::Manager;
% use PwebCyradm::Authorize;
% use PwebCyradm::AuthorizeRules;
% use JSON;
% use Rose::DB::Object::QueryBuilder qw(build_select);
% my $authorize = PwebCyradm::Authorize->new($m->session->{'~uid~'});
% my $rules = PwebCyradm::AuthorizeRules->new;
% my $json = JSON->new;
% my $lh = PwebCyradm::I18N->get_handle($m->session->{'lang'}) || die "What language";
% my $error ="";
% if($self->action eq "save" || ($self->id ne '' && $self->id >0 && $self->action eq '')) {
% if($authorize->can_do("SuperDomainAdministrator",sub { return 1},[]) 
% || $authorize->can_do("DomainAdministrator",\&PwebCyradm::AuthorizeRules::testIdInAdminDomains,[$rules,$m->session->{"~uid~"},0,$self->domain_id]) 
% || $authorize->can_do("AccountUser",\&PwebCyradm::AuthorizeRules::testIdInOwnDomain,[$rules,$m->session->{"~uid~"},$self->domain_id])) {
% my $alias = undef;
% my $domain = undef;	
% my $user = undef;
% my $username = undef;
% if($self->domain_id ne '' && $self->domain_id >0) {
% $domain = PwebCyradm::Domain->new(id=>$self->domain_id)->load();
% } else { $error.= (($error) ? "\n" : "").$lh->maketext("Please choose the domain for the alias"); }
% if($self->user_id ne '' && $self->user_id > 0) {
% $user =PwebCyradm::User->new(id=>$self->user_id)->load(); 
% } else  {
% $error.= (($error) ? "\n" : "").$lh->maketext("Please choose the account for the alias"); 
% }	
% if($self->id ne '' && $self->id > 0) {	
% $alias = PwebCyradm::VirtualDelivery->new('id'=>$self->id)->load();
% } elsif($self->action eq 'save' && $self->id ne '' && $self->id == -1) {
% 
% }
% if(!$error) {
% $username = $user->username;
% my $mycountquery  = [dest=>$username],
% my $dbh = PwebCyradm::DB->new->retain_dbh;
% my  ($sql,$bind) = build_select
%    (
%      dbh     =>$dbh,
%      tables=>['virtual_delivery'],
%      select=>[("count(dest)")],
%      columns=>{'virtual_delivery'=>[qw(dest)]},	 
%      query   =>$mycountquery,
%      query_is_sql=>1	
% );
%    my $sth = $dbh->prepare($sql);
%    $sth->execute(@{$bind});
%    my $count = $sth->fetchrow_array;
%    if(($count >= $domain->max_aliases_per_account && $domain->max_aliases_per_account>0) || ($count >= $user->max_aliases && $user->max_aliases >0)) {
%    if($count >= $user->max_aliases && $user->max_aliases>0) {
%	$error.=$lh->maketext("The number of max aliases for the account ([_1]) has been reached",$user->max_aliases);
%    } elsif($count >= $domain->max_aliases_per_account && $domain->max_aliases_per_account>0) {
%	$error.=(($error) ? "\n" :"").$lh->maketext("The number of max aliases for the account ([_1]) in this domain is reached",$domain->max_aliases_per_account);
%    }  	
%    }
% }
% if(!$error) {
% if(!($alias)) {
% $alias = PwebCyradm::VirtualDelivery->new(dest=>$username);	
% }		  
% if(Email::Valid->address(-address=>$self->alias."@".$domain->domain_name,-fqdn=>1)) {
% $alias->alias($self->alias."@".$domain->domain_name);
% } else { $error.=(($error) ? " " :"").$lh->maketext("The alias [_1] is not a valid email address",$self->alias."@".$domain->domain_name);}
% $a = PwebCyradm::VirtualDelivery->new(alias=>$self->alias."@".$domain->domain_name);
% $b = PwebCyradm::User->new("username"=>$self->alias."@".$domain->domain_name);
% if($a->load(speculative=>1)) {
% $error.=(($error) ? " " :"").$lh->maketext("The alias [_1] is already in use",$self->alias."@".$domain->domain_name);
% }
% if($b->load(speculative=>1)) {
% $error.=(($error) ? " " :"").$lh->maketext("The alias [_1] is already in use as a username",$self->alias."@".$domain->domain_name);
% }
% }
% if(!$error) {
% $alias->alias_domain_id($self->domain_id);
% $alias->save;
% $alias->user;
% $alias->alias_domain;
% print $alias->as_json;
% } 
% if($error) {
% print $json->encode({success=>0,errorMsg=>$error});
% }
% } else {
% $m->res->status(403);	
% }
% } elsif($self->action eq "delete" && $self->id > 0)  { 
% my $alias = PwebCyradm::VirtualDelivery->new(id=>$self->id)->load();
% $json->encode({success=>$alias->delete});
% } else {
% my $i = 0;
% $self->sortstr("");
% foreach my $sortcolumn(@{$self->sortname}) {
% $sortcolumn = "t1.$sortcolumn";
% $self->sortstr(($self->sortstr.$sortcolumn." ".$self->sortorder->[$i]).","); 
% $i++;
% }
% my @query = ();
% my $compare="like";
% if($self->qtype eq "id") {
% $compare = "eq";
% }
% if($self->query) {	
% push(@query,($self->qtype=>{$compare=>[$self->query.'%']}));
% }
% if(($authorize->can_do("SuperDomainAdministrator",sub {return 1},[]))
% || ($authorize->can_do("DomainAdministrator",sub { my $ref = PwebCyradm::User->new("id"=>$m->session->{"~uid~"})->load->admindomainids; my $size = @{$ref}; return $size; },[]) && push(@query,("alias_domain_id"=>PwebCyradm::User->new("id"=>$m->session->{"~uid~"})->load->getAdminDomainIds)))
% || ($authorize->can_do("AccountUser",sub { return 1},[]) && push(@query,("t2.id"=>{"eq"=>$m->session->{"~uid~"}}))) ) {
% if($self->sortstr eq "") {
% $self->sortstr("t1.id asc");
% } else {$self->sortstr(substr($self->sortstr,0,-1))}
% my $aliases = 
%    PwebCyradm::VirtualDelivery::Manager->get_virtual_deliveries
%    (	
%
%      query=>\@query,
%      with_objects=>['user','alias_domain'],	
%      multi_many_ok   => 1,
%      sort_by => $self->sortstr,
%      limit   => $self->limit,
%      offset  => $self->start,
%      
%      );
%  my $cnt = PwebCyradm::VirtualDelivery::Manager->get_virtual_deliveries_count(
%      with_objects=>['user','alias_domain'],	
% 	query=>\@query,
% 	
%      multi_many_ok   => 1,
% );
% 
% my @rows = qw//; 
% map { push(@rows,$_->as_json)} @{$aliases};
% print '{"request":{"start":'.$self->start.',"total":'.$cnt.'},"results":['.join(",",@rows).']}';
% }
%  else {
%	$m->res->status(403); 
% }
% }
