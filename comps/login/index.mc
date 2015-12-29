<% # Copyright (c) 2015 Jesper Schmitz Mouridsen %>
<% # See the file LICENSE.txt for copying permission. %>
<%class>
     use I18N::LangTags::Detect;
     my @languages =
    I18N::LangTags::implicate_supers(
    I18N::LangTags::Detect::detect()
    );
   my %translations = ("da"=>"Danish","en"=>"English");	
has 'lh';

</%class>
% my %errors = (1=>$.lh->maketext("Username and password required"),2=>$.lh->maketext("Wrong username or password"));
% $self->FillInForm($form_data) {{

<form id="login" action="/login/login" method="post">
<div style="color:red;"><% $errors{delete($m->session->{"err"})} %></div>  	
  <label for="username"><span><% $.lh->maketext("Username") %></span></label>	
  <input type="text" size="30" name="username" id="username">
  <label for="password"><span><% $.lh->maketext("Password") %></span></label>
  <input type="password" size="30" name="password" id="password">
  <label for="language"><span><% $.lh->maketext("Language") %></span></label>
  <select size="1" name="language" id="language">
% foreach my $key (keys %translations) {
% 
% my $selected = 0;	
% foreach my $mylang (@languages) {	
%	if($key eq $mylang) {
%	$selected = 1;
%	last;
%	} else {
% $selected = 0;
%	}
% }
	<option <%  ($selected) ? 'selected="selected"' : "" %>value="<% $key %>"><% $translations{$key} %></option>
% 
% }
  </select>
  <input type="submit" class="button" value="<% $self->lh->maketext("Login") %>">
</form>
% }}

<%init>
my $form_data = delete($m->session->{form_data});
</%init>
