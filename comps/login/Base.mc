<% # Copyright (c) 2015 Jesper Schmitz Mouridsen %>
<% # See the file LICENSE.txt for copying permission. %>
<%augment wrap>
% use PwebCyradm::I18N;
% my $lh = PwebCyradm::I18N->get_handle() || die "What language";
% $m->res->content_type('text/html;charset=utf-8');
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8"></meta>
<link rel="stylesheet" href="/static/css/style.css" />
<link rel="stylesheet" href="//code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
<script src="//code.jquery.com/jquery-1.9.1.js"></script>
<script src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<title><% $lh->maketext("Pweb-cyradm login page") %></title>
<link rel="shortcut icon" href="static/images/favicon.png"/>
<script type="text/javascript">
<!--
$(function() {
$( "#login" ).position({
my: "center",
at: "center",
of: $(window)
});
});
-->
</script>
</head>
<body>
<div id="wrapper"><div id="header"><img src="/static/images/banner.png" alt="banner" />
<img class="banner2" src="/static/images/banner.png" alt="banner" /><img class="logotext" src="/static/images/logo.png" alt="logotext" /><p class="header">Pweb-cyradm</p></div>

<div id="content">
<& index.mc,lh=>$lh &>
</div>




<div class="clearfooter"></div>
</div>
<div id="footer">
<div id="footer"><p>Pweb-Cyradm &copy; Copyright licensed under the MIT license</p>
</div>
</body>
</html>
</%augment>
