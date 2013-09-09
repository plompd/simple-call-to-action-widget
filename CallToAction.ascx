<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CallToAction.ascx.cs" Inherits="SitefinityWebApp.Widgets.General.CallToAction" %>
<div class="wrapper">
    <asp:HyperLink runat="server" ID="lnkNavigateTo">
        <asp:Image runat="server" ID="imgThumbnail" />
        <p><asp:Literal runat="server" ID="litDescription"></asp:Literal></p>
    </asp:HyperLink>
</div>
