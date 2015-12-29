package PwebCyradm::Authenticate;
use strict;
use warnings;
use Digest::SHA1;
use Digest::MD5;


sub new {
    my $self = shift;
    my $hashmethod = shift;
    $self = {'method'=>$hashmethod};
    bless($self);
    return $self;
}

sub hashpassword {
    my $self = shift;
    my $password = shift;
    my $hash = Digest::SHA1->new; #default
if($self->{"method"} eq "sha1") {
    $hash = Digest::SHA1->new();
}
elsif($self->{"method"} eq "md5") {
$hash = Digest::MD5->new();
}
    $hash->add($password);
    if($self->{"method"} eq "plain") {
	return $password;
    } else {
	return $hash->hexdigest;
}

}
1;
