<%@ Control %>
<%@ Register Assembly="Telerik.Sitefinity" TagPrefix="sf" Namespace="Telerik.Sitefinity.Web.UI" %>
<%@ Register Assembly="Telerik.Sitefinity" TagPrefix="sitefinity" Namespace="Telerik.Sitefinity.Web.UI" %>
<%@ Register Assembly="Telerik.Sitefinity" TagPrefix="sfFields" Namespace="Telerik.Sitefinity.Web.UI.Fields" %>

<sitefinity:ResourceLinks ID="resourcesLinks" runat="server">
    <sitefinity:ResourceFile Name="Styles/Ajax.css" />
    <sitefinity:ResourceFile Name="Styles/jQuery/jquery.ui.core.css" />
    <sitefinity:ResourceFile Name="Styles/jQuery/jquery.ui.dialog.css" />
    <sitefinity:ResourceFile Name="Styles/jQuery/jquery.ui.theme.sitefinity.css" />
</sitefinity:ResourceLinks>
<div id="designerLayoutRoot" class="sfContentViews sfSingleContentView" style="max-height: 400px; overflow: auto;">
    <ol>
        <li class="sfFormCtrl">
            <asp:Label runat="server" CssClass="sfTxtLbl">Image</asp:Label>
            <img id="previewImageId" src="" alt="" style="display: none;" />
            <span style="display: none;" class="sfSelectedItem" id="selectedImageId"></span>
            <div>
                <asp:LinkButton ID="selectButtonImageId" OnClientClick="return false;" runat="server" CssClass="sfLinkBtn sfChange">
        <span class="sfLinkBtnIn">
          <asp:Literal runat="server" Text="<%$Resources:Labels, SelectDotDotDot %>" />
        </span>
                </asp:LinkButton>
                <asp:LinkButton ID="deselectButtonImageId" OnClientClick="return false;" runat="server" CssClass="sfLinkBtn sfChange">
        <span class="sfLinkBtnIn">
          <asp:Literal runat="server" Text="<%$Resources:Labels, Remove %>" />
        </span>
                </asp:LinkButton>
            </div>
            <sf:EditorContentManagerDialog runat="server" ID="selectorImageId" DialogMode="Image" HostedInRadWindow="false" BodyCssClass="" />
            <div class="sfExample">Select or upload an image</div>
        </li>

        <li class="sfFormCtrl">
            <label class="sfTxtLbl" for="selectedPageIdLabel">Page</label>
            <span style="display: none;" class="sfSelectedItem" id="selectedPageIdLabel">
                <asp:Literal runat="server" Text="" />
            </span>
            <span class="sfLinkBtn sfChange">
                <a href="javascript: void(0)" class="sfLinkBtnIn" id="pageSelectButtonPageId">
                    <asp:Literal runat="server" Text="<%$Resources:Labels, SelectDotDotDot %>" />
                </a>
            </span>
            <div id="selectorTagPageId" runat="server" style="display: none;">
                <sf:PagesSelector runat="server" ID="pageSelectorPageId"
                    AllowExternalPagesSelection="false" AllowMultipleSelection="false" />
            </div>
            <div class="sfExample">Select a page</div>
        </li>

        <li class="sfFormCtrl">
            <asp:Label runat="server" AssociatedControlID="Description" CssClass="sfTxtLbl">Description</asp:Label>
            <asp:TextBox ID="Description" runat="server" CssClass="sfTxt" />
            <div class="sfExample">Fill in a description</div>
        </li>

    </ol>
</div>
