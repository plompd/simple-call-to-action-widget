Type.registerNamespace("SitefinityWebApp.Widgets.General.Designer");

SitefinityWebApp.Widgets.General.Designer.CallToActionDesigner = function (element) {
    /* Initialize ImageId fields */
    this._selectButtonImageId = null;
    this._selectButtonImageIdClickDelegate = null;
    this._deselectButtonImageId = null;
    this._deselectButtonImageIdClickDelegate = null;
    this._selectorImageIdCloseDelegate = null;
    this._selectorImageIdUploaderViewFileChangedDelegate = null;
    
    this._ImageIdDialog = null;
    this._selectorImageId = null;
    this._ImageIdId = null;
    
    /* Initialize PageId fields */
    this._pageSelectorPageId = null;
    this._selectorTagPageId = null;
    this._PageIdDialog = null;
 
    this._showPageSelectorPageIdDelegate = null;
    this._pageSelectedPageIdDelegate = null;
    
    /* Initialize Description fields */
    this._description = null;
    
    /* Initialize the service url for the image thumbnails */
    this.imageServiceUrl = null;

    /* Calls the base constructor */
    SitefinityWebApp.Widgets.General.Designer.CallToActionDesigner.initializeBase(this, [element]);
}

SitefinityWebApp.Widgets.General.Designer.CallToActionDesigner.prototype = {
    /* --------------------------------- set up and tear down --------------------------------- */
    initialize: function () {
        /* Here you can attach to events or do other initialization */
        SitefinityWebApp.Widgets.General.Designer.CallToActionDesigner.callBaseMethod(this, 'initialize');

        /* Initialize ImageId */
        this._selectButtonImageIdClickDelegate = Function.createDelegate(this, this._selectButtonImageIdClicked);
        if (this._selectButtonImageId) {
            $addHandler(this._selectButtonImageId, "click", this._selectButtonImageIdClickDelegate);
        }

        this._deselectButtonImageIdClickDelegate = Function.createDelegate(this, this._deselectButtonImageIdClicked);
        if (this._deselectButtonImageId) {
            $addHandler(this._deselectButtonImageId, "click", this._deselectButtonImageIdClickDelegate);
        }

        if (this._selectorImageId) {
            this._ImageIdDialog = jQuery(this._selectorImageId.get_element()).dialog({
                autoOpen: false,
                modal: false,
                width: 655,
                height: "auto",
                closeOnEscape: true,
                resizable: false,
                draggable: false,
                zIndex: 5000,
                close: this._selectorImageIdCloseDelegate
            });
        } 

        jQuery("#previewImageId").load(function () {
            dialogBase.resizeToContent();
        });

        this._selectorImageIdInsertDelegate = Function.createDelegate(this, this._selectorImageIdInsertHandler);
        this._selectorImageId.set_customInsertDelegate(this._selectorImageIdInsertDelegate);
        $addHandler(this._selectorImageId._cancelLink, "click", this._selectorImageIdCloseHandler);
        this._selectorImageIdCloseDelegate = Function.createDelegate(this, this._selectorImageIdCloseHandler);
        this._selectorImageIdUploaderViewFileChangedDelegate = Function.createDelegate(this, this._selectorImageIdUploaderViewFileChangedHandler);

        /* Initialize PageId */
        this._showPageSelectorPageIdDelegate = Function.createDelegate(this, this._showPageSelectorPageIdHandler);
        $addHandler(this.get_pageSelectButtonPageId(), "click", this._showPageSelectorPageIdDelegate);

        this._pageSelectedPageIdDelegate = Function.createDelegate(this, this._pageSelectedPageIdHandler);
        this.get_pageSelectorPageId().add_doneClientSelection(this._pageSelectedPageIdDelegate);

        if (this._selectorTagPageId) {
            this._PageIdDialog = jQuery(this._selectorTagPageId).dialog({
                autoOpen: false,
                modal: false,
                width: 395,
                closeOnEscape: true,
                resizable: false,
                draggable: false,
                zIndex: 5000
            });
        }
    },
    dispose: function () {
        /* this is the place to unbind/dispose the event handlers created in the initialize method */
        SitefinityWebApp.Widgets.General.Designer.CallToActionDesigner.callBaseMethod(this, 'dispose');

        /* Dispose ImageId */
        if (this._selectButtonImageId) {
            $removeHandler(this._selectButtonImageId, "click", this._selectButtonImageIdClickDelegate);
        }
        if (this._selectButtonImageIdClickDelegate) {
            delete this._selectButtonImageIdClickDelegate;
        }
        
        if (this._deselectButtonImageId) {
            $removeHandler(this._deselectButtonImageId, "click", this._deselectButtonImageIdClickDelegate);
        }
        if (this._deselectButtonImageIdClickDelegate) {
            delete this._deselectButtonImageIdClickDelegate;
        }

        $removeHandler(this._selectorImageId._cancelLink, "click", this._selectorImageIdCloseHandler);

        if (this._selectorImageIdCloseDelegate) {
            delete this._selectorImageIdCloseDelegate;
        }

        if (this._selectorImageIdUploaderViewFileChangedDelegate) {
            this._selectorImageId._uploaderView.remove_onFileChanged(this._selectorImageIdUploaderViewFileChangedDelegate);
            delete this._selectorImageIdUploaderViewFileChangedDelegate;
        }

        /* Dispose PageId */
        if (this._showPageSelectorPageIdDelegate) {
            $removeHandler(this.get_pageSelectButtonPageId(), "click", this._showPageSelectorPageIdDelegate);
            delete this._showPageSelectorPageIdDelegate;
        }

        if (this._pageSelectedPageIdDelegate) {
            this.get_pageSelectorPageId().remove_doneClientSelection(this._pageSelectedPageIdDelegate);
            delete this._pageSelectedPageIdDelegate;
        }
    },

    /* --------------------------------- public methods ---------------------------------- */

    findElement: function (id) {
        var result = jQuery(this.get_element()).find("#" + id).get(0);
        return result;
    },

    /* Called when the designer window gets opened and here is place to "bind" your designer to the control properties */
    refreshUI: function () {
        var controlData = this._propertyEditor.get_control(); /* JavaScript clone of your control - all the control properties will be properties of the controlData too */

        /* RefreshUI ImageId */
        this.get_selectedImageId().innerHTML = controlData.ImageId;
        if (controlData.ImageId && controlData.ImageId != "00000000-0000-0000-0000-000000000000") {
            this.get_selectButtonImageId().innerHTML = "<span class=\"sfLinkBtnIn\">Change</span>";
            jQuery(this.get_deselectButtonImageId()).show()
            var url = this.imageServiceUrl + controlData.ImageId + "/?published=true";
            jQuery.ajax({
                url: url,
                type: "GET",
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    jQuery("#previewImageId").show();
                    jQuery("#previewImageId").attr("src", data.Item.ThumbnailUrl);
                    dialogBase.resizeToContent();
                }
            });
        }
        else {
            jQuery(this.get_deselectButtonImageId()).hide()
        }

        /* RefreshUI PageId */
        if (controlData.PageId && controlData.PageId !== "00000000-0000-0000-0000-000000000000") {
            var pagesSelectorPageId = this.get_pageSelectorPageId().get_pageSelector();
            var selectedPageLabelPageId = this.get_selectedPageIdLabel();
            var selectedPageButtonPageId = this.get_pageSelectButtonPageId();
            pagesSelectorPageId.add_selectionApplied(function (o, args) {
                var selectedPage = pagesSelectorPageId.get_selectedItem();
                if (selectedPage) {
                    selectedPageLabelPageId.innerHTML = selectedPage.Title.Value;
                    jQuery(selectedPageLabelPageId).show();
                    selectedPageButtonPageId.innerHTML = '<span>Change</span>';
                }
            });
            pagesSelectorPageId.set_selectedItems([{ Id: controlData.PageId}]);
        }        

        /* RefreshUI Description */
        jQuery(this.get_description()).val(controlData.Description);
    },

    /* Called when the "Save" button is clicked. Here you can transfer the settings from the designer to the control */
    applyChanges: function () {
        var controlData = this._propertyEditor.get_control();

        /* ApplyChanges ImageId */
        controlData.ImageId = this.get_selectedImageId().innerHTML;

        /* ApplyChanges PageId */

        /* ApplyChanges Description */
        controlData.Description = jQuery(this.get_description()).val();
    },

    /* --------------------------------- event handlers ---------------------------------- */

    /* ImageId event handlers */
    _selectButtonImageIdClicked: function (sender, args) {
        this._selectorImageId._uploaderView.add_onFileChanged(this._selectorImageIdUploaderViewFileChangedDelegate);
        this._ImageIdDialog.dialog("open");
        jQuery("#designerLayoutRoot").hide();
        this._ImageIdDialog.dialog().parent().css("min-width", "655px");
        dialogBase.resizeToContent();
        try {
            this._selectorImageId.get_uploaderView().get_altTextField().set_value("");
        }
        catch (ex) { }
        jQuery(this._selectorImageId.get_uploaderView().get_settingsPanel()).hide();
        return false;
    },

    _deselectButtonImageIdClicked: function (sender, args) {
        jQuery("#previewImageId").hide();
                    jQuery("#previewImageId").attr("src", "");
        this.get_selectedImageId().innerHTML = "00000000-0000-0000-0000-000000000000";
        this.get_selectButtonImageId().innerHTML = "<span class=\"sfLinkBtnIn\">Select...</span>";
        jQuery(this.get_deselectButtonImageId()).hide()
		dialogBase.resizeToContent();
        return false;
    },

    /* --------------------------------- private methods --------------------------------- */

    /* ImageId private methods */
    _selectorImageIdInsertHandler: function (selectedItem) {

        if (selectedItem) {
            this._ImageIdId = selectedItem.Id;
            this.get_selectedImageId().innerHTML = this._ImageIdId;
            jQuery(this.get_deselectButtonImageId()).show()
            this.get_selectButtonImageId().innerHTML = "<span class=\"sfLinkBtnIn\">Change</span>";
            jQuery("#previewImageId").show();
                    jQuery("#previewImageId").attr("src", selectedItem.ThumbnailUrl);
        }
        this._ImageIdDialog.dialog("close");
        jQuery("#designerLayoutRoot").show();
        dialogBase.resizeToContent();
    },

    _selectorImageIdCloseHandler: function () {
        if(this._ImageIdDialog){
            this._ImageIdDialog.dialog("close");
        }
        jQuery("#designerLayoutRoot").show();
        dialogBase.resizeToContent();
    },

    _selectorImageIdUploaderViewFileChangedHandler: function () {
        dialogBase.resizeToContent();
    },

    /* PageId private methods */
    _showPageSelectorPageIdHandler: function (selectedItem) {
        var controlData = this._propertyEditor.get_control();
        var pagesSelector = this.get_pageSelectorPageId().get_pageSelector();
        if (controlData.PageId) {
            pagesSelector.set_selectedItems([{ Id: controlData.PageId }]);
        }
        this._PageIdDialog.dialog("open");
        jQuery("#designerLayoutRoot").hide();
        this._PageIdDialog.dialog().parent().css("min-width", "355px");
        dialogBase.resizeToContent();
    },

    _pageSelectedPageIdHandler: function (items) {
        var controlData = this._propertyEditor.get_control();
        var pagesSelector = this.get_pageSelectorPageId().get_pageSelector();
        this._PageIdDialog.dialog("close");
        jQuery("#designerLayoutRoot").show();
        dialogBase.resizeToContent();
        if (items == null) {
            return;
        }
        var selectedPage = pagesSelector.get_selectedItem();
        if (selectedPage) {
            this.get_selectedPageIdLabel().innerHTML = selectedPage.Title.Value;
            jQuery(this.get_selectedPageIdLabel()).show();
            this.get_pageSelectButtonPageId().innerHTML = '<span>Change</span>';
            controlData.PageId = selectedPage.Id;
        }
        else {
            jQuery(this.get_selectedPageIdLabel()).hide();
            this.get_pageSelectButtonPageId().innerHTML = '<span>Select...</span>';
            controlData.PageId = "00000000-0000-0000-0000-000000000000";
        }
    },

    /* --------------------------------- properties -------------------------------------- */

    /* ImageId properties */
    get_selectorImageId: function () {
        return this._selectorImageId;
    },
    set_selectorImageId: function (value) {
        this._selectorImageId = value;
    },
    get_selectButtonImageId: function () {
        return this._selectButtonImageId;
    },
    set_selectButtonImageId: function (value) {
        this._selectButtonImageId = value;
    },
    get_deselectButtonImageId: function () {
        return this._deselectButtonImageId;
    },
    set_deselectButtonImageId: function (value) {
        this._deselectButtonImageId = value;
    },
    get_selectedImageId: function () {
        if (this._selectedImageId == null) {
            this._selectedImageId = this.findElement("selectedImageId");
        }
        return this._selectedImageId;
    },

    /* PageId properties */
    get_pageSelectButtonPageId: function () {
        if (this._pageSelectButtonPageId == null) {
            this._pageSelectButtonPageId = this.findElement("pageSelectButtonPageId");
        }
        return this._pageSelectButtonPageId;
    },
    get_selectedPageIdLabel: function () {
        if (this._selectedPageIdLabel == null) {
            this._selectedPageIdLabel = this.findElement("selectedPageIdLabel");
        }
        return this._selectedPageIdLabel;
    },
    get_pageSelectorPageId: function () {
        return this._pageSelectorPageId;
    },
    set_pageSelectorPageId: function (val) {
        this._pageSelectorPageId = val;
    },
    get_selectorTagPageId: function () {
        return this._selectorTagPageId;
    },
    set_selectorTagPageId: function (value) {
        this._selectorTagPageId = value;
    },

    /* Description properties */
    get_description: function () { return this._description; }, 
    set_description: function (value) { this._description = value; }
}

SitefinityWebApp.Widgets.General.Designer.CallToActionDesigner.registerClass('SitefinityWebApp.Widgets.General.Designer.CallToActionDesigner', Telerik.Sitefinity.Web.UI.ControlDesign.ControlDesignerBase);
