<% # Copyright (c) 2015 Jesper Schmitz Mouridsen %>
<% # See the file LICENSE.txt for copying permission. %>
<%class>
	has 'language';
</%class>
<%augment wrap>
% $m->res->content_type('text/html;charset=utf-8');
% use PwebCyradm::I18N;
% use PwebCyradm::Authorize;
% my $lh = PwebCyradm::I18N->get_handle($m->session->{'lang'}) or die "What language";
% my $myauth = PwebCyradm::Authorize->new($m->session->{'~uid~'});
<!DOCTYPE html>
   <head>

<meta charset="utf-8" />
        <title>Pweb-cyradm</title>
	<link rel="stylesheet" href="<% $conf->get('cssdir').'/' %>main.css">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
% my $page;	
% if($m->req->path eq "/app/manage_user_roles") { 
%	$page="page1";
% }	
% elsif($m->req->path eq "/app/manage_domains") { 
% $page = "page2";
% }
% elsif($m->req->path eq "/app/manage_accounts") { 
% $page = "page3";
% } elsif($m->req->path eq "/app/manage_aliases") { 
% $page = "page4";
% }
% else {
% $page = "page0";
% }
	<script  data-main="<% $conf->get('jsdir').'/'.$page %>" src="../static/js/lib/require.js"></script>
	<& lang.mc,"language"=>$self->language &>

	
    </head>

<body>
<& formtemplate.mc,lh=>$lh &>
<div id="wrapper">
	<div id="header"><img src="/static/images/banner.png" alt="banner" />
		<img class="banner2" src="/static/images/banner.png" alt="banner" />
		<img class="logotext" src="/static/images/logo.png" alt="logotext" /><p class="header">Pweb-cyradm</p>
	</div>


<div id="left" style="display:none;">
<& navigation_left.mi,lh=>$lh,authorize=>$myauth &>
</div>

<div id="modal"></div>


<div id="content">
% my $componentstr = ($m->req->path eq "/" || $m->req->path eq "") ? "index.mc" : $m->req->path.".mc";
<& $componentstr,lh=>$lh,authorize=>$myauth &>
</div>


<div class="clearfooter"></div>
</div>
<div id="footer"><p>Pweb-cyradm &copy; Copyright licensed under MIT-License</p>
</div>
</body>
</html>

</%augment>
