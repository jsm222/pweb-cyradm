<% # Copyright (c) 2015 Jesper Schmitz Mouridsen %>
<% # See the file LICENSE.txt for copying permission. %>
<%class>
	has 'lh';
	has 'authorize';
</%class>

<div style="width:100%;float:left;">
  <div class="grid-header" style="width:100%;float:left;">
    <button id="openCreateButton"><% $.lh->maketext("New account") %></button>
    <button id="openDeleteButton"><% $.lh->maketext("Delete account") %></button>
    <button id="openDetailsButton"><% $.lh->maketext("Open Item Edit for active row") %></button>
    <label><% $.lh->maketext("Accounts") %></label>
        <span style="float:right;">
          <% $.lh->maketext("Search:") %>
          <input type="text" id="txtSearch" value="" style="width:200px;">
	  <select id="searchField" style="width:200px" name="searchField"></select>
        </span>
</div>
  <div id="myGrid" style="width:100%;height:602px;background-color:#fff;display:none"></div>

</div>

