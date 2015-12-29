# Copyright (c) 2015 Jesper Schmitz Mouridsen 
# See the file LICENSE.txt for copying permission.
     method handle () {
         my $session = $m->session;
		$m->session->{"~uid~"}=undef;
          $m->redirect('/login/index');
      } 
