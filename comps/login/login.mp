# Copyright (c) 2015 Jesper Schmitz Mouridsen 
# See the file LICENSE.txt for copying permission.
    use PwebCyradm::Authenticate;
    has 'username';
    has 'password';
    has 'language';	

     
     method handle () {
         my $session = $m->session;
         if ( !$self->username && !$self->password ) {
             $session->{err}   = 1;
             $session->{form_data} = $self->args;
             $m->redirect('/login/index');
         }

	   my $authenticate =	PwebCyradm::Authenticate->new($conf->get("pwhash"));
	   my $user = PwebCyradm::User->new("username"=>$self->username);
	  if($user->load(speculative=>1) && $user->password eq $authenticate->hashpassword($self->password) && $user->role_id) {
          $m->session->{'~uid~'}=$user->id;
          $m->session->{"lang"}   = $self->language;
          $m->redirect('/app/index');
	    } else {
	    $session->{err}   = 2;
            $session->{form_data} = $self->args;
            $m->redirect('/login/index');
	   }
 
	  	
      } 
