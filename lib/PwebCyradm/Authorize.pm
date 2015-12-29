package PwebCyradm::Authorize;
use strict;
use warnings;
use PwebCyradm::User;

sub new {
    my $self = shift;

    $self = {};
    bless($self);
    $self->{'user_id'} = shift;
    $self->{"roles"}   = {

        #"QuotaAdmin"=>["A",{"G"=>["TestQuota"]}],
        "Administrator" => [
            "ManageRoles",
            "ManageDomains",
            {
                "SuperDomainAdministrator" => [
                    {
                        "DomainAdministrator" => [
                            "ManageAccounts",
                            { "AccountUser" => ["ManageAliases"] }
                        ]
                    }

                ]
            }
        ]
    };
    $self->{"tasks"} = {
        "ManageRoles"   => [ "AssignRole",   "RevokeRole" ],
        "ManageDomains" => [ "CreateDomain", "UpdateDomain", "DeleteDomain" ],
        "ManageAccounts" =>
          [ "CreateAccount", "UpdateAccount", "DeleteAccount" ],
        "ManageAliases" => [ "CreateAlias", "UpdateAlias", "DeleteAlias" ],

        #"A"=>["1","2","3"],
        #	"TestQuota"=>["aQiota","Fqiota","cAIR"],
    };
    $self->{"assignment"} = $self->get_assignment();
    return $self;
}

sub get_assignment {
    my $self = shift;
    if ( !$self->{"user_id"} ) {
        return undef;
    }
    my $user = PwebCyradm::User->new( id => $self->{"user_id"} );
    $user->load( { with => "authitem" } );
    return $user->authitem;

}

sub has_role {
    my $self = shift;
    my $user = $self->{'user_id'};
    my $role = shift;
    if ( !$self->{"user_id"} ) {
        return 0;
    }
    if ( $role eq $self->{"assignment"}->auth_item ) {
        return 1;
    }

    return 0;
}

sub can_do {
    my $self       = shift;
    my $permission = shift;
    my $biz_rule   = shift;
    my $biz_args   = shift;
    my $refa       = $self->test( $self->{"user_id"}, $self->{"roles"}, {} );
    return $self->check_access( $refa, $permission, $biz_rule, $biz_args );

}

sub has_roles {
    my $self = shift;
    if ( !$self->{"user_id"} ) { return {} }
    return $self->test( $self->{"user_id"}, $self->{"roles"}, {} );

}

sub check_access {
    my $self         = shift;
    my $refa         = shift;
    my $permission   = shift;
    my $biz_rule     = shift;
    my $biz_args_ref = shift;
    my %refs         = %{$refa};
    my @biz_args     = @{$biz_args_ref};
    my $ret          = 0;
    foreach my $t ( keys %refs ) {

        if ( $t eq $permission && $biz_rule->(@biz_args) ) {
            return 1;
        }
        foreach my $op ( @{ $refs{$t} } ) {

            if ( ref($op) eq "HASH" ) {
                $ret =
                  $self->check_access( $op, $permission, $biz_rule,
                    $biz_args_ref );

            }
            else {
                if ( $permission eq $op && $biz_rule->(@biz_args) ) {

                    return 1;
                }
                if ( defined( $self->{"tasks"}{$op} ) ) {
                    foreach my $task ( @{ $self->{"tasks"}{$op} } ) {
                        if ( $permission eq $task && $biz_rule->(@biz_args) ) {
                            return 1;
                        }

                    }
                }
            }
        }
    }
    return $ret;
}

sub test {
    my $self    = shift;
    my $user    = shift;
    my $role    = shift;
    my $refs    = shift;
    my %myroles = %{$role};
    my %refsh   = %{$refs};
    foreach my $key ( keys %myroles ) {
        if ( $self->has_role($key) ) {
            $refsh{$key} = $myroles{$key};
        }
        foreach my $next ( @{ $myroles{$key} } ) {
            if ( ref($next) eq "HASH" ) {
                my $retref = $self->test( $user, $next, \%refsh );
                %refsh = %{$retref};
            }
        }

    }
    return \%refsh;
}
1;
