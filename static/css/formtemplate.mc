<%class>
	has 'lh';
</%class>
<% if ($m->req->path eq "manage_user_roles") {
<div style="display:none;position:absolute" class="item-details-form">
<form class="login-form" style="height:auto">
<input type="hidden" name="id">
<label><% $.lh->maketext("Username") %></label> 
<input type="text" name="username">
<label><% $.lh->maketext("Role") %></label><div>
<select name="role_id" style="width:100%;"></select>
<label><% $.lh->maketext("Domains") %></label>
<div class="domains" style="width:100%;"></div>
<label><% $.lh->maketext("Password") %></label>
<input type="password" name="password" value="">
<label><% $.lh->maketext("Confirm password") %></label>
<input type="password" name="confirm_password" value="">
    <hr/>
    <div class='item-details-form-buttons'>
      <button data-action='save'>Save</button>
      <button data-action='cancel'>Cancel</button>
    </div>
</form>
  </div>
% }
