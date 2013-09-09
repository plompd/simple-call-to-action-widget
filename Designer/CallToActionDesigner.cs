using System;
using System.Linq;
using System.Web.UI;
using Telerik.Sitefinity.Web.UI;
using Telerik.Sitefinity.Web.UI.ControlDesign;
using System.Collections.Generic;
using System.Web.UI.WebControls;
using System.Web;
using Telerik.Sitefinity.Localization;
using Telerik.Sitefinity.Modules.Pages;
using System.Web.UI.HtmlControls;

namespace SitefinityWebApp.Widgets.General.Designer
{
    /// <summary>
    /// Represents a designer for the <typeparamref name="SitefinityWebApp.Widgets.General.CallToAction"/> widget
    /// </summary>
    public class CallToActionDesigner : ControlDesignerBase
    {
        #region Properties
        /// <summary>
        /// Obsolete. Use LayoutTemplatePath instead.
        /// </summary>
        protected override string LayoutTemplateName
        {
            get
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// Gets the layout template's relative or virtual path.
        /// </summary>
        public override string LayoutTemplatePath
        {
            get
            {
                if (string.IsNullOrEmpty(base.LayoutTemplatePath))
                    return CallToActionDesigner.layoutTemplatePath;
                return base.LayoutTemplatePath;
            }
            set
            {
                base.LayoutTemplatePath = value;
            }
        }

        protected override HtmlTextWriterTag TagKey
        {
            get
            {
                return HtmlTextWriterTag.Div;
            }
        }
        #endregion

        #region Control references
        /// <summary>
        /// The LinkButton for selecting ImageId.
        /// </summary>
        /// <value>The page selector control.</value>
        protected internal virtual LinkButton SelectButtonImageId
        {
            get
            {
                return this.Container.GetControl<LinkButton>("selectButtonImageId", false);
            }
        }

        /// <summary>
        /// The LinkButton for deselecting ImageId.
        /// </summary>
        /// <value>The page selector control.</value>
        protected internal virtual LinkButton DeselectButtonImageId
        {
            get
            {
                return this.Container.GetControl<LinkButton>("deselectButtonImageId", false);
            }
        }

        /// <summary>
        /// Gets the RadEditor Manager dialog for inserting image, document or video for the ImageId property.
        /// </summary>
        /// <value>The RadEditor Manager dialog for inserting image, document or video.</value>
        protected EditorContentManagerDialog SelectorImageId
        {
            get
            {
                return this.Container.GetControl<EditorContentManagerDialog>("selectorImageId", false);
            }
        }

        /// <summary>
        /// Gets the page selector control.
        /// </summary>
        /// <value>The page selector control.</value>
        protected internal virtual PagesSelector PageSelectorPageId
        {
            get
            {
                return this.Container.GetControl<PagesSelector>("pageSelectorPageId", true);
            }
        }

        /// <summary>
        /// Gets the selector tag.
        /// </summary>
        /// <value>The selector tag.</value>
        public HtmlGenericControl SelectorTagPageId
        {
            get
            {
                return this.Container.GetControl<HtmlGenericControl>("selectorTagPageId", true);
            }
        }

        /// <summary>
        /// Gets the control that is bound to the Description property
        /// </summary>
        protected virtual Control Description
        {
            get
            {
                return this.Container.GetControl<Control>("Description", true);
            }
        }

        #endregion

        #region Methods
        protected override void InitializeControls(Telerik.Sitefinity.Web.UI.GenericContainer container)
        {
            // Place your initialization logic here

            if (this.PropertyEditor != null)
            {
                var uiCulture = this.PropertyEditor.PropertyValuesCulture;
                this.PageSelectorPageId.UICulture = uiCulture;
            }
        }
        #endregion

        #region IScriptControl implementation
        /// <summary>
        /// Gets a collection of script descriptors that represent ECMAScript (JavaScript) client components.
        /// </summary>
        public override System.Collections.Generic.IEnumerable<System.Web.UI.ScriptDescriptor> GetScriptDescriptors()
        {
            var scriptDescriptors = new List<ScriptDescriptor>(base.GetScriptDescriptors());
            var descriptor = (ScriptControlDescriptor)scriptDescriptors.Last();

            descriptor.AddElementProperty("selectButtonImageId", this.SelectButtonImageId.ClientID);
            descriptor.AddElementProperty("deselectButtonImageId", this.DeselectButtonImageId.ClientID);
            descriptor.AddComponentProperty("selectorImageId", this.SelectorImageId.ClientID);
            descriptor.AddComponentProperty("pageSelectorPageId", this.PageSelectorPageId.ClientID);
            descriptor.AddElementProperty("selectorTagPageId", this.SelectorTagPageId.ClientID);
            descriptor.AddElementProperty("description", this.Description.ClientID);
            descriptor.AddProperty("imageServiceUrl", this.imageServiceUrl);

            return scriptDescriptors;
        }

        /// <summary>
        /// Gets a collection of ScriptReference objects that define script resources that the control requires.
        /// </summary>
        public override System.Collections.Generic.IEnumerable<System.Web.UI.ScriptReference> GetScriptReferences()
        {
            var scripts = new List<ScriptReference>(base.GetScriptReferences());
            scripts.Add(new ScriptReference(CallToActionDesigner.scriptReference));
            return scripts;
        }

        /// <summary>
        /// Gets the required by the control, core library scripts predefined in the <see cref="ScriptRef"/> enum.
        /// </summary>
        protected override ScriptRef GetRequiredCoreScripts()
        {
            return ScriptRef.JQuery | ScriptRef.JQueryUI;
        }
        #endregion

        #region Private members & constants
        public static readonly string layoutTemplatePath = "~/Widgets/General/Designer/CallToActionDesigner.ascx";
        public const string scriptReference = "~/Widgets/General/Designer/CallToActionDesigner.js";
        private string imageServiceUrl = VirtualPathUtility.ToAbsolute("~/Sitefinity/Services/Content/ImageService.svc/");
        #endregion
    }
}
 
