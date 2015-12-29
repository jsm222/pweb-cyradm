#!/usr/bin/perl
package PwebCyradm::IMAP::Admin;
use strict;
use warnings;
use base qw(IMAP::Admin);

sub new {
my $self = shift;
my $imap = IMAP::Admin->new('Server' => shift,
                           'Login' => shift,
                           'Password' => shift,
                           'Port' => 993,
                           'Separator' => ".",
                           'CRAM' =>0,
                           'SSL' => 1,
			'SSL_use_cert' => 0,
                        'SSL_verify_mode' => 0x00,
                        'SSL_key_file' => "",
                        'SSL_cert_file' => "",
                        'SSL_ca_path' => "/etc/certs",
                        'SSL_ca_file' => "/etc/ssl/certs.pem",

                           );

$self = $imap;
bless($self);
return $self;


}

sub create_mailbox {
    my ($self,$usernamewithrealm,$subfoldersref) = @_;

    my ($username,$domain) = split("\@",$usernamewithrealm);
   
    my $err = $self->create("user".$self->{"Separator"}.$username.'@'.$domain);
   if($err) {return $self->error(); }
    foreach my $subfolder (@{$subfoldersref}) {
        $err = $self->create('user'.$self->{'Separator'}.$username.$self->{'Separator'}.$subfolder.'@'.$domain);
        if($err) {return $self->error(); }
    }
    return $err;
}

sub del_mailbox {
    my ($self,$username) = @_;
    my $subfoldersref = $self->_get_subfolders($username);
    my $err = "";
    $err = $self->_set_delete_rights($username,$subfoldersref);
    if(!$err) {

        foreach my $subfolder (@{$subfoldersref}) {
            $err = $self->delete($subfolder);
            if($err) { return $self->error(); }

        }


        if($err) { return $self->error();  }
        
    } else {
	return $self->error(); 
    }
    return 0;
}

sub _set_delete_rights {
    my ($self,$username,$subfoldersref) = @_;
    my $err=0;
    foreach my $subfolder (@{$subfoldersref}) {
    $err = $self->set_acl($subfolder,$self->{'Login'},'lrxte');
    if ($err) { return $self->error;  }

    }
    return $err;
}

sub _get_subfolders {
    my ($self,$usernameanddomain) = @_;
    
    my ($username,$domain) = split("\@",$usernameanddomain);
    my @subfolders = $self->list('user'.$self->{'Separator'}.$username."\.*@".$domain);
    push(@subfolders,'user'.$self->{'Separator'}.$username."\@".$domain); # Delete main mailbox;
    return \@subfolders;


}
1;

