using System;
using Telerik.Sitefinity.Libraries.Model;
using Telerik.Sitefinity.Modules.Libraries;
using Telerik.Sitefinity.Modules.Pages;
using Telerik.Sitefinity.Pages.Model;
using Telerik.Sitefinity.Web.UI;

namespace SitefinityWebApp.Widgets.General {

    [Telerik.Sitefinity.Web.UI.ControlDesign.ControlDesigner(typeof(SitefinityWebApp.Widgets.General.Designer.CallToActionDesigner))]
    public partial class CallToAction : System.Web.UI.UserControl, ICustomWidgetVisualization {

        #region Properties

        public Guid ImageId { get; set; }
        public Guid PageId { get; set; }
        public string Description { get; set; }

        public bool IsEmpty {
            get {
                return (PageId == Guid.Empty && ImageId == Guid.Empty && Description.IsNullOrEmpty());
            }
        }

        public string EmptyLinkText {
            get {
                return "Please set the properties for this widget in the designer.";
            }
        }
        #endregion

        #region Events
        
        protected void Page_Load(object sender, EventArgs e) {

            if (!IsPostBack)
                BindData();

        }

        #endregion

        #region Methods

        /// <summary>
        /// Bind our properties to the controls
        /// </summary>
        private void BindData() {

            // Resolve the PageId to an url
            if (PageId != Guid.Empty) {

                var page = GetPage(PageId);
                if (page != null)
                    lnkNavigateTo.NavigateUrl = page.GetUrl();
            }

            // Resolve the ImageId to an url
            if (ImageId != Guid.Empty) {

                var image = GetImage(ImageId);
                if (image != null)
                    imgThumbnail.ImageUrl = image.MediaUrl;
            }

            // Fill in the description
            litDescription.Text = Description;

        }

        /// <summary>
        /// Get Image by Guid from Library
        /// </summary>
        /// <param name="imageId"></param>
        /// <returns></returns>
        private Image GetImage(Guid imageId) {
            var manager = LibrariesManager.GetManager();
            return (imageId != Guid.Empty) ? manager.GetImage(imageId) : null;
        }

        /// <summary>
        /// Returns a PageNode object from a Guid
        /// </summary>
        private PageNode GetPage(Guid pageId) {
            var manager = PageManager.GetManager();
            return (pageId != Guid.Empty) ? manager.GetPageNode(pageId) : null;
        }

        #endregion

    }
}
