<% # Copyright (c) 2015 Jesper Schmitz Mouridsen %>
<% # See the file LICENSE.txt for copying permission. %>
<%class>
	has 'lh';
</%class>
% if ($m->req->path eq "/app/manage_user_roles") {
<div style="display:none;position:absolute" class="item-details-form-tmpl">
<form class="login-form" style="height:auto">
<input type="hidden" name="id">
<input type="hidden" name="action" value="save">
<label><% $self->lh->maketext("Username") %></label> 
<input type="text" name="username" disabled="disabled">
<label><% $self->lh->maketext("Role") %></label>
<div class="authitem" style="width:100%;"></div>
<label><% $self->lh->maketext("Domains") %></label>
<div class="multiple" style="width:100%;"></div>
<label><% $self->lh->maketext("Password") %></label>
<input type="password" name="password" value="">
<label><% $self->lh->maketext("Confirm password") %></label>
<input type="password" name="passwordconfirm" value="">
    
    <div class='item-details-form-buttons'>
      <button data-action='save'><% $self->lh->maketext('save') %></button>
      <button data-action='cancel'><% $self->lh->maketext('cancel') %></button>
    </div>
</form>
</div>
% } elsif ($m->req->path eq "/app/manage_domains") {
<div style="display:none;position:absolute" class="item-details-form-tmpl">
<form class="login-form" style="height:auto">
<input type="hidden" name="id">
<input type="hidden" name="action" value="save">
<label><% $self->lh->maketext("Domain name") %></label> 
<input type="text" name="domain_name">
<label><% $self->lh->maketext("Managed by") %></label>
<div class="multiple" style="width:100%;"></div>
<label><% $self->lh->maketext("Alias domain") %></label>
<input type="checkbox" value="1" name="is_alias_domain">
<label><% $self->lh->maketext("Max accounts") %></label>
<input type="text" name="max_accounts_per_domain">
<label><% $self->lh->maketext("Max quota per account") %></label>
<input type="text" name="max_quota_per_account">
<label><% $self->lh->maketext("Max aliases per account") %></label>
<input type="text" name="max_aliases_per_account">
    
    <div class='item-details-form-buttons'>
      <button data-action='save'><% $self->lh->maketext('save') %></button>
      <button data-action='cancel'><% $self->lh->maketext('cancel') %></button>
    </div>
</form>
  </div>
% } elsif ($m->req->path eq "/app/manage_accounts") {
<div style="display:none;position:absolute" class="item-details-form-tmpl">
<form class="login-form" style="height:auto">
<input type="hidden" name="id">
<input type="hidden" name="action" value="save">
<label><% $self->lh->maketext("Username") %></label> 
<input type="text" name="username" disabled="disabled">
<label class="multiple"><% $self->lh->maketext("Domain") %></label> 
<div class="multiple" style="width:100%;"></div>
<label><% $self->lh->maketext("Password") %></label> 
<input type="password" name="password">
<label><% $self->lh->maketext("Confirm password") %></label> 
<input type="password" name="passwordconfirm">
<label><% $self->lh->maketext("Quota") %></label>
<input type="text" name="quota">
<label><% $self->lh->maketext("Max aliases") %></label>
<input type="text" name="max_aliases">
    
    <div class='item-details-form-buttons'>
      <button data-action='save'><% $self->lh->maketext('save') %></button>
      <button data-action='cancel'><% $self->lh->maketext('cancel') %></button>
    </div>
</form>
  </div>
% } elsif ($m->req->path eq "/app/manage_aliases") {

<div style="display:none;position:absolute" class="item-details-form-tmpl">
<form class="login-form" style="height:auto">
<input type="hidden" name="id">
<input type="hidden" name="action" value="save">
<label><% $self->lh->maketext("Username") %></label> 
<div class="multiple" style="width:100%;"></div>
<label><% $self->lh->maketext("Alias") %></label> 
<input type="text" name="alias">
<label><% $self->lh->maketext("Domain") %></label> 
<div class="multiple" style="width:100%;"></div>

    <div class='item-details-form-buttons'>
      <button data-action='save'><% $self->lh->maketext('save') %></button>
      <button data-action='cancel'><% $self->lh->maketext('cancel') %></button>
    </div>
</form>
  </div>
% }		
