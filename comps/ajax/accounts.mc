<% # Copyright (c) 2015 Jesper Schmitz Mouridsen %>
<% # See the file LICENSE.txt for copying permission. %>
<%class>
	has 'q' => (default=>'');
	has 'action'=>(default=>'');
	has 'qtype'=>(default=>'username');
	has 'page_limit'=>(default=>'10');
	has 'page'=>(default=>'1');
	has 'password'=>(default=>'');
	has 'passwordconfirm'=>(default=>'');
        has 'domain_name'=>(default=>'');
	has 'domain_id'=>(default=>-1);
	has 'username'=>(default=>'');
	has 'id' =>(default=>-1);
	has 'query' => (default=>undef);
	has 'user_id' =>(isa => "ArrayRef[Int]","default"=>sub{[]});
	has 'max_aliases'=>(default=>-1);
	has 'sortname' =>(isa => "ArrayRef","default"=>sub {[]});
	has 'sortorder'=>(isa => "ArrayRef","default"=>sub {[]});
	has 'start'=>(default=>'0');
	has 'limit'=>(default=>'50');
	has 'sortstr';
	has 'quota'=>(default=>-1);
</%class>
% use PwebCyradm::IMAP::Admin;
% use PwebCyradm::I18N;
% use PwebCyradm::Domain;
% use PwebCyradm::User::Manager;
% use JSON;
% use Email::Valid;
% use PwebCyradm::Authenticate;
% use PwebCyradm::Authorize;
% use PwebCyradm::Domain;
% use PwebCyradm::AuthorizeRules;
% my $authorize = PwebCyradm::Authorize->new($m->session->{'~uid~'});
% my $rules = PwebCyradm::AuthorizeRules->new;
% my $json = JSON->new;
% my $imap = PwebCyradm::IMAP::Admin->new($conf->get("imaphost"),$conf->get("imapadminuser"),$conf->get("imapadminpassword"));
% my $lh = PwebCyradm::I18N->get_handle($m->session->{'lang'}) || die "What language";
% if($self->action eq 'save' || ($self->id ne "" && $self->id >0 && $self->action eq '')) {
% my $existinguser = 0;
% my $testid = 0;
% my $ownaccount = 0;
% if($self->id ne '' && $self->id >0) {
% $existinguser =1;
% $testid=$self->id;
% } else {
% $existinguser =0;
% $testid=$self->domain_id;
% }
% if($authorize->can_do("SuperDomainAdministrator",sub{return 1;},[]) || $authorize->can_do("DomainAdministrator",\&PwebCyradm::AuthorizeRules::testIdInAdminDomains,[$rules,$m->session->{"~uid~"},$existinguser,$testid]) || (($existinguser && $authorize->can_do("AccountUser",sub {$_[0] == $_[1]},[$self->id,$m->session->{"~uid~"}])) and $ownaccount=1)) {
% my $user = undef;
% my $usersdomain=undef;
% my $error = undef;
% 	if($self->id ne '' && $self->id >0) {
%   	$user = PwebCyradm::User->new(id=>$self->id)->load(with=>['indomain']);
%	$usersdomain = $user->indomain;
% 	} else {
%	$user = PwebCyradm::User->new();
%	my $account_cnt = PwebCyradm::User::Manager::get_users_count(
%	query=>["domain_id"=>{"eq"=>$self->domain_id}]);
%	my $newdomain = PwebCyradm::Domain->new(id=>$self->domain_id)->load;
%	if($account_cnt >0 && $account_cnt eq $newdomain->max_accounts_per_domain) {
%	$error.=$lh->maketext("The number ([_1]) of accounts allowed for the domain [_2] has been reached",$newdomain->max_accounts_per_domain,$newdomain->domain_name)."\n";
%	}
%	$user->role_id(4);#AccountUser
%	if($self->password eq '') {
% 	$error.= $lh->maketext("Please enter a password")."\n";	
%	}
%	if($self->passwordconfirm eq '') {
% 	$error.= $lh->maketext("Please confirm the password")."\n";
%	}
% 	}
%	if($self->domain_id ne '' && $self->domain_id >-1) {
%	$usersdomain = PwebCyradm::Domain->new(id=>$self->domain_id)->load();
%	$user->domain_id($self->domain_id);
%       }
% 	if($usersdomain) {
%             if($self->password ne '' && $self->passwordconfirm ne '' && $self->password eq $self->passwordconfirm) {
% 	 		my $authenticate = PwebCyradm::Authenticate->new($conf->get("pwhash"));
%			$user->password($authenticate->hashpassword($self->password));
%		} elsif($self->password ne '' && $self->password ne $self->passwordconfirm)  {
%			$error.=$lh->maketext("The passwords does not match")."\n";
%		}
%          if($ownaccount==0) {
% 	      if($self->max_aliases ne '' && $self->max_aliases > -1 && $self->max_aliases > $usersdomain->max_aliases_per_account) {
% 		$error.=$lh->maketext("The max number of aliases for the domain is [_1]",$usersdomain->max_aliases_per_account);
%		} elsif($self->max_aliases ne "" && $self->max_aliases >-1) {
%		$user->max_aliases($self->max_aliases);	
%		}
%		if($self->max_aliases eq '') {
%		$user->max_aliases(undef);
%		}
% 	      if(($self->quota ne "" && $self->quota > -1 && $self->quota > $usersdomain->max_quota_per_account && $usersdomain->max_quota_per_account >0) ||($self->quota ne "" && $self->quota == 0 && $usersdomain->max_quota_per_account>0 ))  {
% 		$error.=$lh->maketext("The max quota for the domain is [_1]",$usersdomain->max_quota_per_account);
%		} else { 
%			if($self->quota ne "" && $self->quota > -1 ) {
%				if($self->quota == 0) {
% 				$self->quota('none');
%	 			}
%			} elsif($self->quota eq "" && $usersdomain->max_quota_per_account) {	
%			$self->quota($usersdomain->max_quota_per_account);
%			} else {$self->quota(0); }
%	}	
%		if($self->domain_id > -1 && $self->username ne '') {
%			if(Email::Valid->address($self->username."\@".$usersdomain->domain_name)) {
%			$user->username($self->username."\@".$usersdomain->domain_name);
%			} else {
%			$error.=$lh->maketext("[_1] is not a valid email adress",$self->username."\@".$usersdomain->domain_name)."\n";
%		 	}
%			my $u = PwebCyradm::User->new(username=>$self->username."\@".$usersdomain->domain_name);
%			if($u->load(speculative=>1)) {
%			$error.= $lh->maketext("Account already exists")."\n";	
%			}
%			my $a = PwebCyradm::VirtualDelivery->new(alias=>$self->username."\@".$usersdomain->domain_name);
%			if($a->load(speculative=>1)) {
%			$error.= $lh->maketext("Alias with the same name already exists")."\n";
%			}
%		}
%           }
% 	} else {
%	$error.=$lh->maketext("Please fill out the form appropiatly")."\n";
%	}
% if(!($error)) {
% if($user->save()) {
% $user->password('');
% if($self->id ne '' && $self->id > -1) {
% 	if($self->quota eq 'none' || $self->quota > -1) {
% 	$imap->set_quota("user.".$user->username,$self->quota);
% 	}
% } else {
% 	$error.= $imap->create_mailbox($user->username,["Sent","Trash","Spam"]);
% 		if(!($error)) {
% 		$imap->set_quota("user.".$user->username,$self->quota);
% 		}
% 	}
% } else { $error.=$user->error; }
% } if($error) { print $json->encode({success=>0,errorMsg=>$error});
% } else {
% my @quota = $imap->get_quotaroot("user.".$user->{"username"});
% my $aliases_count = scalar(@{$user->aliases});
% my $max_aliases_per_account = $user->indomain->max_aliases_per_account;
% my $max_aliases = $user->max_aliases;
% $user = $user->as_tree;
% $user->{'aliases'}=undef;
% $user->{"aliases_count"} =$aliases_count;
% $user->{"max_aliases"} =($max_aliases) ? $max_aliases  : $max_aliases_per_account;
% $user->{"quota_used"} = $quota[1];
% $user->{"quota"} = $quota[2];
% $user->{"quota_percentage"} = ($quota[2]) ? (($quota[1]/$quota[2])*100)." %" : "N/A";
% print $json->encode($user);
% }
% } else { $m->res->status(403); }; 
% } elsif(defined($self->id) && $self->id > 0 && $self->action eq "delete") {
% my $db = PwebCyradm::DB->new;
% $db->begin_work;
% if($authorize->can_do("Administrator",sub{return $_[0] != $_[1]},[$m->session->{"~uid~"},$self->id])
% || $authorize->can_do("SuperDomainAdministrator",sub {return $_[0]!=$_[1]},[$m->session->{"~uid~"},$self->id])
% || ($self->id != $m->session->{"~uid~"} && $authorize->can_do("DeleteAccount",\&PwebCyradm::AuthorizeRules::testIdInAdminDomains,[$rules,$m->session->{"~uid~"},1,$self->id]))) {
% my $user = PwebCyradm::User->new(id=>$self->id,db=>$db)->load(with=>["aliases"]);
% foreach my $alias ($user->aliases) {
%	$alias->delete();
% }
% my $result = $user->delete(db=>$db);
% if($result) {
% my $error = "";
% #$imap->del_mailbox($user->username);
% if(!$error) {
% $db->commit();
% print $json->encode({"success"=>$result});
% } else { print $json->encode({"success"=>$result}); $db->rollback;}
% } else { print $json->encode({"success"=>$result}); }
% } else {
% $m->res->status(403);
% }
% } else {
% my @query = ();
% if($self->query) {
% my $compare="like";
% if($self->qtype eq "id") {
% $compare = "eq";
% }
% push(@query,($self->qtype=>{$compare=>[$self->query.'%']}));
% } elsif($self->q ne "") {
% push(@query,("username"=>{"like"=>[$self->q.'%']}));
% }
% if(($authorize->can_do("SuperDomainAdministrator",sub {return 1},[]) && push(@query,("role_id"=>{"gt"=>(PwebCyradm::User->new("id"=>$m->session->{"~uid~"})->load->role_id)-1})))
% || ($authorize->can_do("DomainAdministrator",sub {  my $ref = PwebCyradm::User->new("id"=>$m->session->{"~uid~"})->load->admindomainids; my $size = @{$ref}; return $size},[]) && push(@query,("domain_id"=>PwebCyradm::User->new("id"=>$m->session->{"~uid~"})->load->getAdminDomainIds)))
% || ($authorize->can_do("AccountUser",sub { return 1},[]) && push(@query,("id"=>{"eq"=>$m->session->{"~uid~"}})))
% )
% {
% my $i = 0;
% $self->sortstr("");
% foreach my $sortcolumn (@{$self->sortname}) {
% if($sortcolumn eq "aliases_count") {
% $sortcolumn = "count(t2.dest)";
% } 
% elsif($sortcolumn eq "max_aliases") {
% $sortcolumn = "coalesce(t1.max_aliases,t3.max_aliases_per_account)";
% } else {
% $sortcolumn = "t1.$sortcolumn";
% }
% $self->sortstr(($self->sortstr.$sortcolumn." ".$self->sortorder->[$i]).","); 
% $i++;
% }
% if($self->sortstr eq "") {
% $self->sortstr("t1.id asc");
% } else {$self->sortstr(substr($self->sortstr,0,-1))}
% my  $users = 
%    PwebCyradm::User::Manager->get_users_with_alias_count
%    (
% select=>'t1.id,t1.username,coalesce(t1.max_aliases,t3.max_aliases_per_account) as max_aliases',
%     	multi_many_ok   => 1,
%      	limit   => 50,
%      	offset  => 0,
%	query=>\@query,
%      	with_objects=>['aliases','indomain'],
%      	sort_by => $self->sortstr,
%	limit =>$self->limit,
%	offset=>$self->start
%    );
%  my $cnt = PwebCyradm::User::Manager::get_users_count(
%       query=>\@query
% );
% my @rows = qw//; 
% my @results;
% $json->utf8(1);
% if($self->q eq "") {
% map { 
% my @quota = $imap->get_quotaroot("user.".$_->{"username"});
% $_->{"quota_used"} = $quota[1];
% $_->{"quota"} = $quota[2];
% $_->{"quota_percentage"} = ($quota[2]) ? (sprintf("%.2f",($quota[1]/$quota[2])*100))." %" : "N/A";
% push(@rows,$_);
% } @{$users};
% map { push(@results,$json->encode($_))}@rows;
% } else {
% map { push(@results,$json->encode($_))}@{$users};
% }
% print '{"request":{"start":'.$self->start.',"total":'.($cnt).'},"results":['.join(",",@results).']}';
% } else { $m->res->status(403); 
% }
% }


