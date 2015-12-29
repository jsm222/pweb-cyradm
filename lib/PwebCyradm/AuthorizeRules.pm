package PwebCyradm::AuthorizeRules;
use PwebCyradm::User;
use strict;
use warnings;

sub new {
    my $self = {};
    bless($self);
    return $self;
}

sub testIdInAdminDomains {
    my $self = shift;
    my ( $uid, $exsistinguser, $testid ) = @_;
    my $valid     = 0;
    my @domains   = ();
    my $domain_id = 0;
    my $currentuser =
      PwebCyradm::User->new( id => $uid )->load( with => ['admindomainids'] );
    @domains = $currentuser->admindomainids;

    if ($exsistinguser) {
        $domain_id = PwebCyradm::User->new( id => $testid )->load()->domain_id;
    }
    else {
        $domain_id = $testid;

    }

    foreach my $domain (@domains) {
        if ( $domain->domain_id == $domain_id ) { $valid = 1; last }
    }

    return $valid;
}

sub adminSaveUser {
    my $self = shift;
    my ( $uid, $alteruid, $altertoroleid ) = @_;
    my $role_id = PwebCyradm::User->new( id => $uid )->load()->role_id;
    my $user_to_alter_role_id =
      PwebCyradm::User->new( id => $alteruid )->load()->role_id;

    if ( $uid == $alteruid && $altertoroleid != $role_id ) {
        return 0;
    }
    if ( $role_id <= $altertoroleid && $role_id <= $user_to_alter_role_id ) {
        return 1;
    }
}

sub testIdInOwnDomain {
    my $self = shift;
    my ( $uid, $domainid ) = @_;
    return (
        PwebCyradm::User->new( id => $uid )->load()->domain_id == $domainid );
}

sub adminDomainsEqualsAdminDomains() {
    my $self = shift;
    my ( $uid, $alteruid ) = @_;
    my $valid             = 1;
    my %hash              = ();
    my $currentuser       = PwebCyradm::User->new( id => $uid )->load();
    my @domains           = $currentuser->admindomainids;
    my $alteruser         = PwebCyradm::User->new( id => $alteruid )->load();
    my @alteradmindomains = $alteruser->admindomainids;

    foreach my $admindomain (@domains) {
        $hash{ $admindomain->domain_id } = 1;
    }
    foreach my $alteradmindomain (@alteradmindomains) {
        $hash{ $alteradmindomain->domain_id }++;
    }

    for my $domain_id ( keys(%hash) ) {
        if ( $hash{$domain_id} != 2 ) {
            $valid = 0;
            last;
        }

    }
    return $valid;
}

1;
